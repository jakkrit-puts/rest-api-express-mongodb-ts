import mongoose from "mongoose";
import { ResponseError } from "./custom-error";

// check objectId mongoDB format
export const verifyObjectId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {  
    throw new ResponseError("data not found.", false, 404);
  }
};
