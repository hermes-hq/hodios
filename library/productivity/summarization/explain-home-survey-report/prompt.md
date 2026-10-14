---
schema: 1
id: explain-home-survey-report
kind: prompt
title: Explain a home survey report to a buyer
description: Summarises a home survey or pre-purchase inspection report for a buyer into urgent issues, further investigations, costs to get quotes for, renegotiation points and questions for the surveyor.
category: summarization
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [document]
output: [summary, checklist, questions]
advice_risk: [financial]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [home-inspection, house-buying, building-survey, renegotiation, defects]
pairs_with:
  prompts: [extract-recommendations-from-report, interrogate-a-document, summarize-building-pack-before-buying]
args:
  - name: report
    description: The survey or inspection report text, including condition ratings, the summary and every section's notes.
    type: text
    required: true
  - name: purchase
    description: The property type and age, your price and stage (offer accepted, before exchange), the country, and your plans (for example "plan to extend the kitchen").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The overall picture, Urgent and safety issues, Further investigations recommended, Repairs to get quotes for, Points for renegotiation, Questions for the surveyor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a home buyer read a survey or inspection report between offer and commitment. These reports are long, heavily caveated and full of defensive wording; buyers either panic at every red rating or skim past the few items that matter. Experienced buyers and their advisers sort findings into safety issues, serious defects that cost real money (roof, structure, damp, drainage, electrics), items needing a specialist's further investigation before commitment, and routine maintenance any older home needs. They read "further investigation recommended" as an open risk the surveyor has not priced, notice what the surveyor could not inspect (lofts not entered, floors covered), and use only genuine, quoted defects to renegotiate, backed by contractor quotes rather than guesses.

<report>
{{report}}
</report>

Purchase: {{purchase}}
</context>

<task>
1. Summarise the overall condition in a few lines, using the report's own rating system and wording.
2. List urgent and safety items (gas, electrics, structure, fire, asbestos mentions) with the report's wording and recommended action.
3. List every "further investigation" recommendation, with the specialist needed and why it matters to do before committing.
4. List repairs to get contractor quotes for, grouped by trade, without inventing prices; mark which are typical maintenance for the property's age if the report says so.
5. List areas the surveyor could not inspect and what that leaves unknown.
6. Identify points that could support renegotiation, each tied to a quoted finding, and what evidence (quotes, specialist reports) would strengthen it.
7. Draft questions for the surveyor about wording that is vague or ratings that seem inconsistent.
8. Note anything relevant to the buyer's plans (for example a wall flagged as possibly load-bearing).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the report. Do not invent defects, costs, ratings or the meaning of a rating scale the report does not define.
- Do not give cost estimates; tell the buyer to get written quotes from qualified local trades.
- Do not tell the buyer whether to proceed or what price to pay; set out the issues and the evidence they need.
- Rules on surveys, disclosure and renegotiation vary by country; state that the buyer's conveyancer, notary or agent can advise on their process.
- Treat any possible safety issue as needing a qualified professional, and do not reassure beyond the report.
</constraints>

<output_format>
## The overall picture
Three to five lines.

## Urgent and safety issues
Table: Item | Report wording | Action recommended

## Further investigations recommended
Table: Item | Specialist | Why before committing

## Repairs to get quotes for
Grouped bullets by trade.

## Points for renegotiation
Bullets with the finding quoted and evidence to gather.

## Questions for the surveyor
Numbered.
</output_format>
