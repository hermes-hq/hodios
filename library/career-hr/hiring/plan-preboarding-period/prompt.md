---
schema: 1
id: plan-preboarding-period
kind: prompt
title: Plan the time between offer and start date
description: Plans preboarding from offer acceptance to day one - contact cadence, paperwork and checks, equipment and access, a first-week preview, and signs a new hire may renege, with owners and dates.
category: hiring
version: 1.0.0
status: incubating
stage: [plan]
role: [recruiter, manager, operations-manager, founder]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [preboarding, offer-acceptance, reneging, new-starter, day-one-readiness]
pairs_with:
  prompts: [plan-new-hire-onboarding, plan-pre-employment-checks, write-offer-letter, handle-first-day-no-show]
  personas: [recruiter]
args:
  - name: hire
    description: The role, the acceptance date and start date, whether remote or on site, the notice period they are serving, and anything known about their situation (relocating, counteroffer risk).
    type: text
    required: true
  - name: setup
    description: Who handles paperwork, IT, equipment and payroll, and what usually goes wrong before day one. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Timeline, Contact plan, Paperwork and checks, Equipment and access, Welcome pack, Reneging risk, Day-before checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run onboarding for a talent team. The weeks between offer acceptance and day one are where hires are quietly lost: the candidate hears nothing for a month, their current employer makes a counteroffer, a recruiter from another company calls, or doubts grow. And when they do arrive, the laptop is not ready, access is missing and no one knows they are starting. Good preboarding keeps warm contact without pressure (a call from the manager, a team welcome, useful information), gets paperwork and checks done early, prepares equipment and access with lead time, and gives the new hire a clear picture of their first week. It also respects that they still work for someone else: no unpaid work, and nothing that intrudes on their notice period.

<hire>
{{hire}}
</hire>
{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}
</context>

<task>
1. Timeline: a dated plan working back from the start date, with owners for each task (recruiter, manager, HR or people operations, IT, payroll).
2. Contact plan: a light cadence of touchpoints suited to the notice length (manager call in week one, team welcome message, a mid-point check-in, a first-week preview), with what each covers and who sends it; optional social contact clearly optional.
3. Paperwork and checks: contract signature, pre-employment and right-to-work checks with their lead times, payroll and bank details, emergency contacts, policy acknowledgements, and an adjustments question, sequenced so nothing blocks day one.
4. Equipment and access: hardware ordering and shipping for remote hires, accounts, building access, tools, and a test before the start date.
5. Welcome pack: what to send (first-day logistics, who to ask for, first-week agenda, team introductions, reading that is optional), with a short draft welcome message from the manager.
6. Reneging risk: signs to watch for (going quiet, delaying paperwork, questions about the start date, a counteroffer), how to respond respectfully, and when to warm up a backup candidate.
7. Day-before checklist: everything confirmed the day before start.
</task>

<constraints>
- Do not ask the new hire to do work, unpaid training or long reading before they start; keep pre-start content optional and light.
- Do not invent the company's tools, policies or dates; use placeholders.
- Respect their current employment and notice period; no pressure tactics.
- Keep personal data collection to what is needed, with a secure method.
</constraints>

<output_format>
## Timeline
Table: Date or week | Task | Owner.
## Contact plan
## Paperwork and checks
## Equipment and access
## Welcome pack
## Reneging risk
## Day-before checklist
</output_format>
