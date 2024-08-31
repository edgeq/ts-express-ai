import 'dotenv/config'
import OpenAI from 'openai'

const openai = new OpenAI({})

async function makePrompt(userInput: string) {
    const SYSTEM_PROMPT = `
        You are an expert in prompt crafting.
        Use the text input to craft a detailed prompt for image generation.
        Keep the prompt length under 900 characters`

    const chatStream = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'system',
                content: SYSTEM_PROMPT,
            },
            {
                role: 'user',
                content: userInput
            }
        ],
        stream: true,
        stream_options: {"include_usage": true},
    })
    // returns the chatStream to the client
    return chatStream;
}

async function makeImage(prompt: string) {
    const response = await openai.images.generate({
        model: 'dall-e-2',
        n: 1,
        prompt,
        size: '512x512',
        style: 'natural', // 'vivid'
    })

    return response.data[0].url
}

export { openai, makePrompt, makeImage }