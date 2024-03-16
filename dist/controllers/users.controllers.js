"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_models_1 = __importDefault(require("../models/users.models"));
const response_status_1 = require("../utils/response-status");
class UsersController {
    register(req, res) {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };
        users_models_1.default.create(data).then(response => {
            res.status(response_status_1.response_status.CREATED).send(response);
        }).catch((e) => {
            res.status(response_status_1.response_status.BAD_REQUEST).send('Failed to create user');
        });
    }
}
exports.UsersController = UsersController;
