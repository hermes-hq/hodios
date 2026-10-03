---
schema: 1
id: create-family-tradition
kind: prompt
title: Create a family tradition
description: Invents new family traditions for holidays, seasons, birthdays or ordinary weeks that fit the family's values, budget and mixed backgrounds, with ways to make them stick.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, individual]
requires: [none]
inputs: [preferences, text]
output: [ideas, plan, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [family-traditions, rituals, blended-families, multicultural-families, holidays, family-bonding]
pairs_with:
  prompts: [plan-holiday-visits-between-families, plan-family-game-night, plan-grandparent-time]
args:
  - name: family
    description: Who is in the family, with ages and backgrounds, for example "two dads, kids 5 and 10; one side Mexican Catholic, the other secular Dutch; we just moved".
    type: text
    required: true
  - name: values
    description: What you want the traditions to express, for example "gratitude, being outdoors, giving back, staying close to grandparents". Optional.
    type: text
  - name: occasions
    description: Which occasions you want traditions for, for example "birthdays, first day of school, the winter holidays, Sunday evenings". Leave empty for a mix of ordinary and special days. Optional.
    type: text
  - name: budget
    description: How much the traditions can cost each time.
    type: enum
    enum: [free, low, moderate]
    default: low
output_contract:
  format: markdown
  sections: [What we heard, Tradition ideas, Blending backgrounds, Making it stick, Growing with the kids, Start this month]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families create traditions that last. The traditions children remember are usually small, repeated and specific to their family (pancakes shaped like the birthday age, a first-day-of-school photo on the same step, a walk on the shortest day), not expensive or elaborate. A tradition sticks when it has a fixed moment, a few recognisable elements, a name, and low enough effort to survive a busy year. Families with mixed backgrounds do well by honouring each heritage and creating something new that belongs to all of them.

<family>
{{family}}
</family>
{{#values}}Values: {{values}}{{/values}}
{{#occasions}}Occasions: {{occasions}}{{/occasions}}
Budget each time: {{budget}}
</context>

<task>
1. What we heard: in two or three lines, the family's values and backgrounds as you understand them.
2. Tradition ideas: six to eight original traditions across the occasions given (or a mix of everyday, seasonal and milestone moments if none were given), each with a name, when it happens, what happens step by step, why it fits this family's values, its cost level, and how it works for each child's age.
3. Blending backgrounds: for families with more than one culture, faith or set of family customs, ways to honour each one (food, language, stories, music, holidays) and one new shared tradition that combines them, without ranking either.
4. Making it stick: give each tradition an anchor (a date, a day of the week, an existing event), a ritual element (a song, a phrase, an object kept in a special box), and a way to record it (a photo in the same spot, a family book); keep effort low.
5. Growing with the kids: how each tradition adapts as children grow, including giving teenagers a role in leading it rather than dropping it.
6. Start this month: the one or two easiest traditions to begin now, with a short checklist.
</task>

<constraints>
- Traditions must fit the budget level; for free, nothing needs buying beyond what a household normally has.
- Respect religious and cultural practices; do not invent religious rituals or present a tradition as belonging to a faith or culture unless it genuinely does.
- Avoid ideas that leave anyone out (a parent who cannot attend, a child with a disability, a family member who does not drink alcohol).
- Ideas must be specific and original to this family, not generic ("have a family dinner").
- Before answering, check each idea against the stated values and budget.
</constraints>

<output_format>
## What we heard
## Tradition ideas
Table: Name | When | What happens | Why it fits | Cost.
## Blending backgrounds
## Making it stick
## Growing with the kids
## Start this month
Checklist.
</output_format>
