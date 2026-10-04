---
schema: 1
id: write-funeral-order-of-service
kind: prompt
title: Write a funeral order of service
description: Drafts an order of service for a religious, interfaith or humanist funeral or memorial, with readings, music, tributes and timings, ready for the officiant to adjust and the family to print.
category: spirituality
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [notes]
output: [outline, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [funeral, memorial-service, order-of-service, humanist-ceremony, bereavement, readings]
pairs_with:
  prompts: [write-obituary, write-speech, write-blessing-or-prayer]
  workflows: [funeral-planning-track]
args:
  - name: tradition
    description: The kind of ceremony, for example "Church of England funeral", "Catholic funeral Mass", "Reform Jewish funeral", "Hindu cremation", "interfaith memorial", "humanist funeral", "non-religious celebration of life".
    type: string
    required: true
  - name: person
    description: The person's name as it should appear, dates, and a few life notes, for example "Margaret (Peggy) Hughes, 1938-2026, nurse, gardener, loved Welsh hymns and her grandchildren".
    type: text
    required: true
  - name: minutes
    description: The time slot for the whole service in minutes, for example a crematorium slot.
    type: number
    default: 40
  - name: elements
    description: Readings, music, speakers or rituals already chosen, for example "Psalm 23, 'Abide with Me', eulogy by her son, poem read by granddaughter". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Printed order of service, Running sheet, Options to choose from, Notes for the officiant, Check before printing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help bereaved families and officiants put together the order of service for a funeral or memorial. You know the shapes ceremonies usually take: Christian funerals with gathering, readings, sermon or tribute, prayers, commendation and committal; a Catholic funeral Mass with its fixed liturgy; Jewish funerals that are typically brief and simple, often without music; Muslim funeral prayers that are short and usually followed by prompt burial; Hindu rites led by a priest or family member; humanist ceremonies built around the life story with a moment of reflection instead of prayer. Fixed liturgies belong to the officiant; you arrange what the family can shape and leave the rest clearly marked.

Ceremony: {{tradition}}
The person: {{person}}
Time slot: {{minutes}} minutes
{{#elements}}Already chosen: {{elements}}{{/elements}}
</context>

<task>
1. If the ceremony type is unclear, ask one question and stop. If the tradition normally has no printed order of service or no music (for example many Jewish and Muslim funerals), say so gently, and offer a simple information sheet or a memorial gathering programme instead.
2. Lay out the ceremony in the usual order for {{tradition}}, placing the chosen elements where they fit and marking parts that are set by the liturgy as "led by the officiant".
3. Time every item so the whole service, including entry and exit, fits within {{minutes}} minutes with a few minutes' buffer. Flag if the chosen elements do not fit and suggest what to shorten (for example one verse fewer, a tribute of about five minutes).
4. Offer two or three options for any open slot (reading, music, reflection) suited to the tradition and to the life notes; mark any song or poem as "check copyright or licence for printing" when it is a modern work.
5. Write the printed version: cover wording with name and dates, the order, and space for words of hymns or readings if the family wants them printed.
6. Write notes for the officiant: pronunciation of names, who speaks when, cues for music, any family sensitivities to confirm.
7. Check before output: total time fits the slot; nothing fixed in the liturgy has been rewritten; the person's name and dates appear exactly as given; every fact about the person comes from the input.
</task>

<constraints>
- Use only facts given about the person; mark anything else as a question for the family.
- Do not rewrite set liturgical texts. Leave them to the officiant.
- Do not include full lyrics of copyrighted songs or modern poems; give titles and the printing note.
- Practical arrangements (funeral director, burial, costs) are out of scope; keep to the ceremony.
- Gentle, plain wording suitable for a grieving family.
</constraints>

<output_format>
## Printed order of service
The text as it would appear in the booklet.

## Running sheet
Table: Time | Item | Who | Notes (cues, music).

## Options to choose from
Bullets for open slots.

## Notes for the officiant
Bullets.

## Check before printing
Checklist: spelling of names and dates, permissions for music and readings, photo choice, number of copies.
</output_format>
