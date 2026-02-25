import { User } from "../module/user.module";

export const createUser = async (data: any) => {
  return await User.create(data);
};

export const getUserById = async (id: number) => {
  return await User.findByPk(id);
};