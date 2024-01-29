"use client";

// import yahooFinance from "yahoo-finance2";
// import {useEditor, EditorContent, Editor} from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
// import {Label} from "@radix-ui/react-label";
// import Toolbar from "./components/rich-text-editor/toolbar/toolbar";
// import TextEditor from "./components/rich-text-editor/text-editor";
// import CallCard from "@/components/call-card";
import CallCardForm from "@/app/(dashboard)/create/components/trade-suggestion-form/trade-suggestion-form";
import {useForm, SubmitHandler} from "react-hook-form";

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import CallCard from "@/components/trade-suggestion-card";
import TradingSuggestion from "@/components/trade-suggestion-card";
import TradeSuggestionForm from "@/app/(dashboard)/create/components/trade-suggestion-form/trade-suggestion-form";
import TextEditor from "./components/rich-text-editor/text-editor";
import { trpc } from "@/_trpc/client";

const formSchema = z.object({
  blog: z
    .string()
    .min(5, {message: "Not long enough"})
});

type FormSchema = z.infer<typeof formSchema>;

const CreatePostPage: React.FC<{}> = () => {
  const form = useForm<FormSchema>({
    mode: "onChange",
    defaultValues: {
      blog: ""
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    // 1. convert to json, 
    
    // 2. for each image, upload to aws

    // 3. get image urls, and assign to docs

    // 4. convert docs to html, and attach to post
    
    // 5. upload post to mongodb


    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  

  return (
    <div className="flex flex-col gap-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="blog"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <TradeSuggestionForm />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="blog"
            render={({field}) => (
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
