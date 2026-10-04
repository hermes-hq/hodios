---
schema: 1
id: small-claims-track
kind: workflow
title: Small claims track
description: Takes a consumer or small-business money dispute through small claims - demand letter, evidence bundle, filing, hearing rehearsal and enforcement - with a settle-or-continue decision at each step.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [plan, build, ship, verify, operate]
role: [individual]
subject: [law]
requires: [none]
inputs: [text, document]
output: [message, checklist, table, conversation]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [small-claims, demand-letter, evidence-bundle, enforcement, settlement, self-represented]
pairs_with:
  prompts: [write-complaint-letter, prepare-small-claims-case, practise-small-claims-hearing, complain-to-ombudsman]
  workflows: [dispute-resolution-track]
args:
  - name: dispute
    description: What happened in date order - what was agreed, what went wrong, what you have already done (complaints, letters, any outside body), what the other side has said, and the evidence you hold.
    type: text
    required: true
  - name: amount
    description: The amount you want to claim, with the currency and how you worked it out.
    type: string
    required: true
  - name: country
    description: Country and region where the claim would be brought; small-claims limits, steps and enforcement differ.
    type: string
    required: true
  - name: other_party
    description: Who you are claiming against, by type and role, for example "sole-trader plumber", "online retailer (limited company)", "former landlord", "client business that has not paid my invoice".
    type: string
    required: true
steps:
  - {id: demand, file: steps/01-demand.md, stage: plan, gate: approve, artifact: "small-claims/01-fit-check-and-demand-letter.md"}
  - {id: bundle, file: steps/02-bundle.md, stage: build, gate: approve, artifact: "small-claims/02-evidence-bundle-and-claim.md"}
  - {id: file, file: steps/03-file.md, stage: ship, gate: approve, artifact: "small-claims/03-filing-and-response-plan.md"}
  - {id: hearing, file: steps/04-hearing.md, stage: verify, gate: approve, artifact: "small-claims/04-hearing-rehearsal-notes.md"}
  - {id: enforce, file: steps/05-enforce.md, stage: operate, gate: none, artifact: "small-claims/05-enforcement-plan.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes one money dispute through a small-claims court, from the formal demand to getting paid. It starts where complaining has failed; if no complaint was made, or a free ombudsman or dispute scheme may handle it, step 1 says so first. Each step writes one artifact and ends with a settle-or-continue decision, because most small claims settle.

<dispute>
{{dispute}}
</dispute>
Amount claimed: {{amount}}
Country: {{country}}
Other party: {{other_party}}

{{> guardrails/professional-limits}}

Rules for every step:
- Use only facts the person gave or confirmed. Never invent dates, amounts, evidence, forms, fees or limits; use [BRACKETS] and keep a list of points to confirm with the court.
- Mark every rule, fee and time limit "to verify with the court", earliest deadline first.
- Do not predict the outcome; you may say which facts are well evidenced.
- Claim only what the evidence supports, with its calculation; interest and costs only where the rules allow, marked to verify.
- Never help create, backdate or alter evidence or present an untrue account.
- Keep everything the court or the other side reads factual and calm.
- For amounts near the small-claims limit, a government defendant, personal injury, employment, housing possession or family matters, say early that another route or legal advice is likely needed.
- End every step with "Settle or continue": any offer compared with the claim after fees, time and the risk of not collecting, then ask "Settle, wait or continue?". The person decides.
