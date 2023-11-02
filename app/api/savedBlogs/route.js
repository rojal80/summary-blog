import SavePost from "@/models/SavePostModel";
import connectDB from "@/config/database";
import { NextResponse } from "next/server";

// @desc    Save a blog
// @route   POST /api/savedBlogs
export async function POST(request) {
  try {
    console.log("saved blog");
    await connectDB();
    const data = await request.json();
    console.log(data);
    const saveBlog = await SavePost.create(data);
    return NextResponse.json(saveBlog, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}

export async function GET() {
  console.log("saved post");
}
