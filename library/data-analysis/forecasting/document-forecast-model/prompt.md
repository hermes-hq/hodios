---
schema: 1
id: document-forecast-model
kind: prompt
title: Document a forecast model
description: Writes the model card for a forecast in use - purpose, data, method, accuracy versus a baseline, weaknesses, override rules, owners and re-validation - so it can be audited and handed over.
category: forecasting
version: 1.0.0
status: incubating
stage: [maintain]
role: [data-scientist, data-analyst, financial-analyst, ml-engineer]
inputs: [notes, document, text]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [model-card, model-documentation, model-governance, forecast-overrides]
pairs_with:
  prompts: [measure-forecast-accuracy, monitor-forecast-drift, write-data-methodology-note]
args:
  - name: model_notes
    description: "Everything known about the forecast: what it predicts and for whom, data sources and cleaning, method and parameters, backtest results, how it is run and published, who can override it, and known problems."
    type: text
    required: true
  - name: audience
    description: Who will read it (model risk reviewers, auditors, the planning team, a successor). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Purpose and use, Data, Method, Performance, Limitations, Overrides and governance, Open items]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Forecasts used for real decisions (stock, staffing, budgets, regulatory capital) need documentation that outlives the person who built them. Model risk practice in banking and good data science practice converge on the same content: the intended use and the uses it is not fit for; data sources, cleaning and known gaps; the method in plain words with enough detail to reproduce; performance measured by backtest at the decision horizon against a simple baseline, including bias and interval coverage; known weaknesses and conditions where it breaks (new products, structural breaks, promotions without history); the override policy (who can override, how overrides are logged and later scored); owners; monitoring; and a re-validation trigger. The commonest gaps are accuracy quoted without a baseline or at the wrong horizon, silent manual adjustments, and no statement of what the model must not be used for.
{{#audience}}

Audience: {{audience}}
{{/audience}}
</context>

<task>
<model_notes>
{{model_notes}}
</model_notes>

1. State the purpose, the decision it supports, the users, and explicitly the uses it is not intended for.
2. Document the data: sources, refresh, history length, cleaning steps and known gaps.
3. Describe the method plainly, then technically (model form, parameters, training window, refit frequency), and how it is run and published.
4. Report performance from the notes: metric, horizon, baseline compared, bias, interval coverage, and the period tested. Where results are missing, say so and list the test needed.
5. List limitations and failure conditions.
6. Write the override and governance section: who may override, logging, scoring of overrides, owners, monitoring, and the triggers and schedule for re-validation.
7. List open items where the notes are incomplete.
</task>

<constraints>
- Use only facts in the notes; write "[not documented]" rather than inventing parameters, results or owners.
- Never report accuracy without its horizon and baseline; if those are missing, mark the result as incomplete.
- Plain language first in each section, technical detail after.
</constraints>

<output_format>
## Purpose and use
Purpose, users, decisions, not intended for.

## Data
Bullets.

## Method
Plain summary, then technical detail.

## Performance
Table: Metric | Horizon | Model | Baseline | Period tested. Then bias and coverage notes.

## Limitations
Bullets.

## Overrides and governance
Bullets: override rules, logging, owners, monitoring, re-validation triggers.

## Open items
Bullets.
</output_format>
