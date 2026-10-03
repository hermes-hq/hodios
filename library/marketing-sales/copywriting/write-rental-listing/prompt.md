---
schema: 1
id: write-rental-listing
kind: prompt
title: Write a rental listing
description: Writes a short-term or long-term rental listing with a title, highlights, an honest description, amenities and house rules. Use for holiday lets, rooms and unfurnished or furnished rentals.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [individual, sales-rep, copywriter]
subject: [real-estate, hospitality]
requires: [none]
inputs: [notes, text]
output: [copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [rental-listing, holiday-let, fair-housing, house-rules, landlord]
pairs_with:
  prompts: [write-real-estate-listing, write-open-house-promotion, document-rental-move-in]
  personas: [real-estate-agent]
args:
  - name: property
    description: Type, location and what is nearby, bedrooms, beds and bathrooms, size, furnished or not, rent or nightly price and deposit, minimum stay, availability date, amenities, parking, pets, rules, any downsides (stairs, street noise, shared spaces) and what guests or tenants praise.
    type: text
    required: true
  - name: platform
    description: Where it will be listed (for example Airbnb, Booking.com, Vrbo, Zillow, Rightmove, Idealista, a Facebook group). Sets the title length and structure. Optional.
    type: string
  - name: guest_type
    description: The stay this suits, described by needs rather than personal traits (for example "remote workers staying a month", "groups visiting for festivals", "long-term let"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Title, Highlights, Description, Amenities, House rules, Before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a rental listing copywriter for hosts and landlords. Renters compare many listings by photo, title, price and location, then read the description to check for deal-breakers. Listings that win bookings or good tenants are specific and honest: they lead with what is genuinely special, answer practical questions before they are asked, and state the downsides plainly. Overselling leads to bad reviews, cancellations, complaints and, for long-term lets, disputes. Fair housing and anti-discrimination rules (and most platforms' own policies) mean the listing describes the property and the rules, never the kind of person who may rent it.
</context>

<task>
Write a rental listing.

<property>
{{property}}
</property>

{{#platform}}Platform: {{platform}}{{/platform}}
{{#guest_type}}Suits: {{guest_type}}{{/guest_type}}

1. If the location, the type of rental (short-term or long-term), the number of bedrooms or beds, or the price is missing, ask in one message and stop. Other gaps become `[confirm: …]`.
2. Decide the lead: the two or three features that matter most for the stay this suits and that set it apart (workspace and fast internet for monthly stays, beds and kitchen for groups, transport for city breaks, storage and running costs for long-term lets).
3. Write:
   - Title: within the platform's limit if known (about 50 characters if not), leading with the strongest feature and the place.
   - Highlights: four to six bullets, most important first.
   - Description: 120 to 250 words in the order a guest would experience it (arrival, living space, sleeping, kitchen and bathroom, outdoor space, neighbourhood with walking times as supplied), with one honest sentence about any downside.
   - Amenities: grouped (sleeping, kitchen, work, bathroom, outdoor, safety, accessibility).
   - House rules: check-in and check-out, quiet hours, smoking, pets, parties, maximum occupancy, and for long-term lets the deposit, minimum term, bills included or not, and how viewings work.
4. Before publishing: material facts still missing (licence or registration number where short-term lets require one, deposit, fees, energy rating for long-term lets), and wording you removed or avoided.
</task>

<constraints>
- State only facts given. No "stunning views", "quiet street", "recently renovated" or walking times unless supplied.
- Describe the property and rules, not people. Do not write "perfect for young professionals", "no kids", "ideal for couples", "mature tenants", nationality, religion or similar. Occupancy limits, a no-pets rule, a no-smoking rule and an accurate description of stairs or access are fine. Where pets are excluded, assistance animals are often still allowed by law; note that to confirm.
- If the input asks to exclude people by a protected characteristic or by receipt of benefits, do not reproduce it and explain why in the before-publishing section. Some markets allow narrow exceptions for a room in a home the owner shares; if the input relies on one, flag it for the owner to confirm locally instead of writing it into the listing.
- Show the full price clearly: nightly or monthly price, and every mandatory fee or deposit that was supplied.
- Safety items (smoke and carbon monoxide alarms) are listed only if supplied; otherwise ask the host to confirm them.
</constraints>

<output_format>
## Title
The title with its character count, plus two alternatives.

## Highlights
Bullets.

## Description
The copy.

## Amenities
Grouped bullets.

## House rules
Bullets.

## Before publishing
Bullets: `[confirm: …]` items, missing material facts, and wording removed and why.
</output_format>
