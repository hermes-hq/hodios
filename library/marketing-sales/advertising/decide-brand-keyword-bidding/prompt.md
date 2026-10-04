---
schema: 1
id: decide-brand-keyword-bidding
kind: prompt
title: Decide on brand keyword bidding
description: Decides whether to bid on your own brand name and on competitors' names from brand-search share, competitor presence and cost, with a holdout test design and trademark cautions to check.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, review]
role: [marketer, founder]
requires: [none]
inputs: [text, dataset]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [brand-search, competitor-keywords, incrementality, holdout-test, trademark]
pairs_with:
  prompts: [audit-search-ads-account, analyze-ad-performance, triage-search-terms-report]
  personas: [paid-media-specialist]
args:
  - name: situation
    description: Your business, whether you run brand or competitor campaigns now and what they cost, who else shows ads on your name, how strong your organic listing is (do you rank first, is there a map pack or shopping results), and what prompted the question.
    type: text
    required: true
  - name: search_data
    description: Any numbers you have, for example brand campaign spend, clicks, conversions and impression share, organic clicks on brand terms, and competitor auction insights. Optional; the test plan works without them.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Own brand, Competitor names, Test design, Trademark and policy checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user runs search ads and is asking two related questions: should we pay for clicks on our own name, and should we bid on competitors' names? Brand campaigns usually show cheap clicks and high conversion rates, but many of those buyers would have clicked the free listing anyway, so the real question is what is incremental. Brand bidding earns its cost when competitors, resellers or aggregators appear above the organic result, when the business wants control of the message (offers, sitelinks to key pages), or when the organic listing is weak. Competitor bidding usually brings low click-through and higher costs, can start a bidding war on your own name, and raises trademark questions about ad text.
</context>

<task>
<situation>
{{situation}}
</situation>

{{#search_data}}
<search_data>
{{search_data}}
</search_data>
{{/search_data}}

1. If you cannot tell whether competitors appear on the brand name or how strong the organic listing is, ask in one message and stop.
2. Own brand: the case for and against in this situation, the share of brand spend in total spend, and a recommendation (keep, reduce to defensive bids, pause to test). Suggest low maximum bids or a target impression share approach to keep costs down if keeping.
3. Competitor names: whether the economics can work (low click-through means high cost per conversion; compare with the target cost per conversion), which competitors are worth trying (where the user has a clear advantage to state), ad copy that sells the user's advantage without using the competitor's name in the ad text, and the risk of retaliation.
4. Test design for own brand: pause or reduce brand ads in some regions or for set weeks while keeping them elsewhere (a geo split or on-off periods of at least two to four weeks), measure total brand clicks (paid plus organic), total conversions and revenue from brand searchers, and say what result keeps or cuts the campaign. Note seasonality and that the test needs enough brand volume to read.
5. Monitoring: watch auction insights and the search results page for competitors arriving, and a trigger to turn brand ads back on.
</task>

<constraints>
- Use only data supplied; do not invent incrementality percentages. Present ranges from common experience only as assumptions to test.
- Trademark: bidding on a competitor's name as a keyword is allowed by many platforms in many countries, but using their trademark in ad text often is not, and rules and laws differ by country; tell the user to check the platform's trademark policy and to seek legal advice before using any competitor name in copy or if they receive a complaint.
- Never suggest misleading ads that imply affiliation with a competitor.
- If the user's own name is generic (for example "London Plumbers"), point out that "brand" traffic may include non-brand searchers.
</constraints>

<output_format>
## Recommendation
Two to four lines covering both questions.

## Own brand
Bullets with the arithmetic where data exists.

## Competitor names
Bullets and two example ads if recommended.

## Test design
A table: Element | Plan (regions or weeks, duration, metrics, decision rule).

## Trademark and policy checks
A checklist.
</output_format>
