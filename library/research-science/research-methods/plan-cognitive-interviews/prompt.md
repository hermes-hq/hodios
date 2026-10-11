---
schema: 1
id: plan-cognitive-interviews
kind: prompt
title: Plan cognitive interviews
description: Plans cognitive interviews to pretest survey questions, with think-aloud and scripted probes per item, the sample, rounds, and how to log problems and fix items.
category: research-methods
version: 1.0.0
status: incubating
stage: [verify, design]
role: [researcher, student]
requires: [none]
inputs: [document, text]
output: [plan, script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cognitive-interviewing, pretesting, questionnaire-design, think-aloud, survey-research]
pairs_with:
  prompts: [write-survey-questionnaire, review-survey-questionnaire, plan-pilot-study, translate-and-adapt-questionnaire]
  personas: [research-methodologist]
args:
  - name: questionnaire
    description: The draft questions (or the sections you most want to test), the target population and the survey mode.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Focus items, Interview plan, Protocol, Problem log, Revision rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cognitive interviews show whether respondents understand, recall, judge and answer a question the way the researcher intended (the comprehension, retrieval, judgement and response model of Tourangeau and colleagues). A pilot shows response rates and timings; it rarely shows that half the sample read "household" differently. Experts mix concurrent or retrospective think-aloud with scripted probes (comprehension, paraphrasing, confidence, recall, category selection), plus spontaneous probes when something unexpected happens. They test in two or three small rounds, revising between rounds, with participants chosen to vary on the characteristics most likely to break the questions (education, age, language, the experiences the survey asks about). Typical mistakes: asking "was that clear?" (people say yes), testing with colleagues, running all interviews before looking at any, and interpreting a single odd answer as a problem without a record of why.
</context>

<task>
Plan cognitive interviews for:
<questionnaire>
{{questionnaire}}
</questionnaire>

1. Pick the focus items: those with complex terms, long recall periods, sensitive content, double meanings, unusual response options or skip logic. Say why each was picked. If the questionnaire is long, prioritise.
2. Plan the sample: number per round, two or three rounds, and the characteristics to vary, with recruitment ideas and the mode (in person, video, matching the survey mode where it matters).
3. Write the protocol: introduction and consent points, a think-aloud practice exercise, then for each focus item the scripted probes, labelled by type, and notes on when to use spontaneous probes.
4. Give interviewer guidance: neutral wording, not explaining the question, timing (keep sessions near an hour), recording and note taking.
5. Provide a problem log template classifying problems by stage (comprehension, retrieval, judgement, response, navigation) and severity.
6. Set revision rules: what pattern of evidence justifies changing an item, how to document the change and re-test it in the next round.
</task>

<constraints>
- Do not write probes like "Was this question clear?" or "Did you like it?"; every probe must target a specific cognitive step.
- Do not reword the user's items in this plan beyond flagging suspected problems; revisions follow evidence.
- If the population includes vulnerable groups or sensitive topics, include support and ethics steps.
- Do not claim a sample size guarantees all problems are found.
</constraints>

<output_format>
## Focus items
A table: item | suspected issue | stage at risk.
## Interview plan
Rounds, sample per round, characteristics to vary, mode and recruitment.
## Protocol
The script with intro, practice and probes per item.
## Problem log
A table template: participant | item | what happened | stage | severity | quote.
## Revision rules
Bullets.
</output_format>
