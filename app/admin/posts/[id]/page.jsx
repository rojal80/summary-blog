"use client";
import { useContext } from "react";
import BlogContext from "@/components/context/BlogContext";

export default function BlogDetails({ params: { id } }) {
  const { pendingPosts } = useContext(BlogContext);

  const [post] = pendingPosts.filter((post) => post._id === id);
  console.log(post);

  return (
    <div className="w-4/5 pt-5 mx-auto">
      <div className="py-2 my-2">
        <span className="font-medium text-2xl">Title:</span>{" "}
        <span className="text-lg">{post?.title}</span>
      </div>
      <hr />

      <div className="py-2 my-2">
        <span className="font-medium text-2xl">Description:</span>:{" "}
        <span className="text-md">{post?.description}</span>
      </div>
      <hr />

      <div className="py-2 my-2">
        <span className="font-medium text-2xl">User:</span>
        <span> {post?.user.name}</span>
      </div>
    </div>
  );
}
