---
schema: 1
id: write-requirement-change-request
kind: prompt
title: Write a requirement change request
description: Writes a change request for a requirement that changes mid-build, with what changes and why, impact on finished work, tests, estimate and date, the options and the decision needed.
category: product
version: 1.0.0
status: incubating
stage: [build, plan]
role: [product-manager, business-analyst, project-manager, tech-lead]
stack: []
requires: [none]
inputs: [spec, ticket, notes, text]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [scope-change, change-control, impact-analysis, requirements]
pairs_with:
  prompts: [write-prd, refine-backlog-ticket, write-acceptance-criteria]
args:
  - name: original_requirement
    description: The requirement or acceptance criteria as agreed, quoted.
    type: text
    required: true
  - name: requested_change
    description: The change, who asked for it and why, and how urgent it is.
    type: text
    required: true
  - name: build_status
    description: What is already designed, built, tested or released, and the current target date.
    type: text
output_contract:
  format: markdown
  sections: [Change summary, Reason and evidence, Impact, Options, Decision needed, Updated requirement text]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Requirements change mid-build for good reasons: a customer conversation, a legal finding, a discovered edge case. The damage comes from changes slipped in through chat messages, where nobody weighed the cost and the tests and documentation still describe the old behaviour. A good change request is short and makes the trade-off visible: the old and new text side by side, the reason and its evidence, what work is thrown away or redone, which tests, designs, docs and dependent teams are affected, and the effect on the date. It always offers more than one option, including "not now" and a smaller version, and names the person who decides, so the team does not absorb scope silently.
</context>

<task>
<original_requirement>
{{original_requirement}}
</original_requirement>
<requested_change>
{{requested_change}}
</requested_change>
{{#build_status}}
<build_status>
{{build_status}}
</build_status>
{{/build_status}}

1. Write the change summary: old text and new text side by side, in one or two sentences what is different for users.
2. State the reason and evidence, separating facts (a customer contract, a measured problem, a legal requirement) from opinions, and say what happens if the change is not made.
3. Assess impact on: work already done (kept, changed, discarded), designs, acceptance criteria and tests, documentation and help content, data already created under the old rule, other teams and integrations, and the release date. Mark estimates as ranges and as the team's to confirm.
4. Offer two to four options: make the change now, a smaller version now with the rest later, defer to a follow-up release, reject. Give the cost and risk of each.
5. State the decision needed, who decides, and by when to avoid further waste.
6. Write the updated requirement and acceptance criteria text for the recommended option, ready to paste into the ticket.
</task>

<constraints>
- Do not invent effort numbers or dates; if build status is missing, list impact areas and leave estimates for the team.
- Keep a neutral tone; the document informs a decision, it does not argue for the requester or against them.
- Always include a "not now" or "reject" option with its consequence.
- If the change actually conflicts with another stated requirement, point out the conflict.
</constraints>

<output_format>
## Change summary
Table: before, after. One-line user impact.
## Reason and evidence
Bullets: facts, opinions, cost of not changing.
## Impact
Table: area, impact, effort range (to confirm).
## Options
Numbered: option, cost, risk, recommendation flag.
## Decision needed
Who decides, by when, what happens meanwhile.
## Updated requirement text
The new requirement and acceptance criteria.
</output_format>
