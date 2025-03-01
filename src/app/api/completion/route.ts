// src/app/completion/route.ts


import {NextRequest} from "next/server";
import {Configuration, OpenAIApi} from "openai-edge";
import {OpenAIStream, StreamingTextResponse} from "ai";

const config = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    // basePath: process.env.BASE_URL
    apiKey: process.env.IFLYTEK_SPARK_APP_PASSWORD,
    basePath: process.env.IFLYTEK_SPARK_BATH_URL
    // apiKey: process.env.ZHIPU_API_KEY,
    // basePath: "https://open.bigmodel.cn/api/paas/v4/"
})
const openai = new OpenAIApi(config)

export async function POST(req: NextRequest) {
    // extract the prompt from the body
    const {prompt} = await req.json()

    const response = await openai.createChatCompletion({
        // model: 'gpt-4-turbo',
        // model: 'gpt-3.5-turbo',
        // model: 'lite', // xunfei
        model: 'generalv3.5', // xunfei spark max 3.5
        // model: 'glm-4-flash',  // zhipu
        messages: [
            {
                role: "system",
                content: `You are a helpful AI embedded in a notion text editor app that is used to autocomplete sentences
                          The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
                          AI is a well-behaved and well-mannered individual.
                          AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.(in chinese)`,
            },
            {
                role: "user",
                content: `
                    I am writing a piece of text in a notion text editor app.
                    Help me complete my train of thought here: ##${prompt}##
                    keep the tone of the text consistent with the rest of the text.
                    keep the response short and sweet.(in chinese)
                `,
            },
        ],
        stream: true
    })
    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
}