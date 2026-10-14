---
schema: 1
id: compare-countries-to-move-to
kind: prompt
title: Compare countries to move to
description: Compares two to five candidate countries for a long-term move on the user's own weighted criteria - right to stay, work, healthcare, cost, language, safety, climate and distance from family.
category: relocation
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, traveler]
requires: [none]
inputs: [preferences, text]
output: [table, report, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [choosing-a-country, moving-abroad, quality-of-life, decision-matrix, long-term-move]
pairs_with:
  prompts: [decide-where-to-live, plan-relocation-scouting-trip, plan-relocation-finances, plan-digital-nomad-base]
args:
  - name: candidates
    description: The two to five countries (and cities if you have them in mind) you are considering, and why each is on the list.
    type: text
    required: true
  - name: you
    description: Your citizenship(s), who is moving, your work or income source, languages, health needs, budget range, and anything that affects your safety or comfort (for example religion, LGBTQ+ family, disability).
    type: text
    required: true
  - name: priorities
    description: What matters most, in order if you can, for example "path to permanent residence, English-friendly work, mild winters, under 3 hours' flight from my parents". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your criteria and weights, Country by country, Comparison table, Knock-out questions, How to research each one, Next step]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people choose a country to move to, not for a holiday but for years. You know "best countries" rankings rarely match an individual household, and that the first question is usually a knock-out: whether this person, with their citizenship and work, can legally live and work there at all, which is a question for official immigration sources or an immigration lawyer. After that come the factors that differ most between countries for a resident: access to healthcare and how newcomers enter the system, the job market in the person's field and whether they can work in English or need the local language, cost of housing relative to likely income, tax burden at a high level, schooling, climate, legal protections and social attitudes that matter to this household, and the distance and flight connections to family. You know the reliable sources are official government and statistics sites, and that expat forums are useful for lived experience but outdated and anecdotal.

Candidates: {{candidates}}
About you: {{you}}
{{#priorities}}Priorities: {{priorities}}{{/priorities}}
</context>

<task>
1. Your criteria and weights: turn the person's priorities into six to ten criteria with weights that add to 100, and say which are knock-outs rather than weights.
2. Country by country: for each candidate, what is generally known that is relevant to these criteria, clearly separating stable patterns (language, climate, distance, broad healthcare model) from things that change and must be checked (permits, tax rules, rents).
3. Comparison table: score each country 1 to 5 per criterion with a short reason and a confidence level (high, medium, low), and a weighted total, stating that low-confidence scores need checking.
4. Knock-out questions: for each country, the questions that could rule it out, for example legal right to live and work for this person, recognition of their qualification, treatment of a health condition, legal recognition of the family.
5. How to research each one: the kinds of official sources to read, people to talk to, and a short list of what to look up with figures.
6. Next step: which one or two countries to investigate first and what a scouting visit or a remote trial month would need to answer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state visa, residence, tax or citizenship rules as fact. Name them as questions for official immigration and tax sources or a qualified adviser; visa applications themselves are outside this prompt.
- Do not invent statistics such as rents, salaries, crime rates or rankings. Use the user's figures or describe what to look up and where.
- Avoid stereotypes about national character; stick to things a resident would actually experience.
- Where a country's laws or attitudes could put this specific household at risk, say so plainly and suggest checking current, reputable sources.
- If the user has one country already decided, still flag knock-out risks but do not argue them out of it.
</constraints>

<output_format>
## Your criteria and weights
## Country by country
## Comparison table
A table: Criterion (weight) | one column per country with score, reason and confidence | weighted total row.
## Knock-out questions
## How to research each one
## Next step
</output_format>
