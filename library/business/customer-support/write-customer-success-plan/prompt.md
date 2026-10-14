---
schema: 1
id: write-customer-success-plan
kind: prompt
title: Write a customer success plan
description: Writes a success plan with a B2B customer - their business goals, measurable outcomes, milestones, owners on both sides, risks and review dates - as a shared document to agree.
category: customer-support
version: 1.0.0
status: incubating
stage: [plan]
role: [support-agent, manager, sales-rep, consultant]
requires: [none]
inputs: [notes, text]
output: [plan, table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [success-plan, account-management, outcomes, adoption, renewals]
pairs_with:
  prompts: [plan-customer-onboarding, prepare-business-review, plan-at-risk-account-save]
  personas: [customer-success-manager]
args:
  - name: customer_context
    description: "Who the customer is, what they bought and why (from sales notes or the kickoff), the people involved, where they are now (onboarded, live, renewing), and any goals they have stated, ideally in their words."
    type: text
    required: true
  - name: product_capabilities
    description: "What your product and services can do for these goals, and what they cannot. Optional but stops the plan promising things you do not offer."
    type: text
  - name: period
    description: "The period the plan covers."
    type: enum
    enum: [quarter, six-months, contract-year]
    default: contract-year
output_contract:
  format: markdown
  sections: [Customer goals, Outcomes and measures, Milestones, Owners, Risks, Review rhythm, Questions to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write success plans for customer success managers. A success plan is a shared agreement, not an internal account plan: it is written in the customer's language, about their business goals, and both sides sign up to actions. Plans fail when goals are product activities ("use dashboards") instead of business outcomes ("cut month-end close from 8 days to 5"), when there is no baseline so success cannot be shown at renewal, when every action sits with the vendor, and when it is written once and never reviewed. Two or three goals with a measure, a baseline, a target and a date beat a long list. The customer's commitments (data access, a project owner, time from their team) are usually what decides whether outcomes happen.
</context>

<task>
Write the success plan.

<customer_context>
{{customer_context}}
</customer_context>
{{#product_capabilities}}
<product_capabilities>
{{product_capabilities}}
</product_capabilities>
{{/product_capabilities}}

Period: {{period}}

1. Turn what the customer said into two or three business goals in their words. If what they said is a product activity, restate the business goal behind it and mark it for confirmation.
2. For each goal, define the outcome measure, the baseline (or how to capture it in the first weeks if unknown), a target and a date. Mark guesses as [TO AGREE].
3. Set milestones across the period that lead to each outcome, including adoption steps that matter (users trained, workflow live, integration connected).
4. Assign owners on both sides for each milestone, including the customer's commitments.
5. List risks to the plan (sponsor change, data access, competing priorities, product gaps) with how each will be spotted and handled.
6. Set the review rhythm: monthly or quarterly check-ins, what is reviewed, and the business review before renewal where results are shown against the baselines.
7. List the questions to confirm with the customer before the plan is final.
</task>

<constraints>
- Do not invent the customer's numbers or targets; mark them [TO AGREE] until confirmed.
- Only include product or service actions listed as available; mark anything else [CHECK we can deliver].
- Write the plan so it can be shared with the customer: no internal notes on account value or upsell targets in the main sections.
- Keep it to one or two pages.
</constraints>

<output_format>
## Customer goals
## Outcomes and measures
Table: Goal | Measure | Baseline | Target | By when.
## Milestones
## Owners
Table: Milestone | Customer owner | Our owner | Date.
## Risks
## Review rhythm
## Questions to confirm
</output_format>
