---
schema: 1
id: run-board-self-assessment
kind: prompt
title: Run a board self-assessment
description: Designs a nonprofit board self-assessment with a short anonymous survey, then reads the results to separate real governance weaknesses from noise and proposes a small action plan.
category: nonprofit
version: 1.0.0
status: incubating
stage: [review]
role: [executive, manager]
requires: [none]
inputs: [text, dataset, notes]
output: [questions, report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [nonprofit]
tags: [board-effectiveness, governance, trustees, survey-design]
pairs_with:
  prompts: [build-board-skills-matrix, write-trustee-induction-pack]
  personas: [nonprofit-advisor]
args:
  - name: board_context
    description: Board size, how often it meets, the organisation's size and stage, and what prompted the review (a new chair, a crisis, a funder request, a regular cycle).
    type: text
    required: true
  - name: results
    description: Survey results or interview notes if you already ran an assessment, anonymised. Optional; without it, the prompt designs the assessment.
    type: text
output_contract:
  format: markdown
  sections: [Approach, The survey, Reading the results, Action plan, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a chair or governance lead review how well a nonprofit board works. Experienced chairs know three things novices miss. First, the questions that matter are about behaviour, not structure: does the board spend its time on strategy and risk or on operational detail, does every trustee speak, does it challenge the chief executive constructively, does it know whether the organisation is achieving its purpose. Second, a self-assessment only works if people answer honestly, so it must be anonymous, short and followed by visible action; a 60-question survey that leads nowhere teaches the board not to bother. Third, averages hide the finding: one trustee scoring "we never discuss risk" while others score it highly is the most useful line in the data.

Board context: {{board_context}}
{{#results}}
<results>
{{results}}
</results>
{{/results}}
</context>

<task>
1. Recommend an approach that fits the context: survey only, survey plus one-to-one conversations with the chair, or an external facilitator (say when the last is worth it, for example after a conflict or when the chair is part of the problem). Include how the chief executive's view is gathered.
2. Write a survey of 15 to 20 statements across: purpose and strategy, oversight of finance and risk, relationship with the chief executive, meetings and papers, culture and challenge, diversity and inclusion, and each member's own contribution. Use a 4-point agree scale (no neutral midpoint) plus "don't know", and add three open questions, including "What is one thing the board should stop doing?"
3. If results are provided, read them: report the spread as well as the average, flag statements where answers split or where many chose "don't know" (a sign of an information gap, not a performance gap), quote open answers only in anonymised form, and separate patterns from single comments.
4. Propose an action plan of no more than five actions, each with an owner and date, starting with changes the board can make at its next meeting. Include how results will be shared back to the board.
5. List the questions the chair should think about before sharing results.
</task>

<constraints>
- Do not invent results. If no results are given, write the Reading the results section as guidance on what to look for.
- Keep responses anonymous: never try to attribute a comment to a person, and warn when a board is so small that anonymity is weak.
- Do not turn the assessment into a performance review of the chief executive; that is a separate process.
- Governance codes and regulator expectations differ by country and sector. Mention that the board may want to check its local code if one applies, without naming one as binding unless the user does.
</constraints>

<output_format>
## Approach
## The survey
Numbered statements grouped by theme, then the open questions.
## Reading the results
Table when results exist: Theme | Average | Spread or split | Don't know | What it suggests.
## Action plan
Table: Action | Owner | By when | How we will know.
## Open questions
</output_format>
