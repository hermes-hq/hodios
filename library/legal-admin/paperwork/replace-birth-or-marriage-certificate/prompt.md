---
schema: 1
id: replace-birth-or-marriage-certificate
kind: prompt
title: Replace a birth or marriage certificate
description: Works out how to get a copy or replacement of a birth, marriage, civil partnership or death certificate - which office holds it, which version you need, what to provide, and how to apply from abroad.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, traveler]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [civil-records, birth-certificate, marriage-certificate, certified-copy, civil-registry]
pairs_with:
  prompts: [legalise-documents-for-use-abroad, organize-important-documents, renew-passport-or-id-card]
args:
  - name: certificate
    description: Which certificate (birth, marriage, civil partnership, death), whose it is and your relationship to them.
    type: string
    required: true
  - name: registered_where
    description: Country, and the region, state, city or district where the event was registered, plus the approximate year. Say if it was registered at a consulate abroad.
    type: string
    required: true
  - name: purpose
    description: What you need it for, for example a passport, a visa, a marriage abroad, a pension or an estate.
    type: string
    required: true
  - name: living_in
    description: Country you live in now, if different from where it was registered. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Which version you need, Where to apply, What to provide, Steps, If records are missing or wrong, Confirm on the official site]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Getting a copy of a civil record is usually simple once you know three things: which office holds the original, which version the receiving authority wants, and who is allowed to order it. Records are kept where the event was registered (a local registry, a state vital records office, a municipal civil registry, a national register, or a consulate for events abroad). Many countries issue several versions: a short extract without parents' names, a full or long-form copy, a multilingual extract (for example the international multilingual forms used between many European countries), or a recently issued copy, and authorities abroad often reject the short version or anything older than a few months. Some places restrict who can order a copy to the person, close relatives or a legal representative. Lookalike websites charge large fees for orders you can place directly with the official office.

Certificate: {{certificate}}
Registered: {{registered_where}}
Purpose: {{purpose}}
{{#living_in}}Living in: {{living_in}}{{/living_in}}
</context>

<task>
1. Which version you need: from the purpose, say which version is usually required (full or long-form, multilingual extract, recently issued, apostilled or legalised), and the question to ask the receiving authority to be sure.
2. Where to apply: the type of office that typically holds this record for {{registered_where}}, how to find the official site, and whether ordering online, by post or in person is common, all marked verify. If the event was registered at a consulate, explain where those records usually end up.
3. What to provide: details of the event (full names at the time, date, place, parents' names), proof of identity, proof of relationship or entitlement if required, and payment.
4. Steps in order, including ordering from abroad{{#living_in}} from {{living_in}}{{/living_in}}, with typical waits marked verify, and whether to order more than one copy.
5. If records are missing or wrong: what to do if the record cannot be found (late registration, archives, alternative evidence) or contains an error (a correction procedure exists in most systems).
6. Confirm on the official site: questions to check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state fees, processing times or eligibility rules as fact; mark them "typical, verify on the official site".
- Point only to official government channels and warn about lookalike sites and agents that charge large fees.
- Do not help obtain someone else's certificate when the user has no entitlement and the jurisdiction restricts access; say who can order it.
- Keep personal identifiers out of the output.
{{> output/uncertainty}}
</constraints>

<output_format>
## Which version you need
Short answer, then the question to ask the receiving authority.

## Where to apply
Bullets, marked verify.

## What to provide
Checklist.

## Steps
Numbered.

## If records are missing or wrong
Bullets.

## Confirm on the official site
Numbered questions.
</output_format>
