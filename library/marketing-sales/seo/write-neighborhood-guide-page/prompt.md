---
schema: 1
id: write-neighborhood-guide-page
kind: prompt
title: Write a neighbourhood guide page
description: Writes a neighbourhood or suburb guide page for an estate or lettings agent from supplied local facts, structured for search and written to describe places, not the people who live there.
category: seo
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, marketer, copywriter]
subject: [real-estate]
requires: [none]
inputs: [text, notes]
output: [copy, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [neighbourhood-guide, fair-housing, estate-agents, area-guide]
pairs_with:
  prompts: [write-real-estate-market-update, write-meta-tags, write-schema-markup]
args:
  - name: area_facts
    description: Facts about the area - name and boundaries, transport links and journey times, schools by name, parks, shops, cafes, health services, housing types and ages, typical prices or rents with source and date, and what you know first-hand.
    type: text
    required: true
  - name: audience
    description: Who the page is mainly for.
    type: enum
    enum: [buyers, renters, both]
    default: both
  - name: country
    description: Country and region, so the fair-housing and advertising rules to check are named correctly.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Page metadata, Guide, Facts to verify, Wording check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write area guide pages for estate and lettings agents. People search for an area before they search for a house ("living in Didsbury", "Walthamstow transport links"), so a good guide brings the right buyers and renters to the agent. Two things go wrong: the page is generic filler any site could carry, and the wording steers people by describing who lives there ("family area", "young professionals", "safe", "good community", "exclusive"), which can breach fair housing and equal-treatment laws in many countries. The safe and more useful approach is to describe places, journeys, buildings and amenities, and to point to official sources for schools, crime and prices.

Main readers (buyers, renters or both): {{audience}}
Country and region: {{country}}
</context>

<task>
<area_facts>
{{area_facts}}
</area_facts>

1. Plan the page around what searchers ask: what it is like to live here, getting around, housing and prices, schools (as facts with links), everyday amenities, green space, and the agent's current listings in the area.
2. Write the page metadata: title tag (under about 60 characters, for example "Living in [Area]: guide for [buyers/renters]"), meta description, H1, URL slug.
3. Write the guide (about 700-1,000 words) with these sections, using only supplied facts:
   - an overview: where it is, its feel described through streets, buildings and places (high street, river, market), not residents;
   - getting around: lines, stations, journey times to key centres as supplied;
   - homes: housing types, ages, typical sizes, price or rent ranges with source and date;
   - schools: names and types only, with a line pointing to the official inspection or performance source; no "good" or "best" judgements;
   - amenities and green space;
   - a short "local knowledge" section from the agent's first-hand notes;
   - FAQs from real buyer and renter questions, and a call to action to view listings or book a valuation.
4. Run a wording check on your own draft and list any phrase you changed and why.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never describe or imply the race, ethnicity, religion, nationality, age, family status, disability, sex or sexual orientation of residents or of who the area suits. Avoid "family-friendly", "young professionals", "safe", "exclusive", "up-and-coming" and similar terms; describe features instead (three parks, two primary schools within 800 m).
- Do not characterise crime or safety; link to the official crime data source for the country instead.
- Do not invent prices, journey times, school names, ratings or businesses. Mark gaps as [X] and list them under Facts to verify.
- Name the advertising and fair-housing rules the agent should check for their country rather than stating them as settled; when the country is not stated, say the advice assumes general fair-housing principles.
- If the area name or core facts are missing, ask for them and stop.
</constraints>

<output_format>
## Page metadata
Title tag, meta description, H1, slug.

## Guide
The page copy with its subheadings and FAQs.

## Facts to verify
Table: Claim | Source to check | Placeholder used.

## Wording check
Bullets: phrases avoided or changed, and the reason.
</output_format>
