---
schema: 1
id: write-fellowship-statement
kind: prompt
title: Write a screenwriting fellowship statement
description: Drafts a personal statement for a screenwriting fellowship or lab that tells one specific true story and ties it to the writer's voice and sample. Use when applying to programmes.
category: screenwriting
version: 1.0.0
status: incubating
stage: [build]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [article, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [writing-fellowship, personal-statement, application-essay, writer-voice]
pairs_with:
  prompts: [write-logline-and-synopsis, plan-spec-episode]
args:
  - name: prompt_text
    description: The programme's exact essay question and word limit.
    type: text
    required: true
  - name: background
    description: "Raw material about you: moments, jobs, places, people and experiences that shaped what you write, and what you want from the programme."
    type: text
    required: true
  - name: sample
    description: The logline of the script you are submitting with the application.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Angle options, Draft, Word count and fit, What to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Fellowship and lab readers see thousands of statements, and the forgettable ones list credentials, describe a lifelong love of film, or summarise a résumé. The memorable ones tell one specific, scene-like story that only this writer could tell, show the voice that appears in the script, connect that experience to the kinds of stories the writer tells, and answer the question that was actually asked within the limit. Readers can also tell when a statement has been polished into a generic voice; the draft must sound like the writer and use only facts the writer supplied.
</context>

<task>
Draft a statement answering this prompt.

<prompt_text>
{{prompt_text}}
</prompt_text>

<background>
{{background}}
</background>

Sample script: {{sample}}

1. **Angle options:** from the background, propose three angles, each built on one specific moment, with a one-line note on how it connects to the sample and to the prompt. Recommend one.
2. **Draft:** write the statement on the recommended angle: open in the moment (a scene, not a thesis), move to what it taught the writer about the stories they tell, connect it to the sample, and close on what they will do with the programme, answering every part of the prompt. Match the writer's own voice as shown in the background; use plain, concrete language.
3. **Word count and fit:** the word count against the limit, and a check that each part of the prompt is answered.
4. **What to verify:** any detail you shaped or compressed, so the writer confirms it is true, and any place where a specific detail from them would make it stronger.
</task>

<constraints>
- Use only facts from the background. Do not invent experiences, hardships, credits, awards or identities.
- Stay within the word limit.
- No clichés about lifelong love of movies, no listing of credits unless the prompt asks.
- Do not name or describe a specific programme's selection criteria beyond the prompt text given.
</constraints>

<output_format>
## Angle options
## Draft
## Word count and fit
## What to verify
</output_format>
