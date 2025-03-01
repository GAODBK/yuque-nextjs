// src/app/(knowledge)/[username]/[libraryId]/[noteId]/page.tsx
import React from 'react';
import {db} from "@/lib/db";
import NoteHomeHeader from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-home-header";
import NoteAiChat from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-ai-chat";
import NoteEdit from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-edit";
import {JSDOM} from "jsdom";
import hljs from "highlight.js";
import katex from "katex";
import {generateOutlineLevel} from "@/lib/utils";

const Page = async ({params, searchParams}: {
    params: {
        libraryId: string
        noteId: string
    }
    searchParams: {
        type: 'ai-read' | 'edit' | 'both'
    }
}) => {
    // 服务端渲染时给html富文本中的code添加高亮
    function renderRichTextWithHighlightServerside(richText: string) {
        const dom = new JSDOM(richText);
        const doc = dom.window.document;

        const codeBlocks = doc.querySelectorAll('pre code');
        // doc.querySelector('body')!.style.width = '100%';

        // @ts-ignore
        codeBlocks.forEach(block => {
            const language = block.className.split('-')[1] || 'plaintext';
            const code = block.textContent;
            const highlighted = hljs.highlight(code!, {language}).value;
            block.innerHTML = highlighted;
        });

        return doc.body.innerHTML;
    }

    // @ts-ignore
    function renderMathInText(text) {
        const dom = new JSDOM(text);
        const doc = dom.window.document;

        const mathSpans = doc.querySelectorAll('span[data-type="math"]');

        mathSpans.forEach(span => {
            const latex = span.getAttribute('content');
            try {
                const html = katex.renderToString(latex!, {
                    throwOnError: false
                });
                // 居中
                const parent = span.parentElement;

                // @ts-ignore
                parent.style.display = 'flex';
                // @ts-ignore
                parent.style.justifyContent = 'center';
                // @ts-ignore
                parent.style.alignItems = 'center';
                // 内容
                span.innerHTML = html;
            } catch (error) {
                console.error('Error rendering LaTeX:', error);
            }
        });

        return doc.body.innerHTML;
    }

    const note = await db.note.findUnique({where: {id: params.noteId}})

    const richText = renderRichTextWithHighlightServerside(renderMathInText(note?.text || '')
    )
    // let {full: __html} = generateOutlineLevel(richText)
    const data = await fetch(`http://localhost:3000/api/outline/generate`, {
        method: 'POST',
        body: JSON.stringify({
            richText
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const {full: __html} = await data.json();

    return (
        <div className={`size-full flex`}>
            <div className={`size-full bg-white flex flex-col`}>
                <NoteHomeHeader
                    libraryId={params.libraryId}
                    id={note?.id!}
                    text={note?.text! || ''}
                    name={note?.name!}/>
                <div className={`flex size-full`}>
                    {(searchParams.type !== 'both' &&
                        searchParams.type !== 'edit'
                    ) && <div className={`size-full flex-1 p-4`}>
                        {(!note?.name || note?.name === '无标题文档') ?
                            <h1 className={`mx-6 my-1 mb-2 text-4xl font-semibold`}>
                                无标题文档
                            </h1> :
                            !note?.text && <h1 className={`mx-6 my-1 mb-2 text-4xl font-semibold`}>
                                {note?.name}
                            </h1>
                        }
                        <div className={`px-6 py-2 w-full`}>
                            <div
                                id={`tiptap-content`}
                                className={`p-12 w-full prose-lg`}
                                dangerouslySetInnerHTML={{
                                    __html
                                }}/>
                            {!note?.text && (
                                <span>暂无内容</span>
                            )}
                        </div>
                    </div>}
                    {(searchParams.type === 'both' ||
                            searchParams.type === 'edit')
                        && <NoteEdit
                            libraryId={params.libraryId}
                            note={note!}/>}
                </div>
            </div>
            {(searchParams.type === 'both' ||
                searchParams.type === 'ai-read') && <NoteAiChat
                richText={note?.text || ''}
                libraryId={params.libraryId}
                id={note?.id!}
            />}
        </div>
    );
};

export default Page;