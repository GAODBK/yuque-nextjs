// src/app/api/db/note/library/route.ts

import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";
import { storeNoteHistory } from "@/app/(knowledge)/[username]/history/[libraryId]/[noteId]/actions/store-note-history";

export async function POST(req: NextRequest) {
    const pathname = req.nextUrl.pathname
    const split = pathname.split('/')
    const libraryId = split[split.length - 1]

    const note = await db.note.create({
        data: {
            libraryId,
            name: `无标题文档`,
            text: ``
        }
    })
    // 创建历史记录
    storeNoteHistory(note)

    return NextResponse.json({
        note
    })
}