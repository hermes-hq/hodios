---
schema: 1
id: plan-runway-based-roadmap
kind: prompt
title: Plan a roadmap against runway
description: Plans an early-stage startup roadmap backwards from cash runway and the milestones the next raise or break-even needs, with the few bets that move them, a cut list and checkpoints.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, product-manager]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [runway, burn-rate, fundraising-milestones, cut-list, decision-checkpoints]
pairs_with:
  prompts: [build-outcome-roadmap, define-mvp-scope, set-kill-criteria, brief-board-on-roadmap]
args:
  - name: runway_and_burn
    description: Cash in the bank, monthly net burn (costs minus revenue) and how it is changing, plus any committed hires or contracts that will change it.
    type: text
    required: true
  - name: next_milestone
    description: What comes next - a seed or Series A raise, break-even, a grant, or a pilot converting - and what you believe investors or customers need to see. Say where that belief comes from.
    type: text
    required: true
  - name: current_plan
    description: What the team plans to build or do over the coming months, team size, and current traction (users, revenue, retention, pilots).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Runway arithmetic, The real deadline, Evidence the milestone needs, Bets, Cut list, Checkpoints, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help early-stage founders plan product work against the only deadline that cannot slip: the month the money runs out. The common mistakes are treating the runway end as the deadline when a raise takes months to close, building what feels like a complete product instead of the evidence the next milestone needs, and having no point at which the plan is checked and changed. A good runway roadmap starts the raise with enough months left to survive a slow process, spends most of the team's time on the two or three things that move the milestone, and sets checkpoints with pre-agreed actions.
</context>

<task>
Runway and burn:

<runway_and_burn>
{{runway_and_burn}}
</runway_and_burn>

Next milestone:

<next_milestone>
{{next_milestone}}
</next_milestone>

Current plan and traction:

<current_plan>
{{current_plan}}
</current_plan>

1. Compute runway: cash divided by net monthly burn, then again with committed changes (hires, price rises, contracts). Show the month cash reaches zero.
2. Set the real deadline. For a raise, work back from zero cash: the raise typically takes three to six months to close, and starting with fewer than six months left weakens the negotiation, so the evidence must exist by roughly the month runway falls to nine months. Show the arithmetic and label these as rules of thumb. For break-even, compute the revenue needed and the gap.
3. Translate the milestone into evidence: the three to five measurable things that must be true (retention, revenue, paying pilots, usage), each with today's value and the target. Mark which targets come from the user and which are assumptions to test by asking investors, customers or advisers.
4. Map the current plan to that evidence. Keep as bets only the items that move a milestone measure; each bet states the measure it moves, size, and the earliest signal it is working.
5. Build the cut list: everything that does not move the milestone before the deadline, with why it can wait and what would bring it back.
6. Set two or three checkpoints before the deadline. At each: the metric to check, the threshold, and the pre-agreed action if it is missed (cut burn, change the bet, start the raise earlier, change the milestone).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the user's figures. If cash or burn is missing, ask for them and stop; never estimate a company's finances.
- Show every calculation so it can be rechecked.
- Do not recommend specific investors, funding instruments, valuations or legal structures. For fundraising terms, tax or accounting treatment, say to speak to an accountant, lawyer or experienced founder adviser.
- Do not state what "investors require" as fact; present it as an assumption the founder should test with the investors they are targeting.
- Be candid when the plan cannot reach the milestone in time, and show the options.
</constraints>

<output_format>
## Runway arithmetic
Short table: cash | net burn now | burn after committed changes | months of runway | zero-cash month.

## The real deadline
The date by which evidence must exist, with the working.

## Evidence the milestone needs
Table: measure | today | target | source of target (user or assumption to test).

## Bets
Table: bet | measure it moves | size | earliest signal | confidence.

## Cut list
Bullets with reason and return trigger.

## Checkpoints
Table: date | metric | threshold | action if missed.

## Assumptions and questions
Bullets.
</output_format>
