"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import List from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";
import Toolbar from "./toolbar/toolbar";
import StarterKit from "@tiptap/starter-kit";
import { ControllerRenderProps } from "react-hook-form";
import { editorExtension } from "@/lib/constants";
import { useState } from "react";

interface TextEditorProps {
  onChange: (richText: string) => void;
}


const TextEditor: React.FC<TextEditorProps> = ({ onChange }) => {

  const [file, setFile] = useState<File[] | undefined>([]);


  const editor = useEditor({
    extensions: editorExtension,
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] h-full w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    content: "<p>HeloWorld</p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col gap-y-4">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
