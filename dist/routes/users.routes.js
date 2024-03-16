"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_controllers_1 = require("../controllers/users.controllers");
const router = require('express').Router();
const userController = new users_controllers_1.UsersController();
router.post('/signUp', userController.register);
//router.post('/login', userController.login);
exports.default = router;
