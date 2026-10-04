---
schema: 1
id: write-relief-worker-handover
kind: prompt
title: Write a relief worker handover
description: Writes a handover for a relief milker or stockperson covering the farm while the farmer is away - daily routine, animals to watch, machine quirks, who to call and what to do if something breaks.
category: farming
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, founder]
subject: [agriculture]
requires: [none]
inputs: [notes, transcript, text]
output: [docs, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [relief-milker, farm-handover, time-off, stockperson, contingency-plan]
pairs_with:
  prompts: [write-farm-safety-induction, plan-livestock-record-keeping, set-up-farm-lone-working-checks]
args:
  - name: routine
    description: The daily routine and the farm as you would explain it on a walk-round - times, milking or feeding order, animals with quirks or on treatment, machines and their tricks, where things are kept, and who to call. A voice-note transcript or rough notes are fine.
    type: text
    required: true
  - name: days_away
    description: Optional. How many days you will be away, so the handover includes anything that falls due while you are gone.
    type: number
  - name: reachable
    description: Whether you can be reached while away.
    type: enum
    enum: [reachable, emergencies-only, not-reachable]
    default: emergencies-only
output_contract:
  format: markdown
  sections: [Contacts first, Daily routine, Animals to watch, Machines and kit, Where things are, If something goes wrong, Records to keep, Before I go]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a farmer's notes into a handover a relief milker or stockperson can follow alone. Farmers rarely take time off, and when they do the cover person is often competent but new to this farm: they do not know that the parlour gate sticks, that cow 214 kicks on the left, that the vet's out-of-hours number is different, or what to do when the milk tank alarm goes at 2 a.m. Handovers fail when they are a wall of text, mix routine with emergencies, skip the "who decides" question (can the relief call the vet without asking? sell nothing? move stock?), and leave due dates (milk collection, feed delivery, treatments ending, animals due to calve) buried. A good handover is a printed pack: contacts on the first page, a timed routine, animals to watch, a problem table, and the authority the relief has to act.

Farmer reachable while away: {{reachable}}
{{#days_away}}Days away: {{days_away}}{{/days_away}}
</context>

<task>
<routine>
{{routine}}
</routine>

1. Contacts first: farmer (and how reachable), a nearby decision-maker, vet (day and out-of-hours), milk buyer or collection, feed supplier, electrician, machinery dealer, neighbour with a key or tractor, fallen stock collection, emergency services with the farm address and an exact access point for an ambulance.
2. Write the daily routine as a timed list in the order it is done, with the checks that go with each step (water troughs, feed pushed up, dry cows looked at, gates shut).
3. Animals to watch: a table of each named or numbered animal with the quirk, treatment and withdrawal period, or due date, and what to do.
4. Machines and kit: the tricks for each (starting, the sticky gate, the scraper timer), and safe stop before clearing any blockage.
5. Where things are: keys, medicines, records, spare parts, fuses, torch, first aid kit, fuel, stopcocks, the generator.
6. If something goes wrong: a table of likely problems (power cut, milk tank or cooling failure, parlour breakdown, animal out on the road, down or sick animal, difficult calving, water failure, fire) with what to do and who to call, and what the relief may decide alone (default: call the vet for any animal that is down, in pain or not eating; never move or sell stock; never dispose of milk without telling the buyer).
7. Records to keep each day: medicines given, milk withheld, births and deaths, anything unusual, in a simple daily sheet.
8. Before I go: a checklist for the farmer (walk-round together, feed and fuel stocked, treatments that end while away, buyer and vet told, spare keys).
9. Where the notes leave a gap, add `[ADD]` rather than guessing.
</task>

<constraints>
- Use only what the farmer said; never invent animal numbers, doses, phone numbers or locations.
- Medicines: copy what the vet or farmer prescribed exactly; never change a dose or suggest a treatment.
- Write short lines for someone reading it in a parlour at 5 a.m.: one action per line, times in 24-hour format.
- If the routine is missing, ask for it and stop.
</constraints>

<output_format>
Markdown with the headings in the output contract. Contacts first as a table: who | why | number [ADD] | when to call. Daily routine as a timed checklist. Animals to watch as a table: animal | issue | what to do | until. If something goes wrong as a table: problem | do this first | then call | relief can decide alone (yes/no). Records to keep as a one-day sheet layout. Before I go as a checklist.
</output_format>
