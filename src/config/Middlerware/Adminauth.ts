import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import configs from "../ENV/config";
import { config } from "../common/config.json";
export const Adminauthentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void  => {
  const authHeader: any = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res
      .status(config.statusCode.Unauthorized)
      .json({ success: 0, data: "Please clear session and login again " });
  }
  try {
    const verifyToken = JWT.verify(token, configs.JWT_SECREAT_KEY);
    next();
  } catch (error) {
    res
      .status(config.statusCode.Unauthorized)
      .json({ message: "Invalid or expired token" });
  }
};
