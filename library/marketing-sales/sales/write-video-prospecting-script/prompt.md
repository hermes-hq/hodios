---
schema: 1
id: write-video-prospecting-script
kind: prompt
title: Write a video prospecting script
description: Writes a 45 to 90 second personalised prospecting video script with a screen-share moment, a thumbnail idea and the short email that carries the video to the prospect.
category: sales
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, founder, consultant]
requires: [none]
inputs: [text, notes]
output: [script, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [video-prospecting, personalization, outbound, meeting-booking]
pairs_with:
  prompts: [write-cold-outreach, write-outbound-sequence, research-prospect-account]
  personas: [sales-coach]
args:
  - name: prospect
    description: Who the video is for (name, role, company) and the specific thing you will show or refer to, such as their website, a job posting, a public review, a product page or a post they wrote.
    type: text
    required: true
  - name: offer
    description: What you sell, the problem it solves and one piece of proof you can mention.
    type: text
    required: true
  - name: length_seconds
    description: Target video length in seconds, between 45 and 90.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Video plan, Script, Thumbnail, Email, Recording tips]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach reps who use short recorded videos in prospecting. A video works when the first five seconds prove it was made for this one person: their name, and their website, posting or product on screen. It fails when it is a generic pitch with a face on it, when it runs past 90 seconds, or when the rep reads a script stiffly.

The structure that works: personal hook (name plus what is on screen), one observation about their situation, the problem it likely creates, one proof point, one easy ask. Most people decide whether to watch from the thumbnail and email, so the thumbnail should show something recognisably theirs (their homepage, their logo, a whiteboard with their name), and the email should be short and say why the video exists. Speaking pace is roughly 130 to 150 words per minute.
</context>

<task>
Write a {{length_seconds}}-second prospecting video.

<prospect>
{{prospect}}
</prospect>

<offer>
{{offer}}
</offer>

1. Plan the video: what is on screen at each moment and the one observation the video rests on. If the prospect information gives nothing specific to show, say so and suggest what to find before recording.
2. Write the script, timed to {{length_seconds}} seconds at about 140 words per minute, in spoken language with short sentences. Mark the screen-share moment and where to point or scroll.
3. Suggest a thumbnail: what is visible and any short handwritten or overlay text (under five words).
4. Write the email that carries the video: a subject of two to five words, 30 to 60 words of body that says why you made it, and a plain-text fallback line so the email makes sense without the video.
5. Give three recording tips specific to this script.
</task>

<constraints>
- Use only facts from the prospect information and offer. Never invent stats, customers or claims about their site.
- Do not criticise the prospect's website or business harshly on camera; frame observations as questions or common patterns.
- One ask only, low friction (reply, or a 15-minute call).
- Keep the script within about 10% of the target length; state the word count.
- Note that the email should not depend on an auto-playing video or an attachment; a link or image link is the norm.
</constraints>

<output_format>
## Video plan
Table: Seconds | On screen | Purpose.

## Script
The spoken script with [screen] cues and word count.

## Thumbnail
One or two lines.

## Email
Subject options, body, fallback line.

## Recording tips
Three bullets.
</output_format>
