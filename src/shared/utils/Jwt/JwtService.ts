import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret";

export class JwtService {

  static generateToken(payload: object): string {
    return jwt.sign(payload, SECRET, {
      expiresIn: "1d"
    });
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, SECRET);
  }
}