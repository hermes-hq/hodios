---
schema: 1
id: design-franchisee-help-desk
kind: prompt
title: Design a franchisee help desk
description: Designs the support desk a franchisor runs for its franchisees - ticket categories, priorities and response times, routing, a knowledge base outline and when a field visit is triggered.
category: customer-support
version: 1.0.0
status: incubating
stage: [design, plan]
role: [founder, operations-manager, executive]
subject: [retail, hospitality]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [franchise, franchisee-support, ticket-priorities, knowledge-base, field-support]
pairs_with:
  prompts: [design-escalation-process, design-help-center-structure, plan-support-staffing]
args:
  - name: franchise
    description: The franchise - sector, what a unit looks like, systems franchisees use (till, ordering, booking), who supplies them, current support (a phone number, the founder's mobile, field managers) and what goes wrong with it.
    type: text
    required: true
  - name: unit_count
    description: Number of open units now (add the expected number in 12 months in the franchise description if growing).
    type: number
    required: true
  - name: common_issues
    description: Optional. The questions and problems franchisees raise most, with rough counts if you have them.
    type: text
output_contract:
  format: markdown
  sections: [Scope and channels, Ticket categories, Priorities and response times, Routing and tiers, Knowledge base outline, Field visit triggers, Measures, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design the internal support desk a franchisor runs for franchisees. Franchisees are paying customers of the franchisor as well as partners, and support quality is one of the main things they judge their fees by. Desks that grew from "call the founder" usually suffer from four problems: everything is urgent, answers depend on who picks up, the same how-to questions are answered by phone hundreds of times, and support blurs into compliance policing so franchisees stop asking for help. A good desk separates "my unit cannot trade" from "how do I", gives every ticket an owner and a clock, turns repeated answers into a knowledge base, and keeps brand-standard enforcement with field managers, not the help desk.

Units: {{unit_count}}
</context>

<task>
<franchise>
{{franchise}}
</franchise>

{{#common_issues}}
<common_issues>
{{common_issues}}
</common_issues>
{{/common_issues}}

Size the design to the network first. Under about 15 units, design a light setup (a shared inbox or form, one named owner part-time, a simple log and a short how-to library) rather than a staffed desk, and say at what size to add more. Larger or fast-growing networks get the full design below.

1. Scope and channels: what the desk handles and what it does not (legal disputes, fee negotiations and territory questions go to named roles). Channels: a portal or form for most issues, a phone line kept for trading-critical problems, opening hours matched to unit trading hours, and an out-of-hours route for critical issues only.
2. Ticket categories (6-10) fitting this sector, such as systems and till, ordering and supply, equipment and maintenance, marketing and local promotions, people and training, operations and standards, finance and royalties reporting, health, safety and food safety, customer complaints escalated from units. Each with examples and the owning team.
3. Priorities with response and resolution targets as a starting point to adjust:
   - P1 cannot trade or safety risk (till down, no stock delivery, food safety incident, injury): answer within 15-30 minutes during trading hours, workaround within 2 hours.
   - P2 trading but impaired (card machine on one till, a key item missing): within 4 working hours.
   - P3 how-to and questions: next working day.
   - P4 requests and ideas: acknowledged within 2 working days, decision date given.
4. Routing and tiers: self-service, then the desk (first line, resolves how-to and logs everything), then specialists (IT, supply, marketing, operations), then vendors with their own contracts. Define the handover note and the rule that the desk keeps ownership until the franchisee confirms it is fixed.
5. Workload estimate: show tickets per month as units x tickets per unit per month, and the first-line hours it implies at a handle time. Use the user's counts if given; otherwise ask for a rough count of calls and messages last month, or pick a figure, label it as a guess, and show the result at half and double that figure so the user sees the range. Recalculate with real data after 8 weeks.
6. Knowledge base outline: sections and the first 15-20 articles, ranked by the common issues given or by the categories above; include the opening and closing procedures, the till's top five errors and how to order out-of-cycle stock.
7. Field visit triggers: repeat P1s or the same issue 3 times in 30 days, a failed audit item, a sharp sales drop, a new franchisee in their first 90 days, or a franchisee asking for one. Say what the visit is for (help, not inspection, unless an audit is due).
8. Measures: first response time by priority, time to resolve, repeat-contact rate, franchisee satisfaction after each ticket and quarterly, and the top 5 drivers reviewed monthly with the operations team.
</task>

<constraints>
- Use only the facts given. Do not invent the franchise's systems, suppliers or contract terms; mark gaps as [X] and list them as questions.
- Every number that is not from the user is labelled as an assumption or a starting target.
- Keep the help desk separate from compliance enforcement in its wording and process.
- Do not give legal guidance on franchise agreements; route those questions to the franchisor's legal contact.
</constraints>

<output_format>
## Scope and channels
Bullets.

## Ticket categories
Table: category | examples | owner team.

## Priorities and response times
Table: priority | definition | examples | first response | resolution or workaround.

## Routing and tiers
Numbered tiers with the handover rule, then the workload estimate with its formula.

## Knowledge base outline
Sections with article titles.

## Field visit triggers
Bullets.

## Measures
Table: measure | target | how measured | reviewed by.

## Assumptions and questions
Bullets.
</output_format>
