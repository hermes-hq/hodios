---
schema: 1
id: write-beta-reader-questions
kind: prompt
title: Write beta reader questions
description: Writes a beta reader questionnaire for a manuscript, with chapter check-ins and overall questions that surface confusion, boredom and engagement without leading. Use before sending a draft out.
category: fiction
version: 1.0.0
status: incubating
stage: [review]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [beta-readers, manuscript-feedback, draft-revision, questionnaire]
pairs_with:
  prompts: [critique-fiction-draft, check-story-continuity]
  workflows: [novel-revision-track]
args:
  - name: manuscript_summary
    description: Genre, target readership, length, a short summary, the chapter count or chapter list with one line each, and anything you changed since the last draft.
    type: text
    required: true
  - name: concerns
    description: What you are worried about, for example "the middle drags", "is the twist guessable", "does Jonah read as unlikeable". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Note to beta readers, Every chapter, Key moments, After finishing, Concern map (author only)]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a developmental editor who designs feedback processes for authors. Beta readers are best at reporting their experience (where they were confused, bored, surprised, moved, or stopped believing) and worst at prescribing fixes. Useful questions ask what happened in the reader's head, at a specific point, without telling them what the author hoped they felt. Leading questions ("Did you love the twist?") and vague ones ("Any thoughts?") produce praise and noise.

Manuscript: {{manuscript_summary}}
{{#concerns}}Author's concerns: {{concerns}}{{/concerns}}
</context>

<task>
1. Write a short instruction note to beta readers (under 120 words): what kind of feedback helps (reactions, not edits), how to mark moments while reading, and that honesty is the favour.
2. Write per-chapter check-in questions (the same three to four for every chapter, quick to answer), such as: where did your attention drift, anything confusing, what do you expect will happen next, would you keep reading now and why.
3. Add specific questions at key structural points (end of act one, midpoint, the twist or reveal, the climax, the last chapter), tied to the actual chapters in the summary. Use prediction questions before reveals ("Who do you suspect at this point, and why?") to test setups without leading.
4. Write overall questions at the end: character (who did you care about, who felt flat), plot believability, pacing, the ending, what they would tell a friend, and comparable books they thought of.
5. Turn each author concern into one or two neutral questions that test it indirectly. Show the concern next to its question so the author knows what each one tests, and keep that mapping out of the reader version.
6. Keep the total burden reasonable: a reader should spend no more than about five minutes per chapter on the form.
</task>

<constraints>
- No leading or yes/no questions where an open question works. Prefer "what" and "where" to "did you like".
- Never reveal the twist or ending in a question placed before the reader reaches it.
- Do not ask beta readers for line edits, grammar or how to fix things.
- Use the chapter numbers and names from the summary; if the chapter list is missing, use act-based placement and ask for the chapter list.
</constraints>

<output_format>
## Note to beta readers
## Every chapter
## Key moments
Grouped by chapter or act, each question placed where it should be asked.
## After finishing
## Concern map (author only)
Table: Concern | Question | Where asked.
</output_format>
