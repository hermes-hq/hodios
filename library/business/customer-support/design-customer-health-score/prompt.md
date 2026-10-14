---
schema: 1
id: design-customer-health-score
kind: prompt
title: Design a customer health score
description: Designs a B2B customer health score from usage, support, billing and relationship signals, with weights, bands, the action for each band, and a check against past churn.
category: customer-support
version: 1.0.0
status: incubating
stage: [design]
role: [support-agent, manager, operations-manager, executive]
subject: [saas]
requires: [none]
inputs: [dataset, text]
output: [table, plan, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [account-health, health-score, churn-risk, account-management, renewals]
pairs_with:
  prompts: [write-customer-health-report, plan-at-risk-account-save, prepare-business-review, find-churn-drivers]
  personas: [customer-success-manager]
args:
  - name: signals_available
    description: "The data you can actually get per account and how often: logins or active users, use of key features, seats bought versus used, support tickets and escalations, satisfaction or NPS, invoices overdue, contract and renewal dates, champion or sponsor changes, meetings held."
    type: text
    required: true
  - name: customer_base
    description: "Number of accounts, segments (size, plan), contract length, and who will use the score (CSMs, account managers, leadership). Optional."
    type: text
  - name: churn_history
    description: "Past accounts that churned or downgraded and those that renewed or expanded, with what their signals looked like beforehand, if you have it. Optional but needed to check the score works."
    type: text
output_contract:
  format: markdown
  sections: [Design choices, Signals and weights, Scoring and bands, Actions per band, Checking it works, Rollout and upkeep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design customer health scores for customer success teams. Most health scores fail because they are built from what is easy to measure (logins) rather than what predicts renewal (use of the features that deliver the value the customer bought, breadth of users, a sponsor who stays), because weights are guessed and never checked against real churn, and because a red score triggers nothing. A useful score has few inputs, each normalised to the account's size and plan, weights that are checked against past renewals and churn, a manual override with a reason (the CSM knows the sponsor just left), and a defined action and owner for each band. Trend matters as much as level: a green account sliding fast is riskier than a stable amber one. Support signals cut both ways: many tickets can mean heavy engagement, while silence can mean abandonment.
</context>

<task>
Design the health score.

<signals_available>
{{signals_available}}
</signals_available>
{{#customer_base}}
<customer_base>
{{customer_base}}
</customer_base>
{{/customer_base}}
{{#churn_history}}
<churn_history>
{{churn_history}}
</churn_history>
{{/churn_history}}

1. State the design choices: what the score predicts (renewal risk, expansion potential, or both as separate scores), who uses it, how often it updates, and why each signal was chosen or left out.
2. Pick four to seven signals across usage, outcomes or value, support, billing and relationship. For each, define how it is measured, how it is normalised (per seat, per plan, against the account's own baseline), and its weight, with the reason.
3. Define scoring: each signal mapped to 0-100 with thresholds, the weighted total, a trend modifier (for example a drop of a set amount in 30 days moves the band down), the manual override rule with a required reason, and the bands (green, amber, red) with cut-offs.
4. Set actions per band: what happens, who owns it, and how fast (for example red: CSM reviews within five working days and opens a save plan; amber: check-in and adoption help; green: expansion conversation near renewal).
5. Check that it works: if churn history is given, score past accounts and show whether churned ones would have been red or amber in time; if not, explain how to back-test and what to collect. State the expected false alarms.
6. Plan rollout and upkeep: a pilot with CSM feedback, a quarterly weight review against actual renewals, and how to avoid gaming (for example CSMs overriding everything to green).
</task>

<constraints>
- Use only signals the user says they can get; mark anything else as a future addition.
- Do not present guessed weights as validated. Label them starting weights until checked against real outcomes.
- Do not claim a predictive accuracy you have not calculated from the data given.
- Keep the score explainable: a CSM must be able to say why an account is red in one sentence.
</constraints>

<output_format>
## Design choices
## Signals and weights
Table: Signal | Measure | Normalised by | Weight | Why.
## Scoring and bands
## Actions per band
Table: Band | Trigger | Action | Owner | Within.
## Checking it works
## Rollout and upkeep
</output_format>
