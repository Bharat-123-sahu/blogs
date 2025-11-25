import mongoose from "mongoose";
import { itemSchema } from "../schemas/itemdschema.js";
export const itemModel = mongoose.model("post", itemSchema);
