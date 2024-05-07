import { Request, Response, NextFunction } from 'express';
import { response_status } from '../utils/response_status';

const auth_middleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Esta pasando un middleware para checar el token');
  const { token } = req.query;
  if (token && token === '123') {
    next();
  } else {
    res.status(response_status.BAD_REQUEST).send('Unauthorize');
  }
};

export default auth_middleware;
