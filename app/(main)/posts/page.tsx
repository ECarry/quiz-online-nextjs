//import { getPosts } from "@/data/posts";
import PostListItem from "../_components/post-list-item";
import { unstable_cache as cache } from "next/cache";
import { db } from "@/lib/db";

const getCachePosts = cache(() => {
  return db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
});

const PostsPage = async () => {
  const posts = await getCachePosts();

  return (
    <section className="grid grid-cols-1 gap-6 p-4 md:p-6">
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </section>
  );
};

export default PostsPage;
