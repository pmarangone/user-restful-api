import { Request, Response } from "express";
import {
  fetchUsers,
  fetchUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
} from "../services/user";
import { handleError } from "../utils/errorHandler";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await fetchUsers(req.query);
    res.status(200).json(users);
    return;
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await fetchUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createNewUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  if (req.body.id) {
    res.status(400).json({ message: "Cannot update user ID." });
    return;
  }

  try {
    const user = await updateUserById(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await deleteUserById(req.params.id);
    res.json(result);
  } catch (error) {
    handleError(error, res);
  }
};
