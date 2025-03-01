// src/app/api/db/note/route.ts

import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";
import {storeNoteHistory} from "@/app/(knowledge)/[username]/history/[libraryId]/[noteId]/actions/store-note-history";

export async function GET(req: NextRequest) {

    // @ts-ignore
    const notes = await db.note.findMany({
        orderBy: {updatedAt: "desc"},
        include: {library: true}
    })

    return NextResponse.json({
        notes
    })
}

export async function POST(req: NextRequest) {
    const data = await req.json()

    const note = await db.note.create({
        data: data
    })
    // 创建历史记录
    await storeNoteHistory(note)

    return NextResponse.json({
        note
    })
}

export async function PATCH(req: NextRequest) {
    const data = await req.json()
    const {id, ...values} = data

    const note = await db.note.update({
        data: values,
        where: {id}
    })
    // 创建历史记录
    await storeNoteHistory(note)

    return NextResponse.json({
        note
    })
}