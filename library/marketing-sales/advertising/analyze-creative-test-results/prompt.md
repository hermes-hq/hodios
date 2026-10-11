---
schema: 1
id: analyze-creative-test-results
kind: prompt
title: Analyse ad creative test results
description: Analyses ad-level results by tagged element (hook, format, angle, length, creator, offer) to say which creative elements win, with sample-size and spend-skew caveats and next tests.
category: advertising
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, founder, consultant]
requires: [none]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [creative-testing, creative-analysis, hook-rate, ad-level-data, statistical-confidence]
pairs_with:
  prompts: [plan-ad-creative-tests, diagnose-ad-fatigue, write-ad-creative-brief, analyze-ad-performance]
  personas: [ad-creative-strategist]
  workflows: [ad-account-turnaround-track]
args:
  - name: ad_results
    description: Ad-level export with ad name, spend, impressions, clicks, conversions, cost per result or ROAS, and video metrics (3-second views, average watch time) if available.
    type: text
    required: true
  - name: ad_descriptions
    description: For each ad, what it is (hook, format, angle, length, creator or talent, offer, visual style), or a naming convention that encodes this.
    type: text
    required: true
  - name: test_setup
    description: How the test ran (same ad set or separate, budget split, dates, platform, target cost per result). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Data checks, Results by element, Winners and losers, Confidence, What to make next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user has run a batch of ads and wants to know what worked so the next batch is better. Reading creative tests is harder than it looks. What experts know: platforms do not split spend evenly, so an ad that got little spend was not "tested" and its great CPA on two conversions means nothing; comparing ads one by one hides the pattern, so tag each ad by its elements (hook type, format, angle, length, talent, offer) and aggregate spend-weighted results by tag; use the right metric for each stage (hook or thumb-stop rate and hold rate for the opening, CTR for the message, conversion rate and CPA or ROAS for the offer and audience fit); account for confounds, such as when all the videos also had the strongest offer; and the output that matters is the next brief, not a ranking.
</context>

<task>
<ad_results>
{{ad_results}}
</ad_results>
<ad_descriptions>
{{ad_descriptions}}
</ad_descriptions>
{{#test_setup}}Test setup: {{test_setup}}{{/test_setup}}

1. Data checks: totals, spend distribution across ads, conversions per ad, and which ads have too little data to judge. Note how the test was set up and what that means for comparisons (platform-optimised spend versus forced equal split).
2. Tag each ad by element from the descriptions. If descriptions are missing for some, say so.
3. Results by element: for each element dimension, aggregate spend, conversions, cost per result or ROAS, and the funnel metrics (hook rate, hold rate, CTR, conversion rate), spend-weighted. Note confounds where two elements always appear together.
4. Winners and losers: which elements and ads clearly win or lose, which are inconclusive, and why each is believed (funnel metric pattern plus outcome).
5. Confidence: a plain assessment per conclusion (strong, moderate, weak) based on conversions and consistency, with a simple significance check where conversion counts allow.
6. What to make next: 4 to 8 next ads or iterations that build on winning elements and test the open questions, each with the hypothesis.
</task>

<constraints>
- Do not declare a winner on an ad with very few conversions; say "not enough data" and give the amount needed as an approximate figure.
- Do not invent metrics that are not in the data; skip funnel stages that lack data.
- Separate correlation from cause when elements are confounded.
</constraints>

<output_format>
## Data checks
Bullets with spend distribution and data gaps.

## Results by element
One table per dimension: Element | Ads | Spend | Conversions | CPA or ROAS | Hook rate | CTR | Conv. rate.

## Winners and losers
Bullets with evidence.

## Confidence
A table: Conclusion | Confidence | Why.

## What to make next
A table: Ad idea | Built on | Hypothesis | Metric to judge.
</output_format>
