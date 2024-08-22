# GEN AI EXPLORATIONS

## About

This repo is an exploration of what's possible with Typescript, Express, and other packages, librarires, and models that might be interesting for Generative AI & JavaScript Development. It's more of a sketch pad to see what's out there.

> More Projects to Follow... until then, check out this weird image I was able to generate.

## 1 - [OpenAI](src/models/openai.ts)
Uses the OpenAI ChatCompletion (`gpt-4o-mini`) and Image Generation (`dall-e-2`) models to take user input, re-write the prompt, and generate an image. It also makes use of `HTMx` for minimalist server requests and `Twig` templating language for HTML-friendly markup.


![Prompt: hobgoblin eating schwarma on a cold night atop skyscrapers. Dark, gritty, and scary aesthetic. Creep me out a little](src/public/assets/images/gen-ai-img__dall-e-2__goblin.png "GenAI Goblin")

## 2 - [Replicate](src/models/replicate.ts)
Uses the Replicate API to run various models (`stability-ai/sdxl` and `videocrafter`) for Text-to-Image generation and Text-to-Video generation.

![Surrealist style, a hobbit from Lord of The Rings riding the subway in a metroplitan city surrounded by other Middle Earth characters. I should see at least one wizard, an Elf, an Ork, and a Dwarf](src/public/assets/images/hobbit-subway.png "Hobbit Subway")

## 3 - [Hugging Face](src/models/huggingface.ts)
Uses the `@huggingface/inference` api which leaves it to the developer to decide how to process the response.

![Surrealist style, a hobbit from Lord of The Rings riding the subway in a metroplitan city surrounded by other Middle Earth characters. I should see at least one wizard, an Elf, an Ork, and a Dwarf](src/public/assets/images/hf-image-stable.jpg "Hobbit Subway")