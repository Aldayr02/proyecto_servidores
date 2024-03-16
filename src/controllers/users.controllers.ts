import { Request, Response } from 'express';
import User from '../models/users.models';
import { response_status } from '../utils/response-status';

export class UsersController {

    register(req: Request, res: Response) {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };

        User.create(data).then(response => {
            res.status(response_status.CREATED).send(response);
        }).catch((e: Error) => {
            res.status(response_status.BAD_REQUEST).send('Failed to create user');
        });
    }
}