---
schema: 1
id: make-audio-revision-script
kind: prompt
title: Make an audio revision script
description: Turns notes into a spoken revision script written for the ear, with pauses for the listener to answer questions aloud before the answer plays, ready to record.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
requires: [none]
inputs: [notes, text]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [audio-revision, dyslexia, commuting, retrieval-practice]
pairs_with:
  prompts: [make-flashcards, run-blurting-session, make-study-guide]
  personas: [assistive-technology-specialist]
args:
  - name: notes
    description: The notes to turn into audio, e.g. a revision summary, lecture notes or a textbook section.
    type: text
    required: true
  - name: minutes
    description: Target length of the recording in minutes.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Running order, Script, Recording notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Listening to notes read aloud is passive and easy to drift through. A good revision recording works like a quiz on the move: short explanations, then a question, a pause long enough to answer aloud, then the answer. It suits commuting, chores and learners who find reading tiring, including many dyslexic learners. Writing for the ear differs from writing for the page: listeners cannot glance back, so sentences are short, structure is announced, key terms are repeated rather than swapped for synonyms, and symbols, tables and diagrams have to be turned into speech.

Target length: about {{minutes}} minutes. Speech runs at roughly 130 to 150 words a minute, and pauses count, so plan for about 110 words of script per minute.
</context>

<task>
<notes>
{{notes}}
</notes>

1. Pick the content that fits the length, most important first. Split it into segments of 2 to 3 minutes, each on one idea.
2. Write an intro of 2 or 3 sentences: what this recording covers, in how many parts.
3. For each segment:
   - Signpost: "Part two. Osmosis."
   - Explain in sentences of 20 words or fewer, one idea per sentence. Say each key term, then define it, then use it again.
   - Ask 1 or 2 questions, then write [PAUSE 5 SECONDS] (10 seconds for questions that need a list or a short calculation).
   - Give the answer in one or two sentences, starting with the key term.
   - Recap in one sentence.
4. Turn everything visual into speech: write out numbers, units and symbols as they are said ("nine point eight metres per second squared"), read formulas in words, describe a diagram in at most three spoken steps or say "look at the diagram in your notes" if it cannot be spoken.
5. End with a rapid-fire round: 5 questions from across the recording, each with a pause and answer.
6. Add recording notes.
</task>

<constraints>
- Use only content from the notes; do not add facts. If something in the notes looks wrong, leave it out of the script and list it in the recording notes to check.
- No tables, bullet lists or text in brackets inside the spoken text, apart from the pause markers.
- Avoid lists longer than three items spoken in one go; split them.
- Keep the script within about 10% of the target word count. If the notes do not fit, say what was left out for a second recording.
- If the notes are too short for the requested length, write a shorter script and say so rather than padding.
</constraints>

<output_format>
## Running order
Table: Part | Topic | Approximate minutes.

## Script
The script as plain spoken text, with "Part N" signposts and [PAUSE N SECONDS] markers on their own lines. State the word count at the end.

## Recording notes
4 to 6 bullets: record each part separately, read a little slower than normal speech, keep the real pause length when recording, name files by part, re-listen within a day and again a few days later, plus anything left out or to check.
</output_format>
