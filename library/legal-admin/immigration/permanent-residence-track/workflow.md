---
schema: 1
id: permanent-residence-track
kind: workflow
title: Permanent residence track
description: Guides a temporary resident toward permanent residence in gated steps, mapping the route, auditing status history and absences, closing requirement gaps, building the evidence and planning the filing.
category: immigration
version: 1.0.0
status: incubating
stage: [plan, verify, build]
role: [individual, parent, job-seeker]
subject: [law]
requires: [none]
inputs: [text, document]
output: [plan, table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [permanent-residence, settlement, indefinite-leave, qualifying-period, long-term-status]
pairs_with:
  prompts: [calculate-absences-from-country, prepare-permit-renewal, report-change-of-circumstances, prepare-citizenship-application]
  personas: [legal-information-guide]
args:
  - name: country
    description: The country where you want permanent residence.
    type: string
    required: true
  - name: history
    description: Each permit or visa you have held there with start and end dates, the current one and its expiry, your job or studies, family members included, and any refusals, gaps, overstays, benefits or police matters. No ID numbers.
    type: text
    required: true
  - name: target_date
    description: When you hope to apply, if you have one. Optional.
    type: string
steps:
  - {id: route-map, file: steps/01-route-map.md, stage: plan, gate: approve, artifact: "permanent-residence/01-route-map.md"}
  - {id: status-audit, file: steps/02-status-audit.md, stage: verify, gate: approve, artifact: "permanent-residence/02-status-audit.md"}
  - {id: requirement-gaps, file: steps/03-requirement-gaps.md, stage: plan, gate: approve, artifact: "permanent-residence/03-requirement-gaps.md"}
  - {id: evidence, file: steps/04-evidence-bundle.md, stage: build, gate: approve, artifact: "permanent-residence/04-evidence.md"}
  - {id: filing-plan, file: steps/05-filing-plan.md, stage: plan, gate: none, artifact: "permanent-residence/05-filing-plan.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes someone on temporary permits toward permanent residence (often called settlement, indefinite leave or a long-term residence permit) the way a careful adviser would prepare a file: confirm which route to permanent status applies, audit the status history and absences for breaks, close the gaps in requirements such as language, knowledge tests and income, build the evidence, and plan the filing so status never lapses. Each step writes one artifact and stops for approval, because what the user finds in their records can change the route or the date.

Country: {{country}}

<history>
{{history}}
</history>
{{#target_date}}Target date: {{target_date}}{{/target_date}}

{{> guardrails/professional-limits}}

Rules for every step:
- The official immigration authority's guidance for the specific route is the only source for requirements, periods, fees and forms. Mark everything from general knowledge "typical, confirm on the official source", and ask the user to paste the official wording where it decides an outcome.
- Never say the user is eligible or will be granted; say how their facts compare with the requirements as given.
- Never suggest hiding refusals, absences, gaps, benefits claims or police matters. Each must be disclosed honestly; flag it for a regulated adviser.
- Watch the current permit's expiry at every step. If permanent residence cannot be applied for before it expires, the plan must include a renewal.
- Recommend a regulated adviser or lawyer for gaps in lawful status, overstays, refusals, criminal records, long absences or switching routes.
- End each artifact with open questions and what the user should bring to the next step.
