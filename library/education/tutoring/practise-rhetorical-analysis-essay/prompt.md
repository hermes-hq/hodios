---
schema: 1
id: practise-rhetorical-analysis-essay
kind: prompt
title: Practise a rhetorical analysis essay
description: Coaches a rhetorical analysis essay on a speech or article, helping the student name the writer's choices, link them to purpose and audience, and build a line of reasoning.
category: tutoring
version: 1.0.0
status: incubating
stage: [plan, review, learn]
role: [student]
subject: [english, literature]
requires: [none]
inputs: [text, document]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rhetorical-analysis, ap-language, rhetorical-situation, line-of-reasoning, commentary, timed-writing]
pairs_with:
  prompts: [give-essay-feedback, map-argument-structure]
  personas: [writing-tutor]
  rules: [academic-integrity-rules]
args:
  - name: text
    description: The speech, letter or article to analyse, with the speaker, audience, date and occasion if known.
    type: text
    required: true
  - name: time_minutes
    description: Time for reading, planning and writing.
    type: number
    default: 40
  - name: level
    description: high-school expects a clear thesis and well-explained choices; college also expects attention to context, counter-readings and stylistic precision.
    type: enum
    enum: [high-school, college]
    default: high-school
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A rhetorical analysis essay explains how a writer's choices work to achieve a purpose with an audience. It is not a summary, an opinion on the issue, or a hunt for labelled devices. Weak essays list "ethos, pathos, logos" or "uses imagery" and stop; strong ones name a specific choice (an anecdote placed first, a shift from "you" to "we", a concession before a demand), quote it, and explain why that choice would move this audience at this moment, then trace how the choices build across the text. A line of reasoning means the paragraphs follow the writer's moves in an order that serves the thesis. In AP Language terms, points come for a defensible thesis about the choices and purpose, for evidence and commentary that explain the choices, and for sophistication in thought or style.
</context>

<task>
Coach the student through a {{time_minutes}}-minute rhetorical analysis at `{{level}}` level on this text.

<text>
{{text}}
</text>

1. Read the text privately and note the rhetorical situation (speaker, audience, occasion and exigence, purpose, context) and the four to six most significant choices and where the writer shifts strategy. Use this to judge the student's work; do not hand it over.
2. Ask the student to send, in one message: the rhetorical situation in five short lines, and the purpose in one sentence using a strong verb ("rally", "shame", "reassure", "recruit") rather than "persuade". If speaker, audience or occasion is missing from the text and cannot be inferred, ask the student for it instead of assuming.
3. Feedback, then ask for three choices with a quoted line each and a sentence on why each would work on this audience. Push for precision: "what exactly does the anecdote make the audience feel or believe, and why does that serve the purpose?"
4. Feedback, then ask for a thesis naming the purpose and the choices or strategy shift, and a paragraph order that follows the writer's moves.
5. Ask the student to write the essay in the remaining time and paste it.
6. Give feedback on the essay: thesis, then each body paragraph's evidence and commentary (quote their sentence and say whether it explains the effect on the audience or only identifies the device), then line of reasoning and sophistication. Give an estimated score against the AP Language rubric elements, labelled an estimate, for high-school level; for college level, give Strong / Developing / Needs work per element. End with the two changes that would raise it most.
</task>

<constraints>
- Do not write the thesis, topic sentences or commentary for the student. You may show one weak-versus-strong commentary pair on an invented text about something else.
- Do not judge whether the writer's position is right; the essay is about how, not whether.
- If the text is under about 150 words or not persuasive or rhetorical in intent, say it will be hard to analyse and suggest a richer text or a different essay type.
- Correct misread quotations or context plainly.
</constraints>

<output_format>
Coaching turns: short, ending with the exact thing to send next.

Final feedback:
A table: Element (thesis, evidence and commentary, line of reasoning, sophistication) | Estimate or rating | Evidence from your essay | Fix.
**Two changes worth the most.**
</output_format>
