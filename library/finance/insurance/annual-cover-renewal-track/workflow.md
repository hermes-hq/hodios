---
schema: 1
id: annual-cover-renewal-track
kind: workflow
title: Review household insurance at renewal
description: Takes a household through its yearly insurance renewals - list policies and dates, check what changed, re-quote like for like, compare and negotiate, then switch or renew without a gap in cover.
category: insurance
version: 1.0.0
status: incubating
stage: [discover, review, plan]
role: [individual, parent]
requires: [none]
inputs: [text, document]
output: [table, checklist, plan, message]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [insurance-renewal, switching-insurer, renewal-premium, like-for-like, policy-calendar]
pairs_with:
  prompts: [review-insurance-coverage, check-insurance-after-life-change, compare-home-insurance-quotes, compare-car-insurance, choose-insurance-deductible, check-home-sum-insured]
  personas: [retired-claims-handler]
args:
  - name: policies
    description: "Each policy: type, renewal date, this year's and last year's premium, payment method, cover level, excess, add-ons, and the renewal notice if you have it. Leave out policy numbers."
    type: text
    required: true
  - name: household
    description: What has changed in the last year (move, car, job, home working, building work, people moving in or out) and your country.
    type: text
steps:
  - {id: calendar, file: steps/01-calendar.md, stage: discover, gate: approve, artifact: "cover-renewal/01-calendar.md"}
  - {id: changes, file: steps/02-changes.md, stage: review, gate: approve, artifact: "cover-renewal/02-changes.md"}
  - {id: requote, file: steps/03-requote.md, stage: plan, gate: approve, artifact: "cover-renewal/03-requote.md"}
  - {id: compare, file: steps/04-compare.md, stage: review, gate: approve, artifact: "cover-renewal/04-compare.md"}
  - {id: switch, file: steps/05-switch.md, stage: plan, gate: none, artifact: "cover-renewal/05-switch.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a household's insurance renewals the way a careful broker would for a client, without selling anything: put every policy and date on one calendar, update the facts insurers rely on, gather quotes on a genuinely like-for-like basis, compare on cover and price (including what the current insurer will offer to keep you), and renew or switch without leaving a day uncovered. Each step writes one artifact and stops for approval; later steps reuse approved facts.

<policies>
{{policies}}
</policies>
{{#household}}

<household>
{{household}}
</household>
{{/household}}

{{> guardrails/professional-limits}}

Rules for every step:
- Use only the figures and terms the person gives or confirms. Mark anything unknown and say where to find it (renewal notice, policy schedule, insurer account).
- Do not recommend specific insurers or products and do not tell the person to cancel cover; describe options and trade-offs.
- Compare cover before price. A cheaper quote that covers less is not a saving until the person decides the missing cover is not needed.
- Never help misstate facts to get a lower price; accurate answers decide whether claims are paid.
- Rules on renewal pricing, cooling-off periods and cancellation fees differ by country; present them as things to check.
- Do not ask for policy numbers, logins or card details.
