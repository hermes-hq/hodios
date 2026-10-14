---
schema: 1
id: prepare-design-registration
kind: prompt
title: Prepare a design registration
description: Checks whether registering the look of a product, pattern or packaging is worth it, flags past disclosures and grace periods to verify, and prepares the views, description and filing facts.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [plan, build]
role: [designer, founder, artist]
subject: [law]
requires: [none]
inputs: [text, image]
output: [checklist, report, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [design-right, product-design, design-patent, packaging, novelty]
pairs_with:
  prompts: [choose-invention-protection-route, audit-small-business-ip, keep-proof-of-authorship]
args:
  - name: design
    description: What the product or pattern looks like and what is new about its appearance (shape, contours, surface pattern, ornament, colours), photos or drawings you have, and the product it is applied to.
    type: text
    required: true
  - name: history
    description: Who designed it and under what arrangement, when it was first shown, sold, posted online or exhibited, and where you sell or plan to sell it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is a design registration the right tool, Disclosure and timing, What the filing needs, Views and representation plan, Ownership check, Questions for an attorney]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare design filings the way an IP paralegal preps a file for a design attorney. Design protection covers how a product looks, not how it works; a functional feature belongs to patents or nothing. Names and systems vary: registered designs, industrial designs, design patents, and in some places unregistered design rights that arise automatically for a shorter time. What novices miss: the drawings or photos define the protection, so a line drawing showing every detail protects less than one showing only the shape that matters, and broken lines or a neutral background are used to exclude parts; showing the design publicly can destroy novelty, although some systems allow a grace period after the designer's own disclosure (to verify per country); and the designer, not the business that paid, may own the design unless there is an employment or written assignment.
</context>

<task>
<design>
{{design}}
</design>

<history>
{{history}}
</history>

1. Is a design registration the right tool: what part of the value lies in the appearance, how easily copies appear (fast fashion, marketplace knock-offs), product lifespan, and how design protection compares with copyright, trademark (for packaging or shape as a brand) and patents here. Options, not a verdict.
2. Disclosure and timing: list every disclosure from the history with its date, explain the novelty risk and that grace periods exist in some systems with lengths to verify, and flag anything urgent in bold.
3. What the filing needs: applicant, designer, product indication, the views, any short description, priority claim if filed elsewhere first, and whether several designs can go in one application (to check).
4. Views and representation plan: which views to prepare, consistent backgrounds, what to show in solid versus broken lines, and the trade-off between broad and detailed representations.
5. Ownership check: who designed it and the paperwork needed if an outside designer or employee did.
6. Questions for an attorney: specific to this design and history.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state novelty, validity or grace periods for a specific country as fact. Mark them `[CHECK]`.
- Do not claim that a design will stop a particular competitor.
- If the design has already been shown publicly, or copies already exist in the market, say early that timing is critical and an attorney should be consulted quickly.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is a design registration the right tool
Short paragraphs.

## Disclosure and timing
Table: date | disclosure | where | risk note.

## What the filing needs
Checklist.

## Views and representation plan
Bullets.

## Ownership check
Bullets.

## Questions for an attorney
Numbered list.
</output_format>
