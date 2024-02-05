import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import { Strikethrough } from "lucide-react";


interface StrikeProps {
  editor: Editor;
}

const Strike: React.FC<StrikeProps> = ({editor}) => {
  return (
    <Toggle
      pressed={editor.isActive("strike")}
      onPressedChange={() => {
        editor.chain().focus().toggleStrike().run();
      }}
    >
      <Strikethrough />
    </Toggle>
  );
};


export default Strike;