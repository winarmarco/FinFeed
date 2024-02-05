
import { Toggle } from "@/components/ui/toggle";
import {Editor} from "@tiptap/react";
import {Bold, Italic, Underline} from "lucide-react";

interface TextDecorationProps {
  editor: Editor | null;
}

const TextDecoration: React.FC<TextDecorationProps> = ({editor}) => {

  if (!editor) return null;

  return (
    <>
      <Toggle
        pressed={editor.isActive("bold")}
        onPressedChange={() => {
          editor.chain().toggleBold().run();
        }}
      >
        <Bold />
      </Toggle>
      <Toggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => {
          editor.chain().toggleItalic().run();
        }}
      >
        <Italic />
      </Toggle>
      <Toggle
        pressed={editor.isActive("underline")}
        onPressedChange={() => {
          editor.chain().focus().toggleUnderline().run();
        }}
      >
        <Underline />
      </Toggle>
    </>
  );
};

export default TextDecoration;