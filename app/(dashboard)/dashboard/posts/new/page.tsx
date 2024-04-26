"use client";

import React from "react";
import NewPostForm from "./new-post-form";
import Editor from "./editor";

const NewPostPage = () => {
  const onChange = () => {};

  return (
    <div>
      <div className="w-full h-[25dvh] bg-rose-500 p-0"></div>
      <Editor onChange={() => {}} />
    </div>
  );
};

export default NewPostPage;
