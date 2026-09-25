"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Highlighter, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Link as LinkIcon, Image as ImageIcon, Video
} from 'lucide-react';
import { useCallback } from 'react';

import { CldUploadWidget } from 'next-cloudinary';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addYoutubeVideo = useCallback(() => {
    const url = window.prompt('Enter YouTube URL:')
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(window.prompt('Width?', '640') || '640', 10)),
        height: Math.max(180, parseInt(window.prompt('Height?', '480') || '480', 10)),
      })
    }
  }, [editor])

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-[#111118] border-b border-white/10 rounded-t-xl sticky top-0 z-10">
      <div className="flex gap-1 border-r border-white/10 pr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('bold') ? 'bg-white/20 text-my-primary' : 'text-gray-400'}`}
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('italic') ? 'bg-white/20 text-my-primary' : 'text-gray-400'}`}
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('underline') ? 'bg-white/20 text-my-primary' : 'text-gray-400'}`}
        >
          <UnderlineIcon size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('strike') ? 'bg-white/20 text-my-primary' : 'text-gray-400'}`}
        >
          <Strikethrough size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('highlight') ? 'bg-white/20 text-my-primary' : 'text-gray-400'}`}
        >
          <Highlighter size={16} />
        </button>
      </div>

      <div className="flex gap-1 border-r border-white/10 pr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-white/20 text-my-primary' : 'text-gray-400'}`}
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-white/20 text-my-primary' : 'text-gray-400'}`}
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-white/20 text-my-primary' : 'text-gray-400'}`}
        >
          <AlignRight size={16} />
        </button>
      </div>

      <div className="flex gap-1 border-r border-white/10 pr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('bulletList') ? 'bg-white/20 text-my-primary' : 'text-gray-400'}`}
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('orderedList') ? 'bg-white/20 text-my-primary' : 'text-gray-400'}`}
        >
          <ListOrdered size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('blockquote') ? 'bg-white/20 text-my-primary' : 'text-gray-400'}`}
        >
          <Quote size={16} />
        </button>
      </div>

      <div className="flex gap-1 border-r border-white/10 pr-2">
        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('link') ? 'bg-white/20 text-my-primary' : 'text-gray-400'}`}
        >
          <LinkIcon size={16} />
        </button>
        <CldUploadWidget 
          uploadPreset="flamo_blog"
          onSuccess={(result: any) => {
            if (result?.info?.secure_url) {
              editor.chain().focus().setImage({ src: result.info.secure_url }).run();
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="p-2 rounded hover:bg-white/10 transition-colors text-gray-400"
            >
              <ImageIcon size={16} />
            </button>
          )}
        </CldUploadWidget>
        <button
          type="button"
          onClick={addYoutubeVideo}
          className="p-2 rounded hover:bg-white/10 transition-colors text-gray-400"
        >
          <Video size={16} />
        </button>
      </div>

      <div className="flex items-center gap-2 pl-2">
        <input
          type="color"
          onInput={event => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
          value={editor.getAttributes('textStyle').color || '#ffffff'}
          className="w-8 h-8 rounded border border-white/10 bg-transparent cursor-pointer"
        />
        <span className="text-xs text-gray-400">Color</span>
      </div>
    </div>
  )
}

export default function TipTapEditor({ 
  content, 
  onChange 
}: { 
  content: string, 
  onChange: (html: string) => void 
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Image,
      Youtube.configure({ inline: false }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] p-6 text-gray-200'
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  return (
    <div className="border border-white/10 rounded-xl bg-black/40 overflow-hidden shadow-inner">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
