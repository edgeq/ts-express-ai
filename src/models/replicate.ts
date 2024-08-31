import 'dotenv/config'
import Replicate from "replicate"

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
})

// Should be fine to list these models here since an API token is still needed to access them
const IMG_MODEL = 'adirik/flux-cinestill:216a43b9975de9768114644bbf8cd0cba54a923c6d0f65adceaccfc9383a938f'
const VIDEO_MODEL = 'cjwbw/videocrafter:02edcff3e9d2d11dcc27e530773d988df25462b1ee93ed0257b6f246de4797c8'

const replicateImage = async (prompt: string) => {
    return await replicate.run(
        IMG_MODEL,
        {
          input: {
            model: "dev",
            prompt,
            lora_scale: 0.6,
            num_outputs: 1,
            aspect_ratio: "1:1",
            output_format: "webp",
            guidance_scale: 3.5,
            output_quality: 80,
            extra_lora_scale: 0.8,
            num_inference_steps: 28
          }
        }
)}

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


export { replicateImage, replicateVideo }
