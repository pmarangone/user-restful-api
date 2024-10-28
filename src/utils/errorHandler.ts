import { Response } from "express";

export const handleError = (error: any, res: Response) => {
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;

  if (error.message) {
    errorMessage = error.message;
    statusCode = 400;
  }

  res.status(statusCode).json({ error: errorMessage });
};
