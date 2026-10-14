---
schema: 1
id: write-grant-organisational-capacity
kind: prompt
title: Write the organisational capacity section of a grant
description: Writes the organisational background and capacity section of a grant, tailored to the project, with relevant track record, governance, financial health, delivery systems and honest gaps.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build]
role: [writer, manager, executive, founder]
subject: [nonprofit]
requires: [none]
inputs: [text, document]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
depth: specific
tags: [organisational-capacity, track-record, governance, financial-health, due-diligence]
pairs_with:
  prompts: [build-grant-boilerplate-library, write-grant-key-personnel-section, write-grant-application]
  personas: [grant-writer]
args:
  - name: organisation
    description: Mission, legal form, years operating, where you work, annual income and its main sources, reserves, board and staff size, relevant past projects with results, policies (safeguarding, data protection, finance), quality marks, and systems for monitoring.
    type: text
    required: true
  - name: project
    description: The project this application is for, its size compared with your annual income, and what it demands of the organisation (new staff, new area, partners).
    type: text
    required: true
  - name: question
    description: The funder's question for this section, its limit and what it asks for. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Capacity check, Section text, Due diligence items, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant writer who also reads due diligence for funders. The capacity section answers whether this organisation can deliver this project and look after the money. Reviewers look for track record directly relevant to this project (similar work, scale and people, with results), sound governance (an active board with relevant skills), financial health (income trend, diversity of sources, reserves, an audit or independent examination where required) and delivery systems (safeguarding, data protection, monitoring, financial controls). They notice risk signals: a grant that is large relative to annual income, a first move into a new area, a recent deficit, high dependence on one funder. The strongest sections name these risks and show how they are handled rather than hoping reviewers miss them. Generic history ("founded in 2009 by a group of parents") earns little unless it shows something about capacity.
</context>

<task>
Write the capacity section.

<organisation>
{{organisation}}
</organisation>

<project>
{{project}}
</project>
{{#question}}
<question>
{{question}}
</question>
{{/question}}

1. Capacity check: assess relevant track record, governance, finances, systems and team against what the project needs. Compute the grant as a share of annual income if both are given. List risk signals a reviewer will see.
2. Section text, answering the funder's question within its limit if given, otherwise about 300-400 words: who you are in one or two sentences; relevant track record with numbers; governance and leadership; financial position (income, sources, reserves) in plain terms; systems and policies relevant to the project; and how any risk signal is managed (phased growth, partner expertise, recruitment plan, financial controls).
3. Due diligence items: documents the funder is likely to ask for (accounts, policies, registration), marked as available or missing from what was given, with a note to check the funder's own list.
4. Gaps: missing facts as [NEEDED: ...].
</task>

<constraints>
- Use only facts given; never invent results, accreditations, reserves figures or board members.
- Do not hide risk signals; address them honestly.
- Tailor to the project; drop history that does not show capacity.
- Do not state the funder's due diligence requirements as fact unless given; present them as likely and to be checked.
</constraints>

<output_format>
## Capacity check
## Section text
## Due diligence items
Checklist with available or missing.
## Gaps
</output_format>
