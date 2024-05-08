import jwt from 'jsonwebtoken';

export function create(data: Object) {
  return jwt.sign(data, process.env.KEY_TOKEN);
}

export function decode(token: any) {
  try {
    return jwt.verify(token, process.env.KEY_TOKEN);
  } catch (e) {
    return null;
  }
}
