import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import User from "@/models/UserModel";

// @desc    Get all users
// @route   GET /api/users
export async function GET() {
   try {
      const users = await User.find();
      return NextResponse.json(users, { status: 200 });
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
