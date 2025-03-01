// src/app/(knowledge)/[username]/[libraryId]/actions/create-note.ts
'use server';
import {db} from "@/lib/db";
import {storeNoteHistory} from "@/app/(knowledge)/[username]/history/[libraryId]/[noteId]/actions/store-note-history";

export const createNote = async ({libraryId}: { libraryId: string }) => {
    const note = await db.note.create({
        data: {
            libraryId: libraryId,
            name: `无标题文档`,
            text: ``
        }
    })
    // 创建历史记录
    await storeNoteHistory(note);

    return note
}