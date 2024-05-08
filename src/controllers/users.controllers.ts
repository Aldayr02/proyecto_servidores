import User from '../models/users.models';
import { Request, Response } from 'express';
import { response_status } from '../utils/response_status';
import hashPassword from '../utils/hash_password';
import { create } from '../utils/token';


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
    User.findOne(data)
      .then((response) => {
        if (response == null) {
          throw new Error(`${response.errors.message}`);
        }
        const user_data = {
          name: response.name,
          email: response.email,
        };
        const send_token = create(user_data);
        res.status(response_status.SUCCESS).send({ token: send_token });
      })
      .catch((e) => {
        res.status(response_status.BAD_REQUEST).send(`Invalid credentials - ${e}`);
      });
  }
}
