---
schema: 1
id: recruit-startup-advisors
kind: prompt
title: Recruit startup advisors
description: Plans recruiting advisors for a startup - the gaps they should fill, who to approach, the outreach message, typical equity and vesting, and what an advisor agreement should cover.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder]
advice_risk: [legal]
requires: [none]
inputs: [text]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [advisory-board, advisor-equity, vesting, advisor-agreement, founder-network]
pairs_with:
  prompts: [find-cofounder, model-round-dilution, write-networking-message]
  personas: [startup-mentor]
args:
  - name: startup
    description: What the startup does, its stage, the founders' strengths, and what the company needs most in the next 12-18 months.
    type: text
    required: true
  - name: candidates
    description: People you are considering or already talking to, with what they could offer. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Gaps to fill, Advisor profiles, Where to find them, Outreach message, Terms, Agreement checklist, Running the relationship]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders recruit advisors who actually help. Most advisory boards fail because founders collect impressive names instead of filling specific gaps, give equity upfront with no vesting, and never define what the advisor will do. Useful advisors have a concrete role (for example opening doors to ten buyers, reviewing regulatory strategy monthly, helping hire a first sales lead), a defined time commitment, equity that vests over time with a short cliff, and a written agreement covering confidentiality and IP. Early-stage advisor equity is commonly in the range of a fraction of a percent each, depending on stage and commitment, but norms vary and should be checked against the cap table and local practice.

<startup>
{{startup}}
</startup>
{{#candidates}}
<candidates>
{{candidates}}
</candidates>
{{/candidates}}
</context>

<task>
1. Gaps to fill: from the needs and the founders' strengths, name two or three specific gaps an advisor could close, and gaps that need a hire or cofounder instead.
2. Advisor profiles: for each gap, describe the ideal advisor (experience, network, credibility with whom) and the concrete deliverables expected in the first six months.
3. Where to find them: warm introductions through investors, customers and former colleagues; industry events; alumni networks; people who have recently left relevant companies. If candidates were given, rate each against the profiles.
4. Outreach message: a short first message to a potential advisor that names the specific help wanted, the time it would take, and why them. Under 120 words.
5. Terms: a range of equity to discuss, framed as typical for the stage and to be checked; vesting over a set period with a short cliff; time commitment; whether to pay cash instead or as well; and a trial period before formal terms.
6. Agreement checklist: what a written advisor agreement should cover - role and time, equity and vesting, what happens if either side ends it, confidentiality, IP assignment for work done, conflicts of interest, and no authority to bind the company.
7. Running the relationship: a monthly rhythm, how to ask for help well, and how to end it gracefully if it is not working.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not name real people as candidates unless the founder named them. Do not invent their backgrounds.
- Present equity ranges as common practice that varies, never as a rule, and suggest a startup lawyer draft or review the agreement and the equity grant.
- Warn against granting fully vested equity upfront and against titles that imply an advisor is an employee or director.
</constraints>

<output_format>
## Gaps to fill
## Advisor profiles
Table: Gap | Ideal advisor | Six-month deliverables.
## Where to find them
## Outreach message
## Terms
## Agreement checklist
Checklist.
## Running the relationship
</output_format>
