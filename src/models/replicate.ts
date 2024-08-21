import 'dotenv/config'
import Replicate from "replicate"

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
})

console.log("Let's run that model!")
console.log("=======")

const IMG_MODEL = 'stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc'
const VIDEO_MODEL = 'cjwbw/videocrafter:02edcff3e9d2d11dcc27e530773d988df25462b1ee93ed0257b6f246de4797c8'
const prompt = 'Surrealist style, a hobbit from Lord of The Rings riding the subway in a metroplitan city surrounded by other Middle Earth characters. I should see at least one wizard, an Elf, an Ork, and a Dwarf'

const replicateImage = async (prompt: string) => {
    return await replicate.run(
        IMG_MODEL,
        {
          input: {
            prompt,
            width: 768,
            height: 768,
            refine: "expert_ensemble_refiner",
            apply_watermark: false,
            num_inference_steps: 25
          }
        }
)}

// replicateImage().then(data => console.log(data))

const replicateVideo = async (prompt: string) => {
    return await replicate.run(
        VIDEO_MODEL,
        {
            input: {
                prompt,
                save_fps: 10,
                ddim_steps: 50,
                unconcidtional_guidance_scale: 12
            },
        }
    )
}

replicateVideo(prompt).then(data => console.log(data))

export default { replicateImage, replicateVideo }
