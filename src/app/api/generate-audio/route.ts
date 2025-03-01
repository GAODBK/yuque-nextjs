// src/app/api/generate-audio/route.ts
import {NextResponse} from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const {text} = await request.json();

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + process.env.OPENAI_API_KEY);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "model": "tts-1",
            // "model": "tts-1-hd",
            "input": text,
            "voice": "nova" // 中性
        });

        const response = await fetch("https://xiaoai.plus/v1/audio/speech", {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const audioBuffer = await response.arrayBuffer();
        const audioPath = path.join(process.cwd(), 'public', 'ai', 'audio', `${Date.now()}.mp3`);

        fs.writeFileSync(audioPath, Buffer.from(audioBuffer));

        const audioUrl = `/ai/audio/${path.basename(audioPath)}`;
        return NextResponse.json({url: audioUrl});

    } catch (error) {
        console.error(error)
        // @ts-ignore
        return NextResponse.json({error: error.message}, {status: 500});
    }
}