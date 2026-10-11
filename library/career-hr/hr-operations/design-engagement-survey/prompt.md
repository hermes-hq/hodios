---
schema: 1
id: design-engagement-survey
kind: prompt
title: Design an engagement survey
description: Designs an engagement or pulse survey before launch, with items tied to decisions, anonymity thresholds, minimal demographic cuts, a launch plan and a commitment on what happens next.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design]
role: [operations-manager, manager, founder, executive]
requires: [none]
inputs: [text]
output: [questions, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [engagement-survey, pulse-survey, survey-design, anonymity-threshold, employee-voice]
pairs_with:
  prompts: [analyze-employee-survey, plan-engagement-survey-actions, write-survey-questionnaire]
args:
  - name: purpose
    description: Why you are running the survey now and what decisions the results should inform (for example "attrition rose in support", "after a reorganisation", "annual baseline").
    type: text
    required: true
  - name: organisation
    description: Headcount, team sizes, locations and languages, past surveys and what happened after them, and the survey tool if chosen.
    type: text
    required: true
  - name: length
    description: Full annual survey or short pulse, and the time you want it to take (for example "under 10 minutes"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Survey goals, Question set, Demographics and anonymity, Launch plan, What we commit to afterwards, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design engagement surveys the way an experienced people-analytics lead does. The survey is a promise: response rates collapse after one round where nothing visible happened, so every question should map to something the organisation is willing to act on. Experts use a consistent agreement scale (usually five points), single-idea statements (no "my manager supports and develops me"), a small number of outcome items (intent to stay, recommend as a place to work) plus driver items (manager, growth, workload, recognition, clarity, belonging), and one or two open questions. Anonymity is the biggest trust issue: results must only be shown for groups above a minimum size (commonly five to ten), and every demographic question shrinks groups, so add only cuts that will drive a decision and that are lawful to collect. Before launch, decide who sees what, when results come back and how actions will be reported.

<purpose>
{{purpose}}
</purpose>

<organisation>
{{organisation}}
</organisation>
{{#length}}Length: {{length}}{{/length}}
</context>

<task>
1. Survey goals: two to four questions the survey must answer and the decision each informs. Push back if the purpose cannot lead to action.
2. Question set: grouped by theme, each item as a single-idea statement on the chosen scale, with the theme, why it is there, and whether it is an outcome or driver item. Include one or two open questions. Fit the length requested (roughly four to six scaled items per minute). If past surveys exist, keep items that allow trend comparison and say so.
3. Demographics and anonymity: propose the minimum reporting group size, list only the demographic or team cuts needed for the goals, check against team sizes which cuts would fall under the threshold, and say which to drop or merge. Flag special-category data (health, ethnicity, religion and similar) as needing a lawful basis and privacy review before collecting.
4. Launch plan: timing (avoid peak workload and holidays), the invitation message, who sends it, reminders, the response window, translations if several languages, and a target response rate.
5. What we commit to afterwards: a draft message to staff stating when results will be shared, at what level, and how actions will be reported back.
6. Questions that need a decision.
</task>

<constraints>
- Never design questions that identify individuals or ask about named colleagues.
- Do not promise anonymity the setup cannot deliver; if a team is smaller than the threshold, say its results will be merged.
- Do not include questions about protected characteristics without flagging the privacy and legal review needed for the location.
- Keep items neutral; no leading or double-barrelled wording.
{{> output/uncertainty}}
</constraints>

<output_format>
## Survey goals
## Question set
Table: # | Statement | Theme | Outcome or driver | Why.
Then open questions.
## Demographics and anonymity
## Launch plan
## What we commit to afterwards
## Questions
</output_format>
