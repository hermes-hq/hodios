---
schema: 1
id: plan-personal-care-at-home
kind: prompt
title: Plan help with washing and dressing at home
description: Plans how a family carer helps a relative wash, bathe, shave and dress with dignity, covering routines, the bathroom, refusals, safe moving and when to ask for an assessment or paid care.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [personal-care, washing, dressing, dignity, carers]
pairs_with:
  prompts: [plan-continence-care, reduce-falls-risk-at-home, choose-home-care-agency]
  personas: [eldercare-advisor]
args:
  - name: person
    description: Who you help, what they can still do themselves, mobility, memory, pain or skin issues, what they like (bath or shower, morning or evening), what they refuse, and the country.
    type: text
    required: true
  - name: relationship
    description: Your relationship to them (spouse, son, daughter-in-law) and how either of you feels about intimate care. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What they can still do, Setting up the bathroom, A routine that fits them, Step by step with dignity, When they refuse, Moving safely, When to get more help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help family carers with personal care the way an experienced occupational therapist and care worker would advise together. Family carers often take over tasks the person could still partly do, which speeds up loss of independence, or push a daily shower that the person dreads. What professionals know: do with, not for, letting the person do every step they can; a strip wash at the sink can replace a daily shower; warmth, privacy and covering parts not being washed reduce distress; choosing the time of day they always used helps; refusals often come from cold, fear of falling, embarrassment, pain or not understanding, so the approach matters more than persuasion; and intimate care between a parent and child or between spouses can strain the relationship, so paid help for some tasks is a reasonable choice. Bathrooms are a common place for falls; an occupational therapy assessment can advise on equipment.

<person>
{{person}}
</person>
{{#relationship}}Relationship: {{relationship}}{{/relationship}}
</context>

<task>
1. What they can still do: list which steps of washing, grooming and dressing they can do alone, with prompts, or need help with, and how to keep the first two.
2. Setting up the bathroom: warmth, non-slip surfaces, a seat, things within reach in order of use, towels warmed, and equipment to ask an occupational therapist about (rails, bath or shower seats, raised toilet seat).
3. A routine that fits them: their preferred time and method, alternatives such as a strip wash on most days, and how often a full wash is reasonable to discuss with them and any care team.
4. Step by step with dignity: a respectful sequence (explain each step, offer choices, cover with towels, let them wash face and private areas themselves if able, check skin gently), plus shaving, hair, nails, teeth or dentures and dressing (clothes laid out in order, easy fastenings).
5. When they refuse: likely reasons and calm responses, trying later or a different person, offering choices, and not forcing; when refusal over weeks becomes a hygiene or skin concern to raise with their doctor or care team.
6. Moving safely: getting in and out without lifting their full weight, what to do if they slip, and when equipment or training is needed.
7. When to get more help: signs that a needs assessment or paid carers for some tasks would help, and how to talk about that with the person.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not teach manual handling lifts or transfers in detail; recommend assessment and training from a professional where lifting is needed.
- Never suggest forcing, restraining or shaming; respect their right to say no while flagging when it becomes a health concern.
- Skin damage, sores, rashes or pain should go to a nurse or doctor, not be treated from the plan.
- Keep wording respectful; the person is an adult, not a child.
</constraints>

<output_format>
## What they can still do
Table: Task | On their own | With prompts | Needs help.
## Setting up the bathroom
Checklist.
## A routine that fits them
## Step by step with dignity
## When they refuse
## Moving safely
## When to get more help
</output_format>
