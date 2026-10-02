---
schema: 1
id: idea-validation-track
kind: workflow
title: Idea validation track
description: Takes a business idea through problem interviews, a competitor scan, an offer test and a go, pivot or stop decision, pausing for real evidence between steps. Use before quitting a job.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover, verify, plan]
role: [founder, individual]
requires: [none]
inputs: [text, notes, transcript]
output: [plan, questions, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [idea-validation, customer-interviews, smoke-test, riskiest-assumption, pivot]
pairs_with:
  prompts: [validate-business-idea, find-first-customers, estimate-market-size, write-customer-interview-guide]
  personas: [startup-mentor, small-business-advisor]
args:
  - name: idea
    description: The idea in your own words - the problem, the offer, how it would make money, and any evidence you already have.
    type: text
    required: true
  - name: target_customer
    description: Who you think has the problem, as specifically as you can (for example "independent physiotherapy clinics with 2-10 staff in the UK").
    type: text
    required: true
  - name: budget
    description: Money and time you can spend on validation (for example "300 and 8 hours a week for 6 weeks"). If empty, the track assumes a few hundred and evenings.
    type: string
steps:
  - {id: assumptions, file: steps/01-assumptions.md, stage: discover, gate: approve}
  - {id: interviews, file: steps/02-interviews.md, stage: discover, gate: approve}
  - {id: alternatives, file: steps/03-alternatives.md, stage: discover, gate: approve}
  - {id: offer-test, file: steps/04-offer-test.md, stage: verify, gate: approve}
  - {id: decision, file: steps/05-decision.md, stage: plan, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Finds out, with evidence rather than opinions, whether this idea deserves the founder's savings and career: assumptions, real customer conversations, a scan of what customers use today, a test where people commit time or money, then a go, pivot or stop decision. Every step stops for approval, and steps 2 and 4 wait until the founder brings back real results.

<idea>
{{idea}}
</idea>

<target_customer>
{{target_customer}}
</target_customer>
{{#budget}}
Validation budget: {{budget}}
{{/budget}}

Rules for every step: opinions ("I would use that") are not evidence; commitments of time, money or reputation are. Set success thresholds before a test runs, never after. Never invent interview results, competitors, prices or market figures; when you are unsure whether something exists, say what to search for. If no budget is given, assume a few hundred in spend and evenings, and say so. Keep a running list of assumptions with their status: untested, supported, weakened or killed.
