import { UsersController } from '../controllers/users.controllers';
import uploadS3 from '../middlewares/uploadS3-middleware';
import { Router, Request, Response } from 'express';
import passport from 'passport';

const router = require('express').Router();
const userController = new UsersController();

/**
 * @swagger
 * /users/signup:
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
 * /users/login:
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

router.post('/s3upload', uploadS3.single('foto'), (req: Request, res: Response) => {
  res.send(`Image uploaded`);
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (req: Request, res: Response) => {
    res.redirect('/'); // Enviar a home
  }
);

export default router;
