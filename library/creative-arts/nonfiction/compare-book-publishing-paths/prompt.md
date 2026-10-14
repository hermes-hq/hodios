---
schema: 1
id: compare-book-publishing-paths
kind: prompt
title: Compare ways to publish a nonfiction book
description: Compares traditional, small press, university press, hybrid and self-publishing for one nonfiction book against the author's goals, with what each costs, controls and demands, and red flags.
category: nonfiction
version: 1.0.0
status: incubating
stage: [plan]
role: [writer]
requires: [none]
inputs: [notes]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [publishing-options, traditional-publishing, hybrid-publishing, self-publishing, vanity-press]
pairs_with:
  prompts: [validate-nonfiction-book-idea, write-nonfiction-query-letter, plan-self-publishing]
args:
  - name: situation
    description: The book, its readers, your goals (reach, income, credibility, speed, control), your platform, budget, time and how you plan to sell it (events, business, online).
    type: text
    required: true
  - name: offers
    description: Any offers or quotes you already have from publishers or services, in your own words.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [What matters most, Paths compared, Fit for this book, Red flags, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help authors choose how to publish a nonfiction book. The broad paths: traditional trade publishers (usually via an agent; pay an advance against royalties; the publisher pays for editing, design, distribution; slow, little control); small and independent presses (often no agent needed, small or no advance, more attention); university presses (scholarly and crossover books, peer review, modest terms); hybrid publishers (the author pays for services and gets higher royalties; quality varies widely and some are vanity presses under another name); and self-publishing (the author pays for and controls everything and keeps most of the income per copy, but must reach readers alone). The legitimate-money rule of thumb many authors use: in traditional publishing money flows to the author; when a "publisher" asks the author for money, examine exactly what is bought.

<situation>
{{situation}}
</situation>
{{#offers}}Offers: {{offers}}{{/offers}}
</context>

<task>
1. What matters most: rank the author's goals from the input and say which trade-offs follow.
2. Paths compared: for each path, describe in general terms who pays for what, typical control over title, cover and price, timeline, distribution reach (bookshops, libraries, online), and what the author still has to do in marketing. Avoid specific numbers unless the author supplied them; where typical ranges matter, say they vary and what to ask.
3. Fit for this book: rate each path for this book and these goals, and recommend one or two with reasons.
4. Red flags: signs of a predatory or vanity operation (pressure to pay quickly, packages of unclear value, claims of guaranteed bookshop placement, rights grabs for the author's lifetime, no editorial selection), applied to any offers given.
5. Next steps for the recommended path, and the questions to ask any publisher or service before signing, noting that contracts should be reviewed by an agent, a lawyer or an authors' society.
</task>

<constraints>
- Do not quote advances, royalty rates or service prices as fact; say what to ask and where to check (authors' organisations, published contract guides).
- Do not recommend a named company or say a named company is or is not legitimate; explain how to check.
- Do not interpret contract clauses as legal advice; list them as questions.
</constraints>

<output_format>
## What matters most

## Paths compared
Table: Path | Who pays | Control | Timeline | Reach | Author's marketing load.

## Fit for this book
Ratings and recommendation.

## Red flags

## Next steps
Steps and questions to ask.
</output_format>
