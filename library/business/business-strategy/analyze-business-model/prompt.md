---
schema: 1
id: analyze-business-model
kind: prompt
title: Analyse a business model
description: Analyses a business model canvas and its unit economics to find the weakest assumptions and design a cheap test for each. Use before investing more time or money in a model.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, verify]
role: [founder, executive, consultant, business-analyst]
inputs: [text, notes]
output: [table, report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [business-model-canvas, riskiest-assumption, unit-economics, assumption-testing]
pairs_with:
  prompts: [model-unit-economics, validate-business-idea, run-swot-analysis]
  personas: [management-consultant, startup-mentor]
args:
  - name: business
    description: How the business works - customers, value proposition, channels, revenue model, key costs, partners - as a canvas or plain description.
    type: text
    required: true
  - name: numbers
    description: Any numbers you have - prices, conversion rates, acquisition cost, margins, churn, volumes. Leave empty if there are none yet.
    type: text
output_contract:
  format: markdown
  sections: [Model summary, Unit economics, Structural issues, Riskiest assumptions, Tests, Verdict]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review business models the way an experienced operator or early-stage investor does: you look for the one or two assumptions that, if wrong, break the whole model, and you find the cheapest way to learn whether they hold. A canvas is a set of linked hypotheses; the links between blocks (price vs channel cost, value delivered vs revenue model) are where models usually fail.
</context>

<task>
Analyse this business model:

<business>
{{business}}
</business>

<numbers>
{{numbers}}
</numbers>

1. Summarise the model in the nine canvas blocks (customer segments, value proposition, channels, customer relationships, revenue streams, key resources, key activities, key partners, cost structure), one line each. Write "unstated" where the material is silent; do not fill gaps with guesses.
2. Compute the unit economics the numbers allow: revenue per customer, contribution margin, acquisition cost, payback period, lifetime value. Show the arithmetic. If key numbers are missing, say which and give the break-even value instead (for example "CAC must stay under X for payback within 12 months").
3. Check the links between blocks for structural problems, such as:
   - channel cost that the price cannot support (a low-priced product sold through field sales);
   - a revenue model that charges before or after the customer gets value, creating churn or collection risk;
   - dependence on a single partner, platform or supplier that can change terms;
   - costs that grow faster than revenue as volume rises;
   - a two-sided model with no plan for the side that is harder to attract.
4. List every material assumption hidden in the model. Score each on impact if wrong (1 to 5) and current evidence (1 = none, 5 = proven). Rank by impact × (6 − evidence).
5. For the top three to five assumptions, design a test: hypothesis in falsifiable form, method, metric, pass threshold set in advance, cost and time.
6. Give a verdict: is the model sound, sound if one or two assumptions hold, or structurally weak, and what to change first.
</task>

<constraints>
- Every number you use comes from the input or is arithmetic on it. Industry rules of thumb are allowed only when labelled as such.
- Prefer tests that take days and little money (customer calls, pre-sales, a landing page, a manual pilot) over tests that require building the product.
- Set pass thresholds before the test, not after.
- Be direct about fatal problems; do not soften a structural flaw into a "consideration".
{{> output/uncertainty}}
</constraints>

<output_format>
## Model summary
Table: Block | Current description.

## Unit economics
Table: Metric | Value or break-even | Working.

## Structural issues
Bullets, most serious first. Each names the blocks involved.

## Riskiest assumptions
Table: # | Assumption | Impact (1-5) | Evidence (1-5) | Score.

## Tests
For each top assumption: Hypothesis, Method, Metric, Pass threshold, Cost and time.

## Verdict
Three to five sentences.
</output_format>
