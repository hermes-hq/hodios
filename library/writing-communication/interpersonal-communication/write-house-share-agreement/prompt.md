---
schema: 1
id: write-house-share-agreement
kind: prompt
title: Write a house-share agreement
description: Writes a friendly house-share agreement for housemates covering bills, chores, guests, noise, shared items and how disagreements get handled, ready to discuss and sign.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student]
requires: [none]
inputs: [text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [house-share, housemates, roommate-agreement, shared-living, chores-rota, bill-splitting]
pairs_with:
  prompts: [split-shared-expenses, set-boundary, clear-up-misunderstanding]
args:
  - name: housemates
    description: How many people live in the house, including you.
    type: number
    required: true
  - name: issues
    description: Known friction or things people care about, for example "dishes left for days", "one person's partner basically lives here", "night shifts vs early starts". Leave empty for a fresh start.
    type: text
  - name: tenancy_type
    description: How the tenancy works, for example "shared-lease" (everyone on one lease), "separate room contracts", "lodger with a resident landlord", "student halls flat".
    type: string
    default: shared-lease
  - name: house_details
    description: Rooms and their sizes, rent, which bills there are and roughly what they cost, shared spaces, pets, and anything already agreed. Leave empty and placeholders are used.
    type: text
output_contract:
  format: markdown
  sections: [Before you agree, House agreement, Chores rota, Sign-off and review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help housemates write a short, friendly agreement about living together. Most house-share fights come from expectations nobody said out loud: how bills are split and when they are paid, what "clean" means, whether food and toiletries are shared, how often partners and guests stay, quiet hours, and what happens when someone moves out. An agreement written together, in plain language, before trouble starts, prevents most of it and gives a fair way to raise problems later. It sits alongside the actual lease or room contract, which governs rent, deposits and legal rights, and it does not replace it.

Housemates: {{housemates}}
Tenancy: {{tenancy_type}}
{{#house_details}}
<house_details>
{{house_details}}
</house_details>
{{/house_details}}
{{#issues}}
<known_issues>
{{issues}}
</known_issues>
{{/issues}}
</context>

<task>
1. Before you agree: five to eight questions the housemates should discuss together first, focused on the issues listed and anything the agreement needs a decision on (for example equal or room-size rent split, a shared bills account, guest limits).
2. House agreement: a friendly agreement for {{housemates}} people with short sections:
   - Money: rent split method, bills and how they are split and paid, the due date, what happens if someone pays late, and a shared kitty for basics if wanted.
   - Cleaning and chores: what each shared space needs and how often, a standard for "clean" in plain words.
   - Food and shared items: what is shared, what is not, and how to replace things.
   - Guests and partners: overnight guests, how much notice, and a fair limit on how often someone stays before it counts as living there.
   - Noise and quiet hours, considering any shift work mentioned.
   - Shared spaces, heating and energy, smoking, pets, and parties.
   - Problems and disagreements: talk directly first, then a house meeting, then the lease-holder or landlord route if it is a tenancy matter.
   - Moving out: notice to housemates, finding a replacement if the tenancy allows, and settling bills.
   Address each known issue specifically and neutrally.
3. Chores rota: a weekly rotating rota for {{housemates}} people.
4. Sign-off and review: names and dates as placeholders, and a review date in about three months.
</task>

<constraints>
- Keep it informal and friendly: "we" language, no legal jargon, no passive-aggressive wording, no singling out one person even when an issue is clearly about them.
- Say clearly at the top that the agreement is informal, does not change anyone's rights or duties under the lease, room contract or local law, and that rent, deposit and eviction questions go to the contract and local tenant advice services.
- For {{tenancy_type}}, flag anything that depends on the tenancy, for example whether a replacement housemate needs landlord approval, as something to check in the contract.
- Use [placeholders] for amounts, dates and names not supplied. Do not invent figures.
- Before answering, check that every known issue is covered and the rota is fair across all housemates.
</constraints>

<output_format>
Markdown with these headings:
## Before you agree
## House agreement
The agreement with short subheadings, starting with the informal-agreement note.
## Chores rota
Table: Week | Housemate 1 | Housemate 2 | ... with tasks rotating.
## Sign-off and review
</output_format>
