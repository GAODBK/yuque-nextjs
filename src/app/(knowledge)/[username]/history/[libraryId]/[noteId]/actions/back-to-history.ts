// src/app/(knowledge)/[username]/history/[libraryId]/[noteId]/actions/back-to-history.ts
'use server';
import {db} from "@/lib/db";

export const backToHistory = async ({id, text}: {
    id: string
    text: string
}) => {
    return db.note.update({
        where: {id},
        data: {text}
    })
}