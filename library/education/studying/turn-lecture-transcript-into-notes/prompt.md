---
schema: 1
id: turn-lecture-transcript-into-notes
kind: prompt
title: Turn a lecture transcript into notes
description: Turns a recorded lecture transcript into structured study notes with definitions, worked examples, flagged exam hints and timestamps for the parts worth rewatching.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
requires: [none]
inputs: [transcript, text]
output: [summary, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [lecture-recording, lecture-notes, exam-hints, auto-captions, rewatch-list]
pairs_with:
  prompts: [convert-lecture-notes-to-cornell, make-study-guide, make-flashcards, review-notes-for-gaps]
  personas: [study-coach]
args:
  - name: transcript
    description: The lecture transcript or auto-captions, with timestamps if the platform gives them. Paste it as exported; filler and repetition are fine.
    type: text
    required: true
  - name: course_context
    description: Optional course name, the lecture topic or number, the level, and how the course is assessed, so exam hints can be judged against the real format.
    type: string
  - name: slides
    description: Optional slide text for the same lecture, used to fix mis-transcribed terms and to see what the lecturer added beyond the slides.
    type: text
output_contract:
  format: markdown
  sections: [Lecture at a glance, Notes, Key terms, Worked examples, Exam signals, Rewatch list, Check these]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A lecture transcript is long, repetitive and full of false starts, and auto-captions mangle technical terms, names and formulas ("eigen value" becomes "I can value"). A generic summary of it loses the things a student actually needs: the order of the argument, exact definitions, the steps of a worked example, and the moments where the lecturer signals what matters ("this comes up every year", "make sure you can do this", "a common mistake is"). Lecturers also say a lot that is not on the slides, and that spoken extra is often what separates a good exam answer from an average one. Good notes keep the structure, keep the lecturer's emphasis, and point to the exact minute to rewatch when something is unclear.
</context>

<task>
Turn this lecture transcript into study notes.

<transcript>
{{transcript}}
</transcript>
{{#course_context}}
Course context: {{course_context}}
{{/course_context}}
{{#slides}}
<slides>
{{slides}}
</slides>
{{/slides}}

1. Read the whole transcript first and identify the lecture's structure: the main question, the sections the lecturer moves through, and where each starts (timestamp if available).
2. Write the notes section by section in the lecturer's order, as concise bullet points. Cut filler, jokes, admin and repetition, but keep explanations, analogies the lecturer chose, and any "why" reasoning. Keep admin items that matter (deadlines, changed readings) in a short line at the top.
3. Pull out every term the lecturer defines, with the definition as close to the lecturer's wording as the transcript allows.
4. Reconstruct each worked example step by step, keeping each step's reason. If a step is missing or garbled in the transcript, mark it rather than filling it in from general knowledge.
5. List exam signals: every place the lecturer stresses importance, mentions the exam or assessment, warns about a common mistake, or repeats a point. Quote the short phrase and give the timestamp.
6. Build a rewatch list: timestamps where the transcript is garbled, a diagram or board work is referred to but not described ("as you can see here"), or the reasoning is too compressed to follow from text.
7. List terms or numbers that look mis-transcribed, with the likely correct term marked as a guess, for the student to check against slides or the textbook.
</task>

<constraints>
- Use only what is in the transcript (and slides if given). Do not add content from general knowledge; if something is needed to make sense of a point, put it under "Check these" as a question.
- Never present a guessed correction of a mis-transcribed term as certain.
- Give timestamps only if the transcript has them; never invent times.
- Keep the notes shorter than the transcript by a large margin; aim for something a student can review in 10 to 15 minutes.
- If the text is not a lecture (for example a meeting or a podcast), say so and ask whether to continue.
</constraints>

<output_format>
## Lecture at a glance
The main question, 3 to 5 key takeaways, and any admin items.
## Notes
Headed sections in lecture order, with start timestamps if available.
## Key terms
A table: Term | Definition as given | Timestamp.
## Worked examples
Numbered steps per example, gaps marked.
## Exam signals
A table: What was said | Why it matters | Timestamp.
## Rewatch list
A table: Timestamp | Reason.
## Check these
Possible mis-transcriptions and open questions.
</output_format>
