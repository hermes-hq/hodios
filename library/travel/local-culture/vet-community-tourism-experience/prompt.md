---
schema: 1
id: vet-community-tourism-experience
kind: prompt
title: Vet a community tourism experience
description: Checks whether a village visit, indigenous cultural tour or community homestay is community-led and respectful or exploitative, with questions to ask the operator, red flags and how to behave.
category: local-culture
version: 1.0.0
status: incubating
stage: [plan, review]
role: [traveler]
requires: [none]
inputs: [text, url]
output: [checklist, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [responsible-tourism, indigenous-tourism, community-tourism, operator-vetting]
pairs_with:
  prompts: [plan-respectful-travel-photography, choose-ethical-volunteer-trip, prepare-for-homestay]
  personas: [local-culture-guide]
args:
  - name: experience
    description: The tour or visit as advertised - paste the listing text, the operator name and what it promises.
    type: text
    required: true
  - name: destination
    description: Country and region. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Verdict so far, Green signs, Red flags, Questions to ask the operator, How to be a good visitor, What is unknown]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a responsible-tourism researcher who has assessed community and indigenous tourism projects. The good ones are owned or co-run by the community, set their own rules on what visitors see, pay hosts directly and fairly, keep group sizes small, and treat visitors as guests of people, not spectators of a spectacle. The bad ones treat people as exhibits: staged "untouched tribe" encounters, villages visited without consent, children kept out of school to perform or sell, outside operators keeping most of the fee, and orphanage visits that encourage family separation. Listings use the same words ("authentic", "off the beaten path", "support locals") either way, so you look for evidence, not adjectives.

Experience:
<experience>
{{experience}}
</experience>
{{#destination}}Destination: {{destination}}{{/destination}}
</context>

<task>
1. Summarise what the listing actually promises and who appears to run it.
2. List the green signs present in the text: community ownership or partnership, named local guides, stated revenue share, visitor rules set by the community, small groups, cultural content explained by community members.
3. List the red flags present: language of "primitive" or "untouched" people, promises of photos with people as a highlight, orphanage or school visits, children performing, no mention of who benefits, very large groups, pressure to buy.
4. Write the questions to ask the operator before booking (who owns it, how much reaches the community and how, who decided what visitors see, rules on photos and gifts, group size).
5. Give conduct guidance for the visit: gifts (avoid sweets and handing out money to children), photos, clothing, buying crafts directly, following the hosts' rules.
6. Give a verdict so far: promising, unclear, or concerning, with the main reason.
7. List what cannot be judged from the listing.
</task>

<constraints>
- Judge only what the listing says; do not claim facts about the named operator that you cannot know.
- Do not use language that treats communities as exotic or primitive.
- Do not invent certification schemes; if one is mentioned, suggest checking it with the issuing body.
- If the listing involves visits to orphanages or children's homes, say plainly that child protection organisations advise against them and why.
</constraints>

<output_format>
## Verdict so far
One line with the main reason.

## Green signs
Bullets quoting the listing where possible.

## Red flags
Bullets quoting the listing where possible.

## Questions to ask the operator
Numbered list.

## How to be a good visitor
Bullets.

## What is unknown
Bullets.
</output_format>
