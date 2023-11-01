import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import User from "@/models/UserModel";

// @desc    Get all users
// @desc    Get one user by email ?email=..
// @route   GET /api/users?email=
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (email) {
      const user = await User.findOne({ email });
      return NextResponse.json(user, { status: 200 });
    } else {
      const user = await User.find();
      return NextResponse.json(user, { status: 200 });
    }
  } catch (err) {
    console.log(err.message);
  }
}

// @desc    Create a blog
// @route   POST /api/users
export async function POST(request) {
  try {
    await connectDB();
    const req = await request.json();
    const res = await User.create(req);
    return NextResponse.json(res, { status: 201 });
  } catch (err) {
    // error(err);
    console.log(err.message);
  }
}
