import { Router } from "express";
import {
  createUser,
  fetchUser,
  updateUser,
} from "../Controller/UserController.js";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.get("/fetchuser", fetchUser);

export default userRouter;
