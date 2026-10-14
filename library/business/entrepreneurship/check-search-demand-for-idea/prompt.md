---
schema: 1
id: check-search-demand-for-idea
kind: prompt
title: Check search demand for an idea
description: Reads search volumes, trend lines, marketplace and forum signals you gather to judge demand for a business idea and find the words customers actually use for it.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover]
role: [founder, individual, marketer]
requires: [none]
inputs: [dataset, notes, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [demand-signals, search-volume, search-trends, customer-language, desk-research]
pairs_with:
  prompts: [validate-business-idea, research-keywords, check-if-market-is-too-crowded, forecast-new-product-demand]
args:
  - name: idea
    description: The business idea - the problem, the customer and the offer, plus the country or region you will sell in.
    type: text
    required: true
  - name: signals
    description: What you collected - keyword volumes and their source tool, trend charts described or pasted as numbers, marketplace result counts and reviews, forum or social threads, ad competition. Paste raw numbers where you have them.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the signals say, Customer language, Demand verdict, Gaps in the evidence, Next test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You read desk-research signals for a new business idea the way a demand analyst would. Search data shows what people look for, not what they will pay for, and it misleads in predictable ways: keyword tools disagree and give rounded estimates; a single broad term ("coffee") says nothing about buying intent; seasonal curves look like growth or decline if you read one month; low volume can mean a new category, a niche business that still works, or no demand; and people search for the problem or the outcome far more often than for the solution's name. The most valuable output is often the vocabulary customers use, which shapes the offer, the website and the ads.

<idea>
{{idea}}
</idea>

<signals>
{{signals}}
</signals>
</context>

<task>
1. Sort the signals into three groups: problem searches (people describing the pain), solution searches (people looking for a type of product or service), and buying-intent searches (price, near me, best, buy, hire, reviews, compare). Note the source and date range of each number.
2. Read the trends: direction over at least two years where given, seasonality, and any spike that is probably news or a one-off.
3. Read marketplace and community signals: how many sellers, review counts as a rough proxy for sales, recurring complaints, unanswered questions and threads where people ask for a recommendation.
4. Extract the customer language: the exact phrases people use for the problem and the solution, and which phrases carry buying intent. Note words the founder uses that customers do not.
5. Give a demand verdict: strong, moderate, weak or unclear, with the reasoning. Compare the size of demand with what the business needs, for example a local service needs far fewer searches than a national online product.
6. List gaps in the evidence and the signals that would be missing even with perfect data (willingness to pay, price, repeat buying).
7. Propose the next test that measures behaviour, such as a landing page or small ad test using the customer phrases, with a pass threshold.
</task>

<constraints>
- Use only the numbers provided. Never invent search volumes, trend figures or competitor data; if a number is needed, say which tool or source would give it.
- Treat volumes as estimates and say so. Do not compare volumes from different tools as if they were the same measure.
- Say clearly that search demand is not proof that people will pay.
- If the signals are for a different country or language than the one the founder will sell in, flag it.
</constraints>

<output_format>
## What the signals say
Table: Signal | Type (problem, solution, buying intent, marketplace, community) | Reading.
## Customer language
Phrases to use, phrases to avoid, with a short note each.
## Demand verdict
Verdict and reasoning in one paragraph.
## Gaps in the evidence
Bullets.
## Next test
Test, cost, duration and pass threshold.
</output_format>
