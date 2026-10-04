---
schema: 1
id: plan-franchise-unit-opening
kind: prompt
title: Plan a franchise unit opening
description: Plans a new franchisee's first unit from signing to opening day - franchisor milestones, the local tasks left to you, hiring, training, launch marketing and a week-by-week cash calendar.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [founder, operations-manager]
requires: [none]
inputs: [text, document]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [franchise, opening-plan, cash-calendar, critical-path, launch-marketing, staff-hiring]
pairs_with:
  prompts: [prepare-franchisee-validation-calls, plan-soft-opening-nights, plan-shop-opening, write-opening-closing-checklist]
  workflows: [franchise-purchase-track]
args:
  - name: franchise
    description: The brand and format (for example "drive-thru coffee kiosk", "kids' coding school, centre-based", "home care agency, office-based").
    type: string
    required: true
  - name: opening_date
    description: Target opening date, and the date you signed or will sign.
    type: string
    required: true
  - name: franchisor_plan
    description: What the franchisor provides and when - opening manual milestones, training dates, site approval, fit-out contractor, launch support, systems - plus your budget, financing, site status and team. Paste the relevant parts.
    type: text
output_contract:
  format: markdown
  sections: [Who does what, Critical path, Week-by-week plan, Hiring and training, Launch marketing, Cash calendar, Risks to the date, Questions for the franchisor]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a new franchisee plan the period from signing to opening their first unit. Franchisors provide a system and an opening manual, but franchisees are often surprised by how much is theirs: local permits and inspections, utility connections, hiring in their own labour market, local launch marketing, and above all cash - fees, deposits, fit-out stages, stock and wages all fall due before the first sale, and openings slip. The most common failure is a fixed opening date with no critical path, so one late item (a permit, a lease handover, equipment delivery) delays everything while wages and rent are already running.

Franchise: {{franchise}}
Opening target: {{opening_date}}
</context>

<task>
{{#franchisor_plan}}
<franchisor_plan>
{{franchisor_plan}}
</franchisor_plan>
{{/franchisor_plan}}

1. Who does what: split every opening workstream between franchisor, franchisee and third parties (landlord, contractor, bank, local authority) - site and lease, design approval, permits and inspections, fit-out, equipment and IT, suppliers and opening stock, systems and payments, insurance, hiring, training, launch marketing. Mark anything unclear as a question.
2. Critical path: the chain of dependent items with longest lead times (often lease or site access, permits, fit-out, utilities, equipment, staff training) and the latest date each must start to hit the opening; say whether the target date is realistic from the information given.
3. Week-by-week plan from now to opening and the first four weeks after, with owner for each task.
4. Hiring and training: roles and numbers per shift from the franchisor's model, when to advertise, interview and start (allowing notice periods), franchisor training dates, a paid practice period before opening, and who covers the owner's own training absence.
5. Launch marketing: what the franchisor runs and what is local (pre-opening sign-ups, community and neighbouring businesses, local press, opening offer within brand rules, reviews from week one), timed backwards from opening.
6. Cash calendar: week by week, every outflow (franchise fee balance, deposits, fit-out stage payments, equipment, stock, wages before opening, rent, marketing) against funding drawdowns, with a contingency of at least 10 to 20 percent and enough working capital for slower-than-planned early weeks. Show where cash is lowest.
7. Risks to the date: the five most likely slips, early warning signs, and a fallback for each.
8. Questions for the franchisor.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only figures and dates from the inputs; mark estimates and missing items as [X]. Never invent the franchisor's fees, timelines or rules.
- Permits, employment and licensing rules are local; list them as checks.
- If the target date looks unrealistic from the critical path, say so and give the earliest realistic date.
- Cash calendar arithmetic must add up; flag any week where cash would go negative.
- Recommend reviewing financing and the cash plan with an accountant.
</constraints>

<output_format>
## Who does what
Table: Workstream | Franchisor | Franchisee | Third party | Unclear.
## Critical path
Table: Item | Lead time | Depends on | Latest start. Then the realism verdict.
## Week-by-week plan
Table: Week | Tasks | Owner.
## Hiring and training
Table: Role | Number | Advertise | Start | Training.
## Launch marketing
Table: Weeks before opening | Action | Owner.
## Cash calendar
Table: Week | Outflows | Inflows | Closing cash. Lowest point stated.
## Risks to the date
Table: Risk | Warning sign | Fallback.
## Questions for the franchisor
Numbered list.
</output_format>
