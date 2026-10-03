---
schema: 1
id: write-babysitter-handbook
kind: prompt
title: Write a babysitter handbook
description: Writes a handbook for a regular babysitter, nanny or temporary guardian with each child's routines, allergies, emergency steps, screen rules and how the parents handle common situations.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [notes, text]
output: [docs, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [babysitting, nanny, temporary-guardian, childcare-handover, allergies, emergency-plan, house-rules]
pairs_with:
  prompts: [write-house-sitter-guide, write-family-emergency-plan, plan-behavior-approach]
args:
  - name: children
    description: Each child's name, age, routines (meals, naps, bedtime), allergies and medical needs exactly as written by a doctor, comfort items, fears and what settles them.
    type: text
    required: true
  - name: emergency_info
    description: Who to call and in what order, the family doctor, nearest hospital, who may and may not collect the children, and where emergency medicines are kept. Use names or roles; numbers can be left for the parents to fill in.
    type: text
    required: true
  - name: house_rules
    description: Food rules, screens, treats, bath time, friends over, going out, and how you want common situations handled (tantrums, bedtime stalling, sibling fights, refusing food, nightmares). Optional.
    type: text
  - name: care_length
    description: How long the carer is in charge. evening is a few hours; overnight includes bedtime and morning; multi-day adds school runs, medical consent and money.
    type: enum
    enum: [evening, overnight, multi-day]
    default: evening
output_contract:
  format: markdown
  sections: [Fridge card, In an emergency, Each child, Daily rhythm, Food and allergies, Screens and treats, How we handle common moments, Never, For longer stays, Still to fill in]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write childcare handbooks that let a babysitter, nanny or temporary guardian care for children the way their parents would. The handbook has two jobs: in an emergency, the carer finds what to do in ten seconds; the rest of the time, the children get the same rhythm, rules and responses they get from their parents, which keeps them calm. The parents' own approach to behaviour matters as much as the timetable, so the handbook spells out how they handle the moments that usually go wrong.

Care length: {{care_length}}

<children>
{{children}}
</children>
<emergency_info>
{{emergency_info}}
</emergency_info>
{{#house_rules}}
<house_rules>
{{house_rules}}
</house_rules>
{{/house_rules}}
</context>

<task>
1. Fridge card: a half-page summary to print and stick up: children's names and ages, allergies and where emergency medicines are, the parents' contact placeholders, the home address placeholder for calling emergency services, and bedtimes.
2. In an emergency: numbered steps for a child who is injured, has an allergic reaction, has trouble breathing, is missing, or for a fire: call emergency services first, then the parents, then the backup contact. Copy any emergency medicine instructions exactly as given; never write your own.
3. Each child: a short profile per child with routines, likes, fears, comfort items, what settles them, and medical needs as written.
4. Daily rhythm: a timed schedule suited to {{care_length}} (from arrival to bedtime for an evening; through the night and morning for overnight; a school-day and a weekend-day template for multi-day).
5. Food and allergies: what each child eats and does not, allergy rules (checking labels, no sharing food, cleaning surfaces), drinks, treats, and choking-safe food preparation for under-fives.
6. Screens and treats: exactly as the parents set them; if not given, mark as "Still to fill in" rather than inventing rules.
7. How we handle common moments: for each situation the parents describe (and the usual ones if not described: tantrums, bedtime stalling, sibling fights, refusing food, nightmares, "Mum lets me"), what the parents say and do, in their words where possible.
8. Never: the short list of non-negotiables (no physical punishment, never leave the children alone or with an unapproved person, no visitors unless agreed, no bathing young children unattended, nothing loose in a baby's cot, no posting photos of the children online).
9. For longer stays (overnight and multi-day only): school and nursery details and drop-off rules, a template letter with [placeholders] authorising the carer to seek emergency medical treatment for the children (noting local requirements vary and the family should check whether it needs signing or witnessing), money for expenses, and a daily update routine with the parents.
10. Still to fill in: every gap that matters for safety or routine.
</task>

<constraints>
- Copy allergies, medicines, doses and medical instructions exactly as given; never add or change a dose or suggest a treatment. If anything is unclear, add it to "Still to fill in".
- Never invent phone numbers, addresses, names or codes; use placeholders such as [parent 1 mobile].
- Keep alarm codes and passwords out of the handbook; note they will be shared in person.
- Respect the parents' approach to behaviour; if they ask for physical punishment or shaming, leave it out and add a neutral alternative with a short note.
- For an evening, keep the handbook to about two printed pages; omit "For longer stays".
- Before answering, check that every allergy and medicine appears on the fridge card and in the child's profile exactly as written.
</constraints>

<output_format>
## Fridge card
## In an emergency
Numbered steps.
## Each child
## Daily rhythm
Table: Time | What happens | Notes.
## Food and allergies
## Screens and treats
## How we handle common moments
Table: Situation | What we say | What we do.
## Never
## For longer stays
(overnight and multi-day only)
## Still to fill in
Numbered.
</output_format>
