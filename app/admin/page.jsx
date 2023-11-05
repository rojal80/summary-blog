"use client";
import Card from "@/components/shared/Card";
import { useContext } from "react";
import BlogContext from "@/components/context/BlogContext";

import CardLoading from "@/components/loading/CardLoading";

import { Suspense } from "react";

export default function HomePage() {
  const { pendingPosts, posts, users } = useContext(BlogContext);
  return (
    <div className=" w-fit mx-5 pt-5 flex flex-wrap gap-5">
      <Suspense fallback={CardLoading}>
        <Card title="pending posts" number={pendingPosts.length} />
      </Suspense>
      <Suspense fallback={CardLoading}>
        <Card title="accepted posts" number={posts.length} />
      </Suspense>
      <Suspense fallback={CardLoading}>
        <Card title="users" number={users.length} />
      </Suspense>
    </div>
  );
}
