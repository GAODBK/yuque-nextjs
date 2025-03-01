// src/app/(knowledge)/[username]/[libraryId]/actions/create-note.ts
'use server';
import {db} from "@/lib/db";

export const createNote = async ({libraryId}: { libraryId: string }) => {
    return db.note.create({
        data: {
            libraryId: libraryId,
            name: `无标题文档`,
            text: ``
        }
    })
}