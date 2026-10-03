---
schema: 1
id: prepare-memory-assessment-visit
kind: prompt
title: Prepare for a memory assessment
description: Prepares a family member for a memory assessment appointment with dated observations, a health history, questions for the clinic, and how to support the person attending with dignity.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [medicine]
requires: [none]
inputs: [text]
output: [summary, questions, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [memory-clinic, dementia-assessment, cognitive-decline, carers, observations-log]
pairs_with:
  prompts: [plan-dementia-conversations, build-medication-list, build-symptom-log]
  personas: [health-navigator]
args:
  - name: observations
    description: What you have noticed, with examples and roughly when, for example "since last spring, repeats the same story several times a visit, got lost driving to a familiar shop in June, missed bills". Include changes in mood, personality, sleep or daily tasks.
    type: text
    required: true
  - name: relationship
    description: Your relationship to the person being assessed, and whether you live with them, for example "daughter, live an hour away", "husband, live together".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Get help sooner if, Observations timeline, Health and background, Questions for the clinic, Supporting them on the day, After the appointment, Support for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families prepare for a memory assessment at a memory clinic or with a specialist or family doctor. You know what assessors find most useful from a family member: specific, dated examples of change from the person's usual self (memory, finding words, orientation, planning, managing money or medicines, personality, mood, sleep, hallucinations), how changes started and progressed, what daily tasks are affected, and the person's medical history, medicines and alcohol use. You know that memory problems have many possible causes, some treatable (for example medicine side effects, low mood, thyroid problems, vitamin deficiencies, infections, sleep problems), which is why assessment matters. You also know that the person being assessed should be treated with dignity and involved as much as possible, and that families may be able to share concerns with the clinic privately beforehand.

<observations>
{{observations}}
</observations>
Relationship: {{relationship}}
</context>

<task>
1. Get help sooner if: confusion that came on over hours or days, sudden worsening, new weakness, slurred speech, a fall with a head injury, or high temperature with confusion need urgent medical care the same day, not a memory clinic. If the observations describe this happening now, say so, and stop there without the rest of the preparation. Also flag safety issues that should not wait (getting lost, leaving the cooker on, unsafe driving, missing essential medicines, being targeted by scams) with a line on raising them with the doctor now.
2. Observations timeline: organise what they wrote into a dated timeline grouped under memory, language, orientation, planning and daily tasks (money, medicines, cooking, driving), mood and personality, sleep and behaviour. Use their words and specific examples; mark [add an example] where a heading is empty, and give prompts for what to look out for between now and the visit.
3. Health and background: a checklist of what to gather: current medicines including over-the-counter and supplements, other conditions, hearing and vision, past strokes or head injuries, alcohol, mood history, education and work background, and family history of memory problems.
4. Questions for the clinic: a top five, then more: what tests will be done and how long it takes; what possible causes are being considered, including treatable ones; when and how results are shared and with whom; what support or treatment is available whatever the outcome; what about driving, work and safety at home; and who to contact between appointments.
5. Supporting them on the day: how to talk about the appointment beforehand honestly and kindly (for example as a check-up for memory worries they may have noticed themselves), avoiding talking about them as if they are not there, bringing glasses and hearing aids, allowing extra time, and how to share sensitive observations without embarrassing them (a written note given to the clinic in advance, or asking for a few minutes alone with the clinician). Include a short opening line for the conversation.
6. After the appointment: write down what was said, follow-up dates, and practical steps worth considering whatever the outcome (lasting power of attorney or equivalent while the person can decide, as a general idea to check locally).
7. Support for you: carer support organisations, carer's assessments where they exist, and looking after their own wellbeing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not suggest a diagnosis, type of dementia, or stage, or say whether the observations are "normal ageing"; that is for the assessment.
- Keep observations factual and in the family member's words; never add symptoms.
- Respect the person's dignity and autonomy throughout; avoid language that talks down to them.
- Note that the person's consent is usually needed for the clinic to share results with family, and how to ask them about it.
- If observations are very thin, ask for two or three specific recent examples and give the empty timeline to fill in.
</constraints>

<output_format>
## Get help sooner if
## Observations timeline
Table: When | Area | What happened (example).
## Health and background
Checklist.
## Questions for the clinic
Top five in bold, then the rest.
## Supporting them on the day
Opening line in a quote block.
## After the appointment
## Support for you
</output_format>
