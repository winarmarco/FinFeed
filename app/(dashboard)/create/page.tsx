"use client";

// import yahooFinance from "yahoo-finance2";
// import {useEditor, EditorContent, Editor} from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import TradeSuggestionForm from "@/app/(dashboard)/create/_components/trade-suggestion-form/trade-suggestion-form";
import TextEditor from "./_components/rich-text-editor/text-editor";
import { quotePriceSchema } from "@/server/model/quote.model";
import { generateHTML, generateJSON } from "@tiptap/react";
import { editorExtension } from "@/lib/constants";
import { trpc } from "@/_trpc/client";
import { computeSHA256, createFile, createFormData } from "@/server/utils";
import { uploadImageToS3 } from "@/server/router/service/s3/controller";
import { createPostSchema } from "@/server/model/post.model";
import { recursUploadImage } from "@/lib/upload-image-tiptap";

const CreatePostPage: React.FC<{}> = () => {
  const form = useForm<z.infer<typeof createPostSchema>>({
    defaultValues: {
      blog: "",
      tradeSuggestion: {},
    },
    resolver: zodResolver(createPostSchema),
  });
  const { mutateAsync: fileUploader } =
    trpc.services.s3.getSignedURL.useMutation();
  const { mutateAsync: createPost } = trpc.post.createPost.useMutation();
  const { errors } = form.formState;

  async function parseBlog(blogHTML: string) {
    // 1. convert to json,
    const blogJSON = generateJSON(blogHTML, editorExtension);

    // 2. for each image, upload to aws
    await recursUploadImage(blogJSON, fileUploader);

    // 3. convert docs to html, and attach to post
    const newBlogHTML = generateHTML(blogJSON, editorExtension);

    return newBlogHTML;
  }

  async function onSubmit(values: z.infer<typeof createPostSchema>) {
    values.blog = await parseBlog(values.blog);
    await createPost(values);
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="tradeSuggestion"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TradeSuggestionForm
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                {errors.tradeSuggestion && (
                  <span className="text-sm font-medium text-destructive">
                    {errors.tradeSuggestion.quote?.message ||
                      errors.tradeSuggestion.predictionPrice?.message ||
                      ""}
                  </span>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="blog"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextEditor onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePostPage;
