import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST) {
  throw new Error("Database environment variables missing");
}

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);