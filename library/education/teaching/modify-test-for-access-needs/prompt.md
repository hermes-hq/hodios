---
schema: 1
id: modify-test-for-access-needs
kind: prompt
title: Modify a test for access needs
description: Modifies a classroom test or quiz for pupils with access needs by cutting reading load and clutter without lowering the demand, then logs every change and why.
category: teaching
version: 1.0.1
status: incubating
stage: [build, review]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [text, document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [modified-papers, dyslexia, accessible-assessment, reading-load, special-educational-needs]
pairs_with:
  prompts: [differentiate-lesson, adapt-text-reading-level, request-exam-access-arrangements]
  workflows: [assessment-design-track]
args:
  - name: test
    description: The full test or quiz text, with question numbers, marks and any instructions. Describe diagrams or images in brackets.
    type: text
    required: true
  - name: need
    description: The main access need - reading (below-age reading), dyslexia, visual (low vision, enlarged print), attention (short focus, easily overloaded) or language (developmental language difficulty or early English).
    type: enum
    enum: [reading, dyslexia, visual, attention, language]
    default: reading
  - name: subject_and_year
    description: Optional. Subject and year or age, e.g. "Year 8 science", so subject vocabulary that is being assessed is kept.
    type: string
output_contract:
  format: markdown
  sections: [Modified test, Change log, Kept the same, Layout and print notes, Check with the team]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "pairs_with lists assessment-design-track as a workflow and adds request-exam-access-arrangements."}
---
<context>
A teacher or SENCO wants a version of an internal test that lets a pupil with an access need show what they know. The point is to remove barriers that are not what the test measures, not to make the test easier. Common failures: replacing the subject vocabulary being tested with everyday words (which changes the construct); dropping the harder questions; changing the marks so results cannot be compared; and rewording so heavily that the question now gives away the answer.

Access need: {{need}}
{{#subject_and_year}}Subject and year: {{subject_and_year}}{{/subject_and_year}}
</context>

<task>
<test>
{{test}}
</test>

1. For each question, identify what it assesses (the knowledge or skill) and the words that are part of that construct. Keep those.
2. Reduce barriers that are not the construct, using the ones that fit the need:
   - reading and language: short sentences in the active voice, one instruction per line, common words for non-subject vocabulary, context sentences cut to the essentials, the command word in bold, no double negatives, no idioms;
   - dyslexia: as above, plus a clear sans-serif font of 12 to 14 point, 1.5 line spacing, left-aligned text, no italics or underlining, and an option to print on cream or pastel paper;
   - visual: enlarged layout (state the point size the team uses, often 18 point bold), one question per page or half page, diagrams simplified or described in words only where the diagram is not the thing assessed; where reading the diagram or graph is the skill, keep it, enlarged with high contrast, and suggest a tactile version for the team to provide;
   - attention: chunk multi-part questions into numbered parts with a box for each, plenty of white space, a short checklist at the top, and optional break points.
3. Keep the same questions, order, mark allocations, cognitive demand and total marks. If a question cannot be made accessible without changing what it measures, leave it as is and flag it.
4. Check each modified question still has exactly one correct reading and does not hint at the answer.
5. Log every change.
</task>

<constraints>
- Never lower the demand, remove questions or change marks. Never replace a subject term being assessed. If the user asks to drop hard questions or switch to multiple choice, explain in one or two sentences that this changes what is assessed, modify the original questions anyway, and suggest discussing a differentiated assessment with the SENCO if a different test is really needed.
- Do not change numbers, data or answers. Check that every value in the modified version matches the original.
- This is for internal school assessments. For formal exams, access arrangements and modified papers follow the exam body's rules and are applied for by the exams officer; say so if the test looks like a formal exam.
- If the test text is incomplete (missing marks, unreadable diagrams), ask for the missing parts and mark them [missing] in the modified version.
</constraints>

<output_format>
## Modified test
The full modified test, ready to print, with marks shown.

## Change log
Table: Question | What changed | Why | Construct kept.

## Kept the same
Bullets: subject terms kept on purpose, and any question flagged as not modifiable.

## Layout and print notes
Font, size, spacing, paper colour, page breaks.

## Check with the team
Up to three points for the SENCO or specialist (for example reader or scribe, extra time) that are arrangements, not paper changes.
</output_format>
