"use client";
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import { RichTextEditor as MantineRichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { Palette } from "lucide-react";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const RichTextEditor = forwardRef(
    ({ value, onChange }: RichTextEditorProps, ref) => {
        const editor = useEditor({
            extensions: [
                StarterKit,
                Underline,
                Link,
                Superscript,
                SubScript,
                Highlight,
                TextAlign.configure({ types: ["heading", "paragraph"] }),
                Color,
                TextStyle,
            ],

            content: value,
            onUpdate: ({ editor }) => {
                onChange(editor.getHTML());
            },
        });

        useEffect(() => {
            if (editor && editor.getHTML() !== value) {
                editor.commands.setContent(value);
            }
        }, [value, editor]);

        useImperativeHandle(ref, () => ({
            insertTextAtCursor: (text: string) => {
                if (editor) {
                    editor.chain().focus().insertContent(text).run();
                }
            },
        }));
        console.log(value);
        return (
            <MantineRichTextEditor
                editor={editor}
                mih={400}
                style={{
                    fontFamily: "FlaviusUniversal",
                    fontSize: 20,
                }}
            >
                <MantineRichTextEditor.Toolbar>
                    <MantineRichTextEditor.ColorPicker
                        colors={[
                            "#25262b",
                            "#868e96",
                            "#fa5252",
                            "#e64980",
                            "#be4bdb",
                            "#7950f2",
                            "#4c6ef5",
                            "#228be6",
                            "#15aabf",
                            "#12b886",
                            "#40c057",
                            "#82c91e",
                            "#fab005",
                            "#fd7e14",
                        ]}
                    />

                    <MantineRichTextEditor.ControlsGroup>
                        <MantineRichTextEditor.Color color="#F03E3E" />
                        <MantineRichTextEditor.Color color="#7048E8" />
                        <MantineRichTextEditor.Color color="#1098AD" />
                        <MantineRichTextEditor.Color color="#37B24D" />
                        <MantineRichTextEditor.Color color="#F59F00" />
                        <MantineRichTextEditor.Color color="yellow" />
                    </MantineRichTextEditor.ControlsGroup>
                    <MantineRichTextEditor.ControlsGroup>
                        <MantineRichTextEditor.H1 />
                        <MantineRichTextEditor.H2 />
                        <MantineRichTextEditor.H3 />
                        <MantineRichTextEditor.H4 />
                    </MantineRichTextEditor.ControlsGroup>
                    <MantineRichTextEditor.ControlsGroup>
                        <MantineRichTextEditor.Bold />
                        <MantineRichTextEditor.Italic />
                        <MantineRichTextEditor.Underline />
                        <MantineRichTextEditor.Strikethrough />
                        <MantineRichTextEditor.ClearFormatting />
                        <MantineRichTextEditor.Highlight />
                        <MantineRichTextEditor.Code />
                    </MantineRichTextEditor.ControlsGroup>
                    <MantineRichTextEditor.ControlsGroup>
                        <MantineRichTextEditor.AlignLeft />
                        <MantineRichTextEditor.AlignCenter />
                        <MantineRichTextEditor.AlignJustify />
                        <MantineRichTextEditor.AlignRight />
                    </MantineRichTextEditor.ControlsGroup>
                    <MantineRichTextEditor.ControlsGroup>
                        <MantineRichTextEditor.Blockquote />
                        <MantineRichTextEditor.Hr />
                        <MantineRichTextEditor.BulletList />
                        <MantineRichTextEditor.OrderedList />
                        <MantineRichTextEditor.Subscript />
                        <MantineRichTextEditor.Superscript />
                    </MantineRichTextEditor.ControlsGroup>
                    <MantineRichTextEditor.ControlsGroup>
                        <MantineRichTextEditor.Undo />
                        <MantineRichTextEditor.Redo />
                    </MantineRichTextEditor.ControlsGroup>
                </MantineRichTextEditor.Toolbar>
                <MantineRichTextEditor.Content />
            </MantineRichTextEditor>
        );
    }
);

export default RichTextEditor;
