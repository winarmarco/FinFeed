import { Toggle } from "@/components/ui/toggle";
import {Editor} from "@tiptap/react";
import { Link } from "lucide-react";
import { useCallback } from "react";

interface HyperLinkProps {
  editor: Editor;
}

const HyperLink: React.FC<HyperLinkProps> = ({editor}) => {

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({href: url}).run();
  }, [editor]);

  return (
    <Toggle pressed={editor.isActive("link")} onPressedChange={setLink}>
      <Link />
    </Toggle>
  );
};


export default HyperLink;