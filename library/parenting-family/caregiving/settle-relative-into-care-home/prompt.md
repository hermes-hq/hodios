---
schema: 1
id: settle-relative-into-care-home
kind: prompt
title: Settle a relative into a care home
description: Plans the move into a care home and the first six weeks, with what to bring, telling staff who they are, visiting while they settle, the first review and handling your own guilt.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [care-homes, moving-in, transition, ageing-parents, carer-guilt]
pairs_with:
  prompts: [evaluate-care-homes, write-care-profile, raise-concern-about-care, write-life-story-profile-for-care]
  personas: [eldercare-advisor]
args:
  - name: person
    description: Who is moving, their needs (memory, mobility, communication), how they feel about the move, where they are moving from (home, hospital), and the country or region.
    type: text
    required: true
  - name: move_details
    description: The home, the moving date if known, room details, and what the family can do (who visits, how often, distance). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before moving day, What to bring, Telling staff who they are, Moving day, The first six weeks, First review, Looking after yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families through a move into a care home the way an experienced admissions or family liaison worker would. Families pour effort into choosing the home, then the move itself is rushed, often straight from hospital. What experienced staff know: the first four to eight weeks are usually the hardest, and early distress, asking to go home or a dip in appetite are common and often ease; a room with familiar objects and photos, and staff who know the person's history and routines, makes the biggest difference; families should be neither absent nor constantly present, and should agree how to raise things early; and the first care plan review, usually within weeks, is the moment to correct what staff have got wrong. Carers commonly feel guilt and grief alongside relief, and the caring role changes rather than ends.

<person>
{{person}}
</person>
{{#move_details}}Move details: {{move_details}}{{/move_details}}
</context>

<task>
1. Before moving day: how to involve the person in the decision and preparations as far as they can be, what to tell them and when (honest, simple, not a trick), questions to settle with the home (room, key worker, medicines transfer, doctor arrangements, visiting, phones, personal money, what laundry labels they want).
2. What to bring: a checklist of clothes and labels, familiar objects, photos, bedding or a chair if allowed, hearing aids, glasses and dentures with labelled cases, a phone or radio, things for hobbies, and what to leave at home (valuables).
3. Telling staff who they are: a one-page "about me" summary of history, routines, likes, what upsets and what comforts them, how they communicate, pointing to a full care profile or life story profile if they have one.
4. Moving day: timing, who goes, settling the room before they arrive if possible, staying long enough but leaving with a calm, honest goodbye, and how to handle "take me home".
5. The first six weeks: a week-by-week plan for visits, calls and involvement, signs that settling is going normally and signs to raise with the manager (weight loss, injuries, not getting up, missing aids, rising distress), and a light log to note what you see.
6. First review: questions for the first care plan review (how they are eating, sleeping and mixing, what staff have learned, medicines, health checks, what the family can do).
7. Looking after yourself: naming guilt and relief as normal, what to do with the time and energy back, and where to find support for families of care home residents.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not advise deceiving the person about the move or using "it's just for a holiday" stories; offer honest, kind wording matched to their understanding.
- Never invent the home's rules, costs, contract terms or regulators; turn them into questions to ask.
- Treat new injuries, sudden confusion or not eating or drinking as things to raise with the home and their doctor promptly, not as normal settling.
- Respect the person's dignity and remaining choices in every suggestion.
</constraints>

<output_format>
## Before moving day
## What to bring
Checklist.
## Telling staff who they are
Code block.
## Moving day
## The first six weeks
Table: Week | Family plan | What is normal | Raise with the manager.
## First review
Questions.
## Looking after yourself
</output_format>
