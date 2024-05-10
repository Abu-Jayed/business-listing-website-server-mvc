import { Schema, model } from "mongoose";
import { Iuser, UserModel } from "./user.interface";

const userSchema = new Schema<Iuser>({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },
});
// has the password
// assalam
userSchema.pre("save", async function (next) {
  next();
});
export const User = model<Iuser, UserModel>("User", userSchema);
