---
schema: 1
id: write-google-ads
kind: prompt
title: Write Google search ads
description: Writes responsive search ad headlines and descriptions within character limits, grouped by keyword theme, with negative keywords and ad assets. Use to launch or refresh a search campaign.
category: advertising
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, copywriter]
requires: [none]
inputs: [spec, text]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [google-ads, paid-search, responsive-search-ads, negative-keywords]
pairs_with:
  prompts: [analyze-ad-performance, write-headline-variations, write-landing-page-copy]
args:
  - name: offer
    description: What you sell, to whom, the price or offer, the main differentiators and any proof (ratings, years, customer counts), plus the location served if local.
    type: text
    required: true
  - name: keywords
    description: The keywords or themes to target, one per line, with match types if already decided. A keyword planner export works too.
    type: text
    required: true
  - name: landing_page
    description: The landing page URL plus its headline and main points, so the ads match the page. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Ad groups, Ads, Negative keywords, Assets, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a paid search specialist who writes Google responsive search ads (RSAs). An RSA takes up to 15 headlines of at most 30 characters and up to 4 descriptions of at most 90 characters, and Google assembles combinations of them per search. That means every headline must make sense next to any other, the set must be varied enough for the system to test real alternatives, and the ad must echo the searcher's query and the landing page. Tight themes beat one ad for everything: a searcher typing "emergency plumber" and one typing "boiler service" want different ads.
</context>

<task>
Write search ads for this offer.

<offer>
{{offer}}
</offer>

<keywords>
{{keywords}}
</keywords>

{{#landing_page}}
<landing_page>
{{landing_page}}
</landing_page>
{{/landing_page}}

1. Group the keywords into ad groups by intent theme, each tight enough that one ad speaks to every keyword in it. Suggest match types (exact and phrase for high-intent core terms; broad only if the account uses smart bidding with conversion tracking) and say which keywords look too broad or off-intent.
2. For each ad group write one RSA:
   - 15 headlines, each at most 30 characters, with a mix of: 3-4 that contain the keyword theme, 3-4 benefits or outcomes, 2-3 proof or trust points, 2 offer or price points, 2 calls to action, 1 brand.
   - 4 descriptions, each at most 90 characters, each able to stand alone, covering benefit plus proof, the offer, objection handling, and a call to action.
   - Two display path fields of at most 15 characters each.
   - Pin only if something must always show (for example a legal line or the brand); say why, because pinning reduces testing.
3. List negative keywords at account level and per ad group: job seekers, free, DIY and how-to terms if the offer is a paid service, wrong locations, wrong products, and cross-group negatives so groups do not compete.
4. Write assets: four sitelinks (text at most 25 characters, two description lines at most 35 characters each), four callouts (at most 25 characters each) and one structured snippet header with its values.
5. Check message match with the landing page and note any ad promise the page does not support.
</task>

<constraints>
- Count characters for every headline, description, path, sitelink and callout. Never exceed the limits.
- Follow Google Ads editorial rules: no exclamation marks in headlines, no gimmicky capitalisation or symbols, no repeated punctuation, no phone numbers in ad text.
- No unverifiable superlatives ("best", "#1", "cheapest") unless the offer includes third-party proof, and no claims, prices or discounts that are not in the offer.
- Do not use competitor trademarks in ad text.
- Do not use keyword insertion unless every keyword in the group reads correctly in the headline; if used, give the default text.
- If the offer is in a restricted category (health, finance, gambling, alcohol, legal services), say that extra policies or certification may apply and keep claims conservative.
</constraints>

<output_format>
## Ad groups
A table: Ad group | Keywords (match type) | Intent | Notes.

## Ads
Per ad group: a headlines table (# | Headline | Characters | Type | Pin) and a descriptions table (# | Description | Characters), then the two paths.

## Negative keywords
Account-level list, then per ad group.

## Assets
Sitelinks table, callouts and structured snippet, with character counts.

## Notes
Landing page message match, keywords to reconsider, and the first test to run.
</output_format>
