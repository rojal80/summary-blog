import { Schema, model, models } from "mongoose";

const SavePostModel = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  { timestamps: true }
);

export default models.SavePost || model("SavePost", SavePostModel);
