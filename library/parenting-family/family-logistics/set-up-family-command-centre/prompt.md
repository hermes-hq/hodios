---
schema: 1
id: set-up-family-command-centre
kind: prompt
title: Set up a family command centre
description: Designs one place, on a wall or in an app, where the family's calendar, school papers, lists, keys and daily jobs live, sized to the space and kept up by a weekly reset.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [family-hub, home-organisation, paper-clutter, shared-lists, drop-zone, weekly-reset]
pairs_with:
  prompts: [coordinate-family-calendar, extract-actions-from-school-messages, split-mental-load-fairly]
args:
  - name: household
    description: Who lives there with ages, and how the family currently tracks things, for example "fridge covered in letters, partner uses phone calendar, kids lose shoes daily".
    type: text
    required: true
  - name: space
    description: Where the hub could go and its size, for example "wall by the back door, 1 metre wide" or "no wall space, small flat".
    type: string
    required: true
  - name: preference
    description: Paper, digital or a mix, and any apps the family already uses. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What the hub must do, The layout, Paper flow, Digital side, Who keeps it up, The weekly reset, Shopping list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a family set up a command centre: one agreed place where the household's moving parts live. It works when it sits where the family actually passes (usually the main entrance or kitchen), handles the real inflow (school letters, bills, keys, bags, permission slips, lists), and is small enough to keep tidy. It fails when it is designed for a magazine photo, duplicates a digital calendar nobody updates, or has no owner and no weekly reset. The best hubs combine a few physical things (a drop zone for keys and bags, a single in-tray for paper, a visible week) with the digital tools the adults already use, so nothing lives in two places that disagree.

<household>
{{household}}
</household>
Space: {{space}}
{{#preference}}Preference: {{preference}}{{/preference}}
</context>

<task>
1. What the hub must do: from the household, list the specific problems it solves (lost keys, missed forms, double-booked evenings, nobody knows what's for dinner) and the ones it does not need to solve.
2. The layout: a zone-by-zone plan that fits {{space}}: drop zone (keys, bags, shoes), paper in-tray, this week view, per-person slot or hook, lists (shopping, to-do), and a charging spot if useful. Mark what to skip if space is tight.
3. Paper flow: a simple rule for every piece of paper: act, file, or bin, with an in-tray that is emptied weekly and one place for things to sign.
4. Digital side: which calendar or list is the single source of truth, how the wall and phones stay in step (the wall shows only this week, copied during the reset), using apps the family already has and not recommending specific products unless asked.
5. Who keeps it up: ownership of each zone, including age-appropriate jobs for children (hang your bag, move your form to the in-tray).
6. The weekly reset: a 15-minute routine on a fixed day: empty in-tray, update the week, check upcoming forms and payments, refresh lists.
7. Shopping list: only the items needed for the layout, using what the family already has first.
</task>

<constraints>
- Fit the actual space and household; do not design a hub bigger than the wall or the family's patience.
- Avoid duplicating the same information in two places without a rule for which wins.
- Do not recommend or invent specific products, brands or prices.
</constraints>

<output_format>
## What the hub must do
## The layout
Table: Zone | What goes there | Fits in.
## Paper flow
## Digital side
## Who keeps it up
Table: Zone | Owner | Their job.
## The weekly reset
Numbered checklist.
## Shopping list
</output_format>
