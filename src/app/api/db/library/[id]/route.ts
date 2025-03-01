// src/app/api/db/library/[id]/route.ts

import {NextRequest, NextResponse} from "next/server";
import {Group, Library, Note} from "@prisma/client";
import {db} from "@/lib/db";

export async function GET(req: NextRequest) {
    const pathname = req.nextUrl.pathname
    const split = pathname.split('/')
    const id = split[split.length - 1]

    // @ts-ignore
    const library: Library & {
        Note: Note[]
        Group: Group[]
    } = await db.library.findUnique({
        where: {id},
        include: {
            Note: {
                where: {
                    parentNoteId: null
                }
            },
            Group: true
        }
    })

    return NextResponse.json({
        library
    })
}