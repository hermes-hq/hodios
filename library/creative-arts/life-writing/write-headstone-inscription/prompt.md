---
schema: 1
id: write-headstone-inscription
kind: prompt
title: Write a headstone or memorial inscription
description: Writes wording for a headstone, memorial plaque, bench or urn within the letter and line limits given, with several options, a layout and a list of details to check before engraving.
category: life-writing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
requires: [none]
inputs: [notes, preferences]
output: [copy, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [epitaph, memorial-plaque, bereavement, remembrance, engraving]
pairs_with:
  prompts: [write-obituary, write-pet-memorial]
  workflows: [funeral-planning-track]
args:
  - name: person_details
    description: Full name as it should appear, dates (or just years), family roles (beloved wife, mother, grandmother), anything the family wants to say, phrases or lines they loved, faith or none, and the language or languages to use.
    type: text
    required: true
  - name: memorial_type
    description: Headstone, plaque, bench, urn, tree marker, or something else, and the material if known.
    type: string
    required: true
  - name: limits
    description: Optional. Any limits from the mason, cemetery or council - maximum lines, characters per line, number of letters (often priced per letter), wording rules or required elements.
    type: text
output_contract:
  format: markdown
  sections: [Options, Recommended layout, Check before engraving, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families choose words for memorials, the shortest and most permanent life writing there is. Monumental masons and memorial makers know the practical rules families learn too late: lettering is often priced per letter, so every word costs; cemeteries, churchyards and councils can have rules about wording, length, faith content, nicknames or photographs, and some require approval before engraving; a line that fits on paper may not fit the stone at a readable letter height; leaving space for a partner's name later is common; and the hardest errors to fix are a misspelled name or a wrong date. Good inscriptions are specific and plain: a phrase the person said, a line from a song or verse they loved, or a single true sentence beats a generic sentiment.

<person_details>
{{person_details}}
</person_details>
Memorial: {{memorial_type}}
{{#limits}}<limits>
{{limits}}
</limits>{{/limits}}
</context>

<task>
1. If the full name or the dates are missing, ask for them and stop.
2. Options: four to six inscription options in different registers (traditional, personal, faith-based only if the details include faith, and one using a phrase or line the family gave). Lay each out line by line as it would be engraved, with a character count per line and a total letter count, within any limits given.
3. Recommended layout: the option that best fits the details and limits, centred line by line, with notes on which lines are larger, whether to leave space for a later addition, and how to set dates (full dates or years).
4. Check before engraving: spelling of every name, dates against a death or birth certificate, the cemetery's or site's rules and whether approval is needed, the mason's proof to sign off, the cost per letter if relevant, and agreement among the family members who need to agree.
5. Notes: if a quoted line from a poem, song or scripture is used, say where it comes from if you are confident, that the family should check the exact wording, and that very recent song lyrics may need permission for some uses; plus one suggestion for words that do not fit the memorial (an order of service, a memorial page).
</task>

<constraints>
- Never invent dates, relationships, faith or quotations attributed to the person. Use only phrases the family gave or widely known lines they chose.
- Respect every limit given; if a family wish cannot fit, say so and offer the nearest version.
- Do not quote long copyrighted lyrics; a short line the family chose is fine to lay out, with the note above.
- Keep a gentle, plain tone; the reader is grieving. If they mention being unable to cope or thoughts of self-harm, set the task aside, respond with care and point them to local support or emergency services.
</constraints>

<output_format>
## Options
Each option in a code block, one engraved line per line, then counts.
## Recommended layout
## Check before engraving
## Notes
</output_format>
