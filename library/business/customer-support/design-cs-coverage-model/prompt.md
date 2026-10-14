---
schema: 1
id: design-cs-coverage-model
kind: prompt
title: Design a customer success coverage model
description: Designs which customers get high-touch, pooled or digital customer success coverage, with segment rules, account ratios, touchpoints per tier and how accounts move between tiers.
category: customer-support
version: 1.0.0
status: incubating
stage: [design, plan]
role: [manager, operations-manager, executive, founder]
subject: [saas]
requires: [none]
inputs: [dataset, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [coverage-model, segmentation, account-management, tech-touch, capacity-planning]
pairs_with:
  prompts: [design-customer-health-score, write-customer-success-plan, plan-customer-onboarding]
  personas: [customer-success-manager]
args:
  - name: customer_base
    description: "Accounts by size band: count, revenue per account, product complexity, growth or expansion potential, renewal timing, and churn by segment if known."
    type: text
    required: true
  - name: team
    description: "Current customer success team size and roles, what they spend time on, tools for automated emails or in-app messages, and budget limits. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Segmentation, Coverage tiers, Ratios and capacity, Touchpoints by tier, Moving between tiers, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design coverage models for customer success teams. Without one, CSMs spread themselves thinly across every account, the loudest customers get the most time, and large accounts get the same attention as tiny ones. Typical models use three tiers: named high-touch CSMs for the accounts where revenue, complexity or expansion justify it; a pooled team that shares mid-sized accounts and works from triggers; and a digital tier served by onboarding emails, in-product guidance, webinars and help content, with a human on triggers. Revenue alone is a poor segment rule: complexity, strategic value and growth potential matter. Ratios should come from the hours each touchpoint takes, not from a benchmark quoted without context. Accounts must be able to move tiers on clear rules, and the digital tier needs a real path to a person when health drops.
</context>

<task>
Design the coverage model.

<customer_base>
{{customer_base}}
</customer_base>
{{#team}}
<team>
{{team}}
</team>
{{/team}}

1. Segment the customers: the rule for each tier using revenue plus one or two other factors (complexity, expansion potential, strategic value), with the count and revenue share in each tier.
2. Define the coverage tiers: what each gets (named CSM, pooled team, digital), which outcomes each tier is accountable for, and what is not offered.
3. Calculate ratios and capacity: hours per account per year from the touchpoints below, available CSM hours (after admin and meetings), accounts per CSM per tier, and the team needed versus the team you have. Show the calculation.
4. Define touchpoints by tier: onboarding, check-ins, business reviews, renewal preparation, risk triggers, and what is automated versus personal.
5. Set rules for moving between tiers: growth past a threshold, health dropping to red in the digital tier, a strategic event, and a review cycle so tiers stay current. Say how the handover works.
6. Plan the rollout: how to tell customers whose coverage changes (especially those losing a named CSM), a pilot, and what to measure (retention and expansion by tier, CSM workload).
</task>

<constraints>
- Use the numbers given; do not quote industry ratio benchmarks as facts. Derive ratios from stated hours and say what assumptions drive them.
- Mark assumptions clearly so the user can change them.
- The digital tier must include a way to reach a person.
- Do not recommend specific software products.
</constraints>

<output_format>
## Segmentation
Table: Tier | Rule | Accounts | Revenue share.
## Coverage tiers
## Ratios and capacity
Calculation, then Table: Tier | Hours per account per year | Accounts per CSM | CSMs needed.
## Touchpoints by tier
## Moving between tiers
## Rollout
</output_format>
