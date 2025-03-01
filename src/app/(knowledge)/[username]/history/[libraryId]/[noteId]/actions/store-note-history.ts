// src/app/(knowledge)/[username]/history/[libraryId]/[noteId]/actions/store-note-history.ts

import {db} from "@/lib/db"
import {Note} from "@prisma/client"

export const storeNoteHistory = async (note: Note) => {
    return db.noteHistory.create({
        data: {
            noteId: note.id,
            text: note.text
        }
    })
}