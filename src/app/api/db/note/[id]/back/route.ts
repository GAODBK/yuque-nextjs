// src/app/api/db/note/[id]/back/route.ts
import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";
import {storeNoteHistory} from "@/app/(knowledge)/[username]/history/[libraryId]/[noteId]/actions/store-note-history";

export async function PATCH(req: NextRequest) {
    const data = await req.json()

    const pathname = req.nextUrl.pathname
    const split = pathname.split('/')
    const id = split[split.length - 2]

    const note = await db.note.update({
        data,
        where: {id}
    })
    // 创建历史记录
    await storeNoteHistory(note)

    return NextResponse.json({
        note
    })
}