import express from "express";
import { checkSchema } from 'express-validator'
import { login, register, getUsers, deleteUserByID, updateUserByID, getUserProfile } from "../controllers/user.ctrl";
import { LoginValidate, RegisterValidate, UserUpdateValidate } from "../validations/user.validation";
import authJWT from "../middlewares/authJWT";
import { isRoleAdmin } from "../middlewares/checkRole";

const router = express.Router();

router.post("/login",  checkSchema(LoginValidate), login);
router.post("/register", checkSchema(RegisterValidate), register);
router.get("/", authJWT, getUsers);
router.get("/:id", authJWT, getUserProfile);
router.delete("/:id", [authJWT, isRoleAdmin], deleteUserByID);
router.put("/", authJWT, checkSchema(UserUpdateValidate), updateUserByID);

export default router;
