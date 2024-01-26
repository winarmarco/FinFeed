
import yahooFinance from 'yahoo-finance2';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import Toolbar from './components/rich-text-editor/toolbar/toolbar';
import TextEditor from './components/rich-text-editor/text-editor';
import CallCard from '@/components/call-card';
import CallCardForm from '@/components/call-card-form/call-card-form';




const CreatePostPage: React.FC<{}> = async () => {
  // const res = await yahooFinance.search("AA");

  // console.log(res);

  
  return (
    <div className="flex flex-col gap-y-4">
      <CallCardForm symbol="$BTC/USD" initialPrice={3000} predictionPrice={5000}/>
      <TextEditor />
    </div>
  )
}

export default CreatePostPage;