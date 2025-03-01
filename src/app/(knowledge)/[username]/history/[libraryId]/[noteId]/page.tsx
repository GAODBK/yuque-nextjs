// src/app/(knowledge)/[username]/[libraryId]/[noteId]/edit/page.tsx
import React from 'react';
import {db} from "@/lib/db";
import Header from "@/app/(knowledge)/[username]/history/[libraryId]/[noteId]/_components/header";
import {format} from 'date-fns';
import Link from "next/link";
import {cn} from "@/lib/utils";
import {JSDOM} from "jsdom";
import hljs from "highlight.js";
import katex from "katex";
import {NoteHistory} from "@prisma/client";
import '@/app/(knowledge)/[username]/[libraryId]/style.scss'

interface Props {
    params: {
        username: string
        libraryId: string
        noteId: string
    }
    searchParams: {
        h: string
    }
}

const Page = async ({params, searchParams}: Props) => {
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

    const histories = await db.noteHistory.findMany({
        where: {
            noteId: params.noteId
        },
        include: {
            note: true
        }
    })
    // 默认第一个
    let current: NoteHistory | undefined = histories[0]
    if (searchParams.h) {
        current = histories.filter(h => h.id === searchParams.h)[0]
    }
    const __html = renderMathInText(renderRichTextWithHighlightServerside(
        current ? current.text : ''
    ))


    return (
        <div className={`size-full`}>
            <Header history={current}/>
            <div className={`flex gap-x-2`}>
                {/*sidebar*/}
                <div className={`h-full py-4 min-h-[90vh] max-h-[90vh]
                 w-56 border-r overflow-y-auto fixed bg-white top-16`}>
                    {histories && histories.length > 0 && histories.map((h) => (
                        <div className={cn(
                            `text-center py-2 hover:bg-slate-300/30`,
                            searchParams.h === h.id && `bg-slate-300/30`
                        )}>
                            <Link href={`/malred/history/${params.libraryId}/${params.noteId}?h=${h.id}`}>
                                {format(h.createdAt, 'yyyy-MM-dd HH:mm')}
                            </Link>
                        </div>
                    ))}
                </div>
                {/*content*/}
                <div className={`py-16 ml-56 min-h-screen w-full flex justify-center bg-gray-300/30`}>
                    <div
                        className={`p-2 h-full rounded-md w-[58vw] bg-white prose-lg`}
                        dangerouslySetInnerHTML={{__html}}/>
                </div>
            </div>
        </div>
    );
};

export default Page;