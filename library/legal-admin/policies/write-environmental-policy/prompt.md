---
schema: 1
id: write-environmental-policy
kind: prompt
title: Write an environmental policy
description: Drafts an environmental policy from a business's real impacts, with commitments it can evidence, measurable targets, owners and review, and flags claims that could count as greenwashing.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, executive, operations-manager]
requires: [none]
inputs: [text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [environmental-policy, sustainability, greenwashing, carbon-targets, tender-requirements]
pairs_with:
  prompts: [write-supplier-code-of-conduct, build-compliance-checklist]
args:
  - name: business
    description: What the business does, sites and fleet, size, main energy, materials, waste and transport, and what it already measures (energy bills, waste tonnage, emissions).
    type: text
    required: true
  - name: reason
    description: Why you need it now, for example a tender or customer questionnaire, an ISO 14001 project, a grant, or your own goals.
    type: string
    required: true
  - name: jurisdiction
    description: Country or countries where the business operates and publishes claims.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Significant impacts, Policy statement, Objectives and targets, Claims to check, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An environmental policy is a short, signed statement of commitments, usually backed by objectives and an owner. Tender evaluators and ISO 14001 auditors check three things: that it fits the organisation's actual impacts, that it commits to complying with legal requirements, preventing pollution and continual improvement, and that it is communicated and reviewed. The most common weakness is a page of vague pledges ("we are committed to sustainability") with no link to what the business does. The most common risk is publishing environmental claims the business cannot substantiate, such as "carbon neutral" based on cheap offsets or "eco-friendly" without evidence; consumer protection and advertising rules in many countries now treat unsubstantiated or vague green claims as misleading, and some restrict offset-based neutrality claims. A good policy names the significant impacts, sets a few measurable targets with baselines, and keeps marketing claims out of it.

Reason: {{reason}}
Jurisdiction: {{jurisdiction}}
</context>

<task>
Business:
<business>
{{business}}
</business>

1. Significant impacts: from the description, list the main environmental aspects (energy, fuel and fleet, materials, waste, water, emissions, hazardous substances, supply chain), whether each is measured today, and rank by significance.
2. Policy statement: one page, signed by [NAME, ROLE], covering scope, commitments tied to the top impacts, compliance with legal and other requirements, pollution prevention, continual improvement, how objectives are set, communication to staff and suppliers, and review date. If the reason is ISO 14001, include the elements that standard expects and mark them to confirm against the current version.
3. Objectives and targets: three to six, each with a baseline (or "establish baseline by [DATE]" when not measured), target, date, owner and how it will be measured.
4. Claims to check: any green claims in the input or likely to be made from this policy, with why each is risky and a safer wording.
5. Points to confirm: legal requirements likely relevant (waste duty of care, packaging, energy reporting, permits) marked "confirm for [jurisdiction]".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent baseline figures, emissions, certifications or targets already achieved; use placeholders and say what to measure.
- Do not write "carbon neutral", "net zero", "climate positive", "eco-friendly" or similar as achieved facts; explain the substantiation they need.
- Keep commitments realistic for the stated size; a five-person office does not need a biodiversity programme.
- Do not state regulations as fact unless supplied; mark them to confirm.
{{> output/uncertainty}}
</constraints>

<output_format>
## Significant impacts
Table: aspect | source | measured today? | significance.

## Policy statement
The one-page policy.

## Objectives and targets
Table: objective | baseline | target | date | owner | measure.

## Claims to check
Table: claim | risk | safer wording.

## Points to confirm
Numbered.
</output_format>
