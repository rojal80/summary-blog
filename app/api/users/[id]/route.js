import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import User from "@/models/UserModel";

// @desc    Get user based on the user id
// @route   GET /api/users/:id
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    let blogs;
    if (type === "id") {
      const user = await User.findById(id);
      return NextResponse.json(user, { status: 200 });
    } else if (type === "email") {
      const user = await User.find({ email: id });
    }
  } catch (err) {
    console.log(err.message);
  }
}

// @desc   update user details based on the user id
// @route  PUT /api/users/:id
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const data = await request.json();
    const response = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.log(err.message);
  }
}
