import SavePost from "@/models/SavePostModel";
import "@/models/BlogModel";
import "@/models/UserModel";
import connectDB from "@/config/database";
import { NextResponse } from "next/server";

// @desc    Save a blog
// @route   GET /api/savedBlogs/[id]
export async function GET(request, { params: { id } }) {
  try {
    await connectDB();
    const savedBlog = await SavePost.find({ user: id })
      .populate({
        path: "user",
      })
      .populate({
        path: "blog",
        populate: {
          path: "user",
        },
      });
    return NextResponse.json(savedBlog, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
