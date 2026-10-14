---
schema: 1
id: design-values-interview
kind: prompt
title: Design a values interview
description: Turns a company's stated values into observable behaviours and designs a values interview with behavioural questions, probes, anchored scoring and checks against culture-fit bias.
category: hiring
version: 1.0.0
status: incubating
stage: [design]
role: [recruiter, manager, founder, executive]
requires: [none]
inputs: [notes, document]
output: [questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [values-interview, culture-add, behavioural-questions, structured-interview, bias-reduction]
pairs_with:
  prompts: [design-interview-loop, build-interview-scorecard, train-interviewers]
  personas: [recruiter]
args:
  - name: values
    description: The company's values as written, with any description or examples you already use.
    type: text
    required: true
  - name: role_context
    description: The roles or levels this interview is for and where it sits in the process. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Values as behaviours, Interview plan, Questions and probes, Scoring anchors, Bias checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an organisational psychologist who designs structured interviews. "Culture fit" interviews are one of the main ways bias enters hiring: interviewers score whether they would enjoy a beer with the candidate, and similar backgrounds win. Values interviews can be fair and predictive, but only if each value is translated into specific behaviours that someone could show at work, the questions ask for real past examples, and scoring uses anchors rather than gut feel. Many value statements ("we are bold", "we care") are too vague to assess as written; the work is to define what the behaviour looks like here, including what it does not mean, so that people from different backgrounds can show it in different ways.

<values>
{{values}}
</values>
{{#role_context}}
<role_context>
{{role_context}}
</role_context>
{{/role_context}}
</context>

<task>
1. Values as behaviours: for each value, two or three observable work behaviours that show it, one common misreading to exclude (for example "bold" is not "loud in meetings"), and whether it can be assessed in an interview at all. Flag values that are too vague and suggest a sharper wording.
2. Interview plan: a 45-minute structure covering the assessable values (usually 3-4), with timing, the interviewer brief and the opening that tells the candidate what the interview is for.
3. Questions and probes: for each value, one behavioural question asking for a specific past example and one alternative question for candidates with limited work history (study, volunteering, caring, other settings), each with three probes.
4. Scoring anchors: a 1-4 scale per value with behavioural descriptions of each rating, and what counts as evidence.
5. Bias checks: what interviewers must not score (shared interests, similarity, confidence style, accent, humour), how to separate a "culture add" from a misfit, and how to review scores across candidates for patterns.
</task>

<constraints>
- Every behaviour must be job-related and possible to show in different personal styles and cultures.
- Do not include questions about personal life, hobbies, background or beliefs, or any protected characteristic.
- Do not invent values the company did not state; work only from the input.
- If a value cannot be assessed fairly in an interview, say so instead of forcing a question.
</constraints>

<output_format>
## Values as behaviours
Table: Value | Behaviours | Not this | Assessable.
## Interview plan
## Questions and probes
## Scoring anchors
## Bias checks
</output_format>
