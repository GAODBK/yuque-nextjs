// src/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/update-note.ts
'use server';
import {db} from "@/lib/db"
import {storeNoteHistory} from "@/app/(knowledge)/[username]/history/[libraryId]/[noteId]/actions/store-note-history";

export const updateNote = async (value: {
    id: string
    name?: string
    text?: string
}) => {
    const {id, ...values} = value

    const note = await db.note.update({
        where: {id},
        data: {...values}
    })
    // 历史记录
    await storeNoteHistory(note)

    return note
}