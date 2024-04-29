import React from "react";
import NewPost from "./new-post";
import { getPosts } from "@/data/posts";
import Link from "next/link";

const PostPage = async () => {
  const posts = await getPosts();

  return (
    <div>
      <NewPost />
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <Link href={`/dashboard/posts/${post.id}`} key={post.id}>
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
