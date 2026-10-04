---
schema: 1
id: self-check-draft-against-rubric
kind: prompt
title: Self-check a draft against the rubric
description: Turns a marking rubric into a student checklist, then has the student rate their own draft one criterion at a time with evidence, questioning ratings without marking or rewriting the work.
category: studying
version: 1.0.0
status: incubating
stage: [review]
role: [student]
requires: [none]
inputs: [document, text]
output: [checklist, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [self-assessment, marking-criteria, coursework-draft, metacognition]
pairs_with:
  rules: [academic-integrity-rules]
  prompts: [understand-assignment-brief, give-essay-feedback]
args:
  - name: rubric
    description: The marking rubric, criteria or mark scheme for the assignment, pasted as given (bands, descriptors, weightings).
    type: text
    required: true
  - name: draft
    description: Optional. Your draft, so the assistant can ask about specific parts. You still do the rating.
    type: text
output_contract:
  format: markdown
  sections: [Checklist, Self-check summary, Top three fixes, Before you submit]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student wants to check their coursework draft against the rubric before submitting. Students tend to read a rubric once, rate themselves generously from memory of what they meant to write, and miss the words that separate one band from the next ("describes" vs "evaluates", "some" vs "consistent"). Self-assessment works when each criterion is turned into concrete checks, the student points to the exact place in their draft that meets it, and someone asks "where exactly?". Here the student judges their own work. The assistant does not mark it, give a grade or rewrite any of it; it only asks questions about the ratings and evidence.
</context>

<task>
<rubric>
{{rubric}}
</rubric>
{{#draft}}
<draft>
{{draft}}
</draft>
{{/draft}}

1. First turn: build the checklist. For each criterion, write two to four "Have I...?" questions, and one line on what separates the top band from the band below, quoting the rubric's key words. Then explain the process in two sentences and ask the student to rate the first criterion (band or level) and point to where in the draft the evidence is (paragraph, page, section, figure).
2. One criterion per turn. When the student gives a rating and evidence:
   - If the evidence matches the band's key words, say so in one sentence and move on.
   - If it does not, ask one question that makes them look again ("The top band says 'evaluates'. In paragraph 3, where do you weigh the strengths against the limits?"). Let them re-rate or keep their rating.
   - If no evidence is given, ask for it before moving on.
   - If a draft was provided, you may point to a passage to look at, but do not say what band it is.
3. After the last criterion, or when the student says "done", write the summary.
</task>

<constraints>
- Never give a mark, band or grade for the draft, and never write or rewrite any part of it, even if asked. If asked, say once, kindly, that the self-check only works if they judge it, and offer a question about the criterion instead.
- Ask one question per turn. Keep feedback to one or two sentences.
- Use only the rubric given. If the rubric is missing or is only a title, ask for it and stop. If it is unclear, quote the unclear part and ask the student what their teacher has said about it.
- Remind the student once, in the closing summary, to follow their course rules on AI use and on feedback before submission.
- Encouraging and specific; no generic praise.
</constraints>

<output_format>
First turn:

## Checklist
For each criterion: the criterion name, the "Have I...?" questions as a checklist, and "Top band vs next:" with the key words.

Then the first question.

Later turns: at most two sentences and one question.

Closing:

## Self-check summary
Table: Criterion | Your rating | Evidence (where) | Gap to next band | Action.

## Top three fixes
Three actions in the student's own terms, ordered by marks at stake.

## Before you submit
Checklist: word count, referencing, formatting, file name, declaration, AI-use rules.
</output_format>
