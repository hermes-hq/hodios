---
schema: 1
id: plan-calving-season
kind: prompt
title: Plan the calving season
description: Plans a suckler or dairy calving season backwards from the start date - body condition targets, kit and pens, night-check rota, colostrum routine and call-the-vet triggers.
category: farming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, founder, operations-manager]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [calving, suckler-herd, dairy-herd, colostrum, body-condition-score, night-checks]
pairs_with:
  prompts: [plan-tupping-calendar, plan-low-stress-weaning, triage-unwell-livestock, plan-livestock-record-keeping]
  personas: [stockperson-mentor]
args:
  - name: herd_type
    description: Suckler beef, dairy, or a mix of both.
    type: enum
    enum: [suckler, dairy, mixed]
    required: true
  - name: cow_count
    description: Number of cows and heifers due to calve this season.
    type: number
    required: true
  - name: calving_start
    description: Planned first calving date, or the date the bull went in or first AI was done (for example "bull in 20 June" or "first calves 1 March").
    type: string
    required: true
  - name: labour_available
    description: Optional. Who can do calving checks and when - family, staff, students, other jobs on the farm, distance from the shed, existing cameras or alarms.
    type: text
output_contract:
  format: markdown
  sections: [Key dates, Cow condition and feeding, Pens and calving kit, Rota and checks, Colostrum and newborn routine, When to call the vet, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a cattle farmer plan the calving season. Experienced herd managers plan backwards from the first calving date (about 283 days after service, give or take a week by breed) and plan around the labour they really have. The common failures: cows calving too fat or too thin (both raise difficult calvings and slow rebreeding), a rota that leaves nobody fresh at 3 a.m. in the peak week, not enough individual calving pens for the peak, calves not getting enough colostrum in the first hours, and nobody agreeing in advance when to stop trying and call the vet.

Herd type: {{herd_type}}
Cows and heifers due: {{cow_count}}
Calving start or service date: {{calving_start}}
{{#labour_available}}
<labour>
{{labour_available}}
</labour>
{{/labour_available}}
</context>

<task>
1. Work out the first calving date (if a service date is given, add about 283 days and say so) and the likely spread: for a tight block, roughly 60% in the first three weeks; ask for scanning or service records to sharpen it. Mark the peak weeks.
2. Key dates backwards from the start: drying off (dairy cows, typically about 8 weeks before; not first-calving heifers), body condition checks at about 100 and 50 days before, pre-calving ration change, pen and kit ready two weeks before, vaccinations or vet visit to agree with the vet, and the date bulls go back in or AI restarts for next year.
3. Body condition targets on a 1-5 scale as a starting point to confirm with the vet or nutritionist: suckler cows about 2.5-3 at calving, dairy cows about 3-3.25, heifers not over-fat. Say how to shift condition slowly in late pregnancy, not by crash dieting.
4. Pens and kit: individual calving pens at about one per 10-12 cows for a compact block (more for heifers or a tight peak), clean and well-bedded, with a safe gate or headgate so a cow can be restrained without anyone in the pen with her. Give a kit list (calving ropes and aid, gloves, lubricant, iodine, colostrum supply and feeder or tube, thermometer, torches, ID tags and record book, heat lamp, phone numbers on the wall).
5. Rota: from the labour notes, or as a template if none were given, a day and night check schedule (for example checks every 2-3 hours through the peak, cameras where available), with handover notes, rest days and a named back-up. Never one person on nights for the whole peak.
6. Newborn routine: colostrum within 2 hours and about 10% of body weight in the first 12 hours as a rule of thumb to confirm with the vet, navel care, ID and recording within the legal deadline [CHECK locally], and observation of cow and calf bonding.
7. Call-the-vet triggers agreed in advance: no progress about 30 minutes after the water bag or feet appear, abnormal presentation, a heifer struggling, prolapse, heavy bleeding, a weak or cold calf, or a cow down. The farmer and vet set the final list.
</task>

<constraints>
- Do not prescribe medicines, doses or vaccine schedules; list them as things to agree with the vet.
- Mark every figure as a rule of thumb, and legal deadlines for tagging and registration as [CHECK locally].
- If herd size or start date is missing or impossible, ask and stop.
- Put people's safety first: never advise anyone to enter a pen with a freshly calved cow without a barrier and a second person nearby.
</constraints>

<output_format>
## Key dates
Table: Date | Task | Who.
## Cow condition and feeding
Bullets with targets and when to check.
## Pens and calving kit
Pen count with the reasoning, then a checklist.
## Rota and checks
Table: Week | Day cover | Night cover | Back-up.
## Colostrum and newborn routine
Numbered steps.
## When to call the vet
Bulleted triggers.
## Questions
At most three.
</output_format>
