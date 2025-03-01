// src/app/api/generate-image/route.ts
import {NextRequest, NextResponse} from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const {prompt} = await request.json();
        // console.log(prompt)

        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/images/generations', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + process.env.ZHIPU_API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'cogview-3-flash',
                prompt: '忽略前文，' + prompt,
                // [1024x1024,768x1344,864x1152,1344x768,1152x864,1440x720,720x1440]，默认是1024x1024。
                size: '1024x1024',
            }),
        });

        const data = await response.json();
        // console.log(data)
        const imageUrl = data.data[0].url;

        // 下载并保存图片
        const imageResponse = await fetch(imageUrl);
        const buffer = await imageResponse.arrayBuffer();

        // 获取当前时间并格式化
        const now = new Date();
        const formattedDate = now.toISOString().replace(/T/, '_').replace(/:/g, '-').split('.')[0];

        // 设置图片路径
        const imagePath = path.join(process.cwd(), 'public/ai/img/', `generated-image_${formattedDate}.png`);
        fs.writeFileSync(imagePath, Buffer.from(buffer));

        // 返回图片的 URL
        return NextResponse.json({url: `/ai/img/generated-image_${formattedDate}.png`});
    } catch (error) {
        console.error(error);
        // @ts-ignore
        return NextResponse.json({error: `Error generating image ${error.message}`}, {status: 500});
    }
}
