// src/app/api/uploadFile/route.ts
import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as File;

        if (!file) {
            return NextResponse.json({ success: false, message: 'No file uploaded' });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 确保目录存在
        const uploadDir = './public/files';
        await mkdir(uploadDir, { recursive: true });

        // 确保文件名安全
        const safeFileName = path.basename(file.name);
        const filePath = path.join(uploadDir, safeFileName);

        await writeFile(filePath, buffer);
        console.log(`open ${filePath} to see the uploaded file`);

        // 构建文件的 URL
        // const fileUrl = `http://localhost:3000/files/${safeFileName}`;
        const fileUrl = `/files/${safeFileName}`;

        return NextResponse.json({ success: true, url: fileUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ success: false, message: 'Error uploading file' }, { status: 500 });
    }
}
