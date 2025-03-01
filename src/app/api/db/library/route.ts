// src/app/api/db/library/route.ts

import {db} from "@/lib/db"
import {NextRequest, NextResponse} from "next/server"
import {storeNoteHistory} from "@/app/(knowledge)/[username]/history/[libraryId]/[noteId]/actions/store-note-history";

export async function GET(req: NextRequest) {
    const libraries = await db.library.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            Note: true
        }
    })
    return NextResponse.json({libraries})
}

export async function PATCH(req: NextRequest) {
    const data = await req.json()
    const {id, ...values} = data

    const library = await db.library.update({
        where: {id},
        data: values
    })

    return NextResponse.json({
        library
    })
}

export async function POST(req: NextRequest) {
    const data = await req.json()

    const library = await db.library.create({
        data: data
    })

    return NextResponse.json({
        library
    })
}