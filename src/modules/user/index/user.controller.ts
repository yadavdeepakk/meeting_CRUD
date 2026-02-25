import { Request, Response } from "express";
import * as service from "../service/user.service";
import * as authService from "../service/auth.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await service.createUser(req.body);
    res.status(201).json(user);
  } catch {
    res.status(400).json({ message: "Error creating user" });
  }
};

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUser(
      req.body.email,
      req.body.password
    );
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const user = await service.getUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};