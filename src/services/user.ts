import { UniqueConstraintError, Op } from "sequelize";
import User from "../models/user";
import { userSchema, updateUserSchema } from "../schemas/user";

export const fetchUsers = async (filters: {
  nome?: string;
  idade?: string;
  idadeMin?: string;
  idadeMax?: string;
}) => {
  const where: Record<string, any> = {};

  if (filters.nome) {
    where.nome = { [Op.like]: `${filters.nome}%` };
  }

  if (filters.idade) {
    where.idade = parseInt(filters.idade, 10);
  }
  else if (filters.idadeMin || filters.idadeMax) {
    where.idade = {
      [Op.between]: [
        parseInt(filters.idadeMin || "0", 10),
        parseInt(filters.idadeMax || "100", 10),
      ],
    };
  }

  const users = await User.findAll({ where });
  return users;
};

export const fetchUserById = async (id: string) => {
  return User.findByPk(id);
};

export const createNewUser = async (userData: any) => {
  const { error } = userSchema.validate(userData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const existingUser = await User.findOne({ where: { email: userData.email } });
  if (existingUser) {
    throw new UniqueConstraintError({
      message: "User already exists with this email.",
    });
  }

  return User.create(userData);
};

export const updateUserById = async (id: string, data: any) => {
  const { error } = updateUserSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }

  return user.update(data);
};

export const deleteUserById = async (id: string) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }

  await user.destroy();
  return { message: "User deleted" };
};
