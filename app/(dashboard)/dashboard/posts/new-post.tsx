"use client";

import { useRouter } from "next/navigation";

import { newUndefinedPost } from "@/actions/post";
import { Button } from "@/components/ui/button";

const NewPost = () => {
  const router = useRouter();

  const onClink = async () => {
    newUndefinedPost().then((data) => {
      if (data.success) {
        const post = data.post;
        router.push(`/dashboard/posts/${post.id}`);
      }
    });
  };
  return (
    <div>
      <Button onClick={onClink}>New Post</Button>
    </div>
  );
};

export default NewPost;
