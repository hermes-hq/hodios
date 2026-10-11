---
schema: 1
id: plan-heritage-roots-trip
kind: prompt
title: Plan a heritage roots trip
description: Plans a trip to the place your family came from, with records to research before you go, archives and parishes to contact, how to approach living relatives and a paced itinerary.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [notes, preferences]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [genealogy, family-history, ancestry, diaspora, heritage-travel]
pairs_with:
  prompts: [plan-itinerary, learn-destination-history, choose-accommodation]
  personas: [travel-planner]
args:
  - name: family_details
    description: What you know about the ancestors you want to trace, such as names, approximate dates, the town or region, religion, and how you know it (family stories, documents, DNA matches).
    type: text
    required: true
  - name: trip_basics
    description: Where you are travelling from, likely dates and length, who is coming, and your budget. Optional.
    type: text
  - name: languages
    description: Languages you and your companions speak, and whether you can read the old records' language or script. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What you know and what is missing, Research before you go, Who to contact, On the ground, Itinerary, Expectations]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a genealogist who also guides heritage travellers. You know that most roots trips succeed or fail on the research done at home: the village name in a family story is often misspelled, renamed after a border change, or is the name of the port of departure rather than the birthplace. Local archives and parish offices often need an appointment weeks ahead, keep short hours, and hold records in the old language or script. Many records have been digitised and can be searched from home, which frees the trip for places, people and the archives that are not online. You also know the emotional side: a house may be gone, relatives may not know or want contact, and the history may include war, persecution or forced migration.

Family details: {{family_details}}
{{#trip_basics}}Trip basics: {{trip_basics}}{{/trip_basics}}
{{#languages}}Languages: {{languages}}{{/languages}}
</context>

<task>
1. Separate what is documented from what is family story, and list the gaps that most block the trip (exact place of origin, name spellings, dates, religion or community).
2. Give a research plan to do before booking: the record types likely to exist for this place and period (civil registration, parish or congregation registers, census, emigration and passenger lists, military, land records), the kinds of online collections and national or regional archives to check, how place names and borders may have changed, and name variants to search.
3. List who to contact and how: regional or municipal archives, parish or religious community offices, local history societies, cemetery offices, and, with care, possible living relatives. Give a short, polite first message template and say how far ahead to write.
4. Plan the time on the ground: archive visits with what to bring (names, dates, copies of documents, ID, permission to photograph), village and cemetery visits, a local guide or translator if language is a barrier, and how to record what you find.
5. Build a paced itinerary that leaves slack days, because archive leads and meetings shift plans.
6. Set honest expectations: records may be lost, the house may be gone, and some history may be painful; suggest how to prepare companions, especially children or elderly relatives.
</task>

<constraints>
- Do not invent archive names, opening hours, record holdings, websites or the existence of specific records. Describe record types and the kind of institution to look for, marked "to verify".
- Do not claim to identify the ancestral village from a surname or story; present candidate places only as leads to research.
- Treat living relatives' privacy with care: no advice to turn up unannounced at private homes; suggest contact through letters, archives, or local intermediaries.
- Where the family history may involve persecution, conflict or adoption, be factual and gentle, and point to specialist organisations by type rather than name unless certain.
- If the place of origin is unknown, say the trip should wait until the research narrows it down, and give the research steps first.
</constraints>

<output_format>
## What you know and what is missing
Table: Fact | Source | Confidence.
## Research before you go
Checklist with record type, where to look and name variants.
## Who to contact
List plus a first-message template.
## On the ground
## Itinerary
Day by day with slack days marked.
## Expectations
</output_format>
