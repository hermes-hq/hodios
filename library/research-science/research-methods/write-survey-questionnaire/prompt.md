---
schema: 1
id: write-survey-questionnaire
kind: prompt
title: Write a survey questionnaire
description: Writes an unbiased questionnaire for a stated research aim, with construct mapping, appropriate response scales, skip logic and a pilot checklist. Use before fielding any survey.
category: research-methods
version: 1.0.0
status: experimental
stage: [design]
role: [researcher, ux-researcher, product-manager, student]
requires: [none]
inputs: [topic, text]
output: [questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [survey, questionnaire, likert, skip-logic]
pairs_with:
  prompts: [design-research-study]
  personas: [research-methodologist]
args:
  - name: aim
    description: What the survey must find out and what decision or analysis the answers will feed.
    type: text
    required: true
  - name: audience
    description: Who will answer it, for example "customers who cancelled in the last 90 days" or "nurses in UK hospitals".
    type: string
    required: true
  - name: length_minutes
    description: Target median completion time in minutes.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Construct map, Introduction text, Questionnaire, Pilot checklist, Analysis notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Survey data is only as good as its questions. The usual failures are well documented in survey methodology: questions with no analysis behind them, double-barrelled or leading wording, unbalanced or unlabelled scales, overlapping answer options, sensitive questions too early, and surveys too long for the audience, which raises drop-out and straight-lining. A good questionnaire starts from the aim, maps every question to something it measures, and is piloted before launch.
</context>

<task>
Write a questionnaire for this aim:
<aim>
{{aim}}
</aim>
Respondents: {{audience}}. Target median completion time: {{length_minutes}} minutes.

1. Break the aim into the constructs to measure and, for each, the analysis it will feed. Drop anything that does not feed the aim.
2. Where an established, validated scale fits a construct, name it and say to check its licence and use its exact wording; do not reproduce or paraphrase it. Otherwise write new items.
3. Write each item in plain words for this audience: one idea per question, neutral wording, a clear time frame ("in the past 30 days"), and no jargon or double negatives.
4. Choose the response format per item: single or multiple choice with mutually exclusive, exhaustive options (with "Other (please specify)" or "Not applicable" where they are real answers); fully labelled 5- or 7-point balanced scales; numeric entry with units; or open text, used sparingly.
5. Order the survey: screening questions, then easy and engaging questions, then the core, then sensitive questions, then demographics (only those the analysis needs). Keep related items together and randomise option order where order could bias answers.
6. Add skip logic so nobody sees a question that does not apply to them.
7. Budget the length: roughly 3 to 4 simple closed items per minute and 1 to 2 minutes per open question. If the aim needs more, say which items to cut.
</task>

<constraints>
- Every item maps to a construct in the construct map. No "nice to know" questions.
- Avoid leading, loaded, double-barrelled and absolute ("always", "never") wording, and do not ask respondents to predict their own future behaviour unless intention is the construct.
- Collect the minimum personal data. Flag any item that is sensitive or identifying and suggest a less intrusive version.
- If the aim is too broad to answer with one survey, or a survey is the wrong method (for example the question is about actual behaviour that logs could measure), say so first and suggest the better method.
</constraints>

<output_format>
## Construct map
A table: construct | item IDs | analysis it feeds.
## Introduction text
A short invitation stating purpose, time, anonymity or confidentiality, and that participation is voluntary.
## Questionnaire
Numbered items (Q1, Q2…) grouped in sections. For each: the question text, the response type, the full list of options or scale labels, and any logic in brackets, for example "[Show if Q3 = Yes]".
## Pilot checklist
Checkboxes covering cognitive interviews with 5 to 10 people from the audience, timing, logic testing on every path, item non-response, straight-lining, and open-text quality.
## Analysis notes
Estimated completion time, and any item that needs special handling (reverse-scored, multi-select, open coding).
</output_format>
