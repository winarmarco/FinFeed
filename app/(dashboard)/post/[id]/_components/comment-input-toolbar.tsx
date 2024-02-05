import ToolbarSection from "@/components/toolbar/ToolbarSection";
import HyperLink from "@/components/toolbar/toolbar-item/hyperlink";
import ImageUpload from "@/components/toolbar/toolbar-item/image-upload";
import Strike from "@/components/toolbar/toolbar-item/strike";
import TextDecoration from "@/components/toolbar/toolbar-item/text-decoration";
import { Editor } from "@tiptap/react";

interface CommentInputToolbarProps {
  editor: Editor | null;
}

const CommentInputToolbar: React.FC<CommentInputToolbarProps> = ({editor}) => {
  if (!editor) return null;

  return (
    <div className="flex flex-row divide-x-2">
      <ToolbarSection>
        <TextDecoration editor={editor} />
      </ToolbarSection>

      <ToolbarSection>
        <Strike editor={editor} />
        <HyperLink editor={editor} />
        <ImageUpload editor={editor} />
      </ToolbarSection>

      <div></div>
    </div>
  );
};

export default CommentInputToolbar;
