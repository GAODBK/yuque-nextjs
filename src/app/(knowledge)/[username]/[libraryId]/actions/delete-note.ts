// src/app/(knowledge)/[username]/[libraryId]/actions/delete-note.ts
'use server';
import {db} from "@/lib/db";

export const deleteNote = async (id: string) => {
    return db.note.delete({where: {id}})
}