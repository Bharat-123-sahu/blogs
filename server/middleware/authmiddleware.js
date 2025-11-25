import jwt from "jsonwebtoken";
import { UserModel } from "../model/useModel.js";
import dotenv from "dotenv";

dotenv.config();


export const userVerification = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
   
      token = req.headers.authorization.split(" ")[1];

      
      const decoded = jwt.verify(token, process.env.TOKEN_KEY); 
   
      
      req.user = await UserModel.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "email and password are not  register" });
      }

     
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

 
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};


