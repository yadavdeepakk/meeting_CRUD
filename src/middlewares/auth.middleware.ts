import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../modules/user/module/user.module";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    (req as any).user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};