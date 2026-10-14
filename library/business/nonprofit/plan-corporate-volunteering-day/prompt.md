---
schema: 1
id: plan-corporate-volunteering-day
kind: prompt
title: Plan a corporate volunteering day
description: Plans a company team volunteering day hosted by a nonprofit, with a task that really helps, costs recovered, safety and safeguarding, a run sheet and a follow-up that builds a partnership.
category: nonprofit
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, operations-manager]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
subject: [nonprofit]
tags: [corporate-partnerships, employee-volunteering, team-volunteering, run-sheet]
pairs_with:
  prompts: [recruit-volunteers, write-event-sponsorship-proposal]
  personas: [nonprofit-advisor]
args:
  - name: request
    description: The company's request - group size, date, hours, what they hope for, budget or donation offered, and any skills in the team.
    type: text
    required: true
  - name: organisation
    description: Your organisation - what you do, the sites available, real tasks that need doing, staff time you can spare, and whether you work with children or vulnerable adults.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Should we say yes, The task, Costs and the ask, Safety and safeguarding, Run sheet, Follow-up, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a nonprofit host a group of employees for a volunteering day. Companies often want a feel-good group activity for twenty people on a Friday; nonprofits often say yes and then lose two staff days finding painting work that did not need doing. Experienced volunteer managers check whether the day helps the mission, prefer tasks with a visible result (clearing a site, packing food parcels, refurbishing a room) or skills-based help (a CV workshop, a finance review), keep groups away from direct contact with children and vulnerable adults unless they are vetted and trained, and ask the company to cover the real cost of hosting, often as a "day fee" or matched donation. The day is also the start of a relationship: the companies that come back are the ones whose staff saw the difference they made.

Company request: {{request}}
Organisation: {{organisation}}
</context>

<task>
1. Should we say yes: test the request against mission value, staff time, cost and risk. If it does not fit, suggest an alternative (a skills-based project, a collection drive, a smaller group, a different date) and draft a polite reply.
2. The task: pick or design a task that is genuinely needed, sized for the group and the hours, with a clear finished result and a fallback if weather or numbers change. Split into teams with a lead for each.
3. Costs and the ask: list hosting costs (staff time, materials, refreshments, insurance, waste disposal) and propose how the company covers them, plus an optional donation or match; give wording for the ask.
4. Safety and safeguarding: a pre-day checklist (risk assessment, insurance check, induction briefing, personal protective equipment, accessibility for staff with disabilities, rules on photos and on contact with service users, no unsupervised access to children or vulnerable adults).
5. Run sheet: arrival to departure, including a 15-minute welcome that explains the mission and why today's task matters, breaks, a closing moment that shows what was achieved, and a group photo that respects consent.
6. Follow-up: a thank-you message with what was achieved in numbers, an impact story with consent, and a suggestion for next steps (repeat day, skills project, payroll giving, charity of the year).
7. List open questions for the company.
</task>

<constraints>
- Do not invent the company's details, budget or donation; mark unknowns [to confirm].
- Never plan direct unsupervised contact between untrained volunteers and children or vulnerable adults. Background-check rules differ by country; say to follow the organisation's safeguarding policy.
- Do not suggest make-work tasks; if no useful task exists for this group, say so.
- Keep costs as items for the organisation to price, not invented local prices.
</constraints>

<output_format>
## Should we say yes
## The task
## Costs and the ask
Table: Cost | Who covers it. Then the ask wording.
## Safety and safeguarding
Checklist.
## Run sheet
Table: Time | What | Who leads.
## Follow-up
The thank-you message, ready to adapt.
## Open questions
</output_format>
