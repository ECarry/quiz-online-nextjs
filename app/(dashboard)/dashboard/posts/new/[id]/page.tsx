import { getPostByID } from "@/actions/post";
import PostForm from "./post-form";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params }: Props) => {
  const { id } = params;

  const post = await getPostByID(id);

  if (!post) {
    return notFound();
  }

  return <PostForm post={post} preview={false} />;
};

export default page;
