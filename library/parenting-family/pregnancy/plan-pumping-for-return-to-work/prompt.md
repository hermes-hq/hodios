---
schema: 1
id: plan-pumping-for-return-to-work
kind: prompt
title: Plan pumping for a return to work
description: Plans expressing breast milk around a return to work, with a pumping schedule for the workday, a milk stash, storage and transport, the employer request and a bottle practice timeline.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [preferences, text]
output: [plan, table, message, checklist]
risk: read-only
advice_risk: [medical, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [breastfeeding, expressing, breast-pump, return-to-work, childcare]
pairs_with:
  prompts: [plan-infant-feeding]
  workflows: [parental-leave-return-track]
args:
  - name: situation
    description: The baby's age now and at your return date, how feeding is going, your working pattern (hours, commute, shifts, travel, whether you have a private office or work on a shop floor, ward or site), the childcare arrangement, and the country.
    type: text
    required: true
  - name: goals
    description: What you want, for example "keep giving only breast milk until 6 months", "breastfeed mornings and evenings, formula at nursery", or "not sure yet". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your goal, Workday pumping schedule, Building a stash, Storage and transport, Asking your employer, Bottle practice timeline, When to get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents keep feeding breast milk after going back to work, the way a lactation consultant who has worked with nurses, teachers and shift workers would. What makes it work in practice: a schedule that roughly matches when the baby would feed, a private space that is not a toilet, somewhere cold to store milk, a modest stash rather than a freezer full, and a caregiver who knows paced bottle feeding. Common mistakes are starting a huge stash too early, skipping sessions on busy days, and leaving the employer conversation until the first week back. Rights to breaks and a place to express vary a lot by country, state and employer, and some jobs make it hard; partial breast milk feeding is a valid goal.

<situation>
{{situation}}
</situation>
{{#goals}}Goals: {{goals}}{{/goals}}
</context>

<task>
1. Your goal: restate it, and if none was given offer two or three realistic options (exclusive breast milk, feeds at home plus formula at childcare, gradual wind-down) without pushing any.
2. Workday pumping schedule: a table from wake-up to bedtime for a typical workday, placing feeds at home, pumping sessions at work and childcare bottles, fitted to their actual job and commute. Say that how often to pump is a question for their feeding specialist if supply is a concern, and give the common starting pattern of expressing about as often as the baby feeds while apart, marked as typical.
3. Building a stash: when to start and roughly how much to aim for as a buffer for the first days back, described as typical guidance to confirm, and how to fit one extra session into the day.
4. Storage and transport: general storage principles (fridge, cool bag with ice packs, freezer, labelling with date, thawing, not refreezing) and to follow the storage times their health service or childcare provider gives, since guidance differs. Cleaning the pump parts.
5. Asking your employer: a short, friendly message or meeting script asking for break times, a private non-toilet space, a fridge or storage, and a plan for meetings, shifts or travel; plus "check your rights" pointing to the official employment rights source or HR policy for their country, with no claims of specific entitlements.
6. Bottle practice timeline: when to introduce a bottle before the return, who gives it, paced bottle feeding to brief the caregiver, and what to do if the baby refuses.
7. When to get help: signs to see a midwife, doctor, health visitor or lactation consultant.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Get medical help the same day for a hot, red, painful area of the breast with fever or flu-like symptoms, or for a baby with fewer wet nappies, poor feeding or signs of dehydration.
- No medicine or supplement advice for supply, no doses, and no claims about how much milk they "should" make.
- Do not state employment law entitlements as fact. Say rights vary and to check the official source or HR policy; if the employer refuses, suggest an employment rights advice service.
- Respect a goal of partial breast milk or stopping. No guilt.
- No brand recommendations.
</constraints>

<output_format>
## Your goal
## Workday pumping schedule
Table: Time | At home or work | Feed, pump or bottle | Notes.
## Building a stash
## Storage and transport
## Asking your employer
Message in a code block, then "check your rights".
## Bottle practice timeline
## When to get help
</output_format>
