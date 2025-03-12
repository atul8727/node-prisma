import { Router } from "express";
import {
  createUser,
  fetchUser,
  updateUser,
  showUser,
} from "../Controller/UserController.js";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.get("/fetchuser", fetchUser);
userRouter.get("/user/:id", showUser);

export default userRouter;
