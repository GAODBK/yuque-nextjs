// src/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-edit.tsx
'use client';
import React, {useEffect, useState} from 'react';

import * as Y from 'yjs'
import {IndexeddbPersistence} from "y-indexeddb";
import {Note} from "@prisma/client";
// import TipTap from "@/components/tiptap/TipTap";
import {useSlugStore} from "@/hooks/use-slug-store";
import dynamic from "next/dynamic";
import {updateNote} from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/update-note";
import {useRouter} from "next/navigation";

// 动态导入, 懒加载
const TipTap = dynamic(() =>
        import ('@/components/tiptap/TipTap'),
    // 指定服务端不用渲染, 防止出现服务端和客户端渲染不同的水合错误
    {ssr: false})

const NoteEdit = ({note, libraryId}: { note: Note; libraryId: string }) => {
    const router = useRouter()

    const {setSlug} = useSlugStore()
    useEffect(() => {
        setSlug(note.name)
    }, [note])

    // 协作
    const ydoc = new Y.Doc()
    // Store the Y document in the browser 本地缓存, 再次连接到ws服务器时保存到服务器
    // 实现第一次打开文档协作时同步旧数据
    new IndexeddbPersistence(note.name!, ydoc)

    const [richText, setRichText] = useState(note.text!)

    return (
        <div className={`h-full w-full prose-lg p-2`}>
            <TipTap
                onSubmit={async () => {
                    await updateNote({id: note.id, text: richText})
                    router.push(`/malred/${libraryId}/${note.id}`)
                    router.refresh()
                }}
                description={richText} onChange={(richText) => {
                setRichText(richText)
            }} slug={note.name!}/>
        </div>
    );
};

export default NoteEdit;