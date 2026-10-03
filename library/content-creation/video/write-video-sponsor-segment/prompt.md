---
schema: 1
id: write-video-sponsor-segment
kind: prompt
title: Write a video sponsor segment
description: Writes a sponsor segment for a video that fits the creator's voice, covers the required points and disclosure, bridges in and out of the topic and keeps viewers watching. Use for sponsored uploads.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator]
stack: [youtube]
inputs: [document, text]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [sponsorship, integration, ad-disclosure, paid-promotion, retention]
pairs_with:
  prompts: [write-podcast-ad-read, pitch-brand-sponsorship, write-media-kit]
  personas: [youtube-strategist]
args:
  - name: sponsor_brief
    description: The sponsor's brief with the product, must-say points, the offer and link or code, banned claims, placement, and any rules about showing the product. Add your real experience with the product, if any.
    type: text
    required: true
  - name: video_topic
    description: What the video is about and the moment where the segment goes. Paste a few lines of your own script or transcript so the segment matches your voice.
    type: text
    required: true
  - name: seconds
    description: Target length of the segment in seconds.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Segment script, Shot list, Description and pinned comment, Brief and compliance check, Fill before recording]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write sponsor integrations for video creators. Viewers skip sponsor segments that feel like a channel break, so the best ones bridge from the video's topic into the sponsor with a real link, show the product being used instead of listing features, sound exactly like the creator, stay tight, and hand back to the video with a reason to keep watching. Disclosure is not optional: platform policies (YouTube's paid promotion setting, for example) and advertising rules in most markets require a clear, early statement of a paid relationship, said aloud and shown on screen, not hidden in the description. On-camera speech runs about 150 words per minute, and showing the product often replaces words.
</context>

<task>
<sponsor_brief>
{{sponsor_brief}}
</sponsor_brief>

<video_topic>
{{video_topic}}
</video_topic>

1. Extract the product, must-say points, offer, link or code, banned claims, placement and product-showing rules. List anything missing.
2. Find the bridge: the most natural connection between the video's topic at that moment and the sponsor (a problem the topic raises that the product solves, a tool used in the video itself, or an honest "this is what pays for videos like this"). Offer two bridge options and pick one.
3. Write the {{seconds}}-second segment:
   - Disclosure in the first sentence, plain and spoken ("This video is sponsored by…"), plus an on-screen label.
   - The bridge, then the must-say points shown through use where possible, with `[SHOW: …]` cues.
   - The offer once, the link or code said clearly and shown on screen.
   - A return line that pulls viewers back into the video with a tease of what comes next.
4. Match the creator's voice from the script sample: sentence length, humour, verbal habits. If there is no sample, write in a plain, warm voice and say so.
5. Write the description line and a pinned comment with the link, both carrying the disclosure.
</task>

<constraints>
- Stay within 10% of 2.5 spoken words per second of {{seconds}}, leaving room for silent product shots.
- Never imply the creator has used the product if the brief gives no real experience; use an honest angle and add `[PERSONAL: …]` for the creator to fill if they try it.
- Never invent features, prices, discounts, deadlines or statistics; missing details become `[FILL: …]`.
- Remove or soften any claim the brief bans or that needs substantiation (health, money, performance, "best"), and say so in the compliance check.
- Remind the creator to switch on the platform's paid-promotion disclosure setting.
- If the brief asks for something misleading (hiding the sponsorship, presenting the ad as an independent recommendation), write the honest version and explain in one line.
</constraints>

<output_format>
## Segment script
Spoken lines with `[SHOW: …]` and `[ON SCREEN: …]` cues, the bridge and return marked. Then the word count.

## Shot list
Bullets of product shots and screen captures.

## Description and pinned comment
Both texts, ready to paste.

## Brief and compliance check
Each must-say point and where it appears, the disclosure placements, and claims softened or left out.

## Fill before recording
Every placeholder and missing detail.
</output_format>
