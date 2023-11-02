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
    const savedBlog = await SavePost.find({ blog: data.blog });
    if (savedBlog.length > 0) {
      const response = await SavePost.deleteOne({ blog: data.blog });
      return NextResponse.json(response, { status: 200 });
    } else {
      const response = await SavePost.create(data);
      return NextResponse.json(response, { status: 201 });
    }
  } catch (err) {
    console.log(err);
  }
}

export async function GET() {
  console.log("saved post");
}
