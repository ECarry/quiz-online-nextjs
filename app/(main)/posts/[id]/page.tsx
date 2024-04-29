import PostForm from "@/app/(dashboard)/dashboard/posts/[id]/post-form";
import { getPostById } from "@/data/posts";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params }: Props) => {
  const { id } = params;

  const post = await getPostById(id);

  if (!post) {
    return notFound();
  }

  return <PostForm post={post} preview />;
};

export default page;
