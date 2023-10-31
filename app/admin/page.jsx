"use client";
import Card from "@/components/shared/Card";
import { useContext } from "react";
import BlogContext from "@/components/context/BlogContext";

export default function HomePage() {
   const { pendingPosts, posts, users } = useContext(BlogContext);
   return (
      <div className=" w-fit mx-5 pt-5 flex flex-wrap gap-5">
         <Card title="pending posts" number={pendingPosts.length} />
         <Card title="accepted posts" number={posts.length} />
         <Card title="users" number={users.length} />
      </div>
   );
}
