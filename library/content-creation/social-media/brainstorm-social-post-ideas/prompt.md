---
schema: 1
id: brainstorm-social-post-ideas
kind: prompt
title: Brainstorm social post ideas
description: Generates a bank of social post ideas from your business or expertise, grouped by content pillar and format, each with a hook, why the audience cares and the raw material you need.
category: social-media
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [content-creator, marketer, founder, individual]
inputs: [text, preferences]
output: [ideas, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [content-pillars, idea-bank, hooks, audience-questions]
pairs_with:
  prompts: [define-content-pillars, plan-sustainable-posting-schedule, plan-carousel-post]
  personas: [social-media-manager]
args:
  - name: about
    description: Your business, job or expertise, who you want to reach, what they struggle with or ask you about, what you can show (products, process, results, stories), and your content pillars if you have them.
    type: text
    required: true
  - name: platforms
    description: Where you post, for example Instagram, LinkedIn, TikTok, Facebook.
    type: string
    required: true
  - name: avoid
    description: "Optional: topics or formats you do not want, and ideas you have already used."
    type: text
output_contract:
  format: markdown
  sections: [Pillars, Idea bank, Easiest five to start, Keep the bank full]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"What do I post?" is the most common reason people stop posting. Generic idea lists ("share a quote", "post a throwback") produce generic posts. The ideas that work come from the audience's real questions and problems, the person's own process and opinions, and the things only they can show: a mistake customers make, how something is made, a before-and-after, a myth in the field, a decision explained. Organising ideas into three to five pillars keeps an account recognisable, and pairing each idea with a format and a hook makes it ready to write. An idea also needs raw material (a photo, a number, a story); ideas that need nothing the person has will never get made.

<about>
{{about}}
</about>
Platforms: {{platforms}}
{{#avoid}}
<avoid>
{{avoid}}
</avoid>
{{/avoid}}
</context>

<task>
1. If the input does not say what the person does or who the audience is, ask that in one question and stop.
2. If the input names content pillars, use them as given. Otherwise propose three to five working pillars, each tied to an audience need and to something the person can credibly speak about (for a full pillar and positioning exercise, use define-content-pillars first).
3. Generate 25 to 30 ideas across the pillars. For each: the idea in one line, a hook (first line or first three seconds), the format suited to the named platforms (carousel, short video, photo with caption, text post, poll), why the audience cares, and the raw material needed.
4. Mix types: answers to common questions, myths and mistakes, process and behind the scenes, opinions, stories, results, practical how-tos.
5. Pick the easiest five to start with, needing only material the person probably has.
6. Give a short routine for keeping the bank full (for example noting customer questions weekly).
</task>

<constraints>
- Ideas must fit the person's actual expertise and material; do not suggest claims, results or stories that require facts not given, unless marked as needing them.
- No engagement-bait formats ("comment YES"), no trend ideas that depend on audio or memes the user has not mentioned.
- Respect the avoid list.
</constraints>

<output_format>
## Pillars
Bullets: pillar and the audience need it serves.
## Idea bank
Table: Pillar | Idea | Hook | Format | Why they care | Material needed.
## Easiest five to start
Numbered list.
## Keep the bank full
Bullets.
</output_format>
