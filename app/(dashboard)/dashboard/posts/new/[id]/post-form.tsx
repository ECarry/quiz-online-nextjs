"use client";

import { ElementRef, useRef, useState } from "react";
import { Post } from "@prisma/client";
import { updatePost, updatePostTitle } from "@/actions/post";

import Editor from "./editor";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";

interface PostFormProps {
  post: Post;
  preview?: boolean;
}

const PostForm = ({ post, preview }: PostFormProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(post.content || "");

  const { onOpen } = useModal();

  const { id, content } = post;

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(post.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);
    updatePostTitle(id, value).then((data) => {
      console.log(data);
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
    }
  };

  const onChange = (content: string) => {
    updatePost(id, content).then((data) => {});
  };

  return (
    <div className="flex gap-4 flex-col">
      <div className="w-full h-[25dvh] p-0">
        {post.postImage && (
          <Image
            src={post.postImage}
            alt="cover"
            width={1920}
            height={250}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      {!post.postImage && (
        <Button
          className="text-muted-foreground text-xs w-[120px]"
          variant="outline"
          size="sm"
          onClick={() => onOpen("addCover")}
        >
          <ImageIcon className="size-4 mr-2" />
          Add cover
        </Button>
      )}
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          className="text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
          onClick={enableInput}
        >
          {post.title}
        </div>
      )}
      <Editor onChange={onChange} initialContent={content || ""} />
    </div>
  );
};

export default PostForm;
