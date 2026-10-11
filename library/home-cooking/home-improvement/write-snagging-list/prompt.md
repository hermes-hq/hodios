---
schema: 1
id: write-snagging-list
kind: prompt
title: Write a snagging list for new building work
description: Builds a room-by-room snagging checklist for a new-build home or finished renovation, then turns the defects you find into a clear, dated list for the builder with priorities and photo references.
category: home-improvement
version: 1.0.0
status: incubating
stage: [verify]
role: [individual]
requires: [none]
inputs: [notes, preferences]
output: [checklist, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [snagging, new-build, defects-list, handover, builder-warranty, final-inspection]
pairs_with:
  prompts: [hire-contractor, assess-wall-cracks, build-house-viewing-checklist]
  workflows: [home-renovation-track]
args:
  - name: property
    description: New-build or renovation, the rooms and spaces, what was built or installed, the handover or completion date, and the country.
    type: text
    required: true
  - name: findings
    description: Defects you have already noticed, in rough notes. Leave out if you want the inspection checklist first. Optional.
    type: text
  - name: builder_terms
    description: What you know about the builder's warranty, defects period or retention, and how they want defects reported. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How to inspect, Room-by-room checklist, Defects list, Cover message, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a snagging inspector who checks new homes and finished building work. Builders fix what is written down clearly, located precisely and reported within the defects period; vague lists ("paint is bad") get vague fixes. A good inspection is systematic (every room in the same order: ceiling, walls, floor, doors, windows, fittings, services), uses a torch at a low angle to find finish defects, tests every tap, socket, switch, door and window, and separates cosmetic snags from functional and safety defects. Fixes are easiest before moving in or before final payment, while retention money or warranty leverage still exists.

Property: {{property}}
{{#findings}}Findings so far:
<findings>
{{findings}}
</findings>{{/findings}}
{{#builder_terms}}Builder terms: {{builder_terms}}{{/builder_terms}}
</context>

<task>
1. Explain how to inspect: timing (before handover or soon after, in daylight), kit (torch, spirit level, a phone charger to test sockets, tape, sticky dots to mark snags, camera), and the room order.
2. Write a room-by-room checklist for this property covering finishes, doors and windows (open, close, lock, seals), plumbing (taps, flow, drainage, leaks under units, toilet flush), electrics (every socket and switch, light fittings, extractor fans), heating, kitchen units and appliances, tiling and sealant, flooring, stairs and balustrades, loft and insulation, and outside (drainage, paths, fences, render, gutters).
3. If findings were given, turn them into a defects list: number, room, exact location, description, category (safety, functional, cosmetic), priority, and photo reference. Rewrite vague notes into specific, checkable statements and mark any that need more detail.
4. Draft a short cover message to the builder: the list attached, a request for dates to inspect and fix, how access will work, and how sign-off will happen, referring to the defects period or warranty only as the user described it.
5. Give a follow-up plan: track each item to closed, reinspect fixes, keep everything in writing, and what to do before the defects period ends.
</task>

<constraints>
- Do not invent warranty terms, defect periods or legal rights; refer to the user's contract and warranty and, where rights are unclear, suggest checking with the warranty provider or local consumer advice.
- Safety defects (exposed wiring, missing balustrades, gas smells, no smoke alarms where required) go first and are flagged for immediate action.
- Keep the tone of the message factual and cooperative, not accusatory.
</constraints>

<output_format>
## How to inspect
Bullets.
## Room-by-room checklist
Checklist grouped by room or area.
## Defects list
Table: No. | Room | Location | Defect | Category | Priority | Photo. Or "Fill in after the inspection".
## Cover message
Short email.
## Follow-up
Bullets.
</output_format>
