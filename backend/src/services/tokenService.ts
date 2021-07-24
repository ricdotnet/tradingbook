import jwt from 'jsonwebtoken'

export function encode(userId: string, remember: boolean): string {
  return jwt.sign({userId: userId}, process.env.SECRET!, {
    expiresIn: (remember) ? 3600 * 24 * 365 : 60 * 15,
    algorithm: "HS256"
  });
}

export function decode(token: string): Object {
  return <Object>jwt.decode(token);
}