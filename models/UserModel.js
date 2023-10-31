import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      maxlength: [50, "Email cannot be more than 50 characters"],
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
