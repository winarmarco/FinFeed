import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Editor} from "@tiptap/react";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";

interface HeadingSelectionProps {
  editor: Editor;
}

const HeadingSelection: React.FC<HeadingSelectionProps> = ({editor}) => {

  return (
    <>
      <Select
        value={[1, 2, 3, 4, 5, 6].reduce(
          (acc, level) =>
            editor.isActive("heading", {level}) ? level.toString() : acc,
          "4"
        )}
        onValueChange={(value) => {
          const level = Number(value).valueOf();
          if (level < 1 || level > 6) return;
          type Level = 1 | 2 | 3 | 4 | 5 | 6;

          // if it's a level 4, then set to default text
          if (level === 4) return editor.chain().focus().setParagraph().run()
          
          // for others set to heading
          editor
            .chain()
            .focus()
            .setHeading({level: level as Level})
            .run();
        }}
      >
        <SelectTrigger className="border-none">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">
            <Heading1 />
          </SelectItem>
          <SelectItem value="2">
            <Heading2 />
          </SelectItem>
          <SelectItem value="3">
            <Heading3 />
          </SelectItem>
          <SelectItem value="4">
            <Heading4 />
          </SelectItem>
          <SelectItem value="5">
            <Heading5 />
          </SelectItem>
          <SelectItem value="6">
            <Heading6 />
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};


export default HeadingSelection;