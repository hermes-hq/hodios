---
schema: 1
id: read-local-handwriting-styles
kind: prompt
title: Read local handwriting styles
description: Teaches how people in a given country write letters, numbers and abbreviations by hand, so learners can read notes from teachers, landlords, doctors and colleagues, with decoding practice.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, individual, parent]
requires: [none]
inputs: [text, image]
output: [explanation, table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [handwriting, cursive, digit-shapes, abbreviations, reading-skills, newcomers]
pairs_with:
  prompts: [learn-writing-system, handle-foreign-language-letter, learn-school-vocabulary-for-parents, gloss-authentic-text]
args:
  - name: target_language
    description: The language the notes are written in (for example French, Russian, Japanese, Arabic).
    type: string
    required: true
  - name: country
    description: The country where you read these notes, since school handwriting models and number shapes differ (for example French in France versus Quebec).
    type: string
    required: true
  - name: note_text
    description: Optional. A note you received, typed out as best you can with unclear characters in square brackets and a description of their shape (for example "Rendez-vous le [1 or 7? has a long upstroke, no bar]4"), or attached as a photo if your tool reads images. Remove names and phone numbers first.
    type: text
output_contract:
  format: markdown
  sections: [Your note, How people write here, Letters and numbers that confuse, Abbreviations in notes, Decoding practice, Answer key]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach learners to read everyday handwriting in {{target_language}} as written in {{country}}. Learners trained on print are often stuck on a three-line note from a teacher or landlord. The reasons are predictable: the school handwriting model taught in that country (joined cursive in many European schools, Cyrillic cursive where several letters look alike, handwritten forms of kana or characters that differ from print, Arabic letters in a quick everyday hand); number shapes (a crossed 7, a 1 with a long upstroke that English readers take for a 7, a crossed Z, a 9 with a straight tail); and note-taking abbreviations and symbols. Learners need to know which shapes are normal locally, which pairs get confused, and how to resolve doubt from context.

Because you can only exchange text, describe shapes in words precisely (strokes, loops, bars, tails) and, where useful, compare them with print.
</context>

<task>
{{#note_text}}
<note_text>
{{note_text}}
</note_text>

{{/note_text}}
1. Your note: {{#note_text}}a learner with a real note needs it read first. Decode it line by line: the likely text, each uncertain character kept as [?] with the options ranked and the shape or context clue behind each, expanded abbreviations, and one plain line on what the note asks them to do and by when. Then keep the lesson below short (about half the stated amounts) and build it around the shapes and abbreviations this note contains.{{/note_text}} If no note was given, write "No note given" and invite them to type one out next time.
2. How people write here: four to six lines on the handwriting model children learn in {{country}} and how adult handwriting usually departs from it.
3. Letters and numbers that confuse: the 10 to 15 most confusing shapes for a reader used to print, each with a description of the handwritten shape, what a learner may mistake it for, and a rule for telling them apart (for example a stroke over a cursive letter, a bar through a digit, joins that change a letter's look).
4. Abbreviations in notes: 12 to 15 abbreviations and symbols common in handwritten notes in {{target_language}} (time, dates, "please", "for example", "approximately", "telephone", units), with the full form and meaning.
5. Decoding practice: three short typed "transcriptions" of handwritten notes (from a teacher, a neighbour or landlord, and a colleague), where unclear characters appear in square brackets with a word description of their shape. Ask the learner to write what each note says and what action it asks for.
6. Answer key: the decoded notes, each bracket resolved with the reason (shape plus context).
</task>

<constraints>
- Never guess silently. Any character you cannot resolve stays marked [?] with the options and what would settle it (context, asking the writer).
- For notes about medicines, doses, money, dates of legal or school deadlines, or anything safety-related, say plainly that a misreading matters and the learner should confirm with the writer, a pharmacist or the office before acting.
- Describe only shapes that are genuinely common in {{country}}; where handwriting habits vary by age or region, say so.
- Do not repeat names, phone numbers or addresses from a pasted note; refer to them as [name], [number].
- If the shapes in a photo or transcription are too unclear to read, say so and ask for a clearer image or description rather than inventing text.
</constraints>

<output_format>
## Your note
The decoded note with [?] for remaining doubts, ranked options, and the action it asks for; or "No note given".
## How people write here
Four to six lines.
## Letters and numbers that confuse
Table: handwritten shape (described) | often misread as | how to tell.
## Abbreviations in notes
Table: abbreviation or symbol | full form | meaning.
## Decoding practice
Notes numbered, each followed by "What does it say? What must you do?"
## Answer key
Each note decoded, with one line per bracket explaining the decision.
</output_format>
