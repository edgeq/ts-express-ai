import 'dotenv/config'
import { HfInference } from "@huggingface/inference"
import { writeFileSync } from 'node:fs'
import path from 'node:path';

const HF_API_TOKEN = process.env.HF_API_TOKEN

const hf = new HfInference(HF_API_TOKEN)
const model_flux = 'black-forest-labs/FLUX.1-dev'
const model_stable = 'stabilityai/stable-diffusion-3-medium-diffusers'
const prompt = 'Surrealist style, a hobbit from Lord of The Rings riding the subway in a metroplitan city surrounded by other Middle Earth characters. I should see at least one wizard, an Elf, an Ork, and a Dwarf'

// Text-to-image
/**
 * Converts a text prompt to an image using the Hugging Face API.
 * 
 * Hugging Face leaves it to the developer to decide how to process the response.
 * In this case, we are saving the image to the public/assets/images directory
 * but only after we convert the response blob to a buffer and then write it to the file system.
 * 
 * @param prompt - The text prompt to convert to an image.
 * @returns A Promise that resolves to a Blob response containing the converted image.
 */
async function hfImage(prompt: string) {
    const imgReq = await hf.textToImage({
        model: model_stable,
        inputs: prompt,
    })

    const blob = imgReq as Blob;
    await saveImage(blob, 'hf-image-stable.jpg')
}
/**
 * Converts a Blob to a Buffer.
 * @param blob {Blob}
 * @returns 
 */
async function blobToBuffer(blob: Blob) : Promise<Buffer> {
    const arrayBuffer = await blob.arrayBuffer()
    return Buffer.from(arrayBuffer);
}
/**
 * Streams a Blob to a file.
 * @param blob 
 * @param filename 
 */
async function saveImage(blob: Blob, filename: string) {
    const imageRoot = path.join(__dirname, '..', 'public', 'assets', 'images')
    const buffer = await blobToBuffer(blob)
    writeFileSync(path.join(imageRoot, filename), buffer)
    
}

hfImage(prompt)

export default { hfImage }