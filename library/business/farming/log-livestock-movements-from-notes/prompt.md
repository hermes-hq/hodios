---
schema: 1
id: log-livestock-movements-from-notes
kind: prompt
title: Log livestock movements from notes
description: Converts scribbled notes, sale receipts and messages into a livestock movement record - date, IDs, from and to holding, numbers, reason - and lists gaps to fix before reporting.
category: farming
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, founder, operations-manager]
subject: [agriculture]
requires: [none]
inputs: [notes, document, message]
output: [table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [livestock-movements, animal-traceability, ear-tags, holding-register, data-extraction]
pairs_with:
  prompts: [plan-livestock-record-keeping, extract-field-work-log, set-up-farm-biosecurity]
args:
  - name: notes
    description: The raw material - notebook entries, market or abattoir receipts typed out, messages from buyers or hauliers, lists of tag numbers. Include the year if dates lack one.
    type: text
    required: true
  - name: country
    description: Country, and region where rules differ, so the right reporting system and rules to check can be named.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Movement record, Gaps to fix, Rules to check, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a keeper's scattered notes into a clean livestock movement record ready to check against the holding register and enter into the national reporting system. Most countries require each movement on or off a holding to record the date, the departure and destination holding numbers, the number of animals and their identification (individual tags or batch marks, depending on species), and to be reported within a set deadline. Errors here cause failed inspections, blocked sales and payment penalties. The craft is careful extraction: one row per movement per direction, tag numbers copied exactly, no guessing of holding numbers, and every gap and mismatch listed so it can be fixed before the deadline.

Country: {{country}}
<notes>
{{notes}}
</notes>
</context>

<task>
1. Identify each movement: animals leaving (sales, abattoir, market, shows, shared grazing, deaths collected as fallen stock) and arriving (purchases, returns, hired sires). Treat deaths on farm as register entries, not movements, and label them so; in many systems deaths of some species (for example cattle) must also be reported, so add that to Rules to check.
2. For each movement extract: date (ISO yyyy-mm-dd), direction (on or off), species, number of animals, individual IDs or batch or flock marks exactly as written, departure holding number and name, destination holding number and name, reason, haulier or vehicle if given, document or receipt reference, and the source line.
3. Check: count of IDs matches the number moved; tag numbers have consistent length and format within the notes (flag any that differ, never correct them); the same animal is not moved off twice; arrivals and departures that should pair (to market and back unsold) do pair.
4. Leave any missing value empty and list it under Gaps to fix with who can supply it (market, buyer, abattoir, haulier).
5. Under Rules to check, name the reporting system or authority you believe applies in {{country}}, the reporting deadline, document and standstill rules as items to confirm, each marked [CHECK]. Do not state them as certain.
</task>

<constraints>
- Copy identification numbers exactly; never complete, reformat or invent them.
- Do not invent holding numbers, buyers or dates, and never change a date to fit a deadline; a late report is fixed by reporting the true date now and contacting the authority.
- Extraction and organisation only; do not advise on breaking standstill or reporting rules.
- If the notes contain no movements, say so and stop.
</constraints>

<output_format>
## Movement record
Table: Date | On/Off | Species | Number | IDs or marks | From holding | To holding | Reason | Reference.
## Gaps to fix
Table: Row | What is missing or inconsistent | Who can confirm.
## Rules to check
Bullets ending in [CHECK].
## Notes
Bullets: assumptions (for example the year), deaths recorded as register entries, anything skipped.
</output_format>
