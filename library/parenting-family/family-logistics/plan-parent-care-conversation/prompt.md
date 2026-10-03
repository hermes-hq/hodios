---
schema: 1
id: plan-parent-care-conversation
kind: prompt
title: Plan a care conversation with an ageing parent
description: Prepares a conversation with an ageing parent about care needs, driving or moving, respecting their autonomy, with openings, options to offer, responses to pushback and when it cannot wait.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [script, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [ageing-parents, eldercare, older-drivers, moving-house, autonomy, caregiving]
pairs_with:
  prompts: [plan-family-meeting, evaluate-care-homes, prepare-advance-care-plan-questions]
  personas: [eldercare-advisor]
args:
  - name: parent_situation
    description: Your parent's age, health, where and how they live, what they manage well, what has changed recently, how they usually react to advice, any memory problems, and who else in the family is involved.
    type: text
    required: true
  - name: concerns
    description: What worries you and why, with examples, for example "two minor car scrapes this month", "fell twice", "unopened post and unpaid bills", "the house is too big and the stairs are hard".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [First, Before you talk, How to open, Concern by concern, Options to offer, If they say no, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help adult children talk with ageing parents about care, driving, money or moving without taking away their dignity. Older people resist help most when they feel ambushed, talked down to or told what will happen; they engage more when the conversation starts from their own goals ("staying in your home", "keeping your independence"), describes specific observations rather than conclusions ("I noticed the dent in the car" rather than "you can't drive anymore"), offers choices, and happens over several conversations. An adult with capacity has the right to make choices their family disagrees with, including risky ones; the family's role is to inform, support and plan, and to act only when there is real danger or the parent can no longer decide.

<parent_situation>
{{parent_situation}}
</parent_situation>

<concerns>
{{concerns}}
</concerns>
</context>

<task>
1. First: if anything suggests immediate danger (getting lost, leaving the gas on, a serious fall, unsafe driving that has caused near misses with people, signs of abuse, neglect or scams draining money, sudden confusion that could be an illness such as an infection or stroke), say what to do now before planning a conversation: contact their doctor, urgent medical care, emergency services, adult protection services or the bank as relevant.
2. Before you talk: get the facts (what exactly has happened, when), think about what the parent values most, agree a shared position with siblings so the parent does not hear mixed messages, choose the right person to lead (sometimes a trusted friend or the doctor carries more weight), and pick a calm time and private place, avoiding holidays and crises.
3. How to open: three alternative openings in quotes that start from the parent's goals or from your own feelings ("I've been worrying, and I'd rather talk about it with you than behind your back"), plus questions that invite their view ("What would you want if things got harder?").
4. Concern by concern: for each concern, what you observed, how to raise it without blame, what the parent may fear underneath (losing independence, being a burden, moving), and the words to acknowledge that fear.
5. Options to offer: a range from small to large for each concern (for example, for driving: a professional driving assessment, avoiding night and motorway driving, a doctor's check, then alternatives for getting around; for living at home: aids and adaptations, a falls alarm, home care visits, a home safety assessment, moving closer to family, assisted living), so the parent can choose a step rather than face an ultimatum.
6. If they say no: how to respond calmly, leave the door open, agree a small step or a review date, involve their doctor, and accept the parent's right to choose while being honest about your worries. Explain what changes if memory problems mean they can no longer understand the risks.
7. Next steps: actions after the conversation (a follow-up, a doctor's appointment, a family meeting, practical planning such as making a power of attorney while the parent can still decide, with the advice to see a lawyer about how it works where they live).
</task>

<constraints>
- Respect the parent's autonomy and dignity throughout; never suggest tricking, threatening or secretly taking away car keys or money, unless there is immediate danger, and then explain the safer routes (the doctor, the licensing authority's rules).
- Do not diagnose dementia or any condition; describe signs and suggest a medical assessment, noting that some confusion has treatable causes.
- Do not give legal or financial advice on powers of attorney, guardianship, property or benefits; name the kind of professional to see and say rules vary by country.
- Acknowledge the adult child's own feelings (guilt, role reversal, frustration) briefly and kindly.
- Use only the facts given; ask about anything that would change the approach (memory problems, who else is involved).
</constraints>

<output_format>
## First
One line, or the urgent steps.
## Before you talk
## How to open
Three openings in quotes.
## Concern by concern
Table: Concern | What you saw | How to raise it | What they may fear | Words to acknowledge it.
## Options to offer
## If they say no
## Next steps
</output_format>
