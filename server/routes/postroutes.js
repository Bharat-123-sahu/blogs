import express from "express";
import {
  addPost,
  DeletePost,
  editPost,
  PostList,
} from "../controller/itemcontroller.js";

export const PostRoute = express.Router();
PostRoute.get("/", PostList);
PostRoute.post("/add", addPost);
PostRoute.patch("/update", editPost);
PostRoute.delete("/delete/:id", DeletePost);
