---
schema: 1
id: write-customer-health-report
kind: prompt
title: Write a customer health report
description: Writes a portfolio customer health report that scores accounts on usage, support, relationship and billing signals, shows revenue at risk, and lists at-risk accounts with reasons and actions.
category: reporting
version: 1.0.0
status: incubating
stage: [operate, review]
role: [manager, support-agent, executive, sales-rep]
subject: [saas]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [account-health, health-score, churn-risk, renewals, net-revenue-retention]
pairs_with:
  prompts: [prepare-business-review, find-churn-drivers, build-composite-index, set-scorecard-status-thresholds]
args:
  - name: account_data
    description: "Per account: revenue (ARR or contract value), renewal date, licensed versus active seats, usage trend of key features, support tickets and escalations, satisfaction or NPS responses, overdue invoices, champion or sponsor changes, and existing health scores if any."
    type: text
    required: true
  - name: scoring_method
    description: "Your current health score inputs, weights and thresholds if you have them; if not, say so and the report will propose a transparent starter method. Also the audience. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Portfolio health, At-risk accounts, Expansion signals, Score method and caveats, Actions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A customer health report tells a customer success team and leadership which revenue is at risk and what to do about it before renewal, when it is usually too late. Customer success leaders know which signals predict churn. Usage relative to what was bought (active seats against licensed seats, use of the features the customer bought the product for) and its trend matter more than raw logins. A drop in usage, the departure of the champion or executive sponsor, repeated escalations, low satisfaction responses, overdue invoices or a request to downgrade are strong signals, especially when they come together and the renewal is near. A single composite score hides why an account is at risk, so every red account needs its reason codes. Scores should be checked against what actually happened: if accounts that churned last year were green, the weights are wrong. Revenue at risk is the sum of contract value for at-risk accounts, reported with renewal timing so effort goes where value and urgency meet. Healthy accounts with high usage close to their seat limit are expansion candidates, and the report should show them too.

{{#scoring_method}}Scoring method and audience: {{scoring_method}}{{/scoring_method}}
</context>

<task>
<account_data>
{{account_data}}
</account_data>

1. State the scoring method: use the one supplied, or propose a simple transparent one (for example usage, support, relationship and billing signals each rated green, amber or red) and say it is a starter method to validate.
2. Score each account and give reason codes for every amber or red rating.
3. Summarise the portfolio: accounts and revenue by health band, revenue renewing in the next 90 and 180 days by band, and movement since the last report if supplied.
4. List at-risk accounts sorted by revenue and renewal date, with reasons, a specific action, an owner role and a date.
5. List expansion signals: healthy accounts near seat limits or growing usage.
6. Note how well the score has predicted past churn if outcomes are supplied, and its main blind spots.
</task>

<constraints>
- Every amber or red rating needs reason codes drawn from the data; no unexplained scores.
- Do not invent usage, satisfaction or renewal data; mark missing signals as unknown, not as healthy.
- Do not present the score as a prediction of churn probability unless it has been validated against outcomes.
- Keep notes about named customer contacts factual and professional; no speculation about individuals.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: revenue by health band, revenue at risk renewing soon, the most common risk reason, the top action.

## Portfolio health
Table: Band | Accounts | Revenue | Renewing in 90 days | Renewing in 180 days | Change since last report.

## At-risk accounts
Table: Account | Revenue | Renewal date | Band | Reason codes | Action | Owner | By when.

## Expansion signals
Table: Account | Signal | Suggested next step.

## Score method and caveats
Method used, weights, validation against past outcomes, blind spots.

## Actions
Numbered portfolio-level actions.
</output_format>
