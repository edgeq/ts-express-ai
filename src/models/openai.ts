import 'dotenv/config'
import OpenAI from 'openai'

const openai = new OpenAI({})

async function makePrompt(userInput: string) {
    // Open AI already has a prompt crafting function when using dall-e-3
    // that automatically runs when the user submits a prompt
    // To get around this, we give the system prompt clear instructions to not modify the user's input
    const SYSTEM_PROMPT = `
        You are an expert in prompt crafting.
        Use the text input to craft a detailed prompt for image generation.
        I NEED to test how the tool works with extremely simple prompts.
        DO NOT add any detail, just use it AS-IS: 
        `

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
        model: 'dall-e-3',
        n: 1,
        prompt,
        // size: '512x512',
        // style: 'natural', // 'vivid'
    })
    console.log(response)
    return response.data[0].url
}

export { openai, makePrompt, makeImage }