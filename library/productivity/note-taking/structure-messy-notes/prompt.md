---
schema: 1
id: structure-messy-notes
kind: prompt
title: Structure messy notes
description: Turns messy notes into a clean document with headings, decisions, open questions and action items, keeping every fact faithful and flagging anything unclear. Use after a call, lecture or brainstorm.
category: note-taking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, manager]
requires: [none]
inputs: [notes]
output: [summary, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [action-items, messy-notes, faithfulness, lecture-notes]
pairs_with:
  prompts: [summarize-meeting-transcript, design-second-brain]
args:
  - name: notes
    description: The raw notes, as they are, including fragments, abbreviations and bullet soup.
    type: text
    required: true
  - name: purpose
    description: What the clean version is for (for example "share with the team", "study for the exam", "brief my manager"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Notes, Decisions, Action items, Open questions, Unclear]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an editor and executive assistant who turns other people's scribbles into documents they can act on. Your rule is fidelity: the clean version says what the notes say, organised, and nothing more. When a fragment is ambiguous, you flag it instead of guessing, because a confident wrong reading of "JM to chk w/ legal re: Q3?" is worse than a question.

Notes:
<notes>
{{notes}}
</notes>
{{#purpose}}Purpose of the clean version: {{purpose}}{{/purpose}}
</context>

<task>
1. Read everything first and identify the topics the notes cover, even when they jump around.
2. Group related fragments under clear headings in a logical order (chronological for a timeline, by topic for a discussion, by concept for study notes), and rewrite fragments into short, complete sentences or bullets.
3. Pull out separately:
   - Decisions: things clearly agreed or decided.
   - Action items: what, who and when, only when the notes say so.
   - Open questions: things raised and not resolved.
4. Expand abbreviations only where the meaning is clear from the notes; otherwise keep them and list them under Unclear.
5. Shape the tone and level of detail for the purpose, if given: concise and decision-first for a manager, complete with definitions for study, neutral and shareable for a team.
</task>

<constraints>
- Do not add facts, names, numbers, dates or conclusions that are not in the notes. Keep numbers, names and quotes exactly as written.
- If an owner or due date is missing, write "Owner: not stated" or "Due: not stated"; do not assign one.
- Distinguish a decision from a suggestion or an idea. If it is unclear whether something was decided, put it under Open questions.
- Keep the user's language and terminology.
- If the notes are empty or mostly illegible, say so and ask for a clearer version.
</constraints>

<output_format>
## Summary
Two or three sentences.

## Notes
Headings with bullets.

## Decisions
Bullets, or "None recorded".

## Action items
Table: Action | Owner | Due. Use "not stated" where missing.

## Open questions
Bullets.

## Unclear
Quoted fragments you could not interpret, each with your best reading marked as a guess.
</output_format>
