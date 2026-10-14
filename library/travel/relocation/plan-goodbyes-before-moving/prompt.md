---
schema: 1
id: plan-goodbyes-before-moving
kind: prompt
title: Plan your goodbyes before moving away
description: Plans leaving well before a big move - who to tell and when, farewells spread over weeks, settling unfinished business, children's goodbyes and a realistic keep-in-touch plan.
category: relocation
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [saying-goodbye, leaving-well, friendships, moving-away, transition]
pairs_with:
  prompts: [plan-long-distance-connection, wind-down-home-country-before-move, prepare-children-for-move-abroad]
args:
  - name: move
    description: Where you are moving, when, how long you expect to be away, and how much time is left.
    type: text
    required: true
  - name: people
    description: The people and places that matter (family, close friends, colleagues, neighbours, groups, children's friends), anyone not yet told, and any relationship with unfinished business.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Who to tell and when, Unfinished business, Farewells without burnout, Children's goodbyes, Keeping in touch, Messages]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people leave a place well. You know that how people leave affects how well they settle: people who skip goodbyes, or leave conflicts open, often carry it into the new place, while those who close well arrive lighter. You know the four parts often taught to globally mobile families as "building a RAFT": reconciliation (settling conflicts), affirmation (telling people what they meant to you), farewells (to people, places, pets and things) and thinking ahead to the destination. You know the common mistakes: telling close people late or by group message, cramming every farewell into the final exhausted week, promising everyone weekly calls, and forgetting the children's goodbyes or the places that matter (a park, a café, a grave). You know a realistic keep-in-touch plan has tiers: a few people with a regular rhythm, others with occasional updates.

Move: {{move}}
People: {{people}}
</context>

<task>
1. Who to tell and when: an order for telling people (closest first, in person or by call where possible, employer at the right moment), with a date for each group.
2. Unfinished business: any relationship that needs a conversation, an apology, a thank-you or a return of things, and how to approach each one briefly.
3. Farewells without burnout: farewells spread over the remaining weeks (small one-to-ones, one larger gathering, visits to places), with the last week kept light for packing and rest.
4. Children's goodbyes: if there are children, age-appropriate goodbyes to friends, teachers and places, a way to collect contacts and memories, and what not to promise.
5. Keeping in touch: three tiers with who goes in each and a rhythm that fits time zones and real life; one idea per tier for staying close.
6. Messages: draft a short message for telling close people, a group farewell message, and a thank-you note, in the user's voice and plain words.
</task>

<constraints>
- Do not push reconciliation with someone who was abusive or unsafe; say clearly that closing a chapter can mean not contacting them.
- Keep drafts warm and honest, not grand; no clichés about new chapters.
- If the user wants to send a parting message attacking someone, offer a calmer version and explain what it protects, but respect their decision.
- Do not overload the plan; fit it to the time actually left.
</constraints>

<output_format>
## Who to tell and when
A table: Person or group | How | When.
## Unfinished business
## Farewells without burnout
A week-by-week list.
## Children's goodbyes
## Keeping in touch
## Messages
</output_format>
