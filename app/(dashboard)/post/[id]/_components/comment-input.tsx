import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Placeholder from "@tiptap/extension-placeholder";
import { commentEditorExtension, editorExtension } from "@/lib/constants";
import {
  EditorContent,
  generateHTML,
  generateJSON,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CommentInputToolbar from "./comment-input-toolbar";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { recursUploadImage } from "@/lib/upload-image-tiptap";
import { trpc } from "@/_trpc/client";

interface CommentInputProps {
  postId: string;
}

const commentSchema = z.object({
  comment: z.string({ required_error: "Comment is required" }),
});

const CommentInput: React.FC<CommentInputProps> = ({ postId }) => {
  const trpcUtils = trpc.useUtils();
  const { mutateAsync: fileUploader } =
    trpc.services.s3.getSignedURL.useMutation();
  const { mutateAsync: createComment } =
    trpc.comments.createComment.useMutation({
      onSuccess: async () => {
        await trpcUtils.comments.getComments.invalidate()
        form.setValue("comment", "");
      }
    });
  const form = useForm<z.infer<typeof commentSchema>>({
    defaultValues: {
      comment: "",
    },
    resolver: zodResolver(commentSchema),
  });

  const editor = useEditor({
    extensions: commentEditorExtension,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] h-full w-full bg-background px-4 py-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder",
      },
    },
    content: "",
    onUpdate: ({ editor }) => {
      form.setValue("comment", editor.getHTML());
    },
  });

  const submitHandler = async (value: z.infer<typeof commentSchema>) => {
    const commentHTML = value.comment;

    // 1. convert to json,
    const commentJSON = generateJSON(commentHTML, commentEditorExtension);

    // 2. for each image, upload to aws
    await recursUploadImage(commentJSON, fileUploader);

    // 3. convert docs to html, and attach to values.comment
    value.comment = generateHTML(commentJSON, editorExtension);

    await createComment({
      message: value.comment,
      postId: postId,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <EditorContent editor={editor} />
                  <div className="flex flex-row justify-between py-2">
                    <CommentInputToolbar editor={editor} />
                    <Button
                      type="submit"
                      className="mr-4 bg-green-400 text-white"
                    >
                      <SendHorizontal />
                    </Button>
                  </div>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CommentInput;
