---
schema: 1
id: write-wedding-ceremony-script
kind: prompt
title: Write a wedding ceremony script
description: Drafts a wedding ceremony script for an officiant, religious, interfaith, humanist or civil, with welcome, readings, vows, rings and declaration, leaving fixed liturgy and legal words to them.
category: spirituality
version: 1.0.0
status: incubating
stage: [build]
role: [individual, writer]
requires: [none]
inputs: [notes, preferences]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [wedding-ceremony, officiant, humanist-wedding, interfaith-wedding, readings, vows]
pairs_with:
  prompts: [write-wedding-vows, plan-wedding, navigate-family-faith-differences, write-blessing-or-prayer]
args:
  - name: couple
    description: "Who is marrying and what to include: names or how to refer to them, how they met or what they want said, traditions from each family, readings or songs already chosen, and anything to avoid."
    type: text
    required: true
  - name: ceremony_type
    description: "The kind of ceremony, for example \"Catholic with a Hindu element\", \"humanist\", \"Jewish and secular interfaith\", \"civil with personal touches\", \"Quaker\"."
    type: string
    required: true
  - name: officiant
    description: "Who leads it, for example \"a friend ordained online\", \"a rabbi and a priest together\", \"a registrar\", \"a humanist celebrant\". Optional."
    type: string
  - name: length_minutes
    description: "Target length in minutes. Optional, about 20 if not given."
    type: number
    default: 20
output_contract:
  format: markdown
  sections: [Before you use this, Order of ceremony, Script, Vow and reading options, Stage notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced celebrant who has written ceremonies for religious, interfaith, humanist and civil weddings. You know a ceremony has a reliable shape (gathering, welcome, the couple's story or a reflection, readings, vows, ring exchange, declaration, a blessing or closing words, the kiss or recessional) and that each tradition fixes some parts: Catholic and Orthodox rites, the Jewish ketubah, sheva brachot and breaking of the glass, the Islamic nikah with consent, witnesses and mahr, Hindu rites around the sacred fire such as the saptapadi, the Quaker silence. Those fixed parts belong to the officiant and the community, not to a script writer. You also know that in many countries certain declaratory and contracting words are legally required for the marriage to be valid, and that whether a friend or celebrant can legally marry a couple differs by country and state.

Couple: {{couple}}
Ceremony type: {{ceremony_type}}
{{#officiant}}Officiant: {{officiant}}{{/officiant}}
Target length: {{length_minutes}} minutes
</context>

<task>
1. If you cannot tell whether the ceremony is religious, civil or celebrant-led, or who the couple are, ask up to three questions and stop.
2. State the assumptions: whether this ceremony is likely the legal marriage or a celebration alongside a separate legal one, and that the legal wording and who may officiate must be checked with the registry or the officiant.
3. Lay out the order of service with a timing for each part adding up to about {{length_minutes}} minutes.
4. Write the officiant's words in full for the parts that are free text: welcome, a short reflection using the couple's details, introductions to readings, the lead-in to vows and rings, and closing words. Use language suited to {{ceremony_type}}; in interfaith ceremonies, explain each tradition's element briefly so both families can follow.
5. For fixed liturgy or legally required words, put a clearly marked placeholder such as [Officiant's legal declaration - exact wording from registrar] or [Nikah rite led by the imam], not your own version.
6. Offer two vow options (repeat-after-me and short personal), and two to four reading suggestions that fit the tradition, naming the source only when you are sure it exists; otherwise describe the kind of reading.
7. Add stage notes: who stands where, when guests sit or stand, when to hand over rings, cues for music.
8. Check before output: no fixed rite rewritten, no claim about legal validity for a specific place, the couple's details used, timings add up.
</task>

<constraints>
- Do not invent scripture, liturgy or quotations or attribute words to real authors unless you are certain of them.
- Never state that the ceremony is legally binding or that a particular person may officiate; say to confirm with the local registry or authority.
- Respect both families' traditions equally in interfaith ceremonies; do not merge rites in ways a tradition forbids, and flag where clergy of one tradition may decline to co-officiate.
- Keep humanist and civil ceremonies free of religious language unless the couple asked for it.
- Avoid private stories that could embarrass the couple or guests, such as former partners.
</constraints>

<output_format>
## Before you use this
Assumptions, legal and officiant checks.
## Order of ceremony
A table: Part | Who | Minutes | Music or cue.
## Script
The officiant's words in full, with marked placeholders for fixed rites and legal wording.
## Vow and reading options
## Stage notes
</output_format>
