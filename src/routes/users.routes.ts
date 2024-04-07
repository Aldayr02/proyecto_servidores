import { UsersController } from '../controllers/users.controllers';

const router = require('express').Router();
const userController = new UsersController();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              name:
 *               type: string
 *              email:
 *               type: string
 *               format: email
 *              password:
 *               type: string
 *              role:
 *               type: string
 *     responses:
 *       200:
 *         description: user created successfully
 *       404:
 *         description: user not found
 */
router.post('/signUp', userController.register);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              email:
 *               type: string
 *               format: email
 *              password:
 *               type: string
 *     responses:
 *       200:
 *         description: login successfully
 *       404:
 *         description: user not found
 */
router.post('/login', userController.login);

export default router;
