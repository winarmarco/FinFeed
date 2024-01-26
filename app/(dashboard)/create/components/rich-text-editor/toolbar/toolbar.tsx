import {Editor} from "@tiptap/react";
import TextDecoration from "./toolbar-item/text-decoration";
import HeadingSelection from "./toolbar-item/heading-selection";
import HyperLink from "./toolbar-item/hyperlink";
import ImageUpload from "./toolbar-item/image-upload";
import Strike from "./toolbar-item/strike";
import TextListOrder from "./toolbar-item/text-list-order";
import ToolbarSection from "./ToolbarSection";

const Toolbar: React.FC<{editor: Editor | null}> = ({editor}) => {
  if (!editor) return null;

  return (
    <div className="flex flex-row border border-gray-300 bg-transparent rounded-md px-1 py-1 divide-x divide-gray-300">
      <ToolbarSection>
        <HeadingSelection editor={editor} />
      </ToolbarSection>

      <ToolbarSection>
        <TextDecoration editor={editor} />
      </ToolbarSection>

      <ToolbarSection>
        <Strike editor={editor} />
        <HyperLink editor={editor} />
        <ImageUpload editor={editor} />
      </ToolbarSection>

      <ToolbarSection>
        <TextListOrder editor={editor}/>
      </ToolbarSection>
    </div>
  );
};

export default Toolbar;
