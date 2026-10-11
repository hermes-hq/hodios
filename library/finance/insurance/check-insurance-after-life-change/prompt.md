---
schema: 1
id: check-insurance-after-life-change
kind: prompt
title: Check your insurance after a life change
description: Works out which policies a life change affects - a move, home working, a lodger, renovation, a new driver, a baby, an empty home - what to tell each insurer, and by when, so cover is not lost.
category: insurance
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [checklist, table, message]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [change-of-circumstances, notify-insurer, unoccupied-home, home-working, policy-conditions]
pairs_with:
  prompts: [prepare-insurance-disclosure, review-insurance-coverage, explain-insurance-policy]
args:
  - name: change
    description: "What is changing and when: moving house, starting to work from home or run a business from home, taking in a lodger or short-let guests, building work, leaving the home empty, a new or young driver, car modifications, a baby, retirement, moving abroad."
    type: text
    required: true
  - name: policies
    description: Policies you hold (home, contents, car, travel, life, income protection, health, pet, gadget) and any conditions you know about changes.
    type: text
    required: true
  - name: country
    description: Country, because duties to tell insurers about changes differ.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Policies affected, What to tell each insurer, Cover that may need adding, Message to send, Questions to ask]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Policies are priced on the facts given at the start, and most home and car policies require you to tell the insurer when certain things change during the year. The changes people forget are ordinary ones: working from home (business equipment and visitors), a lodger or short-let guests (theft by someone allowed in is often excluded), building work (some policies restrict cover while work is under way), leaving a home empty beyond a set number of days (cover for escape of water, theft and vandalism is often reduced), a new address, a car used for commuting or business, modifications, or a young driver using the car. Not telling the insurer can mean a claim is reduced or refused. Life, income protection and health policies usually do not need updating for health changes after they start, but may for changes in occupation, residence or dangerous pursuits, depending on the wording. Changes can also create needs: a baby raises the case for life cover; a new mortgage, buildings cover.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
<change>
{{change}}
</change>

<policies>
{{policies}}
</policies>

1. For each policy held, say whether the change is likely to affect it and why, marking "check the wording" where it depends on conditions not supplied.
2. What to tell each insurer: the facts to give, by when (before the change, within a stated number of days, or at renewal), and the likely effect (no change, premium change, extra conditions, exclusion).
3. Cover that may need adding or reviewing because of the change, without naming products.
4. Draft a short, factual message to an insurer about the change that asks them to confirm cover in writing.
5. Questions to ask, for example whether cover continues during building work, what the unoccupancy period is, whether lodger theft is covered.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person a change "doesn't matter" unless the wording supplied says so; when in doubt, recommend telling the insurer.
- Do not invent policy conditions or time limits; describe common ones as things to check.
- Do not recommend specific insurers or products.
- Recommend getting confirmation of cover in writing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Which policies need action now and the most important deadline.

## Policies affected
Table: policy | affected? | why | check the wording?

## What to tell each insurer
Table: insurer or policy | what to say | by when | likely effect.

## Cover that may need adding
Bullets.

## Message to send
The message.

## Questions to ask
Numbered.
</output_format>
