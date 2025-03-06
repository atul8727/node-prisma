import { Router } from "express";
import { createUser, updateUser } from "../Controller/UserController.js";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);

export default userRouter;
