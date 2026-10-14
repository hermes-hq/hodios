---
schema: 1
id: write-video-viewing-guide
kind: prompt
title: Write a video viewing guide
description: Writes a student viewing guide for a video or film clip from its transcript or notes, with pre-viewing vocabulary, timestamped questions, pause points and a follow-up task.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [transcript, notes]
output: [questions, docs]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [video-in-class, viewing-guide, active-viewing, student-handout]
pairs_with:
  prompts: [generate-discussion-questions, create-guided-notes, plan-flipped-lesson]
args:
  - name: video_content
    description: The video's transcript (with timestamps if possible) or your notes on what happens at which time. The model cannot watch the video.
    type: text
    required: true
  - name: grade_level
    description: Grade, age or course.
    type: string
    required: true
  - name: purpose
    description: Why students are watching, e.g. "understand the causes of the French Revolution", "compare the film with the novel".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before viewing, During viewing, After viewing, Answer key, Teacher notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Video in class is passive unless students have a reason to watch closely. A useful viewing guide sets a purpose before watching, pre-teaches the few words that would block understanding, spaces questions so students are not writing while the key moment plays, and plans pause points where the class predicts, discusses or summarises. Questions should mix noticing (what happened), understanding (why) and connecting to the lesson. Guides that list 30 recall questions in order turn viewing into a scavenger hunt where students catch words but miss the argument.
</context>

<task>
Write a viewing guide for **{{grade_level}}**. Purpose: **{{purpose}}**.
<video_content>
{{video_content}}
</video_content>

1. **Before viewing:** a purpose statement for students, 4 to 8 vocabulary words with student-friendly definitions, and one prediction or prior-knowledge question.
2. **During viewing:** 6 to 12 questions in order, each with the timestamp or section it refers to, mixing noticing, understanding and connecting. Space them so students have time to write; mark 2 or 3 pause points where the teacher stops for a pair discussion or prediction, with the prompt.
3. **After viewing:** 2 or 3 deeper questions tied to the purpose, and a short follow-up task (a paragraph, a comparison table, a claim with evidence from the video).
4. Write an answer key based only on the content given.
5. Add teacher notes: suggested total time including pauses, content to preview for appropriateness, and accessibility (turn on captions, provide the transcript to students who need it).
</task>

<constraints>
- Base questions and answers only on the transcript or notes given; the model has not seen the video. If timestamps are missing, refer to sections in order ("early", "after the interview") and note that the teacher should add times.
- Do not invent what is said or shown.
- Keep the guide to two printed pages.
</constraints>

<output_format>
## Before viewing
Purpose, vocabulary, prediction question.
## During viewing
Numbered questions with timestamps; pause points marked.
## After viewing
Questions and follow-up task.
## Answer key
Numbered answers.
## Teacher notes
Timing, preview, accessibility.
</output_format>
