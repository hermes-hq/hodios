---
schema: 1
id: build-video-publish-checklist
kind: prompt
title: Build a video publish checklist
description: Builds a pre-publish checklist for videos covering title, thumbnail, description, chapters, captions, end screens, settings and promotion, tailored to the platform. Use as a reusable upload routine.
category: video
version: 1.0.0
status: incubating
stage: [ship]
role: [content-creator, marketer]
stack: [youtube]
inputs: [preferences]
output: [checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [upload-checklist, metadata, captions, end-screens, video-seo]
pairs_with:
  prompts: [package-video-title-thumbnail, write-video-chapters, repurpose-video-into-posts]
  personas: [youtube-strategist]
args:
  - name: platform
    description: Where the video is published, such as youtube, tiktok, instagram, linkedin or vimeo. Name more than one if you publish the same video in several places.
    type: string
    required: true
  - name: channel
    description: The channel's niche, audience, typical video type and length, team size, and anything that often goes wrong at upload. Leave empty for a general checklist.
    type: text
output_contract:
  format: markdown
  sections: [Before upload, Upload and metadata, Accessibility, Settings and compliance, Publish and first 48 hours, Copy-ready version]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build upload checklists for video creators and teams. Most upload mistakes are small and expensive: a typo in the title of a video that cannot be renamed without losing momentum, a missing paid-promotion disclosure, a wrong audience setting, captions left as raw auto-generated text, an end screen that covers the last line, or a premiere with no promotion. A checklist works when each item is a yes-or-no check, in the order the work is done, specific to the platform, and short enough that people actually use it every time. Platform features worth checking on YouTube include: chapters (timestamps in the description starting at 0:00, at least three, each at least 10 seconds), end screens (the last 5 to 20 seconds), cards, captions, the audience setting for content made for children, the paid-promotion setting, and the altered or synthetic content disclosure.
</context>

<task>
Build a pre-publish checklist for {{platform}}.

<channel>
{{channel}}
</channel>

1. Organise the checklist in the order the work happens: before upload (the file itself), upload and metadata, accessibility, settings and compliance, publish, and the first 48 hours after.
2. For each item, write a yes-or-no check, specific to {{platform}}, with a short "why" only where the reason is not obvious. Cover at least:
   - **File:** final export settings, audio levels consistent, no leftover placeholder graphics, the last seconds clear for end-screen elements if the platform has them.
   - **Packaging:** title (front-loaded keyword, length the platform shows without cutting), thumbnail or cover frame (readable at phone size, matches the title promise), description (first lines carry the hook and key link; links tested), tags or hashtags as the platform uses them.
   - **Structure:** chapters or timestamps, cards, end screens, pinned comment, playlist.
   - **Accessibility:** captions reviewed for names and terms, text on screen readable, alt text where the platform supports it.
   - **Settings and compliance:** audience setting (made for kids or not), paid promotion or branded content label, synthetic or altered content disclosure, licensed music and footage, visibility, scheduled time in the right time zone, monetisation settings.
   - **Promotion:** community or story post, newsletter, short clip, replies to early comments, and a note to check the early retention and click-through numbers.
3. Tailor the list to the channel description: add items for the mistakes it mentions and drop items that do not apply.
4. If several platforms are named, add a short section per extra platform with only what differs.
5. Give a copy-ready version as a plain checkbox list the user can paste into a task app.
</task>

<constraints>
- Every item is checkable in under a minute; split anything bigger.
- Keep the full list under about 40 items for one platform; cut anything that is a nice-to-have.
- Platform limits and features change. Where you give a specific limit, say it is to be checked against the platform's current help pages; never invent a feature.
- If {{platform}} is one you do not know well, say so and give a general checklist with the platform-specific items marked to confirm.
</constraints>

<output_format>
## Before upload
## Upload and metadata
## Accessibility
## Settings and compliance
## Publish and first 48 hours
Each section a list of `- [ ]` items with a short why where needed.

## Copy-ready version
A plain-text code block with every item as `[ ]`, no explanations.
</output_format>
