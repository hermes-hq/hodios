---
schema: 1
id: map-school-holiday-cover
kind: prompt
title: Map school-holiday cover for the year
description: Maps every school-holiday and closure day of the year against both parents' leave, relatives, camps and swaps, so each day has cover and leave is shared fairly before it gets booked.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [school-holidays, annual-leave, working-parents, holiday-camps, childcare-gaps, school-year]
pairs_with:
  prompts: [plan-school-holiday-childcare-swap, plan-kids-summer, coordinate-family-calendar]
args:
  - name: school_dates
    description: The school year's holidays, closure and training days, as dates or as a pasted term-dates list.
    type: text
    required: true
  - name: leave
    description: Each adult's leave days for the year, days already committed, and any blackout periods at work, for example "Jo 25 days, 5 already used, can't take leave in March; Sam 28 days, works term-time only".
    type: text
    required: true
  - name: options
    description: Other cover with limits and rough costs, for example "grandparents one week each summer; holiday camp about 35 a day; swap with the Lees". Optional.
    type: text
  - name: family_trip
    description: Any holiday the family wants to take together, with dates or flexibility. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The gap count, The year at a glance, Leave split, Booking deadlines, Cost estimate, Risks and backups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help working parents plan cover for every school-holiday and closure day of the year at once. In many school systems the holidays add up to 12 to 14 weeks a year (state the family's country and check), while two full-time parents together have far fewer leave days, so the maths rarely works without camps, relatives or swaps. The families who manage do the sums in autumn: count the weekday gaps, decide which weeks are family time together and which are split (one parent on, one off, so leave stretches twice as far), book camps the day booking opens because popular weeks fill, and keep a few leave days back for sickness and surprise closures.

<school_dates>
{{school_dates}}
</school_dates>
<leave>
{{leave}}
</leave>
{{#options}}
<options>
{{options}}
</options>
{{/options}}
{{#family_trip}}Family trip wanted: {{family_trip}}{{/family_trip}}
</context>

<task>
1. The gap count: count the weekdays that need cover across the year (excluding public holidays when both adults are off, if known; mark assumptions). Compare with the leave available after commitments, and state the shortfall plainly.
2. The year at a glance: a week-by-week table of every holiday week and closure day, saying who covers it: both parents (family time), one parent, a relative, a camp, a swap, or "gap". Place the family trip first if given, then use split weeks to stretch leave.
3. Leave split: total days each adult uses, and whether the split is fair given their contracts and any term-time or part-time arrangements. Hold back a reserve of leave for sick days and surprise closures, and say how many.
4. Booking deadlines: a list of what must be booked and when: leave requests, camp sign-ups, relatives' agreement, swap dates. Use dates only from the inputs; otherwise say "check when booking opens".
5. Cost estimate: rough cost of paid cover using only the costs given; mark anything else "cost to check". Mention that some countries offer tax-free childcare or employer schemes that can apply to holiday camps, as something to check.
6. Risks and backups: which weeks are fragile (one relative covering, a single camp), and the backup for each.
</task>

<constraints>
- Do not invent school dates, camp names, prices or leave rules; work only from what is given and mark the rest.
- Never fill a gap by leaving a child too young to be alone at home unsupervised.
- Count carefully: total each adult's leave used and check it does not exceed what they have.
- If school dates are partial, plan what is given and list what is missing.
</constraints>

<output_format>
## The gap count
Short sums: weekdays to cover, leave available, shortfall.
## The year at a glance
Table: Week or dates | Days | Cover | Notes.
## Leave split
Table: Adult | Days used | Days in reserve | Days left.
## Booking deadlines
Checklist with dates or "check".
## Cost estimate
## Risks and backups
</output_format>
