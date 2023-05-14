import { Schema } from "express-validator";

export const LoginValidate: Schema = {
  username: { notEmpty: true, errorMessage: "Username Required" },
  password: { notEmpty: true, errorMessage: "Password Required" },
};

export const RegisterValidate: Schema = {
  username: { notEmpty: true, errorMessage: "Username Required" },
  password: { notEmpty: true, errorMessage: "Password Required" },
  firstname: { notEmpty: true, errorMessage: "Firstname Required" },
  lastname: { notEmpty: true, errorMessage: "Lastname Required" },
};

export const UserValidate: Schema = {
  id: { notEmpty: true, errorMessage: "ID Required" },
  username: { notEmpty: true, errorMessage: "Username Required" },
  password: { notEmpty: true, errorMessage: "Password Required" },
  firstname: { notEmpty: true, errorMessage: "Firstname Required" },
  lastname: { notEmpty: true, errorMessage: "Lastname Required" },
};
