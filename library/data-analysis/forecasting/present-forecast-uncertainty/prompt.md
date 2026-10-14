---
schema: 1
id: present-forecast-uncertainty
kind: prompt
title: Present forecast uncertainty
description: Turns a forecast with ranges into a chart choice, wording and planning numbers a non-specialist audience will read correctly, tied to the decision and the cost of being wrong in each direction.
category: forecasting
version: 1.0.0
status: incubating
stage: [ship]
role: [data-analyst, financial-analyst, business-analyst, data-scientist]
inputs: [text, dataset]
output: [explanation, copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [prediction-intervals, fan-chart, risk-communication, stakeholder-communication]
pairs_with:
  prompts: [write-forecast-commentary, forecast-time-series, critique-chart]
args:
  - name: forecast
    description: The forecast - point values and intervals or scenarios by period, how the intervals were made, and past accuracy if known.
    type: text
    required: true
  - name: audience
    description: Who will read or hear it (board, store managers, the public, a client) and how numerate they are.
    type: string
    required: true
  - name: decision
    description: What they will decide with it (stock, staffing, budget, capacity, a public warning), and which mistake is costlier - too high or too low.
    type: text
output_contract:
  format: markdown
  sections: [Key message, Recommended chart, Wording, Planning numbers, What not to say, Likely questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Audiences anchor on the first number they see and read a range as either a guarantee or an excuse. Experienced forecasters lead with the decision, not the model: which number to plan for, given that being short and being over cost different amounts. An 80% interval means that about one period in five will land outside it, and saying so in those words prevents "the forecast was wrong" the first time it happens. Natural frequencies ("in about 1 year in 10") are understood better than percentages. Verbal labels like "likely" mean very different things to different people, so pair them with numbers. A fan chart or shaded band shows widening uncertainty better than error bars; a spaghetti of scenarios invites cherry-picking. Showing the past forecast against actuals builds more trust than describing the method.

Audience: {{audience}}
{{#decision}}Decision: {{decision}}{{/decision}}
</context>

<task>
<forecast>
{{forecast}}
</forecast>

1. Key message: one or two sentences that state the expected outcome, the range, and what to plan for, in the audience's language.
2. Recommended chart: chart type (band or fan chart, with history), what to show (actuals, central line, 80% and 95% bands or scenarios), labels and annotations, and what to leave out. Say why it suits this audience.
3. Wording: plain sentences for the range using natural frequencies, verbal probability terms paired with numbers, and one sentence that sets expectations about misses.
4. Planning numbers: map the decision to a point in the distribution (for example plan stock at the 80th percentile when running out costs more than waste; plan the budget at the central case with a contingency). Show the reasoning from the stated costs.
5. What not to say: phrasings likely to be misread for this forecast and audience, with better alternatives.
6. Likely questions from the audience, with short honest answers, including "why is the range so wide?" and "how accurate were you last time?".
</task>

<constraints>
- Do not narrow or drop the intervals to make the message simpler; simplify the wording, not the uncertainty.
- Use only numbers in the forecast supplied; if past accuracy is not given, say so rather than claiming a track record.
- If the intervals look implausible (for example they do not widen with the horizon), point that out before presenting them.
- Keep the key message free of jargon such as "confidence interval", "quantile" or "P90" unless the audience uses those terms.
{{> output/uncertainty}}
</constraints>

<output_format>
## Key message
One or two sentences.

## Recommended chart
Bullets: type, elements, annotations, why.

## Wording
Ready-to-use sentences.

## Planning numbers
Table: decision | number to plan for | why.

## What not to say
Table: avoid | say instead.

## Likely questions
Q and A pairs.
</output_format>
