---
schema: 1
id: exchange-driving-licence-abroad
kind: prompt
title: Exchange a driving licence abroad
description: Works out how someone can keep driving legally after moving abroad, whether their licence can be exchanged or a test is needed, and the deadlines, documents and steps.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
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
tags: [driving-licence, licence-exchange, international-driving-permit, newcomers, car-insurance]
pairs_with:
  prompts: [prepare-government-form, translate-personal-document]
  workflows: [newcomer-first-month-track]
args:
  - name: licence_country
    description: Country (and state or province, if relevant) that issued your current licence, plus the licence categories you hold (car, motorbike, truck) if not only car.
    type: string
    required: true
  - name: new_country
    description: Country you now live in, and the region if licensing is regional.
    type: string
    required: true
  - name: months_since_arrival
    description: Months since you became resident (registered or started living there), not since your first visit. Use 0 if you have not arrived yet.
    type: number
    required: true
output_contract:
  format: markdown
  sections: [Where you stand now, Likely route, Steps, Documents, Deadlines to confirm, Insurance and risks, Questions for the licensing authority]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Visitors and residents are treated differently. Many countries let a visitor drive on a foreign licence (sometimes with an International Driving Permit, which is only a translation and never a licence on its own), but once a person becomes resident, a clock usually starts: the foreign licence stays valid only for a limited period, often months, after which driving on it is driving without a valid licence, which can also void insurance. What happens next depends on agreements between the two countries: a straight exchange, an exchange with conditions (a practical test, a medical, only some categories), or full theory and practical tests. Licences issued within a free-movement area such as the EU are often recognised without exchange. Rules change and the licensing authority decides.

Licence from: {{licence_country}}
Now resident in: {{new_country}}
Months since becoming resident: {{months_since_arrival}}
</context>

<task>
1. Where they stand: compare {{months_since_arrival}} months with the grace periods commonly used in {{new_country}} (say typical, verify) and give an urgency level: "plenty of time", "start now", or "you may already be past the limit". At the last level, tell them to stop driving until they confirm with the licensing authority, and say why insurance matters here.
2. Likely route, with confidence: recognition without exchange, exchange under an agreement, exchange with conditions, or tests. Say what decides it (an exchange agreement list kept by the licensing authority, sometimes the state or province of issue, and the date the licence was obtained). Never claim an agreement exists unless you are sure; otherwise say "check the authority's list".
3. Steps in order, including booking, any medical or eye test, the translation or official extract of the driving record from the issuing authority, and surrendering the original licence (many authorities keep it, so plan for trips home).
4. Categories: which categories may not transfer (motorbike, truck, automatic-only restrictions) and how to keep them.
5. If tests are needed: theory and practical outline, whether lessons are compulsory, typical waiting times as verify.
6. Before writing, check that the urgency level follows from the months given and that every rule is marked verify.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state grace periods, agreements, fees or test rules as current fact; mark them "typical, verify with the licensing authority".
- Never suggest driving on an expired grace period, using an International Driving Permit as a licence, or obtaining a licence through a third country to dodge a test.
- If they mention a past suspension, disqualification or points, say it may affect the exchange and must be declared.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you stand now
Urgency level in bold, then two or three lines.

## Likely route
One paragraph with confidence.

## Steps
Numbered.

## Documents
Checklist with where to get each.

## Deadlines to confirm
Table: Deadline | Typical (verify) | Counted from.

## Insurance and risks
Bullets.

## Questions for the licensing authority
Numbered.
</output_format>
