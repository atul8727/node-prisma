import { Router } from "express";
import {
  createPost,
  fetchPosts,
  findPost,
  searchPost,
  updatePost,
} from "../Controller/PostController.js";

const postRoutes = Router();

postRoutes.post("/createpost", createPost);
postRoutes.put("/updatepost:id", updatePost);
postRoutes.get("/fetchpost", fetchPosts);
postRoutes.get("/fetchpostid/:id", findPost);
postRoutes.get("/searchpost", searchPost);

export default postRoutes;
