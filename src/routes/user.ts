import express from "express";
import { login, register, getUsers, deleteUser, updateUser } from "../controllers/userCtrl";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/", getUsers);
router.delete("/", deleteUser);
router.put("/", updateUser);

export default router;
