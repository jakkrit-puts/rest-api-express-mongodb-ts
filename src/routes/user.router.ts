import express from "express";
import { checkSchema } from 'express-validator'
y
import { login, register, getUsers, deleteUserByID, updateUserByID, getUserByID } from "../controllers/user.ctrl";
import { LoginValidate, RegisterValidate, UserValidate } from "../validations/user.validation";

const router = express.Router();

router.post("/login",  checkSchema(LoginValidate), login);
router.post("/register", checkSchema(RegisterValidate), register);
router.get("/", getUsers);
router.get("/:id", getUserByID);
router.delete("/:id", deleteUserByID);
router.put("/", checkSchema(UserValidate), updateUserByID);

export default router;
