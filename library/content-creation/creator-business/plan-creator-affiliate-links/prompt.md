---
schema: 1
id: plan-creator-affiliate-links
kind: prompt
title: Plan creator affiliate links
description: Plans a creator's affiliate income - programmes that fit products they really use, where links go in each format, honest disclosure, tracking and a 90-day review - without turning content into ads.
category: creator-business
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, writer]
inputs: [notes, preferences, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [affiliate-marketing, affiliate-disclosure, link-placement, gear-lists, passive-income]
pairs_with:
  prompts: [plan-creator-monetization, write-comparison-post]
  rules: [sponsored-content-disclosure-rules]
  personas: [creator-business-manager]
args:
  - name: content
    description: Your niche, formats and platforms (videos, blog, newsletter, streams), audience size and where they live, and the products you genuinely use or recommend.
    type: text
    required: true
  - name: current
    description: Optional. Affiliate programmes you already use, what earns, and where links currently sit.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Programmes to consider, Link placement by format, Disclosure, Tracking, Review after 90 days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Affiliate income works when the audience is already making a buying decision the creator helps with: gear, software, tools, books, kits. It earns from clicks that convert, so a small audience with buying intent can out-earn a large entertainment audience. What matters: products the creator actually uses (the audience notices otherwise), links where people look when they are ready (a gear list, a pinned comment, a description section, a resources page, an email footer), evergreen content that keeps sending clicks (comparisons, setups, how-tos), and the programme's terms (commission, cookie window, payout threshold, territories, and rules on where links may appear). Many programmes forbid links in certain places or require specific wording. Disclosure is required by advertising rules in many countries and by most programmes and platforms, and it should be clear and near the link, not hidden. Commission rates and cookie windows vary and change.
</context>

<task>
<content>
{{content}}
</content>

{{#current}}
<current>
{{current}}
</current>
{{/current}}

1. **Fit check:** where this audience makes buying decisions and which of the products listed fit those moments; products to leave out (ones they do not use, or that clash with sponsors).
2. **Programmes to consider:** types of programme (retailer-wide, direct brand programmes, software referral programmes, marketplaces) and what to compare in their terms. Tell the user to read current terms; do not quote rates.
3. **Link placement by format:** for each of their formats, where links go and how to mention them naturally, plus one evergreen piece to create that would carry links for years (a setup page, a comparison, a "what I use" list).
4. **Disclosure:** clear, near-the-link wording for each format, spoken where relevant, and a standing disclosure on gear pages.
5. **Tracking:** sub-IDs or separate links per platform or piece, a simple monthly sheet (clicks, orders, earnings by link), and when links break or products are discontinued.
6. **Review after 90 days:** what to keep, what to drop, and when a direct brand deal might beat an affiliate link.
If current programmes are listed, point out quick wins in their setup first.
</task>

<constraints>
- Do not invent commission rates, cookie windows or payout thresholds; say to check each programme's current terms.
- Never suggest recommending products the creator does not use or hiding that links are affiliate links.
- Do not suggest link cloaking that hides that a link is affiliate, or placements a programme forbids (tell them to check).
- Disclosure rules vary by country; give clear wording and suggest checking local guidance.
</constraints>

<output_format>
## Fit check
## Programmes to consider
Table: programme type | good for | terms to compare.

## Link placement by format
Table: format | where | how to mention.

## Disclosure
Wording per format.

## Tracking
## Review after 90 days
</output_format>
