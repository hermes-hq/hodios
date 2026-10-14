---
schema: 1
id: prepare-care-needs-assessment
kind: prompt
title: Prepare for a care needs assessment
description: Prepares a family for a social care or care needs assessment, with a picture of a real week including bad days, the outcomes that matter, the carer's own needs, questions to ask and what to do after.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [notes, text]
output: [checklist, questions, plan]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [needs-assessment, carers-assessment, care-package, advocacy]
pairs_with:
  prompts: [build-care-rota, plan-parent-care-conversation, prepare-disability-benefits-application]
  personas: [eldercare-advisor]
args:
  - name: situation
    description: Who is being assessed, by whom if known (council, social worker, care agency, insurer, health service), what they struggle with day and night, what help they get now and from whom, the main carer's situation, and the country or region.
    type: text
    required: true
  - name: diary
    description: Notes from a week of care or recent incidents, if you have them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What this assessment is for, A real week, Outcomes that matter, The carer's needs, Questions to ask, On the day, After the assessment]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families prepare for a care needs assessment the way an experienced carers' advocate would. Assessments decide what help is offered, and they often under-record need because the person tries hard on the day ("I manage fine"), the family understates to be polite, night-time and bad days are not mentioned, and the hours the carer puts in are treated as if they will continue indefinitely. What helps: a written description of a real week with examples and how often things happen, framed around what the person wants to achieve (staying at home, getting out, keeping clean, staying safe at night); separate recognition of the carer's needs, which in many places have their own assessment; and keeping a copy of what was recorded. Processes, names and eligibility rules vary a lot by country and region.

<situation>
{{situation}}
</situation>
{{#diary}}
<diary>
{{diary}}
</diary>
{{/diary}}
</context>

<task>
1. What this assessment is for: in general terms, what this kind of assessment usually decides and who carries it out, stated as an assumption for their country; and a line that eligibility rules are local and to ask the assessor which criteria they use.
2. A real week: a written summary organised by area (personal care, eating and drinking, toileting and continence, moving around and falls, medicines, night-time, memory and decisions, safety, getting out and social contact, managing the home and money), with what happens, how often, how long it takes, what the carer does, and what happens on a bad day. Use only the facts given and mark missing areas [add an example].
3. Outcomes that matter: three to five outcomes in the person's own words where possible ("I want to stay in my own home", "I want to have a bath, not just a wash").
4. The carer's needs: hours, sleep, work, health, and what the carer is not able or willing to keep doing, plus asking whether a separate carer's assessment is available.
5. Questions to ask: about eligibility criteria, the timeline, what support options exist, how a personal budget or direct payments work if available, charges and financial assessment, getting a copy of the assessment and care plan, and how to ask for a review.
6. On the day: invite the person to speak first, gently add the bad-day examples, have the written summary ready to hand over, ask for an interpreter or advocate if needed, and note who attended.
7. After the assessment: check the written record against what was said, ask for corrections in writing, what to do if they disagree (ask for a review, use the complaints process, contact an independent advice or advocacy service), and when to reassess.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Be honest: describe real difficulties and bad days fully, never exaggerate or invent need. Accuracy protects them.
- Do not state eligibility criteria, entitlements, amounts or timescales as fact; say they vary and to check locally.
- Keep the person's dignity and voice central; they may not want everything said in front of them, so suggest giving the written summary separately if that is kinder.
- If the situation describes someone unsafe now (unable to get out of bed or to the toilet alone, falls, no food), say this needs urgent contact with their care team or social services, not waiting for a routine assessment.
</constraints>

<output_format>
## What this assessment is for
## A real week
Table: Area | What happens | How often | Who helps and how long | Bad day.
## Outcomes that matter
## The carer's needs
## Questions to ask
## On the day
## After the assessment
</output_format>
