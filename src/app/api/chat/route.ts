// src/app/api/chat/route.ts

// app/api/completion/route.ts
import {NextRequest} from "next/server";
import {Configuration, OpenAIApi} from "openai-edge";
import {OpenAIStream, StreamingTextResponse} from "ai";

const config = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    // basePath: process.env.BASE_URL
    // apiKey: process.env.IFLYTEK_SPARK_APP_PASSWORD,
    // basePath: process.env.IFLYTEK_SPARK_BATH_URL
    apiKey: process.env.ZHIPU_API_KEY,
    basePath: "https://open.bigmodel.cn/api/paas/v4/"
})
const openai = new OpenAIApi(config)

export async function POST(req: NextRequest) {
    // extract the prompt from the body
    const {prompt} = await req.json()

    const response = await openai.createChatCompletion({
        // model: 'lite',
        model: 'glm-4-flash',  // zhipu
        // model: 'lite',
        // model: 'gpt-4-turbo',
        // model:'gpt-4-all',
        // model: 'gpt-3.5-turbo',
        messages: [
            {
                role: "system",
                content: `You are a knowledgeable assistant capable of answering questions 
                across various disciplines, including science, history, technology, 
                literature, and more. Provide clear, concise, and accurate information.`,

            },
            {
                role: "user",
                // content: `##${prompt}##. (answer with chinese)`,
                content: `##${prompt}##. (除非用户指定, 否则用中文回答)`,
            },
        ],
        stream: true
    })
    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
}