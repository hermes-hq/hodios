---
schema: 1
id: write-peer-review-feedback
kind: prompt
title: Write peer review feedback
description: Writes peer or 360 feedback on a colleague for a review cycle that is specific, evidence-based and balanced, sized to the form's questions and useful to them rather than vague praise or venting.
category: career-growth
version: 1.0.0
status: incubating
stage: [review]
role: [individual, software-engineer, manager]
requires: [none]
inputs: [text, notes]
output: [rewrite, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [peer-feedback, 360-feedback, performance-cycle, constructive-feedback]
pairs_with:
  prompts: [write-self-review, write-brag-document]
  personas: [career-coach]
args:
  - name: colleague
    description: The colleague's role and how you work with them, what they did well and what could be better, with specific examples, dates and results where you can. Rough notes are fine.
    type: text
    required: true
  - name: form
    description: The questions on the feedback form and any word limits or rating scales.
    type: text
  - name: visibility
    description: Whether the feedback is anonymous, shared with the colleague, or only seen by their manager.
    type: string
output_contract:
  format: markdown
  sections: [Evidence check, Draft feedback, Tone check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people write feedback on colleagues for performance cycles. Most peer feedback is useless: generic praise ("great team player"), vague criticism ("could communicate better") or a complaint about one bad week. Managers and calibration panels value feedback that describes specific behaviour, in a specific situation, with its impact, and that separates observation from opinion. Strengths are worth stating precisely because they help the colleague's promotion case. Development points should be about behaviour they can change, framed as what would make them more effective. Feedback written for a manager-only form can be more direct than feedback the colleague reads, but it should never say anything the writer would not stand behind.

<colleague>
{{colleague}}
</colleague>
{{#form}}
<form>
{{form}}
</form>
{{/form}}
{{#visibility}}Visibility: {{visibility}}{{/visibility}}
</context>

<task>
1. Evidence check: list each point from the notes, mark it as specific (situation, behaviour, impact) or vague, and say what detail would make vague points usable. Flag points based on hearsay, one-off events or personal traits rather than behaviour.
2. Draft feedback: answer each form question (or, if none given, write "Strengths" and "Areas to develop") using the situation-behaviour-impact pattern, two or three strengths and one or two development points, within any word limits. Use the exact examples from the notes; put [X] where a figure or detail is missing.
3. Tone check: confirm the draft would read as fair if the colleague saw it, note anything that should be softened, sharpened or removed, and adjust for the visibility given.
</task>

<constraints>
- Do not invent examples, results or behaviour. Work only from the notes.
- No comments on personality, appearance, age, health, family or other personal characteristics; feedback is about work behaviour.
- If the notes are mostly a grievance, say so, keep only what is fair and specific, and suggest raising serious issues through the right channel instead of the review form.
- Keep language plain; avoid empty superlatives.
</constraints>

<output_format>
## Evidence check
Table: Point | Specific or vague | Usable? | What to add.
## Draft feedback
Under each form question as a heading.
## Tone check
</output_format>
