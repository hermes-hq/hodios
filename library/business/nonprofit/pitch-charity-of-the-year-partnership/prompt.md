---
schema: 1
id: pitch-charity-of-the-year-partnership
kind: prompt
title: Pitch a charity of the year partnership
description: Writes a nonprofit's pitch to become a company's charity of the year or cause partner - fit with the company's staff and values, the year's plan, money targets and what each side commits.
category: nonprofit
version: 1.0.0
status: incubating
stage: [build]
role: [manager, writer, marketer]
subject: [nonprofit]
inputs: [notes, document]
output: [copy, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [corporate-partnerships, charity-of-the-year, employee-fundraising, cause-partnership, partnership-proposal]
pairs_with:
  prompts: [plan-corporate-volunteering-day, write-case-for-support, write-impact-report]
  personas: [nonprofit-advisor]
args:
  - name: company
    description: The company - sector, size, where staff are based, what they have said about values or causes, how they choose partners (staff vote, committee, application form) and any criteria or word limits.
    type: text
    required: true
  - name: charity
    description: Your organisation - what you do, where, a few concrete outcomes, why this company's staff would care, and your capacity to support a partnership (staff time, events, volunteering roles).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit, The pitch, The year plan, What each side commits, Targets and reporting, Staff vote version]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help nonprofits win and plan year-long corporate partnerships, where a company's staff fundraise for, volunteer with and promote one cause, often chosen by staff vote. These are different from event sponsorship: the value is staff engagement over twelve months, so the pitch must make employees want to take part, not just tick a corporate social responsibility box. Partnerships fail when the charity promises more account management than it can staff, when targets are vague, or when the money raised costs more in staff time than it brings. A good pitch shows the link to the company's people and places, a calendar of easy ways to get involved, and honest numbers.
</context>

<task>
Write the pitch and plan.

<company>
{{company}}
</company>

<charity>
{{charity}}
</charity>

1. Fit: three to five specific reasons this company and its staff connect to the cause (location, sector, customers, stated values), based only on the input. Flag weak fit honestly.
2. The pitch: about 400 words or within the stated limit, led by why staff will care, one concrete story or outcome, what a year together would achieve, and the ask.
3. The year plan: a quarter-by-quarter calendar of staff activities (a launch, fundraising challenges, volunteering roles that genuinely help, payroll giving or matched giving if the company offers it, a celebration).
4. What each side commits: the charity's commitments (a named contact, talks, materials, impact updates) sized to its stated capacity; the company's (internal promotion, time for volunteering, matching).
5. Targets and reporting: a fundraising target built bottom-up from staff numbers and activities, with assumptions labelled, and how impact will be reported.
6. Staff vote version: a 50-word summary for a staff ballot.
</task>

<constraints>
- Use only facts given about both organisations; never invent the company's policies, matching schemes or staff numbers.
- Do not promise outcomes the charity cannot deliver or account management beyond its stated capacity; flag where the plan exceeds it.
- Volunteering activities must be useful to the charity and safe; flag any that need safeguarding checks.
- Plain, warm language; no corporate jargon or exaggerated claims.
</constraints>

<output_format>
## Fit
## The pitch
## The year plan
Table: Quarter | Activity | Staff involvement | Charity effort.
## What each side commits
## Targets and reporting
## Staff vote version
</output_format>
