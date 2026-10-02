---
schema: 1
id: build-image-style-guide
kind: prompt
title: Build a style kit for a series of generated images
description: Builds a reusable style kit (style statement, style tokens, prompt template, negative prompts, character sheets, consistency techniques, QA checklist) to keep generated image series consistent.
category: image-generation
version: 1.0.0
status: incubating
stage: [design]
role: [artist, content-creator, designer, marketer]
stack: [midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [text, image]
output: [docs, prompt]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [style-consistency, prompt-template, negative-prompts, character-sheet]
pairs_with:
  prompts: [write-image-prompt, create-storyboard]
args:
  - name: series
    description: What the series is for, what images it needs (subjects, count, formats), the look you want, and any reference images or brand rules.
    type: text
    required: true
  - name: tool
    description: The image tool and version you will use, e.g. "Midjourney", "SDXL in ComfyUI", "ChatGPT images". Optional; without it the kit stays tool-neutral with notes per tool.
    type: string
output_contract:
  format: markdown
  sections: [Style statement, Style tokens, Prompt template, Negative prompt, Recurring subjects, Consistency techniques, Sample prompts, QA checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A series of generated images drifts when each prompt is written from scratch: the palette shifts, the line weight changes, the main character gains a new face every time. Consistency comes from treating the look like a design system: a fixed vocabulary of style tokens reused word for word, a template where only the subject slot changes, references and seeds used deliberately, and a checklist for rejecting off-style results.
</context>

<task>
Build a style kit for this series{{#tool}} in {{tool}}{{/tool}}:

<series>
{{series}}
</series>

1. **Style statement:** 2 to 3 sentences describing the look in plain words, and 3 "not" statements that rule out the nearest wrong looks.
2. **Style tokens:** a fixed set of short phrases to reuse word for word in every prompt, grouped as medium and technique, line and texture, palette (named colours with hex values for reference), lighting, camera or viewpoint, composition rules, and mood. Mark which tokens are mandatory and which are optional.
3. **Prompt template:** a fill-in template with one slot for the subject and action and one for the setting, followed by the fixed style tokens in a fixed order. Keep the variable part at the start so the subject is not drowned out.
4. **Negative prompt or exclusions:** a reusable list for tools that support it, and, for tools that do not, the equivalent positive phrasing to put in the prompt.
5. **Recurring subjects:** for each character, mascot or object that appears in several images, a short sheet: a fixed description phrase (age, build, hair, clothing, colours, distinguishing features), what must never change, and the reference image to make first.
6. **Consistency techniques** for the tool: reference images and style references (for example Midjourney's style and character or object reference parameters, whose names depend on the version), fixed seeds for close variations, image-to-image or IP-Adapter-style references and LoRAs for Stable Diffusion, and, for chat-based image tools, keeping one conversation, re-attaching the reference and restating the full style block each time. Note which techniques are version-dependent and should be checked.
7. **Sample prompts:** 3 complete prompts from the template for different images in the series.
8. **QA checklist:** 6 to 10 yes-or-no checks to accept or reject an image (palette in range, line weight, character features, no stray text or watermarks, anatomy and hands, composition rule).
9. If the series description lacks the look or the use (no style hints, no idea where images go), ask up to three questions and stop.
</task>

<constraints>
- Describe styles by their qualities, not by naming living artists.
- Keep the style token block short enough that the subject still leads; about 25 to 40 words is a good target.
- Do not claim a technique guarantees identical results. Generative tools vary between runs and versions.
</constraints>

<output_format>
Markdown with the contract's sections as `##` headings, in order. Put the template, negative prompt and sample prompts in code blocks so they can be copied.
</output_format>
