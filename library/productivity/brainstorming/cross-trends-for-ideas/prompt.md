---
schema: 1
id: cross-trends-for-ideas
kind: prompt
title: Cross trends to find ideas
description: Generates ideas by crossing two or three shifts in how people live or work with your field, checks each trend is real rather than hype, and turns the best crossings into concepts to test.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [founder, product-manager, marketer, consultant]
requires: [none]
inputs: [topic, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [trend-crossing, foresight, opportunity-spotting, innovation]
pairs_with:
  prompts: [validate-business-idea, run-scenario-planning, reverse-assumptions-for-ideas]
args:
  - name: field
    description: Your field, business or project and who it serves. For example "a family-run garden centre in a commuter town".
    type: text
    required: true
  - name: trends
    description: Optional - trends or shifts you have noticed yourself, with any evidence you have. Your country or region helps.
    type: text
output_contract:
  format: markdown
  sections: [Field, Trends, Trend check, Crossing grid, Concepts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Trend crossing generates ideas by taking a shift in behaviour, technology, demographics, regulation or values and asking what it means for a specific field, then crossing two trends to find a combination competitors have not considered. Two disciplines separate useful trend work from hype. First, a trend is a change in what people do, not a buzzword: "more people work from home two or three days a week" is a trend; "the metaverse" is a label. Second, every trend needs evidence the user can check and a sense of how strong it is locally. The model's knowledge of recent data is limited and dated, so trends are offered as hypotheses for the user to verify, not as facts.

<field>
{{field}}
</field>
{{#trends}}
Trends the user has noticed:
<trends>
{{trends}}
</trends>
{{/trends}}
</context>

<task>
1. Restate the field and its customers in one line. Ask for the country or region if it matters and is not given, but continue with a stated assumption.
2. List eight to ten candidate trends{{#trends}}, starting with the user's{{/trends}}, across at least four of: behaviour, demographics, technology, economics, regulation, values and environment. Write each as an observable change in what people do.
3. For each trend, give a confidence level (strong, emerging, uncertain), what evidence would confirm it locally, and where the user could look (official statistics, trade bodies, their own sales data, customer conversations). Do not cite specific figures.
4. Build a crossing grid: pair the most relevant trends with each other and with the field. For each pair, write one idea in a line. Aim for 12 to 20 crossings.
5. Develop the five strongest crossings into concepts: what it is, who it serves, which trends it rides, what it would take to try, and an early signal that the trend is real for these customers.
</task>

<constraints>
- Do not state statistics, market sizes, growth rates or dates as fact; trends are hypotheses with a confidence level and a way to verify.
- Avoid buzzwords without a behaviour behind them.
- Do not claim what specific real companies are doing unless the user said so.
- Note where regulation may apply and that it varies by country.
</constraints>

<output_format>
## Field
One line, with any region assumption.

## Trends
Numbered list: trend as an observable change, category.

## Trend check
Table: Trend # | Confidence | Evidence that would confirm it | Where to look.

## Crossing grid
Table: Trend A | Trend B or field | Idea.

## Concepts
Numbered list of five: concept, who, trends ridden, what it takes, early signal.
</output_format>
