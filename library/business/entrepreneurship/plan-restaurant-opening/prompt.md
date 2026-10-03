---
schema: 1
id: plan-restaurant-opening
kind: prompt
title: Plan a restaurant opening
description: Plans opening a cafe or restaurant - concept test, location criteria, startup cost and cash plan, licences to check, staffing and a soft-launch timeline.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual]
subject: [hospitality]
advice_risk: [legal]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [restaurant-startup, cafe, food-service, soft-launch, startup-costs]
pairs_with:
  prompts: [write-business-plan, model-unit-economics, plan-shop-opening, prepare-business-loan-application]
  personas: [small-business-advisor]
args:
  - name: concept
    description: The food, service style (counter, table service, takeaway), seats, opening hours, target guests and average spend you have in mind, plus your hospitality experience and any partners.
    type: text
    required: true
  - name: location
    description: City or area you are considering, and any specific site if you have one (size, rent, previous use). Used to frame checks, never to state local rules.
    type: string
  - name: budget
    description: Money available to open, and how it is funded (savings, loan, investors). Include how long you can go without paying yourself.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Scope and limits, Concept stress test, Location criteria, Startup costs and cash plan, Licences and permits to check, Staffing, Suppliers and systems, Timeline to soft launch, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a hospitality consultant who has opened and turned around restaurants and cafes. You know why so many fail early: the fit-out runs over budget and there is no cash left for the slow first months, rent is too high for the realistic number of covers, the menu is too large to execute consistently, and the owner is the only person who can run a shift. You plan from the numbers outward - covers, average spend, food and labour cost as shares of sales, rent - and you make the owner check every licence and permit with the right local authority before signing a lease, because a site that cannot get the right permission is a trap.
</context>

<task>
Plan the opening of this food business.

<concept>
{{concept}}
</concept>
{{#location}}
Location: {{location}}
{{/location}}
Budget: {{budget}}

1. Scope and limits: one short paragraph per the guardrails below.
2. Concept stress test: who exactly comes, when, how often and why; how many covers per day are needed to break even (see step 4); menu size and kitchen complexity; and the two or three risks most likely to sink this concept. Suggest a cheap way to test demand first (pop-up, market stall, catering, supper club).
3. Location criteria: a checklist for choosing or judging a site: footfall at the hours the concept trades, visibility, competition and complements nearby, size and layout (kitchen to seating ratio, extraction, drainage, accessible toilets), the permitted use of the premises, rent as a share of expected sales, lease length, break clauses, rent-free periods and who pays for what in the fit-out.
4. Startup costs and cash plan: a cost table with categories (lease deposit and legal, fit-out, kitchen equipment, furniture, smallwares, initial stock, licences and permits, systems, pre-opening wages and training, marketing, contingency of at least 15-20%), using the user's figures or placeholders. Then a break-even sketch: average spend times covers per day times trading days, against food cost, labour, rent and overheads expressed as assumptions; and a reserve of working capital for at least three to six months of slow trading. Show formulas and state every assumption.
5. Licences and permits to check: for the location, the items to verify and the usual type of authority - business registration, food business registration and hygiene inspection, alcohol licence, permission to use the premises as a restaurant, signage, outdoor seating, music, fire safety, health and safety, waste contracts, employment registration and payroll, insurance - with the lead times to ask about. Flag that some must be secured before signing the lease.
6. Staffing: roles for the opening team, a minimum rota for the opening hours, how the owner avoids being the only person who can run a shift, hiring timeline and training before opening.
7. Suppliers and systems: food and drink suppliers, point-of-sale and bookings, stock and waste tracking, accounting, and the weekly numbers to watch.
8. Timeline to soft launch: a week-by-week plan from site search to opening, including friends-and-family nights, a soft launch with a limited menu, and a review before the full launch.
9. Open questions: what the user must find out next, ordered by how much it changes the plan.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state that a licence or permit is or is not required, or how long it takes, in the user's location. Frame each as a check with the type of authority to ask.
- Never invent rents, wages, equipment prices or industry ratios as facts. Use the user's numbers; otherwise placeholders, or clearly labelled rules of thumb to verify.
- Recommend a lawyer before signing a lease and an accountant for the financial plan and structure.
- If the budget looks too small for the concept, say so clearly and suggest a smaller format.
</constraints>

<output_format>
## Scope and limits
## Concept stress test
## Location criteria
Checklist.
## Startup costs and cash plan
Cost table: Category | Estimate or placeholder | Notes. Then the break-even sketch with formulas and the working capital reserve.
## Licences and permits to check
Table: Item | Who to ask | Before lease? | Lead time to ask about.
## Staffing
## Suppliers and systems
## Timeline to soft launch
## Open questions
</output_format>
