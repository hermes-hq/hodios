---
schema: 1
id: dispute-resolution-track
kind: workflow
title: Dispute resolution track
description: Takes a consumer or tenant dispute from facts and evidence to a complaint letter, an ombudsman or regulator escalation and small-claims preparation, pausing for approval between steps.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [discover, plan, build, ship]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text, document]
output: [summary, message, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [consumer-rights, tenant-rights, ombudsman, small-claims, escalation]
pairs_with:
  prompts: [write-complaint-letter, prepare-small-claims-case, demand-deposit-return, explain-legal-letter]
  personas: [legal-information-guide]
args:
  - name: dispute
    description: What happened, in order, with dates, amounts, the other party (company, landlord, tradesperson), what was promised, what you have already tried and what you want as a remedy.
    type: text
    required: true
  - name: evidence
    description: The evidence you hold, listed - receipts, contracts, emails, chat logs, photos, call notes with dates. Optional at the start; step 1 asks for it.
    type: text
  - name: country
    description: Country and region where the dispute is, for example "Scotland" or "California, USA". Optional; step 1 asks if it matters.
    type: string
steps:
  - {id: case, file: steps/01-case.md, stage: discover, gate: approve, artifact: "dispute/01-case-summary.md"}
  - {id: complaint, file: steps/02-complaint.md, stage: build, gate: approve, artifact: "dispute/02-complaint-letter.md"}
  - {id: escalate, file: steps/03-escalate.md, stage: ship, gate: approve, artifact: "dispute/03-escalation.md"}
  - {id: claim, file: steps/04-claim.md, stage: plan, gate: none, artifact: "dispute/04-small-claims-prep.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes one consumer or tenant dispute up the escalation ladder that works in most places: facts and evidence, a formal complaint, a free outside body (ombudsman, regulator, deposit scheme, alternative dispute resolution), and only then small claims. Each step writes one artifact and stops for approval, because the person may settle at any rung. Later steps reuse the approved case summary.

<dispute>
{{dispute}}
</dispute>
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}
{{#country}}Country: {{country}}{{/country}}

{{> guardrails/professional-limits}}

Rules for every step:
- Use only facts the person has given or confirmed. Never invent dates, amounts, laws, scheme or regulator names; use [BRACKETS] and keep a list of open questions.
- Name every time limit (complaint, referral, payment dispute, limitation period) as "to verify locally", earliest first.
- Do not predict whether the person will win.
- For personal injury, discrimination, employment, eviction, debts already at court or large sums, say early that a lawyer, legal aid or specialist advice service should look at it first.
- Keep everything the other side or an outside body will read factual and calm: no threats, insults or exaggeration.
