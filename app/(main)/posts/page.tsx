import { getPosts } from "@/data/posts";
import Link from "next/link";

const PostsPage = async () => {
  const posts = await getPosts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Posts</h1>
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
