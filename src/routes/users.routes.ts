import { UsersController } from '../controllers/users.controllers';

const router = require('express').Router();
const userController = new UsersController();

router.post('/signUp', userController.register);
//router.post('/login', userController.login);

export default router;