import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../module/user.module";

const generateToken = (userId: number) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
};

// ================= REGISTER =================
export const registerUser = async (data: any) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user.get("id") as number);

  return {
    token,
    user: {
      id: user.get("id"),
      name: user.get("name"),
      email: user.get("email"),
    },
  };
};

// ================= LOGIN =================
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.get("password") as string
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.get("id") as number);

  return {
    token,
    user: {
      id: user.get("id"),
      name: user.get("name"),
      email: user.get("email"),
    },
  };
};