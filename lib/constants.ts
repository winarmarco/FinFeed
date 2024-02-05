import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

export const editorExtension = [
  StarterKit,
  Underline,
  Link.configure({
    openOnClick: true,
    autolink: true,
  }),
  Image.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
      };
    },
  }),
];

export const commentEditorExtension = [
  StarterKit,
  Underline,
  Link.configure({
    openOnClick: true,
    autolink: true,
  }),
  Image.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
      };
    },
  }),
  Placeholder.configure({
    placeholder: "Write something",
  }),
];
