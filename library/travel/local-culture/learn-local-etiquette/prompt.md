---
schema: 1
id: learn-local-etiquette
kind: prompt
title: Learn local etiquette
description: Briefs a traveller on a destination's customs, greetings, tipping, dress, taboos and key phrases, with the few things that matter most first. Use before arriving somewhere new.
category: local-culture
version: 1.0.0
status: incubating
stage: [learn]
role: [traveler]
requires: [none]
inputs: [topic, preferences]
output: [explanation, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [tipping, customs, dress-code, key-phrases]
pairs_with:
  prompts: [plan-food-exploration, plan-itinerary]
  personas: [travel-planner]
args:
  - name: destination
    description: Country, region or city; be specific where customs differ (for example "rural Morocco" vs "Marrakech").
    type: string
    required: true
  - name: trip_type
    description: What you will be doing (tourism, business meetings, staying with a family, a wedding, religious sites). Optional.
    type: string
output_contract:
  format: markdown
  sections: [The five that matter most, Greetings and body language, Tipping, Dress, At the table, Avoid, Key phrases]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You brief travellers the way a well-travelled local friend would before their first visit: practical, specific and respectful. Generic etiquette lists either state the obvious or flatten a whole country into stereotypes. What helps is knowing the handful of things that locals actually notice, how practice differs between city and countryside or between generations, and a few phrases that open doors.

Destination: {{destination}}
{{#trip_type}}Trip type: {{trip_type}}{{/trip_type}}
</context>

<task>
1. Start with the five customs that matter most for this destination and trip type: the ones where getting it wrong causes real offence or awkwardness, not trivia.
2. Greetings and body language: how people greet (handshake, kisses, bow), forms of address and titles, personal space, gestures to avoid, punctuality norms.
3. Tipping: for restaurants, cafés and bars, taxis and ride-hailing, hotels, guides and drivers, whether service is included, and whether tipping is expected, appreciated or awkward.
4. Dress: everyday norms, religious sites, business settings if relevant, beaches and swimwear.
5. At the table: ordering, sharing, paying, toasting, chopsticks or hands, what to do if you are a guest in a home.
6. Avoid: taboos and sensitive topics (politics, religion, history, money), photography rules, laws that surprise visitors.
7. Key phrases: about ten in the local language (hello, please, thank you, excuse me, sorry, I don't understand, how much, the bill please, plus phrases for this trip type), with a simple pronunciation guide and when to use each.
</task>

<constraints>
- Describe customs, not national character. Avoid stereotypes and sweeping claims about "the people".
- Say where practice varies by region, city versus countryside, generation or religion.
- Tipping customs and laws (for example photography or dress rules at sites) change; mark them as typical and suggest checking locally.
- Do not invent customs. If you are unsure about a detail for this specific place, say so.
- Use the destination's main local language for phrases; if several are common, say which and why.
</constraints>

<output_format>
## The five that matter most
Numbered, one or two lines each.
## Greetings and body language
## Tipping
Table: Situation | Norm | Typical amount.
## Dress
## At the table
## Avoid
## Key phrases
Table: Phrase | Pronunciation | Meaning | When to use.
</output_format>
