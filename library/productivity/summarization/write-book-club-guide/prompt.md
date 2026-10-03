---
schema: 1
id: write-book-club-guide
kind: prompt
title: Write a book club guide
description: Builds a book club guide with a spoiler-safe summary up to the agreed chapter, themes, discussion questions and an activity. For book club hosts.
category: summarization
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, teacher]
subject: [literature]
requires: [none]
inputs: [topic, notes]
output: [summary, questions, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [book-club, reading-group, discussion-questions, spoiler-free, host-guide]
pairs_with:
  prompts: [summarize-book]
args:
  - name: book
    description: Title and author, and the edition or translation if the group uses a particular one.
    type: string
    required: true
  - name: chapters_covered
    description: How far the group has read (for example "Part One, chapters 1-12", "the whole book", "up to page 180"). Optional; defaults to the whole book.
    type: string
  - name: group_notes
    description: About the group and session - size, how long you meet, what they enjoyed or found flat before, sensitivities to handle with care, and your own notes or chapter summaries if you have them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you start, Summary so far, Characters, Themes, Discussion questions, Activity, Session plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced book club host and literature teacher. Good book club sessions run on open questions that have no single right answer, connect the book to members' own lives and views, and let quieter members in. Bad ones turn into a plot recap, a quiz, or a debate about whether people "liked" the book. In clubs that read in instalments, spoilers beyond the agreed point are the fastest way to annoy everyone.

Book: {{book}}
{{#chapters_covered}}Read so far: {{chapters_covered}}{{/chapters_covered}}
{{#group_notes}}
<group_notes>
{{group_notes}}
</group_notes>
{{/group_notes}}
</context>

<task>
1. Check what you know. If you are not confident about this book's content up to the agreed point (a recent, niche or self-published book, or an edition with different chapter numbering), say so plainly and ask the host to paste a short summary or their notes for those chapters; then build the guide only from what they give. Never guess plot details.
2. Set the spoiler boundary: everything in the guide stays within the chapters read. If no limit is given, treat the whole book as read and say so at the top. If a theme or question would only make sense with later events, leave it out.
3. Write a summary of the story so far in 200 to 350 words, in your own words, as a refresher, not a replacement for reading.
4. List the main characters introduced so far, one line each, with what we know about them by this point.
5. Name three to five themes or ideas, each with a sentence on where it shows up in the chapters read (scenes or moments, not long quotations).
6. Write ten to twelve discussion questions, mixed across:
   - warm-up questions anyone can answer, even if they have not finished;
   - character and choices ("Why do you think … chose to …?");
   - craft (structure, voice, setting, the title);
   - themes and connections to members' lives or the world today;
   - predictions (only for instalment reading) and a closing question.
   Mark two or three as best for starting and two as deeper.
7. Suggest one activity that fits the book and the group (a reading of a favourite passage, a themed food or drink, a "cast the film" round, a map of the setting, a short writing prompt), with what to prepare.
8. A session plan for the meeting length (assume 90 minutes if not given) with a welcome, the discussion in blocks, the activity, and choosing the next book.
</task>

<constraints>
- Do not reproduce long passages from the book; refer to scenes and use at most a short phrase in quotation marks.
- If the group notes mention sensitive themes (grief, abuse, suicide, violence), add a short note for the host on content warnings and on handling personal disclosures kindly, and avoid questions that push members to share painful experiences.
- Keep questions open; avoid yes/no and quiz questions with a single right answer.
</constraints>

<output_format>
## Before you start
One or two lines: the spoiler boundary and any content note.

## Summary so far
200 to 350 words.

## Characters
Bullets.

## Themes
Bullets.

## Discussion questions
Numbered, grouped by type, with the starting and deeper questions marked.

## Activity
What, why, and what to prepare.

## Session plan
Table: Time | Segment | Notes.
</output_format>
