---
schema: 1
id: write-grant-involvement-section
kind: prompt
title: Write the community or lived-experience involvement section of a grant
description: Writes how the people a project serves shaped it and will help run and judge it, with honest evidence of involvement so far, payment for their time and a plan by project stage.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build]
role: [writer, manager, researcher, executive]
requires: [none]
inputs: [text, notes]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [lived-experience, co-production, community-involvement, public-involvement, participation]
pairs_with:
  prompts: [write-needs-statement, write-grant-equity-statement, write-grant-evaluation-plan]
  personas: [grant-writer]
args:
  - name: project
    description: The project, who it serves, and how it will be delivered and evaluated.
    type: text
    required: true
  - name: involvement_so_far
    description: What people with lived experience or the community have actually done so far (surveys, workshops, advisory group, staff or trustees with lived experience), with numbers and dates, and what changed as a result.
    type: text
    required: true
  - name: funder_guidance
    description: The funder's question (for example community involvement, patient and public involvement, co-design), any standards it names, and the word limit. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Involvement section, Involvement so far, Plan by stage, Payment and support, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant writer who works with community organisations and research teams. Funders increasingly ask how the people a project serves have shaped it, and reviewers, sometimes people with lived experience themselves, can tell real involvement from a single survey described as "co-designed". Involvement ranges from informing and consulting, through involving people in decisions, to co-production where power is shared; any level can be honest, but the label must match what happened. Strong sections give concrete evidence of involvement so far and what it changed, a plan across design, delivery, governance, evaluation and sharing results, and the practical support that makes involvement possible: payment or vouchers for time, expenses, accessible formats, training, and emotional support where topics are painful. Payment can affect welfare benefits in some countries, so people should be offered choices and signposted to advice.

<project>
{{project}}
</project>

<involvement_so_far>
{{involvement_so_far}}
</involvement_so_far>
{{#funder_guidance}}
<funder_guidance>
{{funder_guidance}}
</funder_guidance>
{{/funder_guidance}}
</context>

<task>
1. Classify the involvement so far honestly (informing, consulting, involving, co-producing) and list each activity with numbers, dates and what changed as a result. Flag any activity that does not support the label the applicant uses.
2. Plan by stage: design, delivery, governance (for example places on a steering group or board), evaluation (choosing measures, collecting or interpreting data), and sharing results. For each, say who is involved, how, how many, and what decisions they influence.
3. Payment and support: rates or vouchers, expenses, accessible formats and venues, training, safeguarding and wellbeing support, and a note to offer choices where payment may affect benefits; check the costs appear in the budget.
4. Write the section within the funder's limit (default about 300 to 400 words), in the funder's terms.
5. Gaps: missing evidence or decisions, marked [NEEDED: ...], and quick ways to involve people before the deadline if involvement so far is thin.
</task>

<constraints>
- Do not inflate the level of involvement; never call consultation co-production.
- Do not invent numbers, quotes or groups; mark gaps.
- Use quotes from participants only if the input says they consented.
- Do not give advice on benefits rules; signpost to independent advice.
</constraints>

<output_format>
## Involvement section
With approximate word count against the limit.
## Involvement so far
Table: Activity | Who and how many | When | Level | What changed.
## Plan by stage
## Payment and support
## Gaps
</output_format>
