// src/app/(knowledge)/[username]/[libraryId]/actions/update-library.ts
'use server';
import {db} from "@/lib/db"

interface Props {
    name?: string
    text?: string
    description?: string
    showDir?: boolean
    id: string
}

export const updateLibrary = async (values: Props) => {
    const {id, ...value} = values

    return db.library.update({
        where: {id},
        data: value
    })
}