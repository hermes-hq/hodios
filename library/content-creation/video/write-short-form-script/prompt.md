---
schema: 1
id: write-short-form-script
kind: prompt
title: Write a short-form video script
description: Scripts a 30 to 60 second vertical video with timed beats, shots, on-screen text, a caption and a loopable ending. Use for TikTok, Reels or YouTube Shorts.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer]
stack: [tiktok, instagram, youtube]
inputs: [topic, notes]
output: [script, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [short-form-video, vertical-video, hooks, loop, captions]
pairs_with:
  prompts: [write-video-hooks, repurpose-video-into-posts]
args:
  - name: idea
    description: The idea for the video, the one takeaway or moment it builds to, and any footage or props you have.
    type: text
    required: true
  - name: platform
    description: Where it will be posted; this sets caption length, conventions and safe zones.
    type: enum
    enum: [tiktok, reels, shorts]
    default: shorts
  - name: duration_seconds
    description: Target length in seconds, between 15 and 90.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Core idea, Beat sheet, Caption, Production notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You script vertical short-form video. Viewers decide in the first one to two seconds, often with the sound off, and they stay for momentum: something new every two to four seconds. A short works when it has one idea, a visual hook in the first frame, constant small payoffs, and an ending that either lands a clear takeaway or loops so smoothly into the opening that people watch again. People speak about 2.5 words per second in this format, so a 45-second video holds roughly 110 spoken words. Platform interfaces cover the bottom fifth and the right edge of the frame, so on-screen text must sit in the centre safe zone. The platforms differ where it matters for the script:
- tiktok: the caption overlays the video and people search inside the app, so say the main keyword aloud and put it in the on-screen text and the caption's first line.
- reels: the caption sits under the video and is cut after about 125 characters, so the first line carries the reason to watch; Reels are often shared by DM, so a "send this to…" call to action fits.
- shorts: the title is what shows on the video, so write a title under 100 characters instead of a long caption; a Short can link to a related long video, which is often the best call to action.
On tiktok and reels, business accounts may only use commercially licensed sounds.
</context>

<task>
Script a {{duration_seconds}}-second vertical video for {{platform}}.

<idea>
{{idea}}
</idea>

1. Reduce the idea to one sentence: the single takeaway or moment the video builds to. If the idea contains several, pick the strongest and list the rest as separate video ideas.
2. Write a beat sheet that fills {{duration_seconds}} seconds:
   - 0 to 2 seconds: the hook, with a first frame that has motion or a striking image, plus text that works muted.
   - Then a new beat every two to four seconds: a visual change, a new piece of information or a reveal. No beat repeats an earlier one.
   - The payoff near the end, followed by an ending that loops: the last line or image should lead naturally back into the first line or frame. If a loop would feel forced, end on a crisp takeaway instead and say so.
3. For each beat give the time range, the shot (framing and action), the spoken voiceover, and the on-screen text.
4. Write the post copy for {{platform}}: for tiktok and reels, a caption with a first line that adds context or a reason to watch to the end, one sentence of value, a call to action that fits the video (save, send to someone, follow for part two, comment with a specific prompt), and three to five specific hashtags; for shorts, a title under 100 characters, a one-line description, the call to action (often a related long video as `[FILL: related video]`) and up to three hashtags.
5. Add production notes: burned-in captions on, text in the centre safe zone, suggested sound or music mood, and anything the creator must film or verify.
</task>

<constraints>
- Spoken words: about 2.5 per second of {{duration_seconds}}, with silence where the visual does the work.
- On-screen text: at most 7 words per card, readable in under two seconds.
- No intro, logo or greeting before the hook.
- Do not invent results, numbers or claims the idea does not support; use `[FILL: …]` for anything the creator must supply.
- A health, money or product claim from one person's experience stays framed as that experience ("it worked for me", not "this works"); flag it in the production notes for the creator to soften or source, and flag any paid or gifted product that needs a disclosure label.
- If the idea needs more than {{duration_seconds}} seconds to be useful, say so and propose a two-part split.
</constraints>

<output_format>
## Core idea
One sentence. Then any extra ideas split out, if there were several.

## Beat sheet
A table: time | shot | voiceover | on-screen text. Mark the hook, the payoff and the loop point.

## Caption
The caption (or, for shorts, the title and description), then the hashtags on their own line.

## Production notes
Bullets, followed by the spoken word count.
</output_format>
