import { Request, Response } from 'express';
import User from '../models/users.models';
import { response_status } from '../utils/response_status';
import jwt from 'jsonwebtoken';
import hashPassword from '../utils/hash_password';

export class UsersController {
  register(req: Request, res: Response) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword(req.body.password),
      role: req.body.role,
    };

    User.create(data)
      .then((response) => {
        res.status(response_status.CREATED).send(response);
      })
      .catch((e: Error) => {
        res.status(response_status.BAD_REQUEST).send('Failed to create user' + e);
      });
  }

  login(req: Request, res: Response) {
    const data = {
        email : req.body.email,
        password : hashPassword(req.body.password)
    }

    User.findOne(data).then(response => {
        if(response) {
            const data = {
                name : response.name,
                email : response.email,
            }

            const token = jwt.sign(data, process.env.TOKEN_KEY);
            res.status(response_status.SUCCESS).send({token});                

        } else {
            res.status(response_status.UNAUTHORIZED).send('failed to login');
        }
    }).catch(e => {
        res.status(response_status.BAD_REQUEST).send('failed to login');
    })
}
}
