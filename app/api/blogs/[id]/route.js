import connectDB from "@/config/database";
import { NextResponse } from "next/server";
import Blog from "@/models/BlogModel";
import "@/models/UserModel";
import { headers } from "next/headers";

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
//@route   PUT /api/blogs/:id?likes=increase
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    //fetching parameter from the url ?id=123 (query parameter)
    const { searchParams } = new URL(request.url);
    const like = searchParams.get("likes");
    const headersList = headers();

    const authorization = headersList.get("authorization");

    let response;

    //increaseing and decreasing the likes, it wont need the data in the body
    //in the query parameter pass likes=increase or likes=decrease
    if (like === "increase") {
      // Add the user's authorization ID to the "likes" array
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { $addToSet: { likes: authorization } }, // $addToSet adds only if not already present
        {
          new: true,
          runValidators: true,
        }
      );
      response = updatedBlog;
    } else if (like === "decrease") {
      // Remove the user's authorization ID from the "likes" array
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { $pull: { likes: authorization } }, // $pull removes the specified element from the array
        {
          new: true,
          runValidators: true,
        }
      );
      response = updatedBlog;
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
