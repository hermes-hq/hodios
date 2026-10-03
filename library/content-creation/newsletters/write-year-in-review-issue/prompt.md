---
schema: 1
id: write-year-in-review-issue
kind: prompt
title: Write a year-in-review issue
description: Writes a year-in-review newsletter issue with the year's story, the reader favourites, honest numbers, lessons, specific thanks and what comes next. Use for an end-of-year or anniversary issue.
category: newsletters
version: 1.0.0
status: incubating
stage: [build, learn]
role: [content-creator, writer, founder]
inputs: [notes, dataset]
output: [article, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [year-in-review, reader-thanks, milestones, anniversary-issue]
pairs_with:
  prompts: [write-newsletter-issue, grow-newsletter]
args:
  - name: year_notes
    description: Your notes on the year, such as the most-read and most-replied issues, subscriber and open-rate numbers (start and end), milestones, what failed or changed, reader replies you loved (with permission to quote), what you learned, and plans for next year.
    type: text
    required: true
  - name: newsletter_voice
    description: A past issue or a few paragraphs in your voice, and who your readers are. Leave empty for a warm, direct voice.
    type: text
output_contract:
  format: markdown
  sections: [Subject lines, Issue, Before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help independent writers and small publications write their end-of-year issue. The year-in-review is often the most-opened issue of the year and the easiest to get wrong: a wall of vanity metrics, a chronological list of every issue, or a long thank-you nobody reads. Readers want three things from it: the best of what they may have missed, a sense of the person and the story behind the newsletter, and a reason to stay for next year. Honesty works better than polish here: one thing that did not go to plan, and what the writer learned, makes the wins believable.
</context>

<task>
Write a year-in-review issue.

<year_notes>
{{year_notes}}
</year_notes>

<newsletter_voice>
{{newsletter_voice}}
</newsletter_voice>

1. Find the year's story: the one-sentence arc of the year (for example "the year the newsletter went from hobby to job", "the year we learned to say less"). Build the issue around it.
2. Write three subject lines under 50 characters and a preview text under 90 characters.
3. Write the issue (about 600 to 900 words):
   - **Opening:** a specific moment from the year that captures its story, then a line on what this issue contains.
   - **The best of the year:** three to five issues or pieces, each with the title as `[LINK: title]`, one sentence on what it was, and why readers loved it (opens, replies or the writer's choice, as the notes say).
   - **By the numbers:** three to five figures from the notes that mean something to readers (for example replies, countries, books recommended), each with a short human comment. Skip this section if the notes have no figures. Do not present open rates or revenue unless the writer chose to share them.
   - **What didn't work:** one honest thing that failed or changed, and the lesson.
   - **Thank you:** specific, naming groups or (with permission) people and what they did: readers who replied, paid subscribers, guest writers, sponsors.
   - **Next year:** two or three concrete plans and one invitation (reply with what you want more of, share with a friend, become a paid subscriber, if the notes mention it).
   - **Sign-off** in the writer's voice.
4. Match the voice sample's tone and rhythm. If there is none, write warm, direct and first person.
</task>

<constraints>
- Use only numbers, titles, quotes and events from the notes. Do not invent milestones, reader quotes or statistics; mark gaps `[ADD: …]`.
- Quote readers only where the notes indicate permission; otherwise paraphrase without names.
- No humblebragging or inflated framing; let the numbers speak plainly.
- Plain formatting that survives email clients.
</constraints>

<output_format>
## Subject lines
Three options and the preview text.

## Issue
The full issue, ready to paste.

## Before sending
`[LINK]` and `[ADD]` items, quotes to confirm permission for, and numbers to double-check.
</output_format>
