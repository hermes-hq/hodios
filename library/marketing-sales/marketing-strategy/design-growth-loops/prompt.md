---
schema: 1
id: design-growth-loops
kind: prompt
title: Design growth loops for a product
description: Maps how existing users or customers can bring in the next ones through referral, content, user-generated, collaboration or sales-led loops, picks the strongest loop, and sets its metrics and fixes.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder, marketer, product-manager]
requires: [none]
inputs: [text, notes]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [growth-loops, viral-coefficient, user-generated-content, product-led-growth, compounding-growth]
pairs_with:
  prompts: [design-referral-program, build-experiment-backlog, analyze-conversion-funnel, plan-free-tool-marketing]
  personas: [growth-marketer]
args:
  - name: product
    description: What the product does, who uses it, how users get value, what they create or share, whether they invite others to use it, and how new users arrive today.
    type: text
    required: true
  - name: metrics
    description: Monthly new users, activation rate, retention, share or invite rates, share of signups from referral, organic search or shared content, if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Candidate loops, Loop scoring, Main loop design, Loop metrics, Weak points and fixes, First experiments]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a growth strategist. A funnel is linear: spend goes in, customers come out. A loop is circular: the output of one cycle (a new user, a piece of content, a shared document, a satisfied customer) becomes the input for the next. Typical loops: users invite collaborators because the product works better with them; users create content that ranks in search or gets shared and brings new users; customers refer peers for a reward or status; revenue from new customers funds sales or ads that bring more. A loop only compounds if each step converts well enough and the cycle time is short; a viral coefficient below one still helps, as it lowers the effective acquisition cost, but it will not grow on its own. Loops must fit the product's natural behaviour; bolted-on sharing prompts that users do not need rarely work, and incentivised spam damages the brand.
</context>

<task>
<product>
{{product}}
</product>

{{#metrics}}
<metrics>
{{metrics}}
</metrics>
{{/metrics}}

1. If you cannot tell what users do in the product or why they would involve others, ask up to three questions and stop.
2. Candidate loops: three to five loops that could plausibly exist for this product, each written as a cycle of steps (for example "user creates report, shares with client, client sees branding, client signs up").
3. Loop scoring: for each, fit with natural behaviour, current evidence, cycle time, expected conversion at each step (user data or labelled assumption), and cost to build.
4. Main loop design: for the chosen loop, every step with the product or marketing change needed, the moment in the user journey it should happen, and what makes the step valuable to the person taking it (not just to the company).
5. Loop metrics: the rate at each step, cycle time, and the loop's output per cohort (for example new users per 100 active users per month), with the formula.
6. Weak points and fixes: the step with the lowest rate and what would lift it; risks such as spam, low-quality signups, privacy or platform rules.
7. First experiments: three tests ordered by learning value, each with hypothesis, change, measure and run time.
</task>

<constraints>
- No invented rates as facts; label assumptions and show the loop arithmetic.
- Do not recommend dark patterns (forced invites, contact uploading without clear consent, misleading share messages).
- Keep the plan to one main loop and at most one supporting loop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Main loop in one sentence and why.

## Candidate loops
Numbered cycles.

## Loop scoring
A table: Loop | Natural fit | Evidence | Cycle time | Step rates | Build cost.

## Main loop design
A table: Step | Change needed | Moment | Value to the person.

## Loop metrics
Formula and current or assumed values.

## Weak points and fixes

## First experiments
</output_format>
