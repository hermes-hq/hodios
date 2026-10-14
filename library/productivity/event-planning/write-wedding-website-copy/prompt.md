---
schema: 1
id: write-wedding-website-copy
kind: prompt
title: Write wedding website copy
description: Writes the pages of a wedding website - welcome, schedule, travel and stay, dress code, gift and registry wording, FAQs and RSVP instructions - clear for every guest.
category: event-planning
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [text]
output: [copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [wedding-website, wedding-faq, rsvp, dress-code, gift-registry, guest-information]
pairs_with:
  prompts: [plan-wedding, manage-event-rsvps, plan-destination-wedding]
args:
  - name: wedding
    description: Your names, date, ceremony and reception venues with addresses, timings, and the tone you want (formal, relaxed, playful).
    type: text
    required: true
  - name: guest_info
    description: Travel and accommodation (nearest airport or station, parking, hotel blocks and booking codes), dress code, children and plus-one policy, food and dietary options, gifts or registry wishes, RSVP deadline and method, and anything else guests ask you.
    type: text
    required: true
  - name: story
    description: Optional. A few facts about how you met or your relationship for a short "our story" section.
    type: text
output_contract:
  format: markdown
  sections: [Welcome, Our story, Schedule, Travel and stay, Dress code, Gifts, FAQs, RSVP, Missing details]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the text for a couple's wedding website. The site exists to answer guests' questions so the couple does not get the same message fifty times. Guests mostly look for: the date, exact times (including when to arrive, not just when the ceremony starts), addresses that work in a map app, how to get between ceremony and reception, parking and taxis, where to stay with any booking codes and their deadlines, what to wear (explained in plain words, not just "cocktail attire"), whether children and plus-ones are invited, dietary options, and how and by when to RSVP. Awkward topics are better handled clearly and kindly on the site than in individual messages: adults-only weddings, named plus-ones only, cash or honeymoon funds instead of gifts, unplugged ceremonies, and limited accessibility. Older guests and people using translation tools benefit from short sentences and no in-jokes in the practical sections; the story and welcome can carry the couple's personality.

<wedding>
{{wedding}}
</wedding>

<guest_info>
{{guest_info}}
</guest_info>

{{#story}}
<story>
{{story}}
</story>
{{/story}}
</context>

<task>
1. Write a short welcome in the couple's chosen tone.
2. Write "Our story" in 80 to 150 words from the facts given only; if no story was given, write a one-line placeholder.
3. Write the schedule with arrival times, each part of the day, addresses and transport between venues.
4. Write travel and stay: how to get there, parking, taxis, accommodation with booking codes and deadlines exactly as given.
5. Explain the dress code in plain language with examples of what fits, plus practical notes (grass, heels, weather, cultural or religious dress requirements if mentioned).
6. Write gift wording that matches the couple's wishes, including tactful wording for cash or honeymoon funds or "no gifts".
7. Write FAQs covering children, plus-ones, dietary needs, accessibility, photos and phones, and anything in the guest info, with kind but clear answers to awkward policies.
8. Write RSVP instructions with the deadline and what to include (names, meal choices, dietary needs).
9. List missing details the couple still needs to add, as questions.
</task>

<constraints>
- Use only details the couple gave; never invent times, addresses, hotel names, booking codes or prices. Put gaps in [brackets] and list them under Missing details.
- Keep practical sections in short, plain sentences.
- Word sensitive policies kindly and firmly; do not apologise excessively or leave them ambiguous.
- Do not add religious or cultural elements that were not mentioned.
</constraints>

<output_format>
## Welcome
Text.

## Our story
Text.

## Schedule
Timed list with addresses.

## Travel and stay
Text.

## Dress code
Text.

## Gifts
Text.

## FAQs
Question and answer pairs.

## RSVP
Text.

## Missing details
Bulleted questions for the couple.
</output_format>
