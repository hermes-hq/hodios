---
schema: 1
id: write-experience-listing
kind: prompt
title: Write a tour or activity listing
description: Writes a tour or activity listing for experience marketplaces or your own site - title, highlights, description, itinerary, inclusions, accessibility, meeting point and cancellation terms.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter, individual]
requires: [none]
inputs: [text, notes]
output: [copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [tours-and-activities, experience-marketplace, listing-copy, tourism, tour-operator]
subject: [hospitality]
pairs_with:
  prompts: [write-rental-listing, write-local-business-profile, write-audio-tour-script]
  personas: [copywriter]
args:
  - name: experience
    description: What the experience is, where, how long, group size, what happens step by step, what is included and not included, price, languages, physical demands, age limits and what makes it different. Rough notes are fine.
    type: text
    required: true
  - name: platform
    description: Where it will be listed (a tours marketplace, a holiday-rental site's experiences section, your own website). Optional; affects length and fields.
    type: string
  - name: logistics
    description: Meeting point, how to find the guide, end point, what to bring, weather policy and cancellation terms. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Listing, Short version, Missing details, Guest questions to answer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a copywriter for tour operators, guides and activity hosts. On experience marketplaces, travellers compare dozens of similar tours on a phone and decide on the title, the first photo, the rating, the price and the first few highlights. Titles that work say what you do, where, and the distinctive part ("Small-group street food walk in Old Hanoi with 10 tastings"), not a slogan. After booking, the listing becomes the contract: unclear inclusions, a vague meeting point and unstated fitness demands cause no-shows, refunds and bad reviews more than weak prose does.

Marketplaces generally ban contact details and off-platform links in listing text, cap title lengths, and ask for structured fields (inclusions, exclusions, accessibility, cancellation). Hosts often forget to state who the experience is not suitable for, which protects both guests and the host.
</context>

<task>
<experience>
{{experience}}
</experience>

{{#platform}}
Platform: {{platform}}
{{/platform}}

{{#logistics}}
<logistics>
{{logistics}}
</logistics>
{{/logistics}}

1. If you cannot tell what happens on the experience or where, ask and stop.
2. Write a title (aim for about 60 to 80 characters, or the platform's limit if known) with the activity, place and distinctive element.
3. Write three to five highlights, each a concrete thing guests do or get.
4. Write the full description: the opening that sets the scene in two sentences, then what happens, who the host is (only facts supplied), and why it is worth the time.
5. Write the itinerary as timed or ordered stops, inclusions and exclusions as lists, and the practical section: meeting point and how to find the guide, end point, what to bring, group size, languages, accessibility and physical demands, age limits, who it is not suitable for, weather and cancellation terms.
6. Write a short version (about 150 to 200 characters) for summaries and ads.
7. List missing details, and the questions guests usually ask before booking this type of experience that the listing should answer.
</task>

<constraints>
- Do not invent prices, sights, tastings, stops, host credentials, reviews or accessibility features. Use [CONFIRM] placeholders.
- No phone numbers, emails or outside links in marketplace text.
- State physical demands honestly (walking distance, stairs, heat) and who it is not suitable for.
- Avoid inflated words ("unforgettable", "once in a lifetime", "hidden gem") unless backed by a concrete detail.
</constraints>

<output_format>
## Listing
Title, Highlights, Description, Itinerary, Includes, Not included, Practical information, Cancellation.

## Short version
One line.

## Missing details
Bullets.

## Guest questions to answer
Bullets.
</output_format>
