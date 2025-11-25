import express from "express";
import { LoginUser, RegisterUser } from "../controller/usercontroller.js";
import { userVerification } from "../middleware/authmiddleware.js";

export const UserRoutes = express.Router();

UserRoutes.post("/login", LoginUser);
UserRoutes.post("/register", RegisterUser);
