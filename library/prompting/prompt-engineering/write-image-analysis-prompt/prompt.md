---
schema: 1
id: write-image-analysis-prompt
kind: prompt
title: Write an image analysis prompt
description: Writes a reusable prompt for reading screenshots, charts, receipts, forms or photos with an AI that can see images - region by region, illegible parts marked, seen kept apart from inferred.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, operations-manager, data-analyst, software-engineer]
requires: [none]
inputs: [text, image]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [vision-prompt, multimodal, ocr, chart-reading, hallucination-guard]
pairs_with:
  prompts: [write-structured-output-prompt, build-prompt-test-set, write-batch-processing-prompt]
  personas: [prompt-engineer]
args:
  - name: image_type
    description: What kind of images will be sent again and again, for example "phone photos of paper receipts", "screenshots of error dialogs", "line charts from quarterly reports", "photos of shelf labels".
    type: text
    required: true
  - name: goal
    description: What you need from each image and where the result goes, for example "date, merchant, total and VAT for the expense spreadsheet".
    type: text
    required: true
  - name: problems_seen
    description: Optional - mistakes you have already seen, such as misread digits, invented values for blurry areas or chart values read off the wrong axis.
    type: text
output_contract:
  format: markdown
  sections: [Failure modes for these images, Prompt, Image quality rules, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write prompts for assistants that read images. Vision models are good at the gist and unreliable on detail: they misread similar digits (1 and 7, 5 and 6, 0 and 8), drop decimal separators, read chart values off the wrong axis or estimate them as if exact, fill a blurry total with a plausible number, confuse the printed price with a handwritten correction, describe what a screenshot usually says rather than what this one says, and blend what they see with what they assume (a "restaurant" receipt because of a word in the logo). Reliable image prompts ask for a quick inventory of the image first, then a region-by-region reading, quote visible text exactly, label every value as read, estimated or inferred, mark unreadable parts instead of guessing, and return a fixed format. Cross-checks the image itself allows (line items summing to the total, axis ticks bracketing a value) catch most errors.

Image type: {{image_type}}

Goal: {{goal}}
{{#problems_seen}}

Problems seen so far: {{problems_seen}}
{{/problems_seen}}
</context>

<task>
1. List the failure modes most likely for this image type and goal, including the ones reported, and the cross-checks the image itself offers.
2. Write the prompt. It tells the assistant to: (a) state in one line what the image is and whether it is usable (rotated, cropped, blurred, glare, partly hidden); (b) read the image region by region in a stated order (header, body, totals; or title, axes, legend, series) and transcribe text exactly as printed; (c) give each extracted value a confidence label - read, estimated or inferred - and the region it came from; (d) write "unreadable" or "not visible" rather than guess; (e) run the cross-checks and report any mismatch; (f) return the fixed output format. Use placeholders for variable parts.
3. Write image quality rules for the person sending images: framing, lighting, resolution, one document per image, and when to resend instead of accepting a low-confidence result.
4. Write tests: a clean image, a blurry or partly cut-off one, one with a handwritten correction or overlay, one where the cross-check fails, and one image of the wrong type, each with what a pass looks like.
</task>

<constraints>
- Never let the prompt ask the model to identify real people from their faces or infer sensitive traits (health, ethnicity, religion) from appearance.
- The prompt must not ask for precise values from charts without gridlines or labels; it asks for estimates with the axis ticks that bracket them.
- Model-agnostic; image size limits and supported formats are to be checked with the tool in use.
- For medical images, identity documents or legal evidence, the prompt states that the reading is a draft for a qualified person to check.
- Remind the user to crop or mask personal data that the task does not need.
</constraints>

<output_format>
## Failure modes for these images
Bullets.
## Prompt
In a fenced code block.
## Image quality rules
Short checklist for whoever takes or captures the images.
## Tests
Table: Test image | What it checks | Pass criterion.
</output_format>
