"use client";

// src/Tiptap.tsx
import {
  useEditor,
  EditorContent,
  Editor,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Paragraph from "@tiptap/extension-paragraph";
import { Toggle } from "./ui/toggle";
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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ReactNode, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// editorProps lets me customize the HTML element that Tiptap creates for the editor.
// I add Tailwind’s prose classes so my editor text looks beautiful — with proper heading sizes, spacing, lists, blockquotes, and typography. Without this, the editor looks plain and unstyled

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
      // disable default paragraph from StarterKit and replace with custom
      StarterKit.configure({ paragraph: false }),
      CustomParagraph,
      Highlight.configure({ multicolor: true }),
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
    }
  }, [content, editor]);

  return (
    <div className="bg-background max-w-screen relative md:rounded-xl border ">
      {editor && (
        <>
          <ToolBar editor={editor} />
          {/* <BubbleMenu editor={editor} /> */}
          {/* <FloatingMenu editor={editor} /> */}
        </>
      )}
      <EditorContent editor={editor} className="min-h-120 px-4 py-3" />
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
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

  const handleSetLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setIsLinkPopoverOpen(false);
    setLinkUrl("");
  };

  return (
    <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      {/* // this is the main */}
      {/* trigger point */}
      <PopoverContent className="w-80 p-4">
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">Insert Link</h3>
          <Input
            placeholder="https://example.com"
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSetLink();
              }
            }}
          />
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setIsLinkPopoverOpen(false)}
            >
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
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        iamThapa: ctx.editor.isActive("underline") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        isHighlight: ctx.editor.isActive("highlight") ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isLink: ctx.editor.isActive("link") ?? false,
        canRedo: editor.can().redo(),
        canUndo: editor.can().undo(),
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
      };
    },
  });

  const handleHeadingChange = (value: string) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = Number.parseInt(value.replace("heading", "")) as 1 | 2 | 3;
      editor.chain().focus().setHeading({ level }).run();
    }
  };

  return (
    <div
      className={
        "bg-background sticky top-0 z-10 flex justify-end md:justify-between items-center flex-wrap rounded-t-xl gap-1 border-b px-4 p-2"
      }
    >
      <div className="flex items-center w-full md:w-auto justify-between">
        <Select
          onValueChange={handleHeadingChange}
          value={
            editorState.isHeading2
              ? "heading2"
              : editorState.isHeading3
                ? "heading3"
                : "paragraph"
          }
        >
          <SelectTrigger className="w-20">
            <SelectValue placeholder="Paragraph" />
          </SelectTrigger>
          <SelectContent className="mt-8 ml-2">
            <SelectItem value="paragraph">Text</SelectItem>
            <SelectItem value="heading1">H1 heading 1</SelectItem>
            <SelectItem value="heading2">H2 heading 2</SelectItem>
            <SelectItem value="heading3">H3 heading 3</SelectItem>
          </SelectContent>
        </Select>

        <Toggle
          size="sm"
          pressed={editorState.isBold}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Toggle bold"
        >
          <BoldIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editorState.isItalic}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Toggle bold"
        >
          <ItalicIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editorState.iamThapa}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Toggle underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editorState.isStrike}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Toggle strikethrough"
        >
          <StrikethroughIcon className="h-4 w-4" />
        </Toggle>
        <div className="bg-border hidden md:flex mx-1 h-6 w-px" />

        <Toggle
          size="sm"
          pressed={editorState.isCode}
          onPressedChange={() => editor.chain().focus().toggleCode().run()}
          aria-label="Toggle code"
        >
          <CodeIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editorState.isBulletList}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          aria-label="Toggle bullet list"
        >
          <ListIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editorState.isOrderedList}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          aria-label="Toggle ordered list"
        >
          <ListOrderedIcon className="h-4 w-4" />
        </Toggle>

        <div className="bg-border hidden md:flex mx-1 h-6 w-px" />
        <Toggle
          size="sm"
          pressed={editorState.isHighlight}
          onPressedChange={() =>
            editor.chain().focus().toggleHighlight({ color: "#fdeb80" }).run()
          }
          aria-label="Toggle highlight"
        >
          <HighlighterIcon className="h-4 w-4" />
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
            <Toggle size="sm" aria-label="Toggle link">
              <LinkIcon className="h-4 w-4" />
            </Toggle>
          </LinkComponent>
        )}
      </div>

      <div className="flex items-center">
        {" "}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          aria-label="Undo"
        >
          <UndoIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          aria-label="Redo"
        >
          <RedoIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={copied ? "secondary" : "ghost"}
          onClick={async () => {
            const text = editor.getText();
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          aria-label={copied ? "Copied" : "Copy text"}
        >
          <ClipboardList className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
