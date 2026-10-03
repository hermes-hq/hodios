---
schema: 1
id: insurance-claim-track
kind: workflow
title: Insurance claim track
description: Takes an insurance claim from documenting the loss and reading the policy to filing, follow-up with the adjuster, and a complaint or appeal if needed, pausing for evidence and deadline checks.
category: paperwork
version: 1.0.0
status: incubating
stage: [discover, build, operate, ship]
role: [individual, parent, founder]
subject: [law]
requires: [none]
inputs: [text, document]
output: [checklist, message, table, plan]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [insurance-claim, home-insurance, car-insurance, loss-inventory, claims-adjuster, ombudsman]
pairs_with:
  prompts: [appeal-insurance-denial, review-insurance-coverage, organize-important-documents]
  workflows: [dispute-resolution-track]
args:
  - name: loss
    description: What happened, when and where - for example a burst pipe, theft, car accident, storm damage, lost luggage or an illness abroad - what was damaged or lost, any injuries, what you have done so far, and whether the police or others were involved.
    type: text
    required: true
  - name: policy_type
    description: The kind of policy, for example "home contents", "buildings", "renters", "car", "travel", "pet" or "small business", and whether you have the policy wording and schedule to hand.
    type: string
    required: true
  - name: insurer
    description: Optional. The insurer or broker, your country, the claim reference if one exists, and any deadline or letter you have already received.
    type: string
steps:
  - {id: secure, file: steps/01-secure-and-document.md, stage: discover, gate: approve, artifact: "claim/01-loss-record.md"}
  - {id: file, file: steps/02-file-claim.md, stage: build, gate: approve, artifact: "claim/02-claim-submission.md"}
  - {id: follow-up, file: steps/03-follow-up.md, stage: operate, gate: approve, artifact: "claim/03-claim-log.md"}
  - {id: challenge, file: steps/04-challenge.md, stage: ship, gate: none, artifact: "claim/04-complaint-or-appeal.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes one insurance claim through the stages where claims are won or lost: documenting the loss, reading the policy, filing a complete claim, following up, and only if needed a complaint and appeal. Each step writes one artifact and stops; later steps reuse the approved loss record.

<loss>
{{loss}}
</loss>
Policy type: {{policy_type}}
{{#insurer}}Insurer and location: {{insurer}}{{/insurer}}

{{> guardrails/professional-limits}}

Rules for every step:
- Safety first: if anyone is hurt or a property is unsafe (gas, electrics, structure, fire), contact emergency services and make it safe before anything else.
- Use only facts the person has given or confirmed. Never invent policy wording, amounts, dates, receipts or what the insurer said; use [BRACKETS] and keep open questions.
- Quote the policy wording with its section whenever a point depends on it. Without it, ask for the wording and schedule and say which answers depend on them.
- Name every time limit (reporting, police report, claim, requests, complaint, ombudsman referral, limitation period) as "to verify", earliest first.
- Do not predict whether the claim will be paid or what the insurer will offer. Do not tell the person whether to accept an offer; lay out what accepting means.
- Values must be honest and evidenced. Never inflate a claim, add items or misdescribe the loss; fraud can void the policy and carry criminal penalties. If asked, decline and explain the risk.
- For large losses, injuries, a total loss of a home, alleged misrepresentation or business interruption, suggest help early: a lawyer, a regulated public adjuster or loss assessor (fees made clear), or a free consumer advice service.
- Keep everything the insurer will read factual and calm.
