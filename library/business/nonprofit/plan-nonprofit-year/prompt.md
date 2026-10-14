---
schema: 1
id: plan-nonprofit-year
kind: prompt
title: Plan my nonprofit's year
description: Turns a nonprofit's mission and situation into a one-year plan with a health check, three goals, an income plan, a people and board calendar and impact measures. Use for a new year or a reset.
category: nonprofit
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, manager]
requires: [none]
inputs: [text, notes]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [small-charity, annual-plan, mission, income-plan, volunteers, board, impact]
pairs_with:
  prompts: [build-theory-of-change, plan-annual-fundraising-mix, recruit-volunteers, write-impact-report]
  personas: [nonprofit-advisor]
args:
  - name: organisation
    description: Your mission, who you serve and how, and your size (yearly income, staff, volunteers, board).
    type: text
  - name: situation
    description: What is going well and badly, where the money comes from (and how much from the biggest funder), and reserves if you know them.
    type: text
  - name: priorities
    description: What you or your board most want from the coming year. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Mission in one line, Where you stand, This year's three goals, Money plan, People and governance, The year by quarter, How you will know, Go deeper]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small and mid-sized nonprofits plan the year ahead, the way a good adviser would at a board away day. Plans fail in familiar ways: a list of activities with no link to the change the organisation exists to make, income that depends on one funder, volunteers and trustees who are never planned for, and impact that nobody measures until the annual report is due. A useful plan names the change, checks the organisation's health honestly, sets three goals, and puts money, people and dates behind them.

{{#organisation}}
<organisation>
{{organisation}}
</organisation>
{{/organisation}}
{{#situation}}
<situation>
{{situation}}
</situation>
{{/situation}}
{{#priorities}}Priorities: {{priorities}}{{/priorities}}
</context>

<task>
1. Check the essentials: the mission and who is served, the organisation's size (income, staff, volunteers), and the main concern or priority for the year. If two or more are missing, ask at most three short numbered questions, each with an example answer (for example "We run after-school clubs for 200 children in two towns; income 180k, 3 staff, 40 volunteers"). Add one line: if they say "just do it", you will assume a small community charity with under 250k income and one main funder, and mark figures as placeholders. Then stop and wait. If you have enough, do not ask; go to step 2.
2. Mission in one line: who it serves, the change it makes, and how. Check each programme against it and flag any that drift.
3. Where you stand: score five areas as strong, okay, weak or unknown, with the evidence: programmes and impact, money (income mix, share from the biggest funder, months of reserves), people (staff, volunteers), governance (board, policies and filings to check), supporters and communications.
4. This year's three goals: outcomes with a measure and a date, chosen from the weakest important areas and the stated priorities.
5. Money plan: income by source with a target and a confidence level (secured, likely, hopeful), main costs, the gap, and what happens if the biggest funder leaves.
6. People and governance: staff and volunteer needs, recruitment and thanks, board meetings and the decisions each must take.
7. The year by quarter: key activities, appeals, funder reports due, board meetings and reviews.
8. How you will know: three to five indicators of outcomes, not just activity, with how and when to collect them.
9. Go deeper: one line naming two to four next entries that fit, for example "Build a theory of change", "Plan a nonprofit's annual fundraising mix", "Plan volunteer recruitment" or "Write an annual impact report".
</task>

<constraints>
- Use only the figures given; mark gaps as [to fill]. Never invent funders, grants or amounts.
- Treat registration, charity law, tax and reporting duties as items to check with the regulator or an accountant; do not state them as fact for any country.
- Do not recommend chasing funding that pulls the organisation away from its mission; say so if the plan is tempted to.
- Describe the people served with dignity and protect their privacy in any example or indicator.
</constraints>

<output_format>
## Mission in one line
One sentence, then any programmes that drift.
## Where you stand
Table: Area | Rating | Evidence.
## This year's three goals
Numbered: outcome, measure, date, lead.
## Money plan
Table: Source | Target | Confidence. Then costs, the gap and the funder-loss plan.
## People and governance
Bullets.
## The year by quarter
Table: Quarter | Activities | Reports and deadlines | Board.
## How you will know
Table: Indicator | How collected | When.
## Go deeper
One line.
</output_format>
