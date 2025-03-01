// src/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/create-note.ts
'use server';
import {storeNoteHistory} from "@/app/(knowledge)/[username]/history/[libraryId]/[noteId]/actions/store-note-history";

import {db} from '@/lib/db'

interface Props {
    parentNoteId?: string
    groupId?: string
    libraryId: string
}

export const createNote = async (value: Props) => {
    const note = await db.note.create({
        data: {
            ...value,
            name: '无标题文档',
            text: '',
        }
    })
    // 历史记录
    await storeNoteHistory(note);

    return note
}