---
schema: 1
id: plan-five-second-test
kind: prompt
title: Plan a five-second test
description: Plans a five-second test of a page or screen's first impression, with a clear question, exposure, recall and comprehension questions, participants and how to code the answers.
category: ux-research
version: 1.0.0
status: incubating
stage: [verify]
role: [ux-researcher, designer, marketer]
requires: [none]
inputs: [text, image]
output: [plan, questions, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [five-second-test, first-impression, value-proposition, visual-hierarchy, recall-test]
pairs_with:
  prompts: [plan-first-click-test, design-landing-page-layout, plan-desirability-study]
  personas: [ux-researcher]
args:
  - name: design
    description: The page or screen being tested and what it is supposed to communicate in the first moments, for example "homepage should say we do payroll for restaurants".
    type: text
    required: true
  - name: audience
    description: Who the page is for and where they come from (ad, search, app store). Optional.
    type: text
output_contract:
  format: markdown
  sections: [What this test can answer, Setup, Questions, Participants, Coding the answers, Decision rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A five-second test shows a design briefly and asks what people remember and understood. It answers narrow questions well: does the page say what the product is, for whom, and what stands out first. It cannot test usability, task flows or preference between designs, and it fails when the questions ask for opinions ("did you like it?"), when the context before exposure is missing, or when the screen is mostly text that nobody could read in five seconds. Asking an open recall question first, before any leading question, and coding answers against the intended message gives a usable comprehension rate.
</context>

<task>
<design>
{{design}}
</design>
{{#audience}}

<audience>
{{audience}}
</audience>
{{/audience}}

1. What this test can answer for this design, and what it cannot (redirect those to other methods).
2. Setup: the scenario framing shown before exposure (matching how people arrive), exposure time (5 seconds, or longer for dense screens, justified), device-appropriate image, one design per participant if comparing versions.
3. Questions: 3 to 5, ordered from open recall ("what do you remember?") to comprehension ("what does this company offer?", "who is it for?") to one targeted question; no yes/no and no leading wording.
4. Participants: target audience, about 20 to 50 per version for stable proportions, with a reason.
5. Coding the answers: a codebook built from the intended message (correct, partially correct, wrong, no answer), two coders on a sample, comprehension rate.
6. Decision rules agreed in advance, for example the target share who state the offer correctly.
</task>

<constraints>
- Do not use the test to judge usability or aesthetic preference.
- Questions must not reveal the answer.
- Do not invent results or benchmarks; any target is a proposal for the team to set.
</constraints>

<output_format>
## What this test can answer
## Setup
## Questions
Numbered, with what each measures.
## Participants
## Coding the answers
| Code | Definition | Example answer |
## Decision rules
</output_format>
