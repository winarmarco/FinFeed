import { AuthorProfile } from "@/app/(dashboard)/_components/feed-card/author-profile";
import { commentEditorExtension } from "@/lib/constants";
import { RouterOutput } from "@/server";
import { Editor, EditorContent, useEditor } from "@tiptap/react";

interface CommentViewProps {
  comment: RouterOutput["comments"]["getComments"][0];
}

export const CommentView: React.FC<CommentViewProps> = ({ comment }) => {
  const editor = useEditor({
    editable: false,
    extensions: commentEditorExtension,
    content: comment.message,
  });

  return (
    <div className="flex flex-col gap-y-4 py-8">
      <AuthorProfile author={comment.author} />
      <div className="pl-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
