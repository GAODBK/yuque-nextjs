import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";

// src/app/api/db/noteHistory/route.ts
export async function GET(req: NextRequest, res: NextResponse) {
    const noteId = req.nextUrl.searchParams.get('noteId')!

    const histories = await db.noteHistory.findMany({
        where: {
            noteId
        },
        include: {
            note: true
        }
    })
    return NextResponse.json({histories})
}