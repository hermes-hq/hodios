---
schema: 1
id: plan-customer-onboarding
kind: prompt
title: Plan B2B customer onboarding
description: Plans B2B customer onboarding from kickoff to first value - milestones, owners, training, success criteria and risk signals, with kickoff and check-in agendas. For customer success teams.
category: customer-support
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [support-agent, manager, founder, sales-rep]
subject: [saas]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [customer-onboarding, time-to-value, success-plan, go-live, kickoff]
pairs_with:
  prompts: [prepare-business-review, write-help-center-article, design-escalation-process]
  personas: [customer-success-manager]
args:
  - name: product
    description: What the product does, how it is set up (integrations, data import, configuration, user roles), and what customers typically struggle with at the start.
    type: text
    required: true
  - name: customer
    description: The specific customer if planning one account - size, goals they bought for, stakeholders, technical resources, contract value and deadlines. Leave empty for a standard onboarding template.
    type: text
  - name: time_to_value_target
    description: How fast the customer should reach first value (for example "first report live in 14 days", "30 days").
    type: string
output_contract:
  format: markdown
  sections: [Success criteria, Onboarding plan, Kickoff agenda, Training plan, Risk signals, Handoff to ongoing success, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design onboarding for B2B products. Customers decide in the first weeks whether a purchase was a good idea, and accounts that do not reach first value quickly are the ones that churn at renewal. Good onboarding is a joint project with the customer: success is defined in their terms at kickoff, milestones have owners on both sides, the shortest path to a first visible win comes before full rollout, and stalls are spotted and acted on within days, not at the quarterly review.
</context>

<task>
Plan onboarding.

<product>
{{product}}
</product>
{{#customer}}
<customer>
{{customer}}
</customer>
{{/customer}}
{{#time_to_value_target}}
Time-to-value target: {{time_to_value_target}}
{{/time_to_value_target}}

1. Success criteria: define first value (the earliest moment the customer gets a real result they care about) and full adoption for this product, stated as observable events with numbers (for example "first payroll run processed", "40 of 50 licensed users active weekly"). If a specific customer is given, tie the criteria to the goals they bought for; otherwise give a template with examples.
2. Onboarding plan: phases from handoff from sales through kickoff, technical setup, configuration, first value, rollout and the handoff to ongoing success. For each milestone: what happens, the vendor owner, the customer owner, the target day, and the exit criterion. Put the shortest path to first value first and defer non-essential configuration.
3. Kickoff agenda: a 45-60 minute agenda covering goals and success criteria, stakeholders and roles, the plan and dates, technical requirements, risks, and communication rhythm; plus the questions to ask and what to send beforehand.
4. Training plan: by role (administrators, everyday users, managers), the format (live session, recorded video, help articles, office hours), timing just before each person needs the skill, and how to check it worked.
5. Risk signals: early warning signs (missed customer tasks, no technical owner, low logins after setup, the champion going quiet, scope creep, data import delays) with the threshold that triggers action and the play for each.
6. Handoff to ongoing success: what must be true to close onboarding, and the summary document for the account owner.
7. If the time-to-value target is not realistic given the setup steps, say so and propose a realistic one or a smaller first-value milestone.
</task>

<constraints>
- Do not invent product features, customer facts or deadlines. Where the input is silent, use clearly marked placeholders and list them under Open questions.
- Every milestone has a named owner role on both sides; customer-side tasks are explicit, because they are the most common cause of delay.
- Keep the plan proportionate: a self-serve small customer needs a lighter plan than an enterprise rollout; scale it to the customer described.
</constraints>

<output_format>
## Success criteria
Table: Stage | Observable event | Target | How measured.
## Onboarding plan
Table: Phase | Milestone | Vendor owner | Customer owner | Target day | Exit criterion.
## Kickoff agenda
Timed agenda, pre-work and questions.
## Training plan
Table: Role | What they learn | Format | When | Check.
## Risk signals
Table: Signal | Threshold | Play | Owner.
## Handoff to ongoing success
## Open questions
</output_format>
