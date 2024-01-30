"use client";

// import yahooFinance from "yahoo-finance2";
// import {useEditor, EditorContent, Editor} from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import {Label} from "@radix-ui/react-label";
// import Toolbar from "./components/rich-text-editor/toolbar/toolbar";
// import TextEditor from "./components/rich-text-editor/text-editor";
// import CallCard from "@/components/call-card";
import CallCardForm from "@/app/(dashboard)/create/components/trade-suggestion-form/trade-suggestion-form";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CallCard from "@/components/trade-suggestion-card";
import TradingSuggestion from "@/components/trade-suggestion-card";
import TradeSuggestionForm from "@/app/(dashboard)/create/components/trade-suggestion-form/trade-suggestion-form";
import TextEditor from "./components/rich-text-editor/text-editor";
import { quotePriceSchema } from "@/server/model/quote.model";
import { generateJSON } from "@tiptap/react";
import { editorExtension } from "@/lib/constants";

export const tradeSuggestionFormSchema = z.object({
  quote: z.object(quotePriceSchema.shape, {
    required_error: "Quote is required",
  }),
  predictionPrice: z.number({
    required_error: "Prediction price is required",
  }),
});

export type ITradeSuggestion = z.infer<typeof tradeSuggestionFormSchema>;

const formSchema = z.object({
  blog: z.string().min(0, { message: "Not long enough" }),
  tradeSuggestion: tradeSuggestionFormSchema,
});

type FormSchema = z.infer<typeof formSchema>;

const CreatePostPage: React.FC<{}> = () => {
  const form = useForm<FormSchema>({
    // defaultValues: {
    //   blog: "",
    //   tradeSuggestion: {},
    // },
    defaultValues: {
      tradeSuggestion: {
        predictionPrice: 45000,
        quote: {
          currency: "USD",
          longName: "Bitcoin USD",
          percentChange: 3.0346057,
          price: 43365.8,
          shortName: "Bitcoin USD",
          symbol: "BTC-USD",
        },
      },
      blog: ""
    },
    resolver: zodResolver(formSchema),
  });

  const { errors } = form.formState;

  function recursUploadImage(obj : Record<string, any>) {
  
    if (obj["content"] && Array.isArray(obj["content"])) {
      for (let content of obj["content"]) {
        recursUploadImage(content);
      }
    } else {
      if (obj["type"] === "image") {
        // uploadImage
      }
    }
  }


  function parseBlog(blog: string) {
    // 1. convert to json,
    const blogJSON = generateJSON(blog, editorExtension);

    // 2. for each image, upload to aws
    recursUploadImage(blogJSON);



    // 3. convert docs to html, and attach to post

    // 4. upload post to mongodb

    // Do something with the form values.
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    parseBlog(values.blog);
    console.log(values);
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
