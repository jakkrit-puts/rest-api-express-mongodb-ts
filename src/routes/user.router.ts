import express from "express";
import { checkSchema } from 'express-validator'
import { login, register, getUsers, deleteUser, updateUser } from "../controllers/user.ctrl";
import { LoginValidate } from "../validations/user.validation";

const router = express.Router();

router.post("/login",  checkSchema(LoginValidate), login);
router.post("/register", register);
router.get("/", getUsers);
router.delete("/", deleteUser);
router.put("/", updateUser);

export default router;
