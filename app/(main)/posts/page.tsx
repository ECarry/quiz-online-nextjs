import { getPosts } from "@/data/posts";

import PostListItem from "../_components/post-list-item";

const PostsPage = async () => {
  const posts = await getPosts();

  return (
    <section className="grid grid-cols-1 gap-6 p-4 md:p-6">
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </section>
  );
};

export default PostsPage;
