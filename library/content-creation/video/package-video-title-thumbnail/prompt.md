---
schema: 1
id: package-video-title-thumbnail
kind: prompt
title: Package a video title and thumbnail
description: Pairs video title options with thumbnail concepts that work together, optimised for clicks without misleading viewers. Use before publishing a video or when one is under-performing.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer]
stack: [youtube]
inputs: [text, notes]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [packaging, click-through-rate, thumbnails, video-titles]
pairs_with:
  prompts: [write-youtube-script, write-video-hooks, write-video-chapters]
args:
  - name: video_summary
    description: What happens in the video and what the viewer gets, including the strongest moment or result and roughly when it appears.
    type: text
    required: true
  - name: audience
    description: Who should click (for example "people who just bought their first film camera"). Leave empty to infer it from the summary.
    type: string
  - name: count
    description: How many title and thumbnail pairs to write.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [Core promise, Packages, Test plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a packaging specialist for video. On a crowded home page or search results page, the title and thumbnail are read together in about a second, at phone size. The best packages split the work: the thumbnail shows (a face, an object, a before-and-after, a result) and the title tells (the stakes, the twist, the context). When both say the same words, the space is wasted. A package earns a click by opening a curiosity gap that the video closes; when it promises something the video does not deliver early, viewers leave in the first minute, and platforms learn to show the video less.
</context>

<task>
Write {{count}} title and thumbnail packages for this video.

<video_summary>
{{video_summary}}
</video_summary>

<audience>
{{audience}}
</audience>

1. State the core promise in one sentence: what the viewer gets. If the audience is empty, name the audience you are targeting.
2. Write the packages, each built around a different curiosity mechanism: result, contrast or before-and-after, mystery, stakes, challenge or test, specific number, identity ("for people who…"). For each:
   - Title: under 60 characters, the most important words first, plain words this audience would search or say.
   - Thumbnail: the focal subject, the expression or key object, the composition, the dominant colours, and at most four words of text that add to the title instead of repeating it.
   - Mechanism: which curiosity mechanism it uses.
   - Honesty check: where in the video the promise is paid off, based on the summary. If the summary does not show it is delivered early, say so.
3. Recommend two packages to test against each other, each testing a different mechanism, and say what result would tell the creator something.
</task>

<constraints>
- Do not promise anything the summary does not show happens. No fake stakes, invented numbers, misleading faces or arrows pointing at nothing.
- Thumbnail text and title must not repeat the same words.
- Avoid all-caps titles, more than one exclamation mark, and stacked clickbait phrases ("you won't believe", "shocking").
- If the summary is too thin to know the payoff, ask for the result and when it happens instead of guessing.
</constraints>

<output_format>
## Core promise
One sentence, plus the target audience.

## Packages
A table: # | Title | Thumbnail (subject, composition, colours, text) | Mechanism | Honesty check

## Test plan
Two packages to test, what each tests, and what a win would mean.
</output_format>
