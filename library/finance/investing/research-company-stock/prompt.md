---
schema: 1
id: research-company-stock
kind: prompt
title: Research a listed company step by step
description: Takes a learner through researching a listed company - business model, competition, financial health, valuation context, risks - and produces a one-page research note with open questions.
category: investing
version: 1.0.0
status: incubating
stage: [learn, discover]
role: [individual, student]
subject: [economics]
requires: [none]
inputs: [document, text]
output: [report, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [stock-research, fundamental-analysis, competitive-advantage, research-note, bull-bear-case]
pairs_with:
  prompts: [read-company-financials, explain-valuation-ratios, summarize-annual-report, write-investment-decision-journal]
  personas: [investing-educator]
args:
  - name: company
    description: The company name and what you already know or believe about it, including why you are interested.
    type: text
    required: true
  - name: materials
    description: Source material you have gathered - excerpts from the annual report, investor presentation, key figures, share price and share count with dates, competitor notes. The more you paste, the less is left as open questions.
    type: text
    required: true
  - name: horizon
    description: How long you would expect to hold a stock like this, which changes what matters. Optional.
    type: string
output_contract:
  format: markdown
  sections: [One-page note, How the business makes money, Competitive position, Financial health, Valuation context, Key risks, Bull and bear cases, What would change the view, Open questions and where to find answers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Good company research answers a few questions in order: how does this business make money and from whom; why can it keep doing so against competitors (pricing power, switching costs, scale, network effects, brand, regulation); is it financially sound (cash generation, debt, dilution); how do management allocate capital and are their incentives aligned; what is already priced in; and what could go wrong. Beginners tend to start with the share price chart and the story, anchor on a product they like, confuse a great company with a great investment at any price, ignore share count dilution, and skip writing down what would prove them wrong. A disciplined note separates facts from the source material, inferences, and things still unknown, and states both the bull and the bear case fairly.

Company: {{company}}

<materials>
{{materials}}
</materials>
{{#horizon}}Holding horizon: {{horizon}}{{/horizon}}
</context>

<task>
1. Business model: products or services, customers, revenue mix by segment or region if given, how revenue is earned (one-off, recurring, usage), and the main costs.
2. Competitive position: main competitors named in the materials, sources of advantage and evidence for each (margins over time, retention, market share), and threats (new entrants, substitutes, regulation, customer concentration).
3. Financial health from the figures given: growth, margins, cash conversion, debt and maturities, share count trend. Show working for anything computed.
4. Valuation context: if a share price and share count with dates are supplied, compute market value and the simple multiples the data allows, and explain what expectations they imply. If not supplied, say valuation cannot be judged and list what is needed.
5. Management and capital allocation: what the materials show about acquisitions, buybacks, dividends, pay incentives.
6. Key risks, ranked by likely impact, each tied to evidence.
7. Bull and bear cases of equal care, three points each, and what evidence would change the view.
8. Open questions and where to find answers (specific annual report notes, competitor filings, industry data).
9. Compress the result into a one-page note at the top.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the supplied materials for figures and facts. Do not add numbers, events or news about the company from memory; if you have general knowledge of the industry, label it as background to verify.
- Label each statement in the analysis as fact (from materials), inference, or unknown where it is not obvious.
- No buy, sell or hold call, price target or position size. The note is a learning and research record.
- Give the bear case real weight; do not write a sales pitch.
{{> output/uncertainty}}
</constraints>

<output_format>
## One-page note
Eight to twelve lines: what it is, why it might be attractive, main risk, what is priced in, key open questions.

## How the business makes money
Short paragraph and bullets.

## Competitive position
Bullets with evidence.

## Financial health
Table: measure | value | working | comment.

## Valuation context
Short paragraph or "cannot be judged" with what is missing.

## Key risks
Numbered list.

## Bull and bear cases
Two columns or two lists.

## What would change the view
Bullets.

## Open questions and where to find answers
Table: question | where to look.
</output_format>
