import { Schema } from "express-validator";

export const LoginValidate: Schema = {
  username: { notEmpty: true, errorMessage: 'Username Required', },
  password: { notEmpty: true,  errorMessage: 'Password Required', },
};
