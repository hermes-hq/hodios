---
schema: 1
id: research-ppc-keywords
kind: prompt
title: Research keywords for search ads
description: Builds a search ads keyword list from the business, landing pages and seed terms, grouped by intent into ad groups with match types, priority, landing pages and starting negatives.
category: advertising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer, consultant]
requires: [none]
inputs: [text, url]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [google-ads, keyword-list, match-types, search-intent, ad-groups, negative-keywords]
pairs_with:
  prompts: [write-google-ads, triage-search-terms-report, audit-search-ads-account, decide-brand-keyword-bidding]
  personas: [paid-media-specialist, local-ads-advisor]
  workflows: [first-search-campaign-track]
args:
  - name: business
    description: What you sell, where, to whom, price level, and what you do not offer.
    type: text
    required: true
  - name: landing_pages
    description: The pages ads can send traffic to, with what each covers (paste URLs and a line each, or page text).
    type: text
    required: true
  - name: seed_terms
    description: Words customers use, terms from your search console or site search, and competitor names if relevant. Optional.
    type: text
  - name: budget
    description: Monthly search budget and currency, used to decide how wide to go.
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Keyword groups, Launch set, Starting negatives, Gaps, Validate before launch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is building or expanding a search ads campaign and needs keywords. Keyword research for ads differs from SEO research: you pay per click, so commercial intent and the match to a landing page matter more than volume. What experts know: group keywords by intent and theme so each group gets ads and a landing page that answer it; buyer terms (service plus location, "price", "near me", product plus model) come before research terms; with a small budget, a tight list on phrase and exact match beats a broad list, while broad match only works well with smart bidding and solid conversion data; every group needs negatives from day one (jobs, free, DIY, wrong product); brand and competitor terms are separate decisions with their own campaigns; and search volumes and costs must come from the platform's keyword planner, not guesses.
</context>

<task>
Business: {{business}}
Landing pages:
<landing_pages>
{{landing_pages}}
</landing_pages>
{{#seed_terms}}Seed terms: {{seed_terms}}{{/seed_terms}}
{{#budget}}Budget: {{budget}}{{/budget}}

1. State assumptions: location, language, budget level and whether conversion tracking and smart bidding are in place (which affects broad match).
2. Expand seed terms into keyword ideas using the business's services or products, modifiers (location, price, urgency, model, use case, audience), synonyms and customer wording, and the landing pages' content.
3. Classify each idea by intent: buy now, comparing, researching, brand, competitor, wrong intent. Drop or move wrong intent to negatives.
4. Group the buy-now and comparing terms into tight ad groups by theme, each mapped to the best landing page. Flag themes with no fitting page.
5. Assign match type per keyword with the reason, and a priority (launch now, add later, test) based on intent and budget.
6. Pick a launch set sized to the budget: fewer, higher-intent groups when budget is small.
7. List starting negatives by theme with match type and level.
8. Tell the user how to validate volumes and bid ranges in the keyword planner and which numbers would change the plan.
</task>

<constraints>
- Never invent search volumes, CPCs or competition levels. Leave them as columns to fill from the keyword planner.
- Do not include competitor brand terms in general ad groups; list them separately with a note to check trademark rules in the user's market and platform.
- Do not pad the list with near-duplicate spellings that close variants already cover; note that close variants exist.
- Keep keywords matched to pages the user actually has.
</constraints>

<output_format>
## Assumptions
Bullets.

## Keyword groups
For each ad group: name, landing page, then a table: Keyword | Intent | Match type | Priority | Volume (from planner) | Notes.

## Launch set
The groups and keywords to start with and why, sized to the budget.

## Starting negatives
A table: Negative | Match type | Level | Why.

## Gaps
Themes with demand but no landing page, and brand or competitor decisions to make.

## Validate before launch
Steps in the keyword planner and what results would change the plan.
</output_format>
