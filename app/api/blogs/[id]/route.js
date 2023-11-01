import connectDB from "@/config/database";
import { NextResponse } from "next/server";
import Blog from "@/models/BlogModel";
import "@/models/UserModel";

//@desc    Get the blog based on the blog id and user id
//@route   GET /api/blogs/:id

export async function GET(request, { params }) {
  try {
    await connectDB();
    //fetching parameter from the url ?id=123 (query parameter)
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const { id } = params; //fetching parameter from url (route parameter)

    if (type === "user") {
      const blog = await Blog.find({ user: params.id }).populate("user");
      return NextResponse.json(blog, { status: 200 });
    } else {
      const blog = await Blog.findById(id).populate("user");
      return NextResponse.json(blog, { status: 200 });
    }
  } catch (err) {
    console.log(err.message);
  }
}

//@desc    update blog  based on the blog id
//@route   PUT /api/blogs/:id?like=true
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    //fetching parameter from the url ?id=123 (query parameter)
    const { searchParams } = new URL(request.url);
    const like = searchParams.get("likes");

    let response;

    //increaseing and decreasing the likes, it wont need the data in the body
    //in the query parameter pass likes=increase or likes=decrease
    if (like === "increase") {
      response = await Blog.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        {
          new: true,
          runValidators: true,
        }
      );
    } else if (like === "decrease") {
      response = await Blog.findByIdAndUpdate(
        id,
        { $inc: { likes: -1 } },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      //this condition is for updating the blog so we need to pass the data in the body
      const data = await request.json();
      response = await Blog.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    }
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.log(err.message);
  }
}

//@desc   delete blog  based on the blog id
//@route  DELETE /api/blogs/:id
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const response = await Blog.findByIdAndDelete(id);
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.log(err.message);
  }
}
