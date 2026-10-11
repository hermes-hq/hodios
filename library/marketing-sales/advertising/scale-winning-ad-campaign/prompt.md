---
schema: 1
id: scale-winning-ad-campaign
kind: prompt
title: Scale a winning ad campaign
description: Plans how to scale a profitable ad campaign through budget steps, broader targeting, new placements and creative supply, while watching marginal CPA and stopping before it turns unprofitable.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, marketer, consultant]
requires: [none]
inputs: [dataset, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [scaling, marginal-cpa, budget-increase, horizontal-scaling, diminishing-returns]
pairs_with:
  prompts: [calculate-break-even-roas, pace-ad-budget, plan-media-budget, diagnose-ad-fatigue]
  personas: [paid-media-specialist]
  workflows: [ad-account-turnaround-track]
args:
  - name: campaign_data
    description: The winning campaign's last 30 to 60 days by week (spend, results, CPA or ROAS, frequency, impression share if search), and current settings (bid strategy, targeting, budget).
    type: text
    required: true
  - name: economics
    description: Break-even CPA or ROAS, target, and how much more spend the business can afford per month.
    type: text
    required: true
  - name: platform
    description: Ad platform and campaign type.
    type: string
    required: true
  - name: constraints
    description: Stock, delivery or team capacity limits, cash flow, and creative production capacity. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Ready to scale, Scaling plan, Marginal CPA watch, Creative supply, Stop and rollback rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user has a campaign that makes money and wants more of it. Scaling fails in predictable ways: budgets jumped too far at once reset learning and spike costs; the average CPA looks fine while the extra spend buys sales at a much worse marginal cost; creative that worked for a small audience fatigues once spend triples; and operations cannot keep up (stock-outs, slow lead follow-up). What experts know: check headroom first (on search, lost impression share due to budget; on social, frequency and audience size); scale vertically in steps that the platform tolerates, waiting a few days between steps (platform guidance on what resets learning varies and must be checked); scale horizontally with broader targeting, new geographies, placements or a second platform; feed new creative continuously; and judge each step on marginal CPA, the extra cost divided by the extra results, against break-even.
</context>

<task>
Platform: {{platform}}
<campaign_data>
{{campaign_data}}
</campaign_data>
Economics: {{economics}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}

1. Ready to scale: check that results are stable for several weeks, tracking agrees with backend data, CPA is comfortably under break-even, and there is headroom (impression share lost to budget, audience size, frequency). Say if it is not ready and why.
2. Scaling plan: a step schedule with dates and budgets (vertical), plus horizontal moves in order of expected efficiency (broader audiences, lookalikes or new geographies, new placements or formats, duplicate into a new campaign only with a reason, a second platform). For bid-target campaigns, whether to loosen targets to unlock volume.
3. Marginal CPA watch: show how to calculate marginal CPA between steps with the user's numbers, the threshold that stops further increases (marginal CPA near break-even), and a worked example.
4. Creative supply: how many new ads per step and what kind, so frequency stays controlled.
5. Stop and rollback rules: per step, the results after the waiting period that mean continue, hold, or step back, and operational triggers (stock, capacity).
</task>

<constraints>
- Do not state platform-specific safe budget increase percentages as fact; give a conservative default as a practitioner rule of thumb and tell the user to check current platform guidance.
- Use the user's numbers; label assumptions; do not promise linear returns.
- Judge on marginal, not average, CPA or ROAS.
</constraints>

<output_format>
## Ready to scale
Verdict and checks table: Check | Status | Evidence.

## Scaling plan
A table: Step | Date | Change | New daily budget | Wait before next step.

## Marginal CPA watch
Formula, worked example, stop threshold.

## Creative supply
Bullets.

## Stop and rollback rules
Checklist per step.
</output_format>
