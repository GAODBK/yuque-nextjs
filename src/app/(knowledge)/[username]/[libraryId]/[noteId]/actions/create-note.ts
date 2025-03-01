// src/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/create-note.ts
'use server';

import {db} from '@/lib/db'

interface Props {
    parentNoteId?: string
    groupId?: string
    libraryId: string
}

export const createNote = async (value: Props) => {
    return db.note.create({
        data: {
            ...value,
            name: '无标题文档',
            text: '',
        }
    })
}