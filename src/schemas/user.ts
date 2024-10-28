import Joi from "joi";

export const userSchema = Joi.object({
  nome: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  idade: Joi.number().min(3).max(100),
  ativo: Joi.boolean(),
});

export const updateUserSchema = userSchema.fork(
  ["nome", "email", "idade", "ativo"],
  (schema) => schema.optional()
);
