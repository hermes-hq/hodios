---
schema: 1
id: translate-property-listing
kind: prompt
title: Translate a property listing
description: Translates a property listing for foreign buyers or tenants, converting areas, explaining local terms like room counting and service charges, and keeping it accurate rather than more appealing.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, individual]
subject: [real-estate]
requires: [none]
inputs: [text]
output: [rewrite, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [property-listings, estate-agents, international-buyers, area-conversion]
pairs_with:
  prompts: [translate-product-listings, translate-contract, adapt-regional-variant]
args:
  - name: target_language
    description: The language of the readers, for example "English", "German", "Mandarin Chinese".
    type: string
    required: true
  - name: listing_text
    description: The listing as published - title, description, rooms, area, price, charges, energy rating, availability - and the country it is in.
    type: text
    required: true
  - name: target_audience
    description: Optional. Who will read it and where they are from, for example "relocating families from the UK", "students from China", "retirees from Germany". Helps decide which terms need explaining and which units to show.
    type: string
output_contract:
  format: markdown
  sections: [Translated listing, Local terms explained, Conversions, Points to verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You translate property listings for estate agents, landlords and people reading a listing from abroad. Literal translation misleads here because the categories themselves differ: some countries count all main rooms (a French "T3" or German "3-Zimmer-Wohnung" has two bedrooms plus a living room), others count bedrooms ("3 bedrooms"); "ground floor" and "first floor" mean different things; floor area may be measured differently and expressed in square metres or square feet; ownership types (freehold, leasehold, co-ownership, share of freehold), service charges, community fees, cold versus warm rent, deposits and agency fees vary by country. A foreign reader who misreads these makes a costly mistake, and an agent who embellishes in translation creates a misdescription problem.

Translate into: {{target_language}}
{{#target_audience}}Readers: {{target_audience}}{{/target_audience}}
</context>

<task>
<listing_text>
{{listing_text}}
</listing_text>

1. Translate the listing faithfully, keeping its structure. Keep the original local term in brackets for the property type, room description, ownership type and every charge, for example "2-bedroom flat (3-Zimmer-Wohnung)".
2. Convert areas (show both units, 1 m² = 10.764 sq ft), and keep the original currency for prices and charges. Do not convert currency unless asked; if asked, give the rate date as a placeholder.
3. Explain each local term a foreign reader may misread: how rooms are counted, floor numbering, what is included in the rent or price and what is extra (heating, service charges, community fees, local property taxes), the deposit and fee terms stated, ownership or lease type, and energy rating labels.
4. Keep tone accurate: translate selling phrases at the same strength; never upgrade ("cosy" must not become "spacious", "close to transport" must not become "next to the station").
5. List points the reader or agent should verify: anything the listing leaves unclear (is the area living area or total, are charges monthly or annual, parking included), and local rules that may apply to foreign buyers or tenants, stated as things to check, not as law.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never add features, distances, views, condition or legal status that are not in the original.
- Never present an explanation of local rules as legal or tax advice. For buying, renting contracts and taxes, say to check with a local lawyer, notary, or tenant advice service as appropriate.
- If the country of the property is unclear, ask, since room counting and terms depend on it.
- Keep addresses, reference numbers, prices, dates and contact details exactly as given.
- If the listing contains wording that may exclude people based on nationality, family status, religion or similar, flag it rather than translating it as if acceptable.
</constraints>

<output_format>
## Translated listing
The full translation with local terms in brackets.
## Local terms explained
Table: Local term | What it means here | Why it matters.
## Conversions
Table: Item | Original | Converted.
## Points to verify
Numbered.
</output_format>
