import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import { Image } from "lucide-react";
import { useState } from "react";

interface ImageUploadProps {
  editor: Editor;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ editor }) => {

  // const setImage = () => {
  //   const url = window.prompt("URL");

  //   if (url) {
  //     editor.chain().focus().setImage({ src: url }).run();
  //   }
  // };

  return (
    <>
      <Toggle pressed={editor.isActive("link")}>
        <Label htmlFor="image">
          <Image />
        </Label>
        <Input
          id="image"
          type="file"
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;

            if (!files) return;

            const filePath = URL.createObjectURL(files[0]);            
            editor.chain().focus().setImage({ src: filePath }).run();
            
          }}
        />
      </Toggle>
    </>
  );
};

export default ImageUpload;

// const ImageUpload: React.FC<ImageUploadProps> = () => {
//   return {
//      <>
//   <Label htmlFor="image"
//     className={cn(toggleVariants())}
//   >
//     <Image />
//   </Label>
//   <Input id="image" type="file" className="hidden" onChange={(e) => {
//       const files = e.target.files;

//       if (!files) return;

//       const filePath = URL.createObjectURL(files[0])

//       console.log(filePath);

//       editor.chain().focus().setImage({ src: filePath }).run()
//   }}/>
//   </>
// }
