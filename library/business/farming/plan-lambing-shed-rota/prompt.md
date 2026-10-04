---
schema: 1
id: plan-lambing-shed-rota
kind: prompt
title: Plan the lambing shed and rota
description: Sizes lambing pens, individual pens, kit and colostrum stock from scanning results, and builds a day and night shift rota for family, staff and lambing students.
category: farming
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder, operations-manager]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [lambing, scanning-results, lambing-pens, shift-rota, colostrum, sheep-flock]
pairs_with:
  prompts: [plan-tupping-calendar, plan-low-stress-weaning, triage-unwell-livestock]
  workflows: [lambing-season-track]
  personas: [stockperson-mentor]
args:
  - name: ewe_count
    description: Number of ewes and ewe lambs due to lamb.
    type: number
    required: true
  - name: scanning_results
    description: Scanning figures - numbers of empties, singles, twins and triplets, by group if you have them - plus the ram-in date or expected first lambing date.
    type: text
    required: true
  - name: system
    description: Lambing indoors, outdoors, or indoors for some groups and outdoors for others.
    type: enum
    enum: [indoor, outdoor, mixed]
    required: true
  - name: helpers
    description: Optional. Who can help and when - family, staff, lambing students, neighbours - with any limits such as other jobs, school runs or inexperience.
    type: text
output_contract:
  format: markdown
  sections: [Flock numbers, Pens and space, Kit and colostrum stock, Shift rota, Turnout plan, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a sheep farmer size the lambing setup and the people to run it. Good shepherds size everything from the scanning sheet, not from last year's guess: the number of lambs expected, how many will be triplets needing fostering or artificial rearing, and how many ewes lamb in the peak week. The common failures: too few individual pens in the peak, so ewes and lambs are turned out of pens before they have bonded; colostrum stock run out on the busiest night; a rota where the most experienced person works every night until they make mistakes; and no turnout plan, so pens back up.

Ewes due: {{ewe_count}}
System: {{system}}
<scanning>
{{scanning_results}}
</scanning>
{{#helpers}}
<helpers>
{{helpers}}
</helpers>
{{/helpers}}
</context>

<task>
1. From the scanning results, compute expected lambs, the scanning percentage, ewes carrying singles, twins and triplets, and empties to remove. If the figures do not add up to {{ewe_count}}, say so and ask.
2. Estimate the lambing spread from the ram-in date (about 147 days gestation; with raddle changes or a short tupping period, about 60-70% lamb in the first 17 days). Name the peak week and the likely peak day count.
3. Pens and space (indoor or mixed): individual pens as a starting rule at about one per 8-10 ewes for a compact lambing, more if the spread is tight or the flock has many triplets; mixing pens for 24-48 hours after individual pens; group pens by litter size; floor space per ewe [CHECK local welfare guidance]. For outdoor lambing: paddock sizes, shelter, a catching pen or quad trailer, and a small number of pens for problem ewes.
4. Kit list and stock quantities: colostrum (frozen ewe or cow colostrum and a powdered back-up, quantity sized to triplets plus about 10% of twins), stomach tubes and feeding bottles, iodine for navels, gloves and lubricant, ear tags, markers, heat box or lamp, a record book, and the vet's number. Give a shopping list with numbers.
5. Shift rota from the helpers, or as a template if none were given: day, evening and night shifts through the peak, no one on nights more than 3-4 in a row, an experienced person reachable at all times, clear jobs for students and beginners, and handover notes at each change.
6. Turnout plan: when ewes and lambs leave pens and go out (age, weather, ewe and lamb checks), field order by litter size, and the field space needed in the peak.
7. List the questions that would change the plan most.
</task>

<constraints>
- Do not prescribe medicines, doses or vaccine timing; list what to agree with the vet.
- Mark rules of thumb as such. Mark welfare and tagging rules as [CHECK locally].
- Never invent helpers, field names or shed dimensions; use placeholders [X] where details are missing.
- Treat rest as a safety issue: tired people make handling and driving mistakes. If only one person is available, or the user asks for a rota where someone works days and nights for weeks, do not write it; say why in two sentences and offer options instead (a lambing student or relief shepherd, cameras, a less frequent night check with a set alarm, splitting the flock's lambing dates), then give the rest of the plan.
</constraints>

<output_format>
## Flock numbers
Table: Group | Ewes | Expected lambs | Notes.
## Pens and space
Counts with the reasoning in one line each.
## Kit and colostrum stock
Checklist with quantities.
## Shift rota
Table: Date range | Day | Evening | Night | On call.
## Turnout plan
Numbered steps.
## Questions
At most three.
</output_format>
