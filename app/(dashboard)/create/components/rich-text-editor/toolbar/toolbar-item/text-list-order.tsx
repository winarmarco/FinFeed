import {Toggle} from "@radix-ui/react-toggle";
import { Editor } from "@tiptap/react";
import {List, ListOrdered} from "lucide-react";

interface TextListOrderProps {
  editor: Editor
}

const TextListOrder: React.FC<TextListOrderProps> = ({editor}) => {
  return (
    <>
      <Toggle
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <ListOrdered />
      </Toggle>

      <Toggle
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List />
      </Toggle>
    </>
  );
};

export default TextListOrder;