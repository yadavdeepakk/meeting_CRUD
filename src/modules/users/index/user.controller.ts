import { Request, Response } from "express";
import * as service from "../service/user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await service.createUser(req.body);
    res.status(201).json(user);
  } catch {
    res.status(400).json({ message: "Error creating user" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const user = await service.getUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};