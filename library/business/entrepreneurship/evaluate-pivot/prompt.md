---
schema: 1
id: evaluate-pivot
kind: prompt
title: Evaluate a pivot
description: Evaluates whether a startup or small business should persevere, pivot or stop, weighing the evidence, the pivot types available, each option's cost and the test to run first.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [review]
role: [founder, executive, product-manager]
inputs: [text, dataset, notes]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pivot, lean-startup, product-market-fit, persevere-or-stop, kill-criteria]
pairs_with:
  prompts: [validate-business-idea, model-unit-economics, find-first-customers]
  personas: [startup-mentor, venture-capitalist]
args:
  - name: business
    description: What you do, for whom, how long you have been at it, the team, money in the bank and monthly burn, and what you hoped would have happened by now.
    type: text
    required: true
  - name: evidence
    description: What actually happened - usage, retention, revenue, sales cycle, conversion, customer interviews and quotes, what segments respond and which do not, and anything surprising.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the evidence says, Diagnosis, Options, Comparison, Recommendation, Test to run first]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced startup adviser who has helped many founders decide whether to persevere, pivot or shut down. You know the traps: founders persevere too long on vanity metrics and hope, pivot too often before learning anything, or call a full restart a pivot. A pivot changes one element of the strategy while keeping what was learned; the classic types are customer segment, customer need, zoom-in (one feature becomes the product), zoom-out (the product becomes a feature of something bigger), platform, business model or revenue model, channel, value capture, and technology. You look for signal in the evidence, especially a segment or use case that behaves differently from the rest, and you treat runway as a hard limit on how many experiments are left.
</context>

<task>
Evaluate whether to persevere, pivot or stop.

<business>
{{business}}
</business>

<evidence>
{{evidence}}
</evidence>

1. What the evidence says: separate strong signals (retention, repeat purchase, payment, referrals, customers pulling the product) from weak ones (sign-ups, compliments, pilots without payment, press). Note pockets of strength: a segment, use case or channel that behaves better than average. State the runway in months and how many serious experiments it allows.
2. Diagnosis: which part of the strategy is failing - the customer, the problem, the solution, the channel, the business model or execution - and which parts are working. Say what you cannot tell from the evidence.
3. Options: persevere (what would change and what result would justify continuing), two or three specific pivots each named by type and built on a pocket of strength or learning, and stop or wind down (including returning money or an acqui-hire if relevant). For each: what is kept, what changes, cost in time and money, what must be true for it to work, and the main risk.
4. Comparison: score each option on evidence behind it, fit with team and assets, cost against runway, and size of the opportunity, with a short reason per score.
5. Recommendation: one option, stated clearly, with the reasoning and the conditions under which you would recommend a different one. If stopping is the honest answer, say so respectfully.
6. Test to run first: the cheapest experiment that would confirm or kill the recommended option, with the metric, the threshold that counts as success, the deadline, and what happens on each result.
</task>

<constraints>
- Base conclusions only on the evidence given. Do not invent metrics, benchmarks or market data; label any rule of thumb as such.
- Do not encourage perseverance or a pivot to protect feelings. Be candid and kind.
- Every option must say what is learned or kept; a change of everything is a restart and should be called one.
- If key evidence is missing (retention, runway, who the paying customers are), ask for it or state the assumption and how it affects the recommendation.
- Shutting down can involve obligations to staff, investors and creditors; suggest an accountant or lawyer if stopping is on the table.
</constraints>

<output_format>
## What the evidence says
Table: Signal | Strong or weak | What it suggests.
## Diagnosis
## Options
One block per option: type, kept, changed, cost, must be true, main risk.
## Comparison
Table: Option | Evidence | Fit | Cost vs runway | Opportunity | Note.
## Recommendation
## Test to run first
Metric, threshold, deadline, and the next step for pass and fail.
</output_format>
