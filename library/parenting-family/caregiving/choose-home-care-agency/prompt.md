---
schema: 1
id: choose-home-care-agency
kind: prompt
title: Choose a home care agency
description: Helps a family choose a home care agency or individual carer, with must-haves, inspection and vetting checks, interview questions, contract and cost traps, and a first-month review.
category: caregiving
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [checklist, questions, table]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [home-care, domiciliary-care, care-agency, carers, vetting]
pairs_with:
  prompts: [evaluate-care-homes, write-care-profile, set-up-household-employer, plan-long-term-care-costs]
  personas: [eldercare-advisor]
args:
  - name: care_needs
    description: What help is needed, when (times of day, nights, weekends), any skills involved (hoist, catheter, dementia, medicines prompting), the person's preferences about carers (gender, language, culture), how care will be paid for if known, and the country or region.
    type: text
    required: true
  - name: options
    description: Agencies or carers you are considering and anything you know about them, for example inspection ratings, prices quoted, what friends said. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your must-haves, Agency or individual carer, Checks before you call, Questions to ask, Contract and costs, Compare your options, The first month]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families choose care at home the way an experienced care manager would. The failures families most often report: a different carer every day, visits much shorter than booked, missed visits at weekends, rushed personal care, carers not trained for the task (hoists, dementia), and contracts with minimum hours, travel charges and long notice periods nobody read. An agency with a good inspection report can still fail on a specific rota; what matters is whether they can staff this person's times, in this area, with a small consistent team. Hiring a carer directly can give more continuity and choice but makes the family responsible for checks, cover and often employer duties. Inspection bodies, vetting checks and employer rules differ by country.

<care_needs>
{{care_needs}}
</care_needs>
{{#options}}
<options>
{{options}}
</options>
{{/options}}
</context>

<task>
1. Your must-haves: from the care needs, a short list of non-negotiables (visit times, skills, continuity, language, gender) and nice-to-haves.
2. Agency or individual carer: a short comparison of using an agency versus employing someone directly or through an introductory agency, for their situation, covering continuity, cover for sickness and holidays, checks, cost and responsibilities. Point to a separate look at employer duties if they hire directly.
3. Checks before you call: the official inspection or registration body for care at home in their country (or "check which body regulates home care where you live"), recent reports, complaints history if published, and reviews with caution.
4. Questions to ask: grouped as staffing (can you cover these exact times in this postcode, how many different carers per week, how do you introduce new carers), training and skills (specific to the needs given), visits (minimum length, travel time, what happens if a carer is late, how missed visits are handled), safety (vetting checks, medicines policy, safeguarding, insurance), communication (care plan, notes in the home, who to call out of hours), and how they handle complaints.
5. Contract and costs: what to read before signing (hourly rate and any different weekend, night or bank holiday rates, minimum call length, travel and mileage, cancellation and notice terms, deposits, price rises, what happens if the person goes into hospital), with a line to check public funding or financial assessments locally.
6. Compare your options: a scoring table from the must-haves and answers, filled with any options given and blanks otherwise.
7. The first month: an introduction visit, a care profile for the carers, a log to check visit times and length, a review after two and four weeks, and red flags that mean escalating.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent agency names, ratings, prices or regulators; say "check" where you do not know.
- Do not recommend a specific agency. Score from what the family provides.
- If care needs include tasks needing training (hoist transfers, catheter or stoma care, injections, PEG feeding), make "trained and signed off for this task" a must-have.
- If anything suggests the person is being neglected, mistreated or financially exploited by current carers, say to raise it with the agency manager and adult safeguarding services or police, not just switch provider.
- Respect the person's wishes about who comes into their home.
</constraints>

<output_format>
## Your must-haves
## Agency or individual carer
## Checks before you call
## Questions to ask
## Contract and costs
Checklist.
## Compare your options
Table: Criterion | Weight | Option A | Option B | Option C.
## The first month
</output_format>
