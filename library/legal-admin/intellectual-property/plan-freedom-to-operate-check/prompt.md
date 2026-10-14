---
schema: 1
id: plan-freedom-to-operate-check
kind: prompt
title: Plan a freedom-to-operate check
description: Plans a first look at whether a product you are about to launch may run into other people's patents - features to check, markets, search approach, a results log and when to buy a formal opinion.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [founder, product-manager, researcher]
subject: [law, engineering]
requires: [none]
inputs: [text, spec]
output: [plan, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [freedom-to-operate, patent-risk, launch-readiness, patent-search]
pairs_with:
  prompts: [plan-prior-art-search, explain-patent-claims, choose-invention-protection-route]
args:
  - name: product
    description: What the product is and how it works, its key technical features, which parts you designed and which come from suppliers, and what is new about it.
    type: text
    required: true
  - name: launch
    description: Markets where you will make, import or sell it, launch date, expected volumes, and known competitors or patent holders in the field.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What this check is and is not, Features to check, Markets and dates, Search plan, Results log, When to get a formal opinion]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan freedom-to-operate (FTO) work the way a patent analyst scopes it before an attorney gives an opinion. FTO is different from patentability: the question is not whether your idea is new, but whether making, using or selling your product in particular countries might fall within someone else's in-force patent claims. Patents are territorial, so FTO is market by market and only in-force patents and pending applications that could still grant matter; expired patents can be a safe harbour to design from. A full FTO is expensive, so small companies triage: focus on features that are novel, core to the product and not bought from a supplier who offers indemnity, and on markets with the most sales or manufacturing. Searches use claim-focused queries, classification codes, and known competitors' portfolios. Reading claims requires care; hits go to an attorney rather than being judged by the founder.
</context>

<task>
<product>
{{product}}
</product>

<launch>
{{launch}}
</launch>

1. What this check is and is not: three lines.
2. Features to check: break the product into features; score each for novelty, importance to the product, and whether it is supplied (and indemnified) or standard; pick the top few to search.
3. Markets and dates: markets ranked by where you make, import and sell, with launch dates; note that relevant patents are those in force there.
4. Search plan: for each priority feature, concepts and synonyms, classification codes to look up (as categories to find, not invented codes), competitor and assignee names the user gave, databases by type (official patent office databases and free global search tools), filters (status, country, date), and how to record each hit.
5. Results log: a template table for hits, including the claim elements that look closest and the status per market.
6. When to get a formal opinion: triggers (investor or retailer asks, a close hit, a known aggressive holder, high volumes, launch in the US or other major markets), and how to brief the attorney efficiently.
</task>

<constraints>
{{> guardrails/professional-limits}}
- You cannot search patent databases. Do not invent patents, numbers, classification codes, owners or claim text.
- Do not conclude that the product is clear to launch or that a hit blocks it.
- If the user has already received a demand letter about this product, say first to involve patent counsel.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this check is and is not
Three lines.

## Features to check
Table: feature | novel? | core? | supplied or standard? | priority.

## Markets and dates
Table.

## Search plan
Per feature: bullets.

## Results log
Empty template table.

## When to get a formal opinion
Bullets, then a short briefing checklist.
</output_format>
