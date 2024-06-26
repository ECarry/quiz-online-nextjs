"use client";

import { useTheme } from "next-themes";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote, BlockNoteView } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file,
    });

    return res.url;
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  // Throttle fn
  let timer: ReturnType<typeof setTimeout> | null = null;
  const throttleUpdate = (func: () => void, delay: number) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, delay);
  };

  return (
    <div className="">
      <BlockNoteView
        editable={editable}
        editor={editor}
        onChange={() =>
          throttleUpdate(() => onChange(JSON.stringify(editor.document)), 3000)
        }
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
