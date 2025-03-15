import { Router } from "express";

import {
  createComment,
  fetchComment,
  findComment,
  updateComment,
} from "../Controller/CommentController.js";

const commentRoutes = Router();

commentRoutes.post("/createcomment", createComment);
commentRoutes.put("/updatecomment/:id", updateComment);
commentRoutes.get("/fetchcomment", fetchComment);
commentRoutes.get("/fetchcommentid/:id", findComment);

export default commentRoutes;
