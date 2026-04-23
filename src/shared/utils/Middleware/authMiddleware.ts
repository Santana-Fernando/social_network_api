import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export interface AuthRequest extends Request {
  user?: any;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token não informado" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}