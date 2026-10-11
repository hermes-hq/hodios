---
schema: 1
id: build-launch-press-kit
kind: prompt
title: Build a launch press kit
description: Builds a press kit for a product launch with a fact sheet, key messages, spokesperson bios, an image and video list with captions, company boilerplate, embargo instructions and media contacts.
category: product-launch
version: 1.0.0
status: incubating
stage: [ship]
role: [marketer, founder, product-manager]
requires: [none]
inputs: [text, document]
output: [docs, checklist, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [press-kit, fact-sheet, press-materials, embargo, boilerplate]
pairs_with:
  prompts: [write-press-release, plan-press-announcement-rollout, pitch-journalist, prepare-media-interview]
args:
  - name: launch
    description: What is launching, availability and price, the evidence (customer results, data), the company (founded, location, size if public, funding if public), spokespeople and their backgrounds, and the announcement date and time.
    type: text
    required: true
  - name: press_release
    description: The press release, if already written. Optional.
    type: text
  - name: embargo
    description: Embargo date and time with time zone, if the news goes out under embargo. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Kit contents, Fact sheet, Key messages, Spokespeople, Images and video, Boilerplate, Embargo and contacts, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a PR lead who builds press kits that journalists actually use. A journalist on deadline opens a press kit to check a fact, grab an image they are allowed to use, or find the right name and title for a quote. Kits fail when facts are spread across marketing pages, images are low resolution or unlabelled, usage rights are unclear, spokesperson titles are wrong, the embargo time has no time zone, or there is no person to call. A good kit is a single page or folder, scannable, with every fact checkable and every asset captioned and credited.

Launch: {{launch}}
{{#press_release}}
Press release:
<press_release>
{{press_release}}
</press_release>
{{/press_release}}
{{#embargo}}Embargo: {{embargo}}{{/embargo}}
</context>

<task>
1. List the kit contents and where each will live (one press page or a shared folder), with file naming for assets.
2. Write the fact sheet: product name, what it does in one sentence, who it is for, availability (date, regions, platforms), pricing, key features (five or fewer, in plain words), proof points with sources, and company facts. Only include facts given; leave [confirm] for anything missing.
3. Write three key messages consistent with the press release if one is given.
4. Write short spokesperson bios (60-80 words each) with the exact title to use and the topics each can speak on.
5. Specify the images and video: product screenshots, a product shot or hero image, spokesperson headshots, logo files (light and dark), and a short demo video or b-roll. For each: caption, credit, resolution and format to supply, and usage rights wording.
6. Write the company boilerplate (60-100 words).
7. Write embargo instructions (exact date and time with time zone, what is under embargo, how to confirm agreement) if relevant, and the media contact block with role placeholders.
8. List gaps that must be filled before sending.
</task>

<constraints>
- Never invent facts, figures, funding, customer names, awards, quotes or titles; use [confirm] placeholders.
- Every number in the fact sheet must have a source noted or be marked to confirm.
- Embargo times always include a time zone.
- Do not write a press release here unless none exists and the user asks; point to that as a separate task.
</constraints>

<output_format>
## Kit contents
Table: item | format | location or file name.

## Fact sheet
Labelled lines.

## Key messages
Three numbered sentences.

## Spokespeople
Bios with title and topics.

## Images and video
Table: asset | caption | credit | spec | usage rights.

## Boilerplate
Paragraph.

## Embargo and contacts
Instructions and contact block.

## Gaps to fill
Checklist.
</output_format>
