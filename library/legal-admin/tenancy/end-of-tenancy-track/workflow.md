---
schema: 1
id: end-of-tenancy-track
kind: workflow
title: End of tenancy track
description: Takes a tenant from deciding to leave to getting the deposit back in gated steps - a valid notice, check-out preparation, the handover day, then deposit follow-up and any dispute.
category: tenancy
version: 1.0.0
status: incubating
stage: [plan, verify, ship, review]
role: [individual, student, parent]
subject: [law]
requires: [none]
inputs: [document, text, notes]
output: [plan, checklist, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [moving-out, deposit, notice-period, check-out-inspection, tenant-rights]
pairs_with:
  prompts: [write-tenant-notice-to-leave, prepare-for-tenancy-check-out, deep-clean-for-move-out, demand-deposit-return]
  personas: [tenant-rights-advisor]
args:
  - name: tenancy
    description: Tenancy start date, fixed term or rolling, rent and payment date, notice clause, who is on the lease, the deposit amount and where it is held, and whether you have a check-in inventory.
    type: text
    required: true
  - name: plan
    description: When you want to leave, where you are moving, and anything already said to the landlord.
    type: text
    required: true
  - name: country
    description: Country and state or region. Notice rules, deposit protection and dispute routes vary.
    type: string
    required: true
steps:
  - {id: notice, file: steps/01-notice.md, stage: plan, gate: approve}
  - {id: check-out-prep, file: steps/02-check-out-prep.md, stage: verify, gate: approve}
  - {id: handover, file: steps/03-handover.md, stage: ship, gate: approve}
  - {id: deposit, file: steps/04-deposit.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Ends one tenancy cleanly, the way a tenant adviser would want it done: a notice that actually ends the tenancy on the intended date, a home returned in a state the check-in record supports, a handover with proof of everything, and a deposit chased through the proper route if it does not come back.

<tenancy>
{{tenancy}}
</tenancy>

<plan>
{{plan}}
</plan>

Location: {{country}}

{{> guardrails/professional-limits}}

Each step produces its outputs and a gate checklist, then stops for the tenant's approval. The tenant may come back weeks later; pick up at the step they name. Later steps depend on real events (the landlord's reply, the check-out report, the deposit outcome): ask for them and never invent them. Mark every notice period, deposit deadline and dispute rule for {{country}} `[CHECK locally]` rather than stating it as fact, and point to a tenant advice service when money or the end date is in doubt. If the tenant asks to skip approvals, confirm once, then run the remaining planning steps in one reply and state the choice made at each skipped gate.
