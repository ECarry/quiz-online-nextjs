"use client";

import { newUndefinedPost } from "@/actions/post";
import { useRouter } from "next/navigation";

const NewPost = () => {
  const router = useRouter();

  const onClink = async () => {
    newUndefinedPost().then((data) => {
      if (data.success) {
        const post = data.post;
        router.push(`/dashboard/posts/new/${post.id}`);
      }
    });
  };
  return (
    <div>
      <button onClick={onClink}>New Post</button>
    </div>
  );
};

export default NewPost;
