import * as z from "zod";
import { tradeSuggestionSchema } from "./trade-suggestion.model";

export const createPostSchema = z.object({
  blog: z.string().min(0, { message: "Not long enough" }),
  tradeSuggestion: tradeSuggestionSchema,
});
