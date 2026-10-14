---
schema: 1
id: write-marketing-agency-brief
kind: prompt
title: Write a brief for marketing agencies to pitch
description: Writes the brief a business sends marketing or growth agencies before a pitch, with goals, budget, scope, what success looks like, how proposals will be judged and a fair pitch process.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, manager]
requires: [none]
inputs: [text, notes]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [agency-brief, request-for-proposal, agency-selection, outsourcing, scope-of-work]
pairs_with:
  prompts: [write-pr-agency-brief, vet-paid-ads-agency, plan-marketing-team-structure, define-marketing-kpis]
  personas: [fractional-cmo]
args:
  - name: business
    description: What the business sells, to whom, current marketing results and what has or has not worked, and why you want an agency now.
    type: text
    required: true
  - name: needs
    description: What you want the agency to do (strategy, paid media, content, SEO, full service), the budget for fees and for media separately if you know it, the timeline and the internal team they would work with.
    type: text
    required: true
  - name: process
    description: How many agencies you will invite, decision date, who decides, and anything you will not accept (long lock-ins, owning your ad accounts). Optional.
    type: text
output_contract:
  format: markdown
  sections: [About us, Why we are looking, Objectives and measures, Scope of work, Budget, What we provide, What we want in the proposal, How we will decide, Timeline and process, Ground rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a marketing director who has hired agencies many times. A vague brief gets vague, look-alike proposals priced to guess the budget. A good brief states the business objective and how success will be measured, the real budget (fees and media separated), the scope in and out, what the business will provide (access, approvals, data, a named contact), and how proposals will be judged, so agencies can decide whether to pitch and answer the same question. Fair process matters: asking for free strategy work from many agencies wastes their time and attracts the wrong ones, so limit the shortlist and the speculative work, and protect the business by requiring that it owns its ad accounts, data and creative.
</context>

<task>
<business>
{{business}}
</business>

<needs>
{{needs}}
</needs>

{{#process}}
<process>
{{process}}
</process>
{{/process}}

1. If you cannot tell what the agency should do or there is no indication of budget, ask up to three questions and stop. If the budget is unknown but a range can be agreed, leave a clear placeholder and say why stating it matters.
2. Write the brief using the user's facts. Keep it to two or three pages.
3. Objectives and measures: one to three business objectives with the measure and the baseline; avoid activity targets as objectives.
4. Scope of work: in scope, out of scope, and what is open for the agency to recommend.
5. Budget: fees and media or production separately, with the period.
6. What we provide: access, data, approvals turnaround, internal contact and decision makers.
7. What we want in the proposal: approach, team who will actually work on the account, relevant examples, pricing model, reporting, onboarding plan, and references; cap the length.
8. How we will decide: weighted criteria shared upfront.
9. Timeline and process: questions deadline, proposal deadline, shortlist meeting, decision date; number of agencies invited.
10. Ground rules: the business owns ad accounts, data and creative; confidentiality; whether a paid pitch or limited speculative work applies; contract length and notice period expected.
</task>

<constraints>
- Use only facts the user gave; leave clearly marked placeholders for missing ones.
- No invented results, budgets or company details.
- Plain language, no buzzwords.
{{> output/uncertainty}}
</constraints>

<output_format>
## About us
## Why we are looking
## Objectives and measures
## Scope of work
## Budget
## What we provide
## What we want in the proposal
## How we will decide
A table: Criterion | Weight.
## Timeline and process
## Ground rules
</output_format>
