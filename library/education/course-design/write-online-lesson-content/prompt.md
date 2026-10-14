---
schema: 1
id: write-online-lesson-content
kind: prompt
title: Write an online lesson
description: Writes the learner-facing text of one self-paced online lesson, chunked for the screen, with plain explanations, a worked example, a check after each chunk, a summary and image notes.
category: course-design
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, writer]
requires: [none]
inputs: [topic, document, text]
output: [docs, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [online-learning, self-paced, e-learning-writing, knowledge-checks, worked-examples, chunking]
pairs_with:
  prompts: [design-elearning-module, write-learning-objectives, structure-lms-course-site]
args:
  - name: lesson
    description: The lesson topic and its objective, for example "How to read a payslip - learners can check gross pay, deductions and net pay on their own payslip".
    type: string
    required: true
  - name: audience
    description: Who the learners are and what they already know.
    type: string
    required: true
  - name: source
    description: Optional. Source material, notes or the facts the lesson must use. Without it, the lesson stays at general, well-established knowledge.
    type: text
  - name: minutes
    description: Target time for a learner to complete the lesson.
    type: number
    default: 20
output_contract:
  format: markdown
  sections: [Lesson overview, Lesson content, Summary, Production notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write self-paced online lessons that people finish. On a screen, learners skim, so a lesson that works is broken into short chunks with clear headings, one idea per chunk, plain conversational language, a concrete example or worked example for every abstract idea, and a quick question after each chunk that makes them use what they just read rather than recognise it. Images are used only when they explain (a labelled diagram, an annotated screenshot), never as decoration. Typical failures: walls of text copied from a manual, a quiz only at the end, "click next to continue" padding, and jargon that the expert writer no longer notices.

Lesson: {{lesson}}
Audience: {{audience}}
Target time: about {{minutes}} minutes.
{{#source}}
<source>
{{source}}
</source>
{{/source}}
</context>

<task>
1. **Lesson overview:** a learner-facing title, a two-sentence "what you will be able to do" in plain words, and the time.
2. **Lesson content:** three to six chunks. Each chunk has a short heading, 80 to 200 words of explanation, a concrete example or worked example, and a check question (multiple choice with feedback for each option, or a short task with a model answer). Order chunks from the simplest to the full task. Start with a short hook tied to the learner's real situation.
3. **Summary:** five or fewer key points, and one practice task the learner can do in their own work or life.
4. **Production notes:** for each chunk, any image or diagram to create (with alt text), anything to verify with a subject expert, and the estimated reading and activity time, totalling close to {{minutes}} minutes.
</task>

<constraints>
- Use the source when given and do not add facts beyond it or beyond well-established general knowledge. Mark anything that depends on country, organisation or current rules [verify].
- Reading level suited to the audience; define any term on first use.
- Every check question has one defensible answer and feedback that explains why, including for wrong options.
- If the lesson is about an organisation's own policy, product or procedure and no source is given, never invent its rules, limits or steps: write the lesson with clearly marked [from your policy] placeholders and say what to supply.
- No filler such as "In this lesson we will explore"; start with something useful.
</constraints>

<output_format>
## Lesson overview
## Lesson content
Each chunk as ### heading, then text, example, and the check question with feedback.
## Summary
## Production notes
Table: Chunk | Visual and alt text | Verify | Minutes.
</output_format>
