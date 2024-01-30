import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

export const editorExtension = [
  StarterKit,
  Underline,
  Link.configure({
    openOnClick: true,
    autolink: true,
  }),
  Image,
];
