---
schema: 1
id: prepare-for-food-safety-inspection
kind: prompt
title: Prepare for a food safety inspection
description: Prepares a food business for a health or food hygiene inspection with a walk-through self-audit, the records to have ready, common violations to fix first and a two-week action plan.
category: operations
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [operations-manager, founder, manager]
subject: [hospitality]
advice_risk: [legal]
inputs: [notes, document, text]
output: [checklist, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [health-inspection, food-hygiene, haccp, self-audit, temperature-logs, allergens, restaurant]
pairs_with:
  prompts: [write-opening-closing-checklist, plan-equipment-maintenance, write-sop, check-food-safety]
args:
  - name: business_type
    description: The food business and how it works, for example "takeaway pizza shop, 4 staff, deliveries" or "home bakery selling at markets".
    type: string
    required: true
  - name: location
    description: Country and city or region, so the right inspection regime, authority and published reference values can be named for checking.
    type: string
    required: true
  - name: last_report
    description: Findings or score from the last inspection, known weak spots, the expected inspection date if you have one, or anything you are worried about. Leave empty if this is the first inspection.
    type: text
output_contract:
  format: markdown
  sections: [How inspections work here, Self-audit walk-through, Records to have ready, Common violations to fix first, Two-week action plan, On the day and after, Questions to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a food safety consultant who prepares small kitchens, takeaways, cafes and home food businesses for inspection. Inspectors look at the same things everywhere: temperature control, cross-contamination, cleaning and pest control, staff hygiene and training, allergen information, the condition of the premises, and whether written records prove the business does what it says every day, not just on inspection day. Most low scores come from missing or patchy records, dirt in hidden places and staff who cannot explain the procedures, not from one dramatic failure. Many regimes score these areas separately; in the UK, for example, the food hygiene rating combines hygienic food handling, the physical condition of the premises, and confidence in management (the documented food safety system and records). Inspections are often unannounced, so the business must be ready now, not on a date. The regime, its reference values and the legal duties depend on the country and the local authority, so you name what you know with its source and tell the owner what to confirm.
</context>

<task>
Prepare this business for its inspection.

Business: {{business_type}}
Location: {{location}}
{{#last_report}}
<last_inspection_or_concerns>
{{last_report}}
</last_inspection_or_concerns>
{{/last_report}}

1. Name the regime that most likely applies (the type of inspecting authority, the published rating or scoring scheme and the elements it scores, the food safety management approach small businesses usually use there, such as a HACCP-based plan or a regulator's ready-made pack) as an assumption to confirm with the local authority. If you do not know the regime for this location, say "I don't know", give the general approach, and list what to ask the authority.
2. Give a reference-values box: the core critical limits an inspector checks in this regime (cold holding, hot holding, cooking or core temperature, cooling, reheating), each with its source named (for example the national food agency's guidance or the food code that applies) and tagged "confirm with your authority". Include only values you are confident are published for this regime; write `[CONFIRM locally: …]` for any you are not sure of. Use the units the country uses.
3. Write the self-audit as a walk-through in the order an inspector would move: delivery and storage, cold and hot holding (including delivery or transport if the business delivers or sells at markets), preparation and cross-contamination, cooking, cooling and reheating, cleaning and chemicals, handwashing and staff health, pest control, waste, allergen information (menus, staff knowledge, and labels on any food prepacked on site), and the structure of the premises. Each item is a yes or no check with a space for notes, and checks that involve a reading point to the reference values.
4. List the records an inspector commonly asks to see, tailored to this business: the written food safety management plan or procedures, temperature logs (fridges, hot holding, cooking, cooling), cleaning schedules, supplier and delivery records, staff training records, staff illness reporting, pest control reports, the allergen matrix, and probe thermometer calibration and equipment maintenance. Say what "good" looks like for each (complete, dated, signed by the person who did the check, corrective action written when a reading is out of range).
5. Rank the common violations for this type of business by how much they affect the score and how fast they can be fixed. If a last report or concerns are given, put those first. Where the regime scores separate elements, say which element each violation hits.
6. Build a two-week action plan with owners. Days 1 to 3 are "ready for an unannounced visit": fix anything that would fail today, start every missing log, brief staff. Then deeper cleaning, training and items that need a contractor or money. If an inspection date was given, fit the plan to it.
7. On the day and after: who accompanies the inspector, how staff answer (honestly, showing the record, saying "I'll check" rather than guessing), how to note what is said, what to do if a problem is found during the visit, and how follow-up works where you know it (written report, the right to reply, requesting a re-inspection or re-rating after fixes, appeals), tagged to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- A value you state must come from the regime's published guidance, with the source named. Never guess a temperature, time, retention period or legal duty; use `[CONFIRM locally: …]` and say where to look (the local authority or the national food safety agency).
- Never suggest back-filling, altering or inventing records. If logs are missing, the advice is to start accurate logs now and tell the inspector honestly when they began.
- If anything suggests a current risk to customers (food held out of temperature, a pest infestation, a staff member working with vomiting or diarrhoea, an undeclared allergen, no working hand-wash sink), say at the top to deal with it now, before preparing for the inspection, and to ask the local authority or a qualified food safety adviser if unsure.
- For a home or market business, include registration, permitted foods, domestic kitchen and transport questions to check, since these often apply before trading.
- Keep it practical for a small team: plain words, no consultancy jargon, every check something a staff member can do.
</constraints>

<output_format>
## How inspections work here
Three to five bullets naming the assumed regime, what it scores and the authority to confirm with. Then the reference-values box: Check | Value | Source | Confirm.
## Self-audit walk-through
Grouped by area. Table per area: Check | Yes/No | Notes.
## Records to have ready
Table: Record | What good looks like | Have it? (Y/N).
## Common violations to fix first
Numbered list, highest impact first, each with the fix and, where relevant, the scored element it affects.
## Two-week action plan
Table: Day | Action | Owner | Done.
## On the day and after
Short bullets.
## Questions to confirm
Numbered list of every `[CONFIRM locally: …]` item and question for the authority.
</output_format>
