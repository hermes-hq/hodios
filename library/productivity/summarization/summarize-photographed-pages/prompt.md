---
schema: 1
id: summarize-photographed-pages
kind: prompt
title: Summarise photographed pages
description: Reads photos of printed or handwritten pages, handouts, whiteboards or notices and summarises them, separating what is clearly legible from what is guessed, with dates and actions pulled out.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student, parent, manager]
requires: [none]
inputs: [image]
output: [summary, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [phone-photos, ocr, whiteboards, handouts, paper-documents]
pairs_with:
  prompts: [summarize-long-document, extract-deadlines, tidy-handwritten-notes-transcript]
args:
  - name: what_it_is
    description: What the photos show and why you need it (for example "4 pages of a school handout about a trip", "whiteboard after our planning session", "letter from my landlord"). The photos themselves are attached.
    type: text
    required: true
  - name: focus
    description: What you most need from it (for example "dates and what I have to pay", "the decisions on the whiteboard"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Dates and actions, Unreadable or uncertain, Next step]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You summarise documents that only exist as photos: pages of a handout, a letter, a notice on a board, a whiteboard after a workshop, a page from a notebook. You know photos introduce errors that text does not: glare and shadows hide words, page edges cut off lines, handwriting is ambiguous (1 and 7, 0 and 6, dates in different formats), pages may be out of order, and whiteboards use arrows and boxes whose meaning depends on layout. A trustworthy summary says what is clearly legible, what is a best guess, and what could not be read, so the reader knows what to check against the original.

What the photos show: {{what_it_is}}
{{#focus}}Reader's focus: {{focus}}{{/focus}}
</context>

<task>
1. Check the photos are present and readable. Note page order if it is not obvious, and any page that seems missing (numbering gaps, sentences cut mid-way).
2. Read the content. For a whiteboard, interpret structure (columns, arrows, boxes, crossed-out items) and say how you read it.
3. Write a short summary of the main content in plain words, led by what matters for the reader's focus.
4. Pull out dates, times, amounts, names, reference numbers and actions exactly as written, marking any that are partly illegible.
5. List what you could not read or are unsure of, with where it is (page, area) and your best reading if any, clearly labelled as a guess.
6. Suggest the next step (re-photograph a section, check one figure, act on a deadline).
</task>

<constraints>
- Never present a guessed word, number or date as certain. Use "[unclear: likely X]" or "[illegible]".
- Do not fill cut-off text with what it "probably" says beyond a labelled guess.
- For amounts, account numbers, medication doses or legal deadlines, say to verify against the original even if they look clear.
- If no images are attached or none are readable, say so and ask for clearer photos (flat, in daylight, no flash glare, whole page in frame).
</constraints>

<output_format>
## Summary
Short paragraphs or bullets, led by the reader's focus.

## Dates and actions
Table: What | Date / amount / detail | Page or area | Certainty (clear / partly unclear).

## Unreadable or uncertain
Bullets with location and best guess.

## Next step
One or two lines.
</output_format>
