import { Request, Response } from "express";

import { UsersController } from "../../src/controllers/users.controllers";
import userModel from "../../src/models/users.models";
import { response_status } from "../../src/utils/response_status";

const userController = new UsersController();

// Mock the external dependencies
jest.mock("../../src/models/users.models", () => ({
	create: jest.fn().mockResolvedValue(Promise.resolve("User created")),
	findOne: jest.fn().mockResolvedValue(
		Promise.resolve({
			name: "TestUser",
			password: "password123",
			email: "test@example.com",
            role: "admin"
		}),
	),
	updateOne: jest.fn().mockResolvedValue(Promise.resolve("")),
}));

describe("UsersController", () => {
	describe("register", () => {
		let req: Partial<Request>;
		let res: Partial<Response>;

		// Mock the Express req and res objects before each test
		beforeEach(() => {
			req = {
				body: {
					name: "TestUser",
					password: "password123",
					email: "test@example.com",
                    role: "admin"
				},
			};

			res = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
			};
		});

		test("should create a new user and send a CREATED response", async () => {
			// Arrange
			// Cast the req object to the correct type
			await userController.register(req as Request, res as Response);

			// Assert
			expect(userModel.create).toHaveBeenCalledWith({
                name: "TestUser",
                password: "password123",
                email: "test@example.com",
                role: "admin"
			});
			expect(res.status).toHaveBeenCalledWith(response_status.CREATED);
			expect(res.send).toHaveBeenCalledWith("User created");
		});

		test("should handle 'email already exists' error", async () => {
			// Arrange

			const createMock = userModel.create as jest.Mock;
			createMock.mockRejectedValueOnce({ code: 11000 });

			try {
				// Act
				await userController.register(req as Request, res as Response);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(response_status.BAD_REQUEST);
				expect(res.send).toHaveBeenCalledWith("Email already exists");
			}
		});

		test("should handle validation errors", async () => {
			// Arrange

			const createMock = userModel.create as jest.Mock;
			const validationError = new Error("Validation error");
			validationError.name = "ValidationError";
			createMock.mockRejectedValueOnce(validationError);

			try {
				// Act
				await userController.register(req as Request, res as Response);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(response_status.BAD_REQUEST);
				expect(res.send).toHaveBeenCalledWith("Invalid data");
			}
		});

		test("should handle generic errors", async () => {
			// Arrange

			const createMock = userModel.create as jest.Mock;
			createMock.mockRejectedValueOnce(new Error("Generic error"));

			try {
				// Act
				await userController.register(req as Request, res as Response);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(
					response_status.BAD_REQUEST,
				);
				expect(res.send).toHaveBeenCalledWith("Something went wrong");
			}
		});
	});

	describe("login", () => {
		let req: Partial<Request>;
		let res: Partial<Response>;

		// Mock the Express req and res objects before each test
		beforeEach(() => {
			req = {
				body: {
					name: "TestUser",
					password: "password123",
					email: "test@example.com",
				},
			};

			res = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
			};
		});
		test("should log in an existing user and send back a token", async () => {
			// Arrange
			(userModel.findOne as jest.Mock).mockResolvedValue({
				name: "TestUser",
				email: "test@example.com",
			});

			// Act
			await userController.login(req as Request, res as Response);

			// Assert
			expect(userModel.findOne).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "password123",
			});
			expect(res.status).toHaveBeenCalledWith(response_status.SUCCESS);
			expect(res.send).toHaveBeenCalledWith({ token: "123" });
		});

		test("should handle invalid credentials", async () => {
			// Arrange
			(userModel.findOne as jest.Mock).mockResolvedValue(null);

			// Act
			await userController.login(req as Request, res as Response);

			// Assert
			expect(res.status).toHaveBeenCalledWith(response_status.UNAUTHORIZED);
			expect(res.send).toHaveBeenCalledWith("Invalid credentials");
		});

		test("should handle generic errors", async () => {
			// Arrange
			(userModel.findOne as jest.Mock).mockRejectedValue(new Error("Generic error"));

			// Act
			try {
				await userController.login(req as Request, res as Response);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(
					response_status.BAD_REQUEST,
				);
				expect(res.send).toHaveBeenCalledWith("Something went wrong");
			}
		});
	});
});