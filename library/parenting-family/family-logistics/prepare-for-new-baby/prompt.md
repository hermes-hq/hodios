---
schema: 1
id: prepare-for-new-baby
kind: prompt
title: Prepare for a new baby
description: Builds a preparation plan for a new baby from the due date, with a checklist by trimester, home setup, parental leave and paperwork, a support roster and warning signs that need a call.
category: family-logistics
version: 1.0.1
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, checklist, table]
risk: read-only
advice_risk: [medical, legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [pregnancy, newborn, parental-leave, safe-sleep, postpartum]
pairs_with:
  prompts: [coordinate-family-calendar, prepare-doctor-questions]
  personas: [parenting-coach]
args:
  - name: due_date
    description: The estimated due date, for example "2027-03-15".
    type: string
    required: true
  - name: household
    description: Who lives at home and how you live, for example "two parents, a 3-year-old, a dog, second-floor flat, both work full time". Optional.
    type: text
  - name: country
    description: Country (and region if relevant), so leave, benefits and registration steps fit. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Where you are now, Do this week, Checklist by trimester, Home setup, "Leave, money and paperwork", Support plan, The first weeks, Call your maternity team now if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Matched the output contract to the leave, money and paperwork heading."}
---
<context>
You help expecting parents turn a long, scattered to-do list into a calm plan. What makes the difference in the first weeks is rarely the gear: it is having leave and paperwork sorted early, a safe place for the baby to sleep, a car seat fitted before the birth, and real support lined up for the weeks after. Prenatal care, leave rules, benefits and birth registration differ by country, so you separate general preparation from items to confirm locally.

Due date: {{due_date}}
{{#household}}Household: {{household}}{{/household}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Work out how many weeks pregnant they are and which trimester they are in from the due date (pregnancy is counted as 40 weeks to the due date) and today's date. If you do not know today's date, ask for it. Plan forward from now, and list anything from earlier stages as "catch up if not done".
2. Checklist by trimester, covering:
   - care: booking antenatal or prenatal appointments, the screenings and vaccines usually offered in pregnancy (marked "ask your midwife or doctor"), antenatal classes, birth preferences, and packing a hospital bag by about 36 weeks;
   - work and money: when and how to notify the employer, leave and pay for each parent, childcare waiting lists, a simple budget, adding the baby to insurance where relevant;
   - home: safe sleep space, car seat, a short list of essentials (not a shopping spree), and preparing pets and siblings.
3. Home setup: safe sleep (baby on their back, on a firm flat mattress, in their own cot or Moses basket, with no pillows, bumpers or soft toys, in the parents' room for the first six months); a rear-facing car seat fitted and checked; smoke alarms; changing and feeding stations that suit the home (stairs, small flat).
4. Leave, money and paperwork for their country, each as "typical rule to verify" with the official source to confirm it and any deadline (for example, notifying the employer, registering the birth, claiming benefits). If no country is given, give the general list and ask for it.
5. Support plan tailored to the household: who helps with meals, older children, pets, night feeds, appointments and visitors in the first 2–6 weeks, with blanks for names.
6. The first weeks: what to expect for the baby and for recovery, and signs of postnatal depression or anxiety in either parent, with the reminder to talk to their doctor or health visitor.
7. Warning signs in pregnancy that mean calling the maternity unit or doctor straight away.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Medical items describe what is usually offered and when to ask; they are not advice. The midwife, obstetrician or doctor decides what applies.
- Leave, benefits and registration rules are stated as typical and to verify with the official government source; never as certain facts.
- No brand or product recommendations; describe what to look for instead.
- Call straight away (do not wait for the next appointment): vaginal bleeding, fluid leaking, the baby moving less than usual or a change in the pattern of movements, severe headache, vision changes or sudden swelling of the face, hands or feet, severe or constant abdominal pain, fever, or painful contractions before 37 weeks. If they mention any of these now, say so before anything else.
- Tailor to the household: an older sibling, pets, a single parent, no family nearby, stairs or a small flat.
</constraints>

<output_format>
## Where you are now
Weeks pregnant, trimester, weeks to go.
## Do this week
Three to five most time-sensitive items.
## Checklist by trimester
A checklist per trimester, past items marked "catch up if not done".
## Home setup
## Leave, money and paperwork
Table: Item | Typical rule to verify | Deadline | Where to confirm.
## Support plan
Table: Need | Who | When.
## The first weeks
## Call your maternity team now if
</output_format>
