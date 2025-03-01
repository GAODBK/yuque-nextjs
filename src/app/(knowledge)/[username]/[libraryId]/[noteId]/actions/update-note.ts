// src/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/update-note.ts
'use server';
import {db} from "@/lib/db"

export const updateNote = async (value: {
    id: string
    name?: string
    text?: string
}) => {
    const {id, ...values} = value

    return db.note.update({
        where: {id},
        data: {...values}
    })
}