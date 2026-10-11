---
schema: 1
id: geocode-address-list
kind: prompt
title: Geocode an address list
description: Cleans an address list, picks a suitable geocoding service for its country and volume, writes the geocoding code with match-quality scoring, and lists the rows that need a manual fix.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, business-analyst, operations-manager, researcher]
stack: [python]
requires: [none]
inputs: [dataset, text]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [geocoding, addresses, coordinates, match-rate, geospatial]
pairs_with:
  prompts: [analyze-location-data, deduplicate-records, anonymize-dataset]
args:
  - name: address_sample
    description: Ten to twenty sample addresses in their real format (fictionalise or use business addresses if they belong to people), the columns they are split into, and how many rows there are in total.
    type: text
    required: true
  - name: countries
    description: The country or countries the addresses are in.
    type: string
    required: true
  - name: purpose
    description: What the coordinates are for, for example "map customers by postcode area", "drive-time to nearest depot" or "exact door locations for deliveries", and any budget or rule about sending data to outside services.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Service choice, Cleaning rules, Code, Match quality, Manual review list, Data protection]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a GIS analyst who geocodes customer and site lists. A geocoder always returns something, and that is the danger: a misspelt street silently resolves to the town centre or the postcode centroid, a missing country sends "Paris" to Texas, and an apartment number in the wrong field causes no match at all. The precision you need depends on the purpose: postcode or area centroids are enough for regional maps and are free in many countries from official lookup files, while delivery routing needs rooftop or interpolated street matches. Services differ in cost, coverage and terms: the free OpenStreetMap Nominatim service allows about one request per second and is not meant for heavy bulk jobs, commercial APIs charge per request and some restrict storing results or showing them on other maps, and some governments offer free national geocoders or address files. Addresses of people are personal data, so sending them to an outside service needs a lawful basis and may need the organisation's approval.
</context>

<task>
Plan and write the geocoding of this list.

<address_sample>
{{address_sample}}
</address_sample>

Countries: {{countries}}

<purpose>
{{purpose}}
</purpose>

1. Decide the precision the purpose needs (area or postcode centroid, street, rooftop) and whether a postcode lookup file would do instead of a geocoder.
2. Recommend a service or two for these countries, volume and purpose, with the trade-offs (cost, rate limit, coverage, terms on storing results). Tell the user to confirm current pricing and terms with the provider rather than quoting prices.
3. Write cleaning rules from the sample: trim and normalise whitespace and case, standardise postcode format per country, add the country explicitly, move unit or apartment numbers out of the street field, and remove obvious junk ("same as above", phone numbers).
4. Write Python code that deduplicates identical cleaned addresses, calls the chosen service with rate limiting, retries and caching of results to a local file (so reruns do not repeat paid calls), and stores the returned precision or match type, confidence score and formatted address.
5. Score match quality: accept, review or reject, using the returned precision, the confidence, whether the returned postcode and town match the input, and distance from the postcode centroid where available.
6. Produce the manual review list with the reason per row.
7. Note the data protection points.
</task>

<constraints>
- Do not quote prices, quotas or terms as current fact; name what to check.
- Respect the service's usage policy in the code (rate limit, identifying user agent where required, no parallel hammering of free services).
- Never accept a result just because one was returned; always store and check precision.
- Do not put API keys in the code; read them from an environment variable.
- If the addresses are of individuals, say that sending them to an outside service may need approval and suggest geocoding at postcode level or with an on-premises option when precision allows.
- Do not invent coordinates or match rates.
</constraints>

<output_format>
## Service choice
The recommendation, an alternative, and what to check with the provider.

## Cleaning rules
Numbered rules with a before-and-after example from the sample.

## Code
One Python block.

## Match quality
A table: band, criteria, what to do.

## Manual review list
How the review file is produced and its columns.

## Data protection
Bullets specific to this list.
</output_format>
