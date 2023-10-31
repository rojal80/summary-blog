import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Blog from "@/models/BlogModel";
import "@/models/UserModel";

// @desc    Get all blogs
// @route   GET /api/blogs
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let blogs;
    if (status === "pending") {
      blogs = await Blog.find({ status: "pending" }).populate("user");
    } else if (status === "accepted") {
      blogs = await Blog.find({ status: "accepted" }).populate("user");
    } else {
      blogs = await Blog.find().populate("user");
    }
    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    console.log(err.message);
  }
}

// @desc    Create a blog
// @route   POST /api/blogs
export async function POST(request) {
  try {
    await connectDB();
    const req = await request.json();
    const res = await Blog.create(req);
    return NextResponse.json(res, { status: 201 });
  } catch (err) {
    // error(err);
    console.log(err.message);
  }
}
