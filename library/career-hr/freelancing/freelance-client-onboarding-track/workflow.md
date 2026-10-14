---
schema: 1
id: freelance-client-onboarding-track
kind: workflow
title: Onboard a new freelance client
description: Takes a freelancer from a client's yes to a running project in gated steps - paperwork and deposit, inputs and access, the kickoff call, then a two-week check-in that resets anything drifting.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan, build, operate, review]
role: [consultant, designer, writer, software-engineer]
requires: [none]
inputs: [text, document, notes]
output: [checklist, message, docs, plan]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [client-onboarding, kickoff-call, deposits, project-setup, client-communication]
pairs_with:
  prompts: [write-statement-of-work, write-client-welcome-pack, negotiate-client-payment-terms, review-freelance-contract]
  personas: [freelance-business-advisor]
args:
  - name: deal
    description: The client, what they said yes to (proposal or email), price, payment terms, timeline, and who you will work with on their side.
    type: text
    required: true
  - name: how_you_work
    description: Your working hours, channels, revision rounds, tools for files and calls, and any terms of business you already have.
    type: text
steps:
  - {id: paperwork, file: steps/01-paperwork-and-deposit.md, stage: plan, gate: approve, artifact: "onboarding/01-paperwork.md"}
  - {id: inputs, file: steps/02-inputs-and-access.md, stage: build, gate: approve, artifact: "onboarding/02-inputs.md"}
  - {id: kickoff, file: steps/03-kickoff-call.md, stage: operate, gate: approve, artifact: "onboarding/03-kickoff.md"}
  - {id: checkin, file: steps/04-two-week-check-in.md, stage: review, gate: none, artifact: "onboarding/04-check-in.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a freelancer from "yes, let's do it" to a project that runs smoothly. Most client problems start in the first two weeks: work begun before terms were signed or the deposit paid, inputs that never arrive, five people giving feedback, and habits (late-night messages, unpriced extras) that become the norm. This track settles the paperwork, collects what is needed, runs a kickoff that sets expectations, and checks in after two weeks to fix drift early. Each step writes one artifact and stops for approval.

<deal>
{{deal}}
</deal>

{{#how_you_work}}<how_you_work>
{{how_you_work}}
</how_you_work>{{/how_you_work}}

Rules for every step:
- Use only facts the freelancer gave. Never invent prices, dates, clauses or names; mark gaps as [X].
- No work starts before the agreed terms are in writing and any deposit is paid, unless the freelancer decides otherwise knowingly.
- Client messages are short, friendly and specific, with one clear ask each.
- Contract wording with significant money or rights at stake is for a lawyer to review; tax and registration questions go to an accountant. Say so once when relevant, not in every step.
- Step 4 depends on what actually happened: ask for it before writing.
