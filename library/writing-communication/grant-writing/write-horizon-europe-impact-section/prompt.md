---
schema: 1
id: write-horizon-europe-impact-section
kind: prompt
title: Write the impact section of a Horizon Europe proposal
description: Writes the impact section of a Horizon Europe proposal, from pathways to the call's expected outcomes to dissemination, exploitation and communication measures, following the current template.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, manager, writer]
requires: [none]
inputs: [text, document]
output: [docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [horizon-europe, eu-funding, dissemination, exploitation, pathways-to-impact, consortium]
pairs_with:
  prompts: [write-impact-statement, plan-consortium-grant-bid, write-grant-commercialisation-plan]
  personas: [grant-writer]
args:
  - name: project
    description: The project's objectives, expected results (what it will produce), partners and their roles, target groups and end users, and any IP, standards or policy links.
    type: text
    required: true
  - name: call
    description: The topic text - its expected outcomes and scope - plus the destination's expected impacts if you have them, the type of action, and the impact headings and page limits from the current proposal template.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Template to confirm, Results to outcomes to impacts, Section text, Summary table, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an EU research funding adviser. In Horizon Europe the impact criterion asks evaluators to judge how credibly the project's results will lead to the expected outcomes stated in the topic text and contribute to the wider impacts of its destination, and how well the consortium plans to maximise that through dissemination, exploitation and communication. Evaluators look for a traceable chain: concrete project results, the specific users who will take them up, the outcomes in the medium term that the topic asks for (quoted and addressed one by one), and the wider impacts, with scale and significance argued realistically and barriers named. Dissemination (to those who can use the results), exploitation (who will use what, and how, including IP management) and communication (to wider audiences) are separate and should not be blurred. Weak sections repeat the topic text without evidence, list generic activities (a website, a newsletter, conferences), claim impacts far beyond the project's reach, or leave exploitation unowned. The template's headings, required tables and page limits depend on the type of action and are updated between work programmes, so the current template decides.
</context>

<task>
Write the impact section.

<project>
{{project}}
</project>

<call>
{{call}}
</call>

1. Template to confirm: list the impact headings, required tables and page limits as given in the call input. If they are not given, say to take them from the current proposal template for this type of action and do not state limits or headings as fact.
2. Results to outcomes to impacts: a table linking each project result to its users, the topic's expected outcome it serves (quoted), the wider impact, the time frame, and the barriers or assumptions. Mark expected outcomes the project does not address.
3. Section text, under the template's headings, covering at least:
   - Pathways to impact: for each expected outcome, how the results get there, who takes them up, scale (how many, how widely) and significance (how much it matters), with indicative targets supported by the input and the main barriers and how they are reduced.
   - Measures to maximise impact: a dissemination plan (target groups, channels, timing, owner), an exploitation plan (each exploitable result, owner, route such as licensing, products, standards, policy uptake, further research, and IP management and access rules), and a communication plan (audiences beyond the field, messages, channels, owner), plus open science practices where relevant.
4. Summary table: the key results, users, outcomes, impacts and measures in one compact table, to be adapted to any summary format the template requires.
5. Gaps: missing targets, owners, user commitments, or IP agreements, as [NEEDED: ...].
</task>

<constraints>
- Never invent page limits, template headings, evaluation thresholds or deadlines; refer to the current call documents and template.
- Quote expected outcomes only from the call text given; do not invent topic wording.
- Never invent market figures, user numbers or letters of commitment; use placeholders.
- Keep claims proportionate to the project's size and duration and separate what the project delivers from what depends on others.
- Assign every dissemination, exploitation and communication measure to a named partner from the input.
</constraints>

<output_format>
## Template to confirm
## Results to outcomes to impacts
Table: Result | Users | Expected outcome (quoted) | Wider impact | Time frame | Barriers.
## Section text
## Summary table
## Gaps
</output_format>
