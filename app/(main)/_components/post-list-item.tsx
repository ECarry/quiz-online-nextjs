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
    <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-950">
      <div className="flex items-center p-4">
        <Avatar>
          <AvatarImage
            alt="@jaredpalmer"
            src={post.user.image || "/avatar.svg"}
          />
          <AvatarFallback>{post.user.name?.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <Link href={`/posts/${post.id}`}>
            <h3 className="font-semibold text-lg hover:text-gray-600 transition-all dark:hover:text-gray-300">
              {post.title}
            </h3>
          </Link>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {formatDate(post.createdAt)}
          </p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-700 dark:text-gray-300">
          Discover the secrets to creating responsive websites that adapt
          seamlessly to any device. Learn the latest techniques and best
          practices for building mobile-friendly designs.
        </p>
      </div>
    </div>
  );
};

export default PostListItem;
