import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post, User } from "@prisma/client";
import formatDate from "@/lib/format-date";

interface PostWithAuthor extends Post {
  user: User;
}

interface PostListItemProps {
  post: PostWithAuthor;
}

const PostListItem = ({ post }: PostListItemProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-black/90">
      <div className="flex items-center p-4">
        <Avatar>
          <AvatarImage alt="avatar" src={post.user.image || "/avatar.svg"} />
          <AvatarFallback>{post.user.name?.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <Link href={`/posts/${post.id}`} prefetch={false}>
            <h3 className="font-semibold text-lg hover:text-gray-600 transition-all dark:hover:text-gray-300">
              {post.title}
            </h3>
          </Link>

          <p className="text-gray-500 dark:text-gray-400 text-sm"></p>
        </div>
      </div>
    </div>
  );
};

export default PostListItem;
