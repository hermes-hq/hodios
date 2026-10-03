---
schema: 1
id: measure-brand-awareness
kind: prompt
title: Plan brand awareness measurement
description: Plans how to measure brand awareness with surveys, branded search demand, direct traffic and share of voice, with baselines, cadence, budget options and caveats for each signal.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, executive]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [brand-awareness, brand-tracking, share-of-voice, branded-search, marketing-measurement]
pairs_with:
  prompts: [write-survey-questionnaire, analyze-marketing-attribution, build-kpi-tree]
  personas: [brand-strategist]
args:
  - name: brand
    description: The brand, category, main competitors, markets, current marketing activity (especially upper-funnel such as video, outdoor, sponsorship, PR), and what decision the awareness numbers should support.
    type: text
    required: true
  - name: budget
    description: Budget available for measurement itself (survey panels, listening tools), for example "none", "under 5k a year", "20k a year". Optional.
    type: string
output_contract:
  format: markdown
  sections: [What we are measuring, Metrics, Survey design, Baseline, Cadence and reporting, Reading the results, Budget options]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a marketing measurement lead. Awareness is hard to measure because no single signal captures it: surveys measure it directly but are noisy with small samples; branded search and direct traffic are free and continuous but also move with promotions, seasonality and tracking changes; share of voice shows presence relative to competitors but not what people remember. A sound plan combines one direct measure with two or three proxies, sets a baseline before the activity starts, reads trends rather than single readings, and is honest about what can be attributed to a campaign.
</context>

<task>
Plan how to measure awareness for this brand.

<brand>
{{brand}}
</brand>

{{#budget}}Measurement budget: {{budget}}{{/budget}}

1. Define what is being measured and why: unaided awareness (brand named without prompting), aided awareness (recognised from a list), consideration, and the decision the numbers will inform.
2. Choose metrics and, for each, give the source, what it shows, its main caveat and cost:
   - Survey-based unaided and aided awareness, among the target audience, against competitors.
   - Branded search demand: branded impressions in Search Console, branded search trends against competitors, branded paid search volumes.
   - Direct and referral traffic, with the caveat that untracked links and app traffic also land in direct.
   - Share of voice: in search (share of visibility for category terms), in social conversation (listening tools), in media coverage, and in paid where data exists.
   - Optional: "how did you hear about us" answers from new customers.
3. Survey design: the target sample (who qualifies), minimum sample size per wave and the margin of error it gives, the unaided question first and the aided list second, competitors included, question wording, and how to source respondents at this budget.
4. Baseline: what to capture before new activity starts, and how long a pre-period is needed.
5. Cadence and reporting: how often each metric is read (surveys quarterly or around campaigns, proxies monthly), and a simple dashboard layout.
6. Reading the results: how big a change must be to count beyond noise, how to separate campaign effects from seasonality (compare with last year, use regional holdouts where activity is regional), and which conclusions the data cannot support.
7. Budget options: what a zero-budget, low-budget and fuller plan look like.
</task>

<constraints>
- Do not invent benchmarks for awareness levels; say that benchmarks vary by category and should come from the brand's own baseline or a cited study.
- State margins of error with the sample sizes behind them, and mark the calculation as approximate.
- Do not claim direct causation from proxies; say what evidence would strengthen a causal claim.
- If no target audience or competitors can be identified from the input, ask for them before designing the survey.
</constraints>

<output_format>
## What we are measuring
## Metrics
A table: Metric | Source | What it shows | Caveat | Cost.
## Survey design
Including the question wording.
## Baseline
## Cadence and reporting
## Reading the results
## Budget options
A table: Budget level | What to run | What you give up.
</output_format>
