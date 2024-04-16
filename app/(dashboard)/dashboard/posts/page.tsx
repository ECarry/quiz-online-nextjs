import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const PostPage = () => {
  return (
    <div>
      <Button asChild>
        <Link href="/dashboard/posts/new">
          <Plus size={18} className="mr-2" />
          New
        </Link>
      </Button>
    </div>
  );
};

export default PostPage;
