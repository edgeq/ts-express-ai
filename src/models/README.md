# DIFFERENT MODEL APIs FOR DIFFERENT MODEL TASKS

## Image Generation

- `opeanai.ts`: uses the OpenAI ChatCompletion (`gpt-4o-mini`) and Image Generation (`dall-e-2`) models to take user input, re-write the prompt, and generate an image.

- `replicate.ts`: uses the replicate service to handle the heavy lifting of creating and hosting images (albeit ephemerally)

- `huggingface.ts`: leaves it to the developer to decide how to process the response.

- `gemini.ts`: simple text generation. Can analyze media (photos & audio), but is not meant for generating media. Uses `gemini-1.5-flash`
 


