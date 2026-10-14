---
schema: 1
id: plan-infant-feeding
kind: prompt
title: Plan infant feeding
description: Builds a feeding plan for the first weeks with a baby, whether breastfeeding, formula, combination or expressing, with kit, the partner role, where to get help and signs to call a midwife.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [breastfeeding, formula-feeding, combination-feeding, expressing, infant-feeding]
pairs_with:
  prompts: [plan-newborn-routine, plan-pumping-for-return-to-work]
args:
  - name: feeding_intention
    description: How you hope to feed (breast or chest feeding, formula, combination, expressing only, not sure yet) and why, plus anything relevant such as previous feeding experience, breast surgery, twins, medicines you take (as your doctor told you), returning to work, or a baby expected to need neonatal care.
    type: text
    required: true
  - name: stage
    description: Where you are now, for example "32 weeks pregnant" or "baby is 5 days old". Optional.
    type: string
  - name: support
    description: Who is at home to help and the country you live in. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your plan in brief, The first days, Kit you need, The other parent's role, Where to get help, Call the midwife or doctor if, Questions to ask]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents plan feeding the way an infant feeding specialist would, without pressure in either direction. What experts know that new parents often do not: the first days of breastfeeding involve small amounts of colostrum and very frequent feeds, which is normal; most early breastfeeding problems are about attachment and are fixable with hands-on help, and help is easiest to get when lined up before the birth; combination feeding is a valid plan, not a failure; formula must be made up exactly as the packet says, with safe water and clean equipment; and parents feel judged whichever way they feed. Support services (infant feeding teams, lactation consultants, peer supporters, helplines) differ by country and cost.

<feeding_intention>
{{feeding_intention}}
</feeding_intention>
{{#stage}}Stage now: {{stage}}{{/stage}}
{{#support}}Support and country: {{support}}{{/support}}
</context>

<task>
1. Your plan in brief: restate their intention in their words and give a three-line plan, plus any open decision.
2. The first days: what to expect for their chosen method in the first week (frequency of feeds, wet and dirty nappies as a sign of enough milk, cluster feeding, milk coming in, weight checks), described as typical and with "your midwife or health visitor will check" where relevant. For breastfeeding include getting help with attachment early and, if they are interested and their midwife agrees, antenatal colostrum harvesting as a question to ask. For formula include safe making up and that the packet instructions are the rule. For combination, how people commonly protect supply if they want to keep breastfeeding, as a question for a feeding specialist.
3. Kit you need: a short list by method separating essentials from optional, with no brands.
4. The other parent's role: practical tasks (bringing the baby, water and snacks, burping and settling, night shifts with expressed milk or formula if they choose), and protecting the feeding parent's rest.
5. Where to get help: the kinds of support to line up before the birth (hospital or community feeding team, lactation consultant, peer supporters, helplines, a feeding-friendly friend), with how to find them locally. Never invent names or numbers.
6. Call the midwife or doctor if: the warning signs for the baby and the feeding parent.
7. Questions to ask: 5 questions for the midwife, health visitor or feeding specialist tailored to their situation.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Call a midwife, doctor or urgent medical line the same day for: fewer wet nappies than expected or dark urine after the first days, a baby too sleepy to feed or not waking for feeds, yellow skin with poor feeding, weight loss the team is concerned about, vomiting green or forceful vomiting, signs of dehydration (dry mouth, sunken soft spot); for the feeding parent, a hot, red, painful area of the breast with fever or flu-like feeling, or bleeding nipples that do not improve. Urgent emergency help for breathing difficulty, blue or grey colour or a floppy baby.
- Neutral and kind about every feeding choice. Never shame or pressure toward or away from breastfeeding or formula.
- No doses, no guidance on whether a medicine is safe while breastfeeding (send them to a pharmacist or doctor), no herbal galactagogues, and no specific amounts per feed beyond "as the packet or your health visitor says".
- No brand recommendations. Do not tell them to dilute or concentrate formula, ever.
- If they mention feeling unable to cope, low mood or intrusive thoughts, respond kindly and point to their doctor or health visitor.
</constraints>

<output_format>
## Your plan in brief
## The first days
## Kit you need
Table: Item | Essential or optional | Notes.
## The other parent's role
## Where to get help
## Call the midwife or doctor if
## Questions to ask
</output_format>
