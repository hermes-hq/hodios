---
schema: 1
id: plan-agency-launch
kind: prompt
title: Plan an agency launch
description: Plans starting a service agency - niche, productised offer and pricing, first clients, a contractor bench, delivery process and the margins that make it more than a freelancer with overheads.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, consultant, designer, marketer]
advice_risk: [legal]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [service-agency, productised-service, contractor-bench, delivery-margin, niche-positioning]
pairs_with:
  prompts: [start-freelance-business, price-services, brief-freelance-subcontractor, write-statement-of-work, find-first-customers]
  personas: [small-business-advisor]
args:
  - name: agency
    description: The agency you want to start - the service (design, marketing, development, video, recruitment, etc.), who you would serve, your own skills and track record, and any existing clients or freelancers you work with.
    type: text
    required: true
  - name: resources
    description: Money available, months of personal runway, hours, partners, and the country you are based in. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Niche and positioning, Offer and pricing, Margin model, First clients, Contractor bench, Delivery process, Admin and contract checks, 90-day plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people start service agencies, usually skilled freelancers moving to a team model. The trap is becoming a freelancer with overheads: the founder still does most delivery, prices by the hour, wins work from any client type, and pays contractors so much that margin vanishes after rework and project management. Agencies that work pick a niche where they can be known and get referrals, sell a defined offer with a fixed or retainer price, track gross margin per project (revenue minus delivery labour) and keep it well above the share needed for sales, management and overheads, build a small bench of reliable contractors with clear briefs and quality checks, and keep the founder's time increasingly on selling and client relationships.

<agency>
{{agency}}
</agency>
{{#resources}}
<resources>
{{resources}}
</resources>
{{/resources}}
</context>

<task>
1. Niche and positioning: propose one or two niches (by client industry, problem or platform) based on the founder's track record, with the one-line positioning for each. Pick one and say why.
2. Offer and pricing: a core productised offer (what is delivered, timeline, price basis), an entry offer and a retainer option. Explain the pricing logic from value and delivery cost; mark prices as hypotheses unless the founder gave figures.
3. Margin model: for one typical project, show revenue, contractor or staff cost, the founder's delivery time valued at a stated rate, project management, tools, and gross margin. State the target margin and what to change if it falls short.
4. First clients: from existing relationships and the niche, a plan for the first five to ten clients with outreach steps and a referral ask.
5. Contractor bench: roles needed, how to find and test contractors (paid test project), how to brief them, quality checks, and backup for each key role.
6. Delivery process: stages from signed proposal to handover, with the checklists, client approvals and change request handling at each.
7. Admin and contract checks: client contracts and statements of work, contractor agreements with IP assignment and confidentiality, insurance, invoicing and payment terms, and contractor versus employee status. Present these as checks for the founder's country.
8. 90-day plan with weekly priorities and the numbers to track (pipeline, win rate, gross margin per project, founder delivery hours).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent client names, market rates or industry figures; use the founder's numbers and label any assumption.
- Recommend a lawyer for client and contractor contract templates, and an accountant on structure and tax; list them as checks, not conclusions.
- If the founder's niche has no track record behind it, say so and suggest how to build proof quickly.
</constraints>

<output_format>
## Niche and positioning
## Offer and pricing
Table: Offer | Includes | Timeline | Price basis.
## Margin model
The worked example, line by line.
## First clients
## Contractor bench
Table: Role | How to find | How to test | Backup.
## Delivery process
## Admin and contract checks
Checklist.
## 90-day plan
</output_format>
