import 'dotenv/config'
import OpenAI from 'openai'

const openai = new OpenAI({})

async function makePrompt(userInput) {
    const SYSTEM_PROMPT = `
        You are an expert in prompt crafting.
        Use the text input to craft a detailed prompt for image generation.`

    const chatCompletion = await openai.chat.completions.create({
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
    })

    return chatCompletion.choices[0].message.content
}

async function makeImage(prompt) {
    const response = await openai.images.generate({
        model: 'dall-e-2',
        prompt,
        size: '512x512',
        n: 1,
    })

    return response.data[0].url
}

export { openai, makePrompt, makeImage }