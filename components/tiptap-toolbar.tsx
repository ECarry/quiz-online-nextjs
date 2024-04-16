import { type Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";

interface TiptapToolbarProps {
  editor: Editor | null;
}

const TiptapToolbar = ({ editor }: TiptapToolbarProps) => {
  if (!editor) return null;

  return (
    <div className="border border-input bg-transparent rounded-lg p-1 flex gap-1">
      <Toggle
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        onClick={() => editor.isActive("Heading2")}
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
      >
        <Heading2 className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        onClick={() => editor.isActive("Heading3")}
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
      >
        <Heading3 className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        onClick={() => editor.isActive("Bold")}
        onPressedChange={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        onClick={() => editor.isActive("Italic")}
        onPressedChange={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        onClick={() => editor.isActive("Strikethrough")}
        onPressedChange={() => {
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <Strikethrough className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        onClick={() => editor.isActive("BulletList")}
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        onClick={() => editor.isActive("OrderedList")}
        onPressedChange={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <ListOrdered className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        onClick={() => editor.isActive("Code")}
        onPressedChange={() => {
          editor.chain().focus().toggleCode().run();
        }}
      >
        <Code className="size-4" />
      </Toggle>
    </div>
  );
};

export default TiptapToolbar;
