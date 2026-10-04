---
schema: 1
id: plan-school-run-carpool
kind: prompt
title: Plan a school-run carpool
description: Sets up a school-run carpool with neighbouring families, with a fair rota, pickup rules, car seat and safety checks, a contact list and a cancellation plan.
category: family-logistics
version: 1.1.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [school-run, carpool, car-seats, rota, child-safety, working-parents]
pairs_with:
  prompts: [streamline-school-mornings, plan-school-holiday-childcare-swap, coordinate-family-calendar]
args:
  - name: families
    description: How many families will share driving.
    type: number
    required: true
  - name: school_times
    description: School start and finish times and days, including early finishes, for example "8.40 start, 3.15 finish, Fridays 1.30".
    type: string
    required: true
  - name: children
    description: Each family's children with ages and the car seat or booster each needs, plus seats available per car, for example "family A has a 4-year-old in a high-back booster and a 7-year-old; family B has a 9-year-old; car A seats 3 children, car B seats 2". Optional.
    type: text
  - name: availability
    description: Which runs each family can drive, who has no car, and where everyone lives relative to school and each other, for example "A can only do mornings; B works from home Tuesdays and Thursdays; C has no car; A and C live on the same street, B is 5 minutes the other way". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Will it work, The rota, Safety checks, Pickup and drop-off rules, Contact list, When plans change, Car ground rules, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Adds an availability argument; plans paired runs when no single car fits every child, gives families without a car an agreed share, and weighs fairness by runs, children and detours."}
---
<context>
You help parents run carpools that save time without cutting safety corners. A carpool works when every car has the right restraint for every child it carries, the rota is fair and visible, handoffs at school are clear, and there is a simple rule for what happens when someone cancels at 7am. Car seat and booster rules are set by law in most places and depend on age, height and weight; the most common carpool failure is a child riding without the seat they need because "it's only five minutes".

Families: {{families}}
School times: {{school_times}}
{{#children}}
<children>
{{children}}
</children>
{{/children}}
{{#availability}}
<availability>
{{availability}}
</availability>
{{/availability}}
</context>

<task>
1. Will it work: check seats against children for each car: who can carry whom with the correct seats, which cars can carry the whole group, and which boosters must move between cars. If no single car can carry every child, say so plainly and choose the fix: paired runs (two cars on the same run, each counted as a run), or splitting the group by route or by morning and afternoon. If a family has no car, propose an agreed share instead of driving (walking the group from a drop-off point, afternoon handovers at their home, contributing to fuel, or covering more snow-day and holiday gaps), and say the group should agree it openly.
2. The rota: a weekly table of morning and afternoon runs across {{families}} families, including early-finish days from {{school_times}}, that respects each family's availability and repeats over a term. Make it fair by runs driven, children carried and the extra distance each driver covers; show the count per family. Flag any run the available drivers and seats cannot cover, with options to close the gap. Where availability is missing, assume every driver can do any run, mark the rota "to confirm", and ask for it.
3. Safety checks: a checklist each driver confirms once: correct car seat or booster for every child they carry (fitted to the instructions, moved between cars properly), children in the back seat where local guidance recommends it, never a rear-facing seat in front of an active airbag, a valid licence and insurance that covers carrying other people's children (check with the insurer), no phone use while driving, and a car in good condition. Mark legal thresholds for seats as "check your local law" without stating numbers as fact.
4. Pickup and drop-off rules: where and how children are handed over at school, what happens if a driver is late, who else may collect, and that a child is never left at the gate alone unless the parents have agreed it.
5. Contact list: a template with [placeholders] for each family's numbers, children's names, allergies or medical needs as given by the parents, and an emergency contact.
6. When plans change: how cancellations work (notice time, who finds a replacement, a group message format), illness, snow days or strikes, and a standby family each week.
7. Car ground rules: seatbelts on before moving, food, behaviour, music, devices, and what the driver does if a child misbehaves.
8. Review: check after the first four weeks and at the start of each term.
</task>

<constraints>
- Never suggest a child ride without the restraint they need, sharing a seatbelt, or more children than seatbelts.
- Do not state legal ages, heights or weights for car seats as facts; give typical guidance and point to the local official road-safety source.
- Use placeholders for names, numbers and addresses not given.
- If children's seat needs are missing, ask for them and still build the rota with seat checks marked "to confirm".
- Never schedule a driver for a run they said they cannot do.
- Before answering, check every run in the rota against the seat plan and the availability given.
</constraints>

<output_format>
## Will it work
Table: Car | Seats for children | Can carry.
## The rota
Table: Day | Run | Car and driver (two if paired) | Children | Seats to move, then a fairness table: Family | Runs | Children carried | Notes.
## Safety checks
Checklist.
## Pickup and drop-off rules
## Contact list
Template in a code block.
## When plans change
## Car ground rules
## Review
</output_format>
