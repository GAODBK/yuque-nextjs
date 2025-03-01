// src/components/tiptap/item/BarItems.tsx
import {RichTextEditor} from "@mantine/tiptap";

// import CodeBarItem from "@/components/tiptap/bar/item/CodeBarItem";
import FontHighLightBarItem from "@/components/tiptap/item/FontHighLightBarItem";
import {FileIcon, House} from "lucide-react";
import TableBarItem from "@/components/tiptap/item/TableBarItem";
import FontColorBarItem from "@/components/tiptap/item/FontColorBarItem";
import ImageBarItem from "@/components/tiptap/item/ImageBarItem";
import VideoBarItem from "@/components/tiptap/item/VideoBarItem";
import EmojiPickerBarItem from "@/components/tiptap/item/EmojiPickerBarItem";
import MathButton from "@/components/tiptap/item/MathButton";
import FontSizeBarItem from "@/components/tiptap/item/FontSizeBarItem";
import {useRouter} from "next/navigation";
import {addFileLinkWrapper} from "@/lib/utils";
import DrawioBarItem from "@/components/tiptap/item/DrawioBarItem";
import ExcalidrawBarItem from "@/components/tiptap/item/ExcalidrawBarItem";

// @ts-ignore
const BarItems = ({editor, isBubble = false, isFloat = false}) => {
    const route = useRouter()

    return (
        <>
            <RichTextEditor.ControlsGroup>
                <RichTextEditor.Control
                >
                    <button
                        className="px-2"
                        // className="p-2 bg-blue-500 text-white rounded-md"
                        onClick={() => {
                            route.push('/')
                        }}
                    >
                        <House className={'size-4'}/>
                    </button>
                </RichTextEditor.Control>

                <RichTextEditor.Bold/>
                <RichTextEditor.Italic/>
                <RichTextEditor.Underline/>
                <RichTextEditor.Strikethrough/>
                <RichTextEditor.ClearFormatting/>
                {/*<RichTextEditor.Highlight />*/}
                <RichTextEditor.Control
                    // onClick={() => editor?.commands.insertContent('⭐')}
                    // aria-label="Insert star emoji"
                    // title="Insert star emoji"
                >
                    <FontHighLightBarItem size={'sm'}/>
                </RichTextEditor.Control>
                <RichTextEditor.Control
                >
                    <FontColorBarItem size={'sm'}/>
                </RichTextEditor.Control>
                {/*<RichTextEditor.Code />*/}
                <RichTextEditor.Control
                    // onClick={() => editor?.commands.insertContent('⭐')}
                    // aria-label="Insert star emoji"
                    // title="Insert star emoji"
                >
                    <FontSizeBarItem size={'sm'}/>
                </RichTextEditor.Control>
                {/*<RichTextEditor.Control>*/}
                {/*    <CodeBarItem size={'xs'}/>*/}
                {/*</RichTextEditor.Control>*/}
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1/>
                <RichTextEditor.H2/>
                <RichTextEditor.H3/>
                <RichTextEditor.H4/>
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote/>
                <RichTextEditor.Hr/>
                <RichTextEditor.BulletList/>
                <RichTextEditor.OrderedList/>
                <RichTextEditor.Subscript/>
                <RichTextEditor.Superscript/>
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link/>
                <RichTextEditor.Unlink/>
            </RichTextEditor.ControlsGroup>

            {(!isBubble && !isFloat) && <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft/>
                <RichTextEditor.AlignCenter/>
                <RichTextEditor.AlignJustify/>
                <RichTextEditor.AlignRight/>
            </RichTextEditor.ControlsGroup>}

            <RichTextEditor.ControlsGroup>
                <RichTextEditor.Control>
                    <EmojiPickerBarItem/>
                </RichTextEditor.Control>
                {/*</RichTextEditor.ControlsGroup>*/}

                {/*<RichTextEditor.ControlsGroup>*/}
                <RichTextEditor.Control>
                    <ImageBarItem/>
                </RichTextEditor.Control>
                <RichTextEditor.Control>
                    <VideoBarItem/>
                </RichTextEditor.Control>
                <RichTextEditor.Control>
                    <TableBarItem/>
                </RichTextEditor.Control>
                <RichTextEditor.Control>
                    <MathButton editor={editor}/>
                    <DrawioBarItem editor={editor} />
                    {/*<ExcalidrawBarItem editor={editor} />*/}
                </RichTextEditor.Control>
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo/>
                <RichTextEditor.Redo/>
            </RichTextEditor.ControlsGroup>
        </>
    );
};

export default BarItems;