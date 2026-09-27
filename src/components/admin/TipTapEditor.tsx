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

// New Enterprise Extensions
import { Superscript } from '@tiptap/extension-superscript';
import { Subscript } from '@tiptap/extension-subscript';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';

import { Mention } from '@tiptap/extension-mention';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';
import { MentionList } from './MentionList';
import MathExtension from '@aarkue/tiptap-math-extension';
import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.min.css';

const lowlight = createLowlight(common);

const suggestion = {
  items: ({ query }: { query: string }) => {
    return [
      'admin',
      'developer',
      'editor',
      'designer',
      'guest'
    ].filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
  },
  render: () => {
    let component: any
    let popup: any

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) return

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },
      onUpdate(props: any) {
        component.updateProps(props)

        if (!props.clientRect) return

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },
      onKeyDown(props: any) {
        if (props.event.key === 'Escape') {
          popup[0].hide()
          return true
        }
        return component.ref?.onKeyDown(props)
      },
      onExit() {
        if (popup && popup[0]) {
          popup[0].destroy()
        }
        if (component) {
          component.destroy()
        }
      },
    }
  },
}

import { useCallback, useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

const PRESET_COLORS = [
  '#ffffff', '#f87171', '#fb923c', '#fbbf24', '#a3e635', '#4ade80', '#34d399', '#2dd4bf', 
  '#e5e7eb', '#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6', 
  '#9ca3af', '#b91c1c', '#c2410c', '#a16207', '#4d7c0f', '#15803d', '#047857', '#0f766e', 
  '#4b5563', '#7f1d1d', '#7c2d12', '#713f12', '#3f6212', '#14532d', '#064e3b', '#134e4a',
  '#000000', '#38bdf8', '#818cf8', '#a78bfa', '#e879f9', '#f472b6', '#fb7185', '#e11d48'
];

const TooltipButton = ({ onClick, disabled, isActive, title, iconClass, children }: any) => (
  <div className="relative group flex items-center justify-center">
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2 w-9 h-9 flex items-center justify-center rounded hover:bg-white/10 transition-colors ${disabled ? 'opacity-30 cursor-not-allowed' : ''} ${isActive ? 'bg-white/20 text-my-primary shadow-inner' : 'text-gray-400'}`}
    >
      {iconClass ? <i className={`${iconClass} text-[18px]`}></i> : children}
    </button>
    <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[11px] font-medium tracking-wide px-2.5 py-1.5 rounded-md shadow-xl border border-white/10 z-50 pointer-events-none whitespace-nowrap">
      {title}
    </div>
  </div>
);

const MenuBar = ({ editor }: { editor: any }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const addYoutubeVideo = useCallback(() => {
    if (!editor) return;
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
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-2 p-3 bg-[#111118] border-b border-white/10 rounded-t-xl sticky top-0 z-10 shadow-lg">
      <div className="flex flex-wrap gap-1.5">
        
        {/* History */}
        <TooltipButton title="Undo" iconClass="bx bx-undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} />
        <TooltipButton title="Redo" iconClass="bx bx-redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} />
        <div className="w-[1px] h-6 bg-white/10 mx-1 self-center hidden sm:block" />

        {/* Headings */}
        <TooltipButton title="Heading 1" iconClass="bx bx-heading" isActive={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            <span className="text-xs absolute bottom-1 right-1 font-bold">1</span>
        </TooltipButton>
        <TooltipButton title="Heading 2" iconClass="bx bx-heading" isActive={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <span className="text-xs absolute bottom-1 right-1 font-bold">2</span>
        </TooltipButton>
        <TooltipButton title="Heading 3" iconClass="bx bx-heading" isActive={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            <span className="text-xs absolute bottom-1 right-1 font-bold">3</span>
        </TooltipButton>
        <div className="w-[1px] h-6 bg-white/10 mx-1 self-center hidden sm:block" />

        {/* Formatting */}
        <TooltipButton title="Bold" iconClass="bx bx-bold" isActive={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} />
        <TooltipButton title="Italic" iconClass="bx bx-italic" isActive={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} />
        <TooltipButton title="Underline" iconClass="bx bx-underline" isActive={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} />
        <TooltipButton title="Strikethrough" iconClass="bx bx-strikethrough" isActive={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} />
        <TooltipButton title="Highlight" iconClass="bx bx-highlight" isActive={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()} />
        <TooltipButton title="Superscript" isActive={editor.isActive('superscript')} onClick={() => editor.chain().focus().toggleSuperscript().run()}>
            <span className="font-serif text-[15px]">x<sup className="text-[10px]">2</sup></span>
        </TooltipButton>
        <TooltipButton title="Subscript" isActive={editor.isActive('subscript')} onClick={() => editor.chain().focus().toggleSubscript().run()}>
            <span className="font-serif text-[15px]">x<sub className="text-[10px]">2</sub></span>
        </TooltipButton>
        <TooltipButton title="Clear Formatting" iconClass="bx bx-eraser" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} />
        <div className="w-[1px] h-6 bg-white/10 mx-1 self-center hidden sm:block" />

        {/* Alignment */}
        <TooltipButton title="Align Left" iconClass="bx bx-align-left" isActive={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} />
        <TooltipButton title="Align Center" iconClass="bx bx-align-middle" isActive={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} />
        <TooltipButton title="Align Right" iconClass="bx bx-align-right" isActive={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} />
        <TooltipButton title="Justify" iconClass="bx bx-align-justify" isActive={editor.isActive({ textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()} />
        <div className="w-[1px] h-6 bg-white/10 mx-1 self-center hidden sm:block" />

        {/* Lists & Blocks */}
        <TooltipButton title="Bullet List" iconClass="bx bx-list-ul" isActive={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} />
        <TooltipButton title="Numbered List" iconClass="bx bx-list-ol" isActive={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
        <TooltipButton title="Task List" iconClass="bx bx-check-square" isActive={editor.isActive('taskList')} onClick={() => editor.chain().focus().toggleTaskList().run()} />
        <TooltipButton title="Blockquote" iconClass="bx bxs-quote-alt-left" isActive={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
        <TooltipButton title="Inline Code" iconClass="bx bx-code" isActive={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()} />
        <TooltipButton title="Code Block" iconClass="bx bx-code-block" isActive={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()} />
        <TooltipButton title="Math/LaTeX" isActive={editor.isActive('math')} onClick={() => editor.chain().focus().insertContent('$$  $$').run()}>
          <span className="font-serif text-[18px] font-bold leading-none">∑</span>
        </TooltipButton>
        <TooltipButton title="Horizontal Rule" iconClass="bx bx-minus" onClick={() => editor.chain().focus().setHorizontalRule().run()} />
        <div className="w-[1px] h-6 bg-white/10 mx-1 self-center hidden sm:block" />

        {/* Tables */}
        <TooltipButton title="Insert Table" iconClass="bx bx-table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} />
        <TooltipButton title="Delete Table" iconClass="bx bx-trash" onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.can().deleteTable()} />
        <TooltipButton title="Add Row After" iconClass="bx bx-layer-plus" onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!editor.can().addRowAfter()} />
        <TooltipButton title="Delete Row" iconClass="bx bx-layer-minus" onClick={() => editor.chain().focus().deleteRow().run()} disabled={!editor.can().deleteRow()} />
        <TooltipButton title="Add Column After" iconClass="bx bx-border-right" onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.can().addColumnAfter()} />
        <TooltipButton title="Delete Column" iconClass="bx bx-border-none" onClick={() => editor.chain().focus().deleteColumn().run()} disabled={!editor.can().deleteColumn()} />
        <div className="w-[1px] h-6 bg-white/10 mx-1 self-center hidden sm:block" />

        {/* Media & Links */}
        <TooltipButton title="Add Link" iconClass="bx bx-link" isActive={editor.isActive('link')} onClick={setLink} />
        
        <CldUploadWidget 
          uploadPreset="flamo_blog"
          onSuccess={(result: any) => {
            if (result?.info?.secure_url) {
              editor.chain().focus().setImage({ src: result.info.secure_url }).run();
            }
          }}
        >
          {({ open }) => (
            <div className="relative group flex items-center justify-center">
              <button
                type="button"
                onClick={() => open()}
                className="p-2 w-9 h-9 flex items-center justify-center rounded hover:bg-white/10 transition-colors text-gray-400"
              >
                <i className="bx bx-image text-[18px]"></i>
              </button>
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[11px] font-medium tracking-wide px-2.5 py-1.5 rounded-md shadow-xl border border-white/10 z-50 pointer-events-none whitespace-nowrap">
                Upload Image
              </div>
            </div>
          )}
        </CldUploadWidget>

        <TooltipButton title="Embed YouTube Video" iconClass="bx bxl-youtube" onClick={addYoutubeVideo} />
        <div className="w-[1px] h-6 bg-white/10 mx-1 self-center hidden sm:block" />

        {/* Color Picker */}
        {/* Color Picker */}
        <div className="relative group">
          <button
            type="button"
            onClick={() => setShowColorPicker(true)}
            className="w-9 h-9 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
          >
            <div 
              className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
              style={{ backgroundColor: editor.getAttributes('textStyle').color || '#ffffff' }}
            />
          </button>
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[11px] font-medium tracking-wide px-2.5 py-1.5 rounded-md shadow-xl border border-white/10 z-50 pointer-events-none whitespace-nowrap">
            Text Color
          </div>
        </div>

        {/* Centered Color Picker Modal */}
        {showColorPicker && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#1e1e24] border border-white/10 rounded-2xl shadow-2xl p-5 flex flex-col gap-4 w-[280px] sm:w-[320px] max-w-full">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-white/90">Choose Color</h3>
                <button 
                  onClick={() => setShowColorPicker(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10"
                >
                  <i className="bx bx-x text-xl"></i>
                </button>
              </div>

              <div className="grid grid-cols-8 gap-2">
                {PRESET_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => {
                      editor.chain().focus().setColor(color).run();
                      setShowColorPicker(false);
                    }}
                    className={`aspect-square w-full rounded-full border border-white/20 hover:scale-110 transition-transform ${editor.isActive('textStyle', { color }) ? 'ring-2 ring-my-primary ring-offset-2 ring-offset-[#1e1e24]' : ''}`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              
              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                <button
                  onClick={() => {
                    editor.chain().focus().unsetColor().run();
                    setShowColorPicker(false);
                  }}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                >
                  Clear Color
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-medium">Custom:</span>
                  <input
                    type="color"
                    onInput={event => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
                    value={editor.getAttributes('textStyle').color || '#ffffff'}
                    className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

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
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Image,
      Youtube.configure({ inline: false }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Superscript,
      Subscript,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({ nested: true }),
      Mention.configure({
        HTMLAttributes: {
          class: 'mention bg-my-primary/20 text-my-primary px-1 py-0.5 rounded-md font-bold',
        },
        suggestion,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      MathExtension,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] p-6 text-gray-200'
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  return (
    <div className="border border-white/10 rounded-xl bg-black/40 shadow-2xl focus-within:border-my-primary/50 transition-colors relative z-0">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
