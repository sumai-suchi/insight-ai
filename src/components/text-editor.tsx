"use client";

import {
  useEditor,
  EditorContent,
  Editor,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Paragraph from "@tiptap/extension-paragraph";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import { Toggle } from "./ui/toggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  BoldIcon,
  ClipboardList,
  CodeIcon,
  HighlighterIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
  UnlinkIcon,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { ReactNode, useEffect, useState } from "react";

const Tiptap = ({
  content,
  onChange,
}: {
  content?: string;
  onChange?: (content: string) => void;
}) => {
  // create a custom paragraph extension that outputs a <div> instead of <p>
  const CustomParagraph = Paragraph.extend({
    renderHTML() {
      return ["div", 0];
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base focus:outline-none max-w-none",
      },
    },
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && typeof content === "string") {
      editor.commands.setContent(content, {
        parseOptions: { preserveWhitespace: false },
      });
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="bg-background relative border md:rounded-xl">
      {editor && <ToolBar editor={editor} />}
      <EditorContent editor={editor} className="min-h-[300px] px-4 py-3" />
    </div>
  );
};

export default Tiptap;

function LinkComponent({
  editor,
  children,
}: {
  editor: Editor;
  children: ReactNode;
}) {
  const [linkUrl, setLinkUrl] = useState("");
  const [open, setOpen] = useState(false);

  const handleSetLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().unsetLink().run();
    }

    setLinkUrl("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>

      <PopoverContent className="w-80 p-4">
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">Insert Link</h3>

          <Input
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSetLink();
            }}
          />

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleSetLink}>Save</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const ToolBar = ({ editor }: { editor: Editor }) => {
  const [copied, setCopied] = useState(false);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isUnderline: ctx.editor.isActive("underline"),
      isStrike: ctx.editor.isActive("strike"),
      isCode: ctx.editor.isActive("code"),
      isHighlight: ctx.editor.isActive("highlight"),
      isBulletList: ctx.editor.isActive("bulletList"),
      isOrderedList: ctx.editor.isActive("orderedList"),
      isBlockquote: ctx.editor.isActive("blockquote"),
      isLink: ctx.editor.isActive("link"),

      isHeading1: ctx.editor.isActive("heading", { level: 1 }),
      isHeading2: ctx.editor.isActive("heading", { level: 2 }),
      isHeading3: ctx.editor.isActive("heading", { level: 3 }),
      isHeading4: ctx.editor.isActive("heading", { level: 4 }),
      isHeading5: ctx.editor.isActive("heading", { level: 5 }),
      isHeading6: ctx.editor.isActive("heading", { level: 6 }),

      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  });

  const handleHeadingChange = (value: string) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = Number(value.replace("heading", "")) as
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6;

      editor.chain().focus().setHeading({ level }).run();
    }
  };

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b bg-background px-4 py-2">
      <Select onValueChange={handleHeadingChange}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Paragraph" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          <SelectItem value="heading1">Heading 1</SelectItem>
          <SelectItem value="heading2">Heading 2</SelectItem>
          <SelectItem value="heading3">Heading 3</SelectItem>
          <SelectItem value="heading4">Heading 4</SelectItem>
          <SelectItem value="heading5">Heading 5</SelectItem>
          <SelectItem value="heading6">Heading 6</SelectItem>
        </SelectContent>
      </Select>

      <Toggle
        size="sm"
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isHighlight}
        onPressedChange={() =>
          editor.chain().focus().toggleHighlight({ color: "#fdeb80" }).run()
        }
      >
        <HighlighterIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
      >
        <CodeIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isBulletList}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isOrderedList}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrderedIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Toggle>

      {editorState.isLink ? (
        <Toggle
          pressed
          onPressedChange={() =>
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
          }
        >
          <UnlinkIcon className="h-4 w-4" />
        </Toggle>
      ) : (
        <LinkComponent editor={editor}>
          <Toggle size="sm">
            <LinkIcon className="h-4 w-4" />
          </Toggle>
        </LinkComponent>
      )}

      <Button
        size="sm"
        variant="ghost"
        disabled={!editorState.canUndo}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <UndoIcon className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        disabled={!editorState.canRedo}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <RedoIcon className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant={copied ? "secondary" : "ghost"}
        onClick={async () => {
          const text = editor.getText();
          await navigator.clipboard.writeText(text);

          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        <ClipboardList className="h-4 w-4" />
      </Button>
    </div>
  );
};
