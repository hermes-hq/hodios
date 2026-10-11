---
schema: 1
id: turn-blog-post-into-video-script
kind: prompt
title: Turn a blog post into a video script
description: Turns a blog post or article into a spoken script for a talking-head or voice-over video, rewritten for the ear with a hook, fewer points, visuals and b-roll notes.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer, writer]
requires: [none]
inputs: [document, text]
output: [script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [repurposing, writing-for-the-ear, talking-head, voice-over, b-roll]
pairs_with:
  prompts: [write-video-hooks, package-video-title-thumbnail, adapt-script-for-teleprompter]
args:
  - name: article
    description: The full text of the blog post or article.
    type: text
    required: true
  - name: video_format
    description: Talking head (you on camera) or voice-over (your voice over visuals).
    type: enum
    enum: [talking-head, voice-over]
    default: talking-head
  - name: length_minutes
    description: Target runtime in minutes.
    type: number
    default: 6
  - name: voice_sample
    description: A transcript of you speaking, used to match your spoken voice. Leave empty to use the article's voice made conversational.
    type: text
output_contract:
  format: markdown
  sections: [What carries over, Script, Visuals list, Cut list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You adapt written articles into videos that someone films or records. Reading and listening work differently. An article can front-load context, use long sentences, headings, tables, links and asides, and readers skim to the part they want. A viewer cannot skim or reread: they need a hook that gives a reason to stay, one idea at a time, spoken signposts instead of headings, numbers rounded and said aloud, and anything that was a table or chart turned into a visual. Most articles carry more points than a video can hold, so adapting usually means cutting 40 to 60 percent of the material and keeping the points with the best examples. A 1,500-word article read aloud runs about ten minutes and feels slow; a good adaptation is usually shorter.
</context>

<task>
<article>
{{article}}
</article>

<voice_sample>
{{voice_sample}}
</voice_sample>

Format: {{video_format}}. Runtime: about {{length_minutes}} minutes (about 150 spoken words a minute).

1. Decide what carries over: the article's core promise, the three to five points with the strongest examples, and any data or quote that must stay. Everything else goes on the cut list with a reason.
2. Write a hook for the first 20 seconds that states the payoff or the problem, taken from the article's own content. Do not start with "In this video" or the article's first paragraph.
3. Rewrite each kept point for the ear: short sentences, one idea per sentence, spoken transitions ("here is the catch"), numbers rounded ("about a third" when the article says 33.8%, with the exact figure on screen).
4. Turn every table, chart, list or step sequence into a visual cue. For talking head, mark where a cutaway or on-screen graphic gives relief; for voice-over, give a visual for every line.
5. Put sources and exact figures on screen where the article cites them.
6. End with the article's conclusion or next step as a spoken call to action, and point to the full article if the creator wants that.
</task>

<constraints>
- Keep every claim as the article states it. Do not add facts, statistics, examples or opinions that are not in the article; if a point needs an example the article lacks, insert `[EXAMPLE: ...]`.
- Do not read headings aloud as headings.
- Match the voice sample if given; otherwise keep the article's tone, made conversational.
- If the article is mostly a table, code or a reference list that does not work as video, say so and suggest what kind of video would work instead.
</constraints>

<output_format>
## What carries over
The promise, the kept points in order, and must-keep figures or quotes.

## Script
Blocks headed with approximate timestamps and labels. Spoken lines as paragraphs; cues on their own lines as `[ON SCREEN: ...]`, `[B-ROLL: ...]`, `[GRAPHIC: ...]` or `[SOURCE ON SCREEN: ...]`.

## Visuals list
Table: timestamp | visual | source in the article | have it or need it.

## Cut list
Points and passages cut, with a one-line reason each, then the word count and estimated runtime.
</output_format>
