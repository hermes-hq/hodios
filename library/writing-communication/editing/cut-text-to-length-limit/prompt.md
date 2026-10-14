---
schema: 1
id: cut-text-to-length-limit
kind: prompt
title: Cut a text to a hard length limit
description: Cuts a text to a hard word or character limit, such as a form field, abstract, bio or ad slot, by deciding which content goes rather than only trimming filler, and reports the exact final count.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, job-seeker, student, individual]
requires: [none]
inputs: [text]
output: [rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [word-limit, character-limit, concision, application-forms, content-triage]
pairs_with:
  prompts: [tighten-prose, write-professional-bio, critique-draft]
  personas: [editor]
args:
  - name: text
    description: The text that is over the limit.
    type: text
    required: true
  - name: limit
    description: "The hard limit and its unit, for example \"150 words\", \"500 characters including spaces\" or \"280 characters\"."
    type: string
    required: true
  - name: purpose
    description: "Where the text goes and who reads it, for example \"scholarship application answer: why this course\" or \"conference abstract\". Decides what to keep."
    type: text
output_contract:
  format: markdown
  sections: [Cut text, Count, What was cut, Options if you want something back]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A hard limit is different from "make it shorter". A form field that truncates at 500 characters or an abstract capped at 250 words does not care how elegant the cut was; going one over can mean rejection or a sentence chopped mid-word. Trimming filler usually saves 10 to 20 percent. Beyond that, the real decision is which content goes: the second example, the background the reader already has, the list item that repeats a stronger one. Writers cut evenly from every sentence and end up with a text that is short but says nothing well; good cutting keeps the one or two points the reader must take away and removes whole lower-value points. Character limits also behave differently from word limits: spaces, punctuation and line breaks usually count, and long words are expensive.
</context>

<task>
Cut the text below to fit this limit: {{limit}}.
{{#purpose}}Where it goes and who reads it: {{purpose}}{{/purpose}}

<text>
{{text}}
</text>

1. If the text is empty or the limit has no number, ask and stop. If the unit is unclear (characters with or without spaces), assume spaces count and say so.
2. Count the text as given. If it is already within the limit, say so, give the count, and offer only optional tightening.
3. Work out how much must go and decide the strategy: under about 20 percent over, trim language; more than that, also drop content.
4. Identify the core: the one or two points this reader must get, plus any facts the purpose requires (names, numbers, dates, the ask). If no purpose was given, infer it from the text and state your assumption.
5. Rank the remaining content by value to that reader and cut from the bottom: repeated points, secondary examples, background the reader already knows, hedges, scene-setting openers.
6. Then trim language: filler, long phrases, nominalisations. For character limits, also prefer shorter words and numerals where the style allows.
7. Count again. Aim to land at 95 to 100 percent of the limit, never over. If the core alone exceeds the limit, say so and show the smallest version you can, with what it costs.
</task>

<constraints>
- Never exceed the limit. Count carefully, and if you are not certain of an exact character count, leave a safety margin of a few characters and say so.
- Do not invent or change facts, numbers, names or claims to save space.
- Do not use abbreviations, symbols or dropped articles the reader would find sloppy unless the format (an ad, a social bio) expects them.
- Keep the author's voice and person (I, we).
- Keep the result as complete sentences that read naturally, not a compressed list of fragments, unless the original was a list.
</constraints>

<output_format>
## Cut text
The final text, ready to paste.
## Count
"Before: N · After: M · Limit: L ({{limit}})", with the unit used.
## What was cut
Bullets: each whole point removed and why it was the lowest value, then the main kinds of wording trimmed.
## Options if you want something back
One or two cut points that could return, and what to drop to make room for each.
</output_format>
