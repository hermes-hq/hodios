---
schema: 1
id: deconstruct-viral-post
kind: prompt
title: Deconstruct a viral post
description: Deconstructs why a post spread into hook, format, emotion, timing and audience, separates evidence from luck, and turns it into reusable patterns. Use to learn from a post without copying it.
category: social-media
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [content-creator, marketer]
inputs: [text, image, url]
output: [report, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [viral-content, content-analysis, hooks, swipe-file]
pairs_with:
  prompts: [adapt-trend-format, analyze-competitor-channels, write-video-hooks]
  personas: [social-media-manager]
args:
  - name: post
    description: The post's full text or a description of the video, plus what you know about it, such as the account's size, the date, the numbers it got, top comments, and your own niche if you want adaptations for it.
    type: text
    required: true
  - name: platform
    description: Where it was posted, such as tiktok, instagram, linkedin, x, youtube or reddit.
    type: string
output_contract:
  format: markdown
  sections: [What happened, Breakdown, Evidence versus guesswork, Reusable patterns, Adaptations, What not to copy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You analyse why content spreads. A post goes viral when it travels beyond the account's followers, usually because people share, stitch, quote or send it, and that happens when the post triggers a strong, shareable reaction (awe, amusement, recognition, outrage, usefulness, identity: "this is so us") in a format that is easy to consume and pass on, at a moment when the platform or the culture is receptive. Much of virality is luck and network effects: the same post can flop on Tuesday and explode on Friday, and a large account's average post can look like a small account's viral hit. Survivorship bias is the main trap: you see the winner, not the hundred similar posts that went nowhere. Useful analysis therefore separates what is visible in the post (hook, structure, format, emotional trigger) from what is guesswork (timing, algorithm, who shared it), and turns the visible parts into patterns a creator can test, not templates to copy.
</context>

<task>
<post>
{{post}}
</post>

Platform: {{platform}} (if empty, infer it from the post and say so).

1. **What happened:** summarise the post in two sentences and what is known about its reach relative to the account's normal performance. If the account's normal performance is unknown, say that the scale of the outlier is unknown.
2. **Break it down** on six dimensions, quoting the post where possible:
   - **Hook:** the first line, frame or second, and the mechanism (curiosity gap, bold claim, relatable pain, pattern interrupt, visual surprise).
   - **Format and structure:** length, pacing, list or story, the payoff and where it lands.
   - **Emotion and motive to share:** the reaction it triggers and why someone would send it to a specific person or post it to their own audience.
   - **Audience:** who it speaks to and the identity it signals for the person sharing it.
   - **Timing and context:** news, seasons, trends or platform moments it rode, marked as inference.
   - **Platform fit:** how it uses the platform's native behaviours (stitches, duets, quote posts, saves, comments, sends).
3. **Evidence versus guesswork:** a short table of what is visible in the post versus what is inferred, and how confident you are in each.
4. **Reusable patterns:** three to five patterns written as templates with blanks ("Open with the mistake everyone makes about [topic], then show [the fix] in [n] steps"), each with why it works and the conditions it needs.
5. **Adaptations:** if the user gave their niche, write three post ideas applying the patterns to it; otherwise give one example each for three different niches.
6. **What not to copy:** elements that are specific to the original creator, risky (rage bait, misleading claims, someone else's joke or format that would be plagiarism), or unlikely to transfer.
</task>

<constraints>
- Ground every claim about the post in its text or the supplied details; label inferences as inferences.
- Never present the patterns as a formula that guarantees reach; say that each needs testing.
- Do not recommend reproducing the original's words, jokes or distinctive creative elements; adaptations must be original.
- Flag patterns that rely on outrage, misinformation or mocking people, and offer a non-harmful alternative mechanism.
- If the post is only described vaguely (no text, no details), ask for the text or a fuller description before analysing.
</constraints>

<output_format>
## What happened
## Breakdown
Six labelled short paragraphs.

## Evidence versus guesswork
A table: element | visible or inferred | confidence.

## Reusable patterns
Numbered templates, each with why it works and its conditions.

## Adaptations
## What not to copy
</output_format>
