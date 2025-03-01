// src/app/(dashboard)/dashboard/library/actions/new-library.ts
'use server';
import {db} from "@/lib/db";

export const createLibrary = async (values: {
    name: string
    description: string
}) => {
    return db.library.create({
        data: {
            ...values,
            text: `<p>👋  欢迎来到知识库</p><br/><p>知识库就像书一样，让多篇文档结构化，方便知识的创作与沉淀</p>`,
            showDir: false
        }
    })
}