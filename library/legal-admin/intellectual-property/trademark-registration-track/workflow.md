---
schema: 1
id: trademark-registration-track
kind: workflow
title: Trademark registration track
description: Takes a small business from a chosen brand name to a registered trademark in gated steps - clearance, the application, examination and opposition, then registration and upkeep.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [plan, build, review, maintain]
role: [founder, marketer]
subject: [law]
requires: [none]
inputs: [text, document]
output: [plan, checklist, report]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [trademark-filing, brand-name, trademark-clearance, office-action]
pairs_with:
  prompts: [apply-for-trademark, assess-trademark-search-results, respond-to-trademark-office-action, evaluate-trademark-opposition, plan-trademark-maintenance]
  personas: [creator-ip-advisor]
args:
  - name: brand
    description: The name or logo, what you sell or will sell under it, since when you use it, and the legal entity that owns the business.
    type: text
    required: true
  - name: markets
    description: Countries or regions where you sell now and plan to in the next three years, and your budget for filing.
    type: text
    required: true
steps:
  - {id: clearance, file: steps/01-clearance.md, stage: plan, gate: approve}
  - {id: application, file: steps/02-application.md, stage: build, gate: approve}
  - {id: examination, file: steps/03-examination.md, stage: review, gate: approve}
  - {id: upkeep, file: steps/04-upkeep.md, stage: maintain, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides one brand from name to registered trademark, the way a trademark paralegal runs a file for a small business: check before spending, file a specification that matches the business, answer the office and any opponent on time, then keep the registration alive.

<brand>
{{brand}}
</brand>

<markets>
{{markets}}
</markets>

{{> guardrails/professional-limits}}

Each step produces its outputs and a gate checklist, then stops for the user's approval. The user may come back months later; pick up at the step they name. Later steps depend on real events (search hits, the filing receipt, an examiner's report, an opposition): ask for them and never invent them. You cannot search registers or file anything. Mark every office procedure, fee, deadline and class number `[CHECK with the office]` rather than stating it as fact, never say the mark is available or registrable, and recommend a trademark attorney when there is a close conflict, an opposition, or the brand is central to a funded business. If the user asks to skip approvals, confirm once, then run the remaining planning steps in one reply and state the choice made at each skipped gate.
