---
schema: 1
id: plan-research-dissemination
kind: prompt
title: Plan research dissemination
description: Plans how to share research findings with each audience, choosing outputs, channels, messengers and timing, and how to tell whether the findings reached and were used.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [researcher, student]
requires: [none]
inputs: [text, document]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [research-dissemination, knowledge-mobilisation, science-communication, open-access, stakeholder-engagement]
pairs_with:
  prompts: [write-policy-brief, explain-research-to-public, write-paper-highlights, write-impact-statement, plan-research-talk]
  personas: [science-communicator]
args:
  - name: findings
    description: The findings to share, with how strong they are, whether they are published or under embargo, and any constraints (confidentiality, partner approval, pending patent).
    type: text
    required: true
  - name: audiences
    description: The people you want to reach, for example "GPs, practice nurses, patients with COPD, the regional health board". If empty, likely audiences are proposed.
    type: text
output_contract:
  format: markdown
  sections: [Key messages, Audience map, Dissemination plan, Timeline, Measuring reach and use, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Publishing a paper is not dissemination; most intended users never read journals. Effective dissemination starts from audiences: what each needs to know, what they would do with it, where they already get information, and whom they trust. It then matches outputs to audiences (briefs for decision-makers, practice summaries and training for professionals, plain-language and accessible formats for the public and participants, open data and code for researchers), uses messengers with credibility (professional bodies, patient groups, partners), times releases to moments that matter, and measures reach and use rather than counting outputs. Participants should hear the results before the press does. Overclaiming in press releases is a known source of hype, so messages must keep caveats.
</context>

<task>
Plan dissemination for these findings.
<findings>
{{findings}}
</findings>
{{#audiences}}
<audiences>
{{audiences}}
</audiences>
{{/audiences}}

1. Write the core message in one sentence and two or three supporting messages, with the caveats that must travel with them. If the findings are too preliminary for some audiences (for example the public or policymakers), say so and adjust.
2. Map audiences (propose them if none were given): for each, what they need to know, what you want them to do or consider, their channels and trusted messengers, barriers (time, access, language, disability), and priority.
3. Plan outputs and channels for each audience, including the study participants, open access and data or code sharing for researchers, and media only if the findings warrant it.
4. Sequence it: participants and partners first, embargoes and press release coordination with the journal or institution, conference and policy windows, and follow-up activities.
5. Plan how to measure reach and use: indicators that show engagement and use, not only outputs (for example downloads by sector, requests from services, changes in guidance, attendance by target group).
6. Note resources and responsibilities, and risks such as misinterpretation, hype, confidential partner data or patent constraints.
</task>

<constraints>
- Every message must stay true to the findings and their strength; never strengthen claims for a lay or policy audience.
- Respect stated constraints (embargo, partner approval, confidentiality, patents) in the sequence.
- Do not invent named outlets, contacts or events; describe them by type and mark ones to identify.
- Keep the plan proportionate to the findings and the team's capacity.
</constraints>

<output_format>
## Key messages
The core message, supporting messages, and caveats.
## Audience map
A table: audience | need | desired action | channels and messengers | barriers | priority.
## Dissemination plan
A table: audience | output | channel | messenger | owner.
## Timeline
Steps in order with timing relative to publication.
## Measuring reach and use
A table: audience | indicator | data source.
## Risks
Risks and mitigations.
</output_format>
