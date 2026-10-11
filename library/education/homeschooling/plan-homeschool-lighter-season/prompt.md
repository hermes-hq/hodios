---
schema: 1
id: plan-homeschool-lighter-season
kind: prompt
title: Plan a lighter homeschool season
description: Plans a pared-back homeschool for a hard season such as a new baby, illness, bereavement or a move, keeping a minimum core, counting everyday learning and setting a review date.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
advice_risk: [mental-health]
tags: [hard-seasons, new-baby, bereavement, minimum-viable, burnout, flexibility]
pairs_with:
  prompts: [plan-deschooling-period, run-homeschool-term-review]
  personas: [homeschool-mentor]
args:
  - name: season
    description: "What is happening and how long you expect it to last, plus how you are coping."
    type: text
    required: true
  - name: children
    description: "Each child's age and where they are in reading and maths."
    type: text
    required: true
  - name: help
    description: "Optional: who can help and when, and any classes or groups you already use."
    type: text
output_contract:
  format: markdown
  sections: [This season, Minimum core, Learning that still counts, Pause for now, Lightening the load, Light records, Review date and adding back, Looking after yourselves]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeschooling parents through a hard season: a new baby, a parent's or child's illness, caring for a relative, bereavement, a move, a separation, or exhaustion. Experienced home educators know these seasons happen and that the answer is a planned minimum, not guilt or abandoning everything. A minimum viable homeschool keeps a small core going (often daily reading aloud or independent reading, a few minutes of maths practice, and something the child enjoys) and counts the learning that happens anyway: audiobooks, documentaries, cooking, helping, conversations, play. Children usually catch up quickly after a short lighter season when the core skills were kept warm. The plan should also lighten the parent's load: fewer subjects, outside help, swaps, and simple records. A review date stops a temporary plan becoming an accidental permanent one.

What is happening: {{season}}
Children: {{children}}
{{#help}}Help available: {{help}}{{/help}}
</context>

<task>
1. Briefly acknowledge the situation and say what this plan is: a temporary lighter rhythm, with a review date.
2. Set the minimum core per child: two or three things, how long each takes, and the lowest-energy version for the worst days.
3. List the everyday learning that counts, tied to this family's situation, and how to note it in a minute.
4. Say what to pause or drop for now, explicitly.
5. Reduce the parent's load: outside help, co-op or classes, relatives, swaps, independent resources, and what the children can take on themselves.
6. Keep records light: a weekly note template, enough for any reviewer or for the parent's peace of mind.
7. Set a review date and the signs that the family is ready to add things back, one at a time.
8. Look after the adults: one or two practical points, and when to seek support.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not shame the parent or imply the children are falling behind; be calm and practical.
- Keep the minimum core genuinely small, around 30 to 60 minutes a day in total for most ages.
- If the parent describes postnatal depression signs, burnout, grief that is overwhelming, or any risk to anyone's safety, encourage contacting a doctor or support service.
- Do not state legal requirements; if the family has reporting duties, suggest telling the authority early that it is a hard period.
</constraints>

<output_format>
## This season
## Minimum core
Table: Child | Core item | Time | Worst-day version.
## Learning that still counts
## Pause for now
## Lightening the load
## Light records
## Review date and adding back
## Looking after yourselves
</output_format>
