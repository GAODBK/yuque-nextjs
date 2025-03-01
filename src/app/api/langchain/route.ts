// src/app/api/langchain/route.ts
import {NextRequest, NextResponse} from "next/server";
import {ChatOpenAI} from '@langchain/openai'
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
} from '@langchain/core/prompts'
import {LLMChain} from 'langchain/chains'
import {ConversationTokenBufferMemory} from 'langchain/memory'

export const GET = async (req: NextRequest) => {
    const q = req.nextUrl.searchParams.get('q')

    let llm = new ChatOpenAI({
        temperature: 0.95,
        model: "glm-4-flash",
        openAIApiKey: process.env.ZHIPU_API_KEY,
        configuration: {
            baseURL: "https://open.bigmodel.cn/api/paas/v4/"
        },
    })
    let prompt = ChatPromptTemplate.fromMessages(
        [
            SystemMessagePromptTemplate.fromTemplate(
                "You are a nice chatbot having a conversation with a human."
            ),
            new MessagesPlaceholder({variableName: "chat_history"}),
            HumanMessagePromptTemplate.fromTemplate("{question}")
        ]
    )

    let memory = new ConversationTokenBufferMemory({
        llm, memoryKey: "chat_history", returnMessages: true
    })
    let conversation = new LLMChain({
        llm: llm,
        prompt: prompt,
        verbose: true,
        memory: memory
    })
    let res = await conversation.invoke({"question": q})
    return NextResponse.json({res})
}