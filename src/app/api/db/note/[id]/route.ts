// src/app/api/db/note/[id]/route.ts

import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";

export async function GET(req: NextRequest) {
    const pathname = req.nextUrl.pathname
    const split = pathname.split('/')
    const id = split[split.length - 1]

    // @ts-ignore
    const note = await db.note.findUnique({
        where: {id},
        include: {
            childrenNote: {
                where: {
                    parentNoteId: id,
                },
            },
        },
    })

    return NextResponse.json({
        note
    })
}

export async function DELETE(req: NextRequest) {
    const pathname = req.nextUrl.pathname
    const split = pathname.split('/')
    const id = split[split.length - 1]

    // @ts-ignore
    const note = await db.note.delete({
        where: {id},
    })

    return NextResponse.json({
        note
    })
}