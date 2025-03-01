// src/app/(dashboard)/dashboard/library/[username]/[id]/page.tsx
import React from 'react';
import {BsJournalBookmark} from "react-icons/bs";
import {HiEllipsisHorizontal} from "react-icons/hi2";
import {Group, Library, Note} from "@prisma/client";
import {db} from "@/lib/db";
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import HomepageRenameInput from "@/app/(knowledge)/[username]/[libraryId]/_components/homepage-rename-input";
import {TiStarOutline} from "react-icons/ti";
import EditHomepage from "@/app/(knowledge)/[username]/[libraryId]/_components/edit-homepage";

import katex from 'katex';
import 'katex/dist/katex.min.css';
import hljs from "highlight.js";

// import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import csharp from 'highlight.js/lib/languages/csharp';
import cpp from 'highlight.js/lib/languages/cpp';
import ruby from 'highlight.js/lib/languages/ruby';
import php from 'highlight.js/lib/languages/php';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import swift from 'highlight.js/lib/languages/swift';
import kotlin from 'highlight.js/lib/languages/kotlin';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml'; // HTML/XML
import css from 'highlight.js/lib/languages/css';
import markdown from 'highlight.js/lib/languages/markdown';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import sql from 'highlight.js/lib/languages/sql';
import yaml from 'highlight.js/lib/languages/yaml';
import shell from 'highlight.js/lib/languages/shell';
import r from 'highlight.js/lib/languages/r';
import perl from 'highlight.js/lib/languages/perl';

// 注册语言
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('php', php);
hljs.registerLanguage('go', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('swift', swift);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', html);
hljs.registerLanguage('css', css);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('r', r);
hljs.registerLanguage('perl', perl);

import Highlight from '@tiptap/extension-highlight'
import {common, createLowlight, all} from 'lowlight'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
// const lowlight = createLowlight(common)
const lowlight = createLowlight(all)

lowlight.highlight('html', '"use strict";')
lowlight.highlight('css', '"use strict";')
lowlight.highlight('js', '"use strict";')
lowlight.highlight('ts', '"use strict";')
// you can also register individual languages
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

import {JSDOM} from 'jsdom'
import './style.scss'
import HomepageDir from "@/app/(knowledge)/[username]/[libraryId]/_components/homepage-dir";

const Page = async ({params, searchParams}: {
    params: {
        username: string
        libraryId: string
    }
    searchParams: {
        type: 'rename' | 'edit'
    }
}) => {
    // 服务端渲染时给html富文本中的code添加高亮
    function renderRichTextWithHighlightServerside(richText: string) {
        const dom = new JSDOM(richText);
        const doc = dom.window.document;

        const codeBlocks = doc.querySelectorAll('pre code');

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

    // @ts-ignore
    const library: Library & {
        Note: Note[]
        Group: Group[]
    } = await db.library.findUnique({
        where: {id: params.libraryId},
        include: {
            Note: {
                where: {
                    parentNoteId: null
                }
            },
            Group: true
        }
    })

    return (
        <div className={`h-full bg-gray-300/30 p-4`}>
            <div className={`bg-white mx-24 my-16 min-h-[70vh] rounded-md`}>
                {searchParams.type !== 'edit' && (
                    <>
                        <div className={`flex p-8 justify-between items-center`}>
                            <div className={`flex gap-x-2 items-center`}>
                                <BsJournalBookmark className={`text-blue-500 size-8`}/>
                                {searchParams.type !== 'rename' ?
                                    <text className={`font-bold text-2xl`}>{library?.name}</text> :
                                    <HomepageRenameInput library={library}/>
                                }
                            </div>
                            <div className={`flex items-center gap-x-2`}>
                                <>
                                    <div className={`p-2 border flex items-center rounded-md`}>
                                        <TiStarOutline className={``}/>
                                        <span className={`text-sm`}>收藏</span>
                                    </div>
                                    <div className={`p-2 border flex items-center rounded-md`}>
                                        <span className={`text-sm`}>分享</span>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <HiEllipsisHorizontal className={`cursor-pointer size-6 m-1`}/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>
                                                <Link href={`/malred/${library.id}?type=rename`}>
                                                    重命名
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href={`/malred/${library.id}?type=edit`}>
                                                    编辑首页
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>更多设置</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            </div>
                        </div>
                        <div className={`h-full p-4 w-full`}>
                            <div className={`w-full prose-base md:prose-lg px-4 rounded-md`}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            renderMathInText(
                                                renderRichTextWithHighlightServerside(library.text)
                                            )
                                    }}
                                />
                            </div>
                        </div>
                        {library.showDir && <HomepageDir library={library}/>}
                    </>)}
                {searchParams.type === 'edit' && (
                    <EditHomepage library={library}/>
                )}
            </div>
        </div>
    )
};

export default Page;