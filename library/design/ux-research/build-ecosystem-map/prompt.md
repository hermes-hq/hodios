---
schema: 1
id: build-ecosystem-map
kind: prompt
title: Build an ecosystem map
description: Maps the people, organisations, tools and information flows around a user's goal from research, showing who helps or blocks them and where your product fits, with assumptions marked.
category: ux-research
version: 1.0.0
status: incubating
stage: [discover]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [notes, transcript, text]
output: [diagram, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ecosystem-map, actor-map, service-design, stakeholder-relationships, systems-thinking]
pairs_with:
  prompts: [build-service-blueprint, build-user-journey-map, map-customer-workflow]
  personas: [service-designer, ux-researcher]
args:
  - name: goal
    description: The user and the goal or situation at the centre, for example "an adult child arranging care for a parent after a hospital stay".
    type: text
    required: true
  - name: research
    description: Interview notes, observations or what the team knows about who and what is involved. Say what is from research and what is assumed.
    type: text
    required: true
  - name: product
    description: Your product or service and its role, to place it on the map. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Centre and boundary, Actors, Relationships and flows, Map, Where the product fits, Gaps and assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Products are rarely used alone. A person pursuing a goal deals with family, professionals, institutions, other apps, paper forms and rules, and many design problems come from that wider system: a parent who must approve, a pharmacy that does not receive the message, a spreadsheet that holds the real data. An ecosystem map puts the user and their goal in the centre and arranges actors in rings by closeness (core, direct, indirect), with lines showing what flows between them: information, money, approvals, physical items, trust. Teams usually map their own organisation in the centre, which hides everyone else, or draw every possible actor, which shows nothing. A useful map stays bounded to one goal, is drawn from research, highlights the relationships that cause friction or workarounds, and marks where the team's product sits and where it is absent.
</context>

<task>
<goal>
{{goal}}
</goal>

<research>
{{research}}
</research>
{{#product}}

<product>
{{product}}
</product>
{{/product}}

1. Centre and boundary: the user and goal at the centre, and what is out of scope.
2. Actors: people, organisations, tools and artefacts, each with its role for this goal and its ring (core, direct, indirect). Mark each as evidenced or assumed.
3. Relationships and flows: what passes between actors (information, money, approvals, items, trust), its direction, and where it breaks or relies on a workaround.
4. Map: a text diagram with the user at the centre and rings outwards, plus a list of flows; keep it readable.
5. Where the product fits: which flows it supports, which it creates, and which important flows it does not touch.
6. Gaps and assumptions: friction points worth designing for, actors to research, and assumptions to verify.
</task>

<constraints>
- Keep the user, not the organisation, at the centre.
- Every actor and flow is labelled as evidenced or assumed; do not invent research findings.
- Do not name real private individuals; use roles.
- Stay bounded to the stated goal.
</constraints>

<output_format>
## Centre and boundary
## Actors
| Actor | Type | Role for this goal | Ring | Evidence |
## Relationships and flows
| From | To | What flows | Friction | Evidence |
## Map
## Where the product fits
## Gaps and assumptions
</output_format>
