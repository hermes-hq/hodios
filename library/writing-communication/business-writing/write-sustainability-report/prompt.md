---
schema: 1
id: write-sustainability-report
kind: prompt
title: Write a sustainability report
description: Writes a small or mid-sized company's sustainability report covering material topics, measured data with methods, targets, progress and honest gaps, without greenwashing claims.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, executive, consultant, founder]
requires: [none]
inputs: [dataset, notes, document]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sustainability-reporting, esg, carbon-emissions, greenwashing, materiality]
pairs_with:
  prompts: [write-impact-report, write-environmental-policy, write-executive-summary]
args:
  - name: data
    description: Your measured data with years and methods, such as energy use, emissions by scope, waste, water, staff figures, training, safety, supplier checks, community work, and any certifications.
    type: text
    required: true
  - name: company_and_purpose
    description: Company size, sector, country, the reporting year, and why you are reporting, for example "a customer asked for it", "first voluntary report", or "required under a named framework".
    type: text
    required: true
  - name: targets_and_actions
    description: Targets you have set and actions taken or planned. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Sustainability report, Claims check, Data gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Smaller companies now write sustainability reports because large customers, lenders and tender scorers ask for them. Readers check three things: whether the topics covered are the ones that matter for this business (materiality), whether figures are measured with stated methods and boundaries, and whether claims hold up. Regulators in several countries act against misleading green claims, so vague terms ("eco-friendly", "carbon neutral" based on offsets alone, "sustainable") without evidence create real risk. Credible reports state the reporting period and boundary, separate measured from estimated data, show baselines and trends, set targets with dates, and admit gaps such as unmeasured supply-chain emissions. Formal frameworks and mandatory rules differ by country and company size; a voluntary report should say which framework, if any, it follows.
</context>

<task>
Write a sustainability report.

<company_and_purpose>
{{company_and_purpose}}
</company_and_purpose>

<data>
{{data}}
</data>
{{#targets_and_actions}}
<targets_and_actions>
{{targets_and_actions}}
</targets_and_actions>
{{/targets_and_actions}}

1. If there is no data at all, ask for it in one short message and stop.
2. If the purpose names a mandatory framework or a customer questionnaire, follow its structure and say that a specialist should check compliance with it. Otherwise write a voluntary report and state that it does not claim alignment with any framework unless the input says so.
3. About this report: period, boundary (sites, entities), data sources and methods, and what is estimated.
4. Material topics: propose the topics that matter most for this sector and company from environment, people, and governance, explain briefly why, and mark the proposal for the company to confirm.
5. For each topic: why it matters, data with baseline and trend (table), actions taken, targets with dates, and progress. If a topic has no data, say so and state the plan to measure it.
6. Emissions: present by scope only as given; never compute emissions from activity data without the conversion factors and their source in the input. Do not describe the company as carbon neutral or net zero unless the input supports it, and if offsets are involved, report them separately from reductions.
7. A short message from leadership placeholder, and a section on what the company has not yet done.
8. Run a claims check on the draft: list every environmental or social claim and the evidence supporting it, and rewrite or remove any vague or unsupported claim.
</task>

<constraints>
- Use only the data given. Never invent figures, certifications, conversion factors, targets or framework compliance.
- Avoid vague claims (green, eco-friendly, sustainable, planet-positive) without specific evidence next to them.
- Do not give legal advice on reporting obligations; note where a specialist should confirm obligations in the stated country.
- Main report under about 2,000 words.
</constraints>

<output_format>
## Sustainability report
About this report; Leadership message (placeholder); Material topics; one section per topic with data table, actions, targets; What we have not done yet; Targets summary (table: Target · Baseline · Date · Status).
## Claims check
Table: Claim · Evidence · Verdict (supported, reworded, removed).
## Data gaps
Missing data, why it matters and how to measure it.
</output_format>
