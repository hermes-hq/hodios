---
schema: 1
id: write-property-listing-ads
kind: prompt
title: Write property listing ads
description: Writes paid social and search ads for a property listing, open house or seller appeal within housing ad targeting limits, with fair-housing safe copy that describes the home, not the buyer.
category: advertising
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, marketer]
subject: [real-estate]
requires: [none]
inputs: [text]
output: [copy, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [property-ads, fair-housing, special-ad-category, open-house, lettings, seller-leads]
pairs_with:
  prompts: [write-real-estate-listing, write-open-house-promotion, check-ad-policy-compliance]
  personas: [real-estate-agent]
args:
  - name: property_details
    description: Address area (street or neighbourhood), price or rent, bedrooms, bathrooms, size, standout features, nearby amenities and transport, viewing or open-house dates, the listing link, and photos available. For seller-leads, your recent sales and what you offer sellers.
    type: text
    required: true
  - name: ad_goal
    description: viewings = book private viewings or enquiries; open-house = attendance on a set date; seller-leads = homeowners asking for a valuation.
    type: enum
    enum: [viewings, open-house, seller-leads]
    default: viewings
  - name: market
    description: Country or region and the platforms you will use (for example "US, Meta and Google", "UK, Facebook and Instagram"). Optional; asked for if the rules may differ.
    type: string
output_contract:
  format: markdown
  sections: [Targeting within the rules, Social ads, Search ads, Words to avoid here, Before publishing]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is an estate or lettings agent advertising a home, an open house or their valuation service. Major ad platforms treat housing as a special or restricted category in several countries (notably the US, and increasingly elsewhere): targeting by age, gender, postcode or ZIP, and many detailed interests is removed, the minimum location radius is larger, and lookalike-style audiences are limited. Fair-housing and equality law also governs the copy: describe the property, its features and location facts, never who should live there. Ads go wrong when they describe a preferred buyer ("perfect for young professionals", "ideal for a couple", "no kids"), imply exclusivity by neighbourhood demographics, or try to rebuild banned targeting through interests. Good property ads lead with one strong photo and the two features that set the home apart, include the price, and send people to a page with the full listing and an easy booking step.

Goal: {{ad_goal}}
{{#market}}Market: {{market}}{{/market}}
</context>

<task>
<property_details>
{{property_details}}
</property_details>

1. If the price or rent, location, key features, or (for open-house) the date and time are missing, ask for them in one message and stop. If the market is not given, ask for the country, because housing ad rules differ.
2. Targeting within the rules: location by city or radius around the property at the platform's minimum for housing, broad age and gender, no interest stacking used as a stand-in for protected traits, and retargeting of site visitors only where the platform allows it. Say the user must select the housing category when the platform asks.
3. Social ads: three variants, each with primary text (first 125 characters carry the message), headline (about 40 characters), description, call to action button, and the photo to lead with. Angles: the standout feature, the location and lifestyle facts (minutes to the station, the park, the school catchment stated as a fact to verify), and the price or value. For open-house, put the date, time and address in the first line. For seller-leads, lead with a concrete local result or the free valuation, never a promised sale price.
4. Search ads: for viewings and open-house, five headlines (30 characters) and two descriptions (90 characters) built on how people search ("3 bed house for sale [area]"); for seller-leads, valuation and selling-intent searches.
5. Run every line through the fair-housing check and list any words in the input that should not be used.
</task>

<constraints>
- Describe the property and location facts, not people: no references to age, family status, religion, race, national origin, disability, sex or any protected trait, including coded phrases ("exclusive neighbourhood", "family area", "walking distance to church"); describe amenities as facts ("400 m from St Mary's Church" only if needed for location, never as a selling point about who belongs).
- Do not help reconstruct restricted targeting through proxies, and do not suggest skipping the housing category.
- Use only the facts supplied; mark anything to confirm as [CHECK]. Never invent features, measurements, school ratings or sale prices.
{{> guardrails/professional-limits}}
- For housing law questions, say a fair-housing or property law professional or the agent's regulator or association should confirm.
</constraints>

<output_format>
## Targeting within the rules
Bullets: location, audience, what is not available and why, the category to select.

## Social ads
Three variants, each as a small table: Field | Copy | Characters.

## Search ads
Headlines and descriptions as a numbered list with character counts.

## Words to avoid here
A table: Phrase in the input or common for this property | Why it is a risk | Safe alternative. Write "None found" if clean.

## Before publishing
A checklist: category selected, price and facts verified, photos accurate and current, landing page shows full details and contact, equal housing logo or statement where required locally.
</output_format>
