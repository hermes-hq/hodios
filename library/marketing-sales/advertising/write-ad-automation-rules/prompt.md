---
schema: 1
id: write-ad-automation-rules
kind: prompt
title: Write ad automation rules
description: Writes automated rules or a Google Ads script to alert, pause or adjust bids and budgets on clear thresholds, with minimum-data guards, action limits, logging and a preview test.
category: advertising
version: 1.0.0
status: incubating
stage: [build, operate]
role: [marketer, consultant, founder]
requires: [none]
inputs: [text]
output: [table, code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
stack: [javascript]
tags: [automated-rules, google-ads-scripts, alerts, budget-guardrails, account-monitoring]
pairs_with:
  prompts: [pace-ad-budget, diagnose-cpa-spike, choose-bidding-strategy, triage-search-terms-report]
  personas: [paid-media-specialist]
  workflows: [ad-account-turnaround-track]
args:
  - name: platform
    description: Where the automation runs, for example "Google Ads automated rules", "Google Ads scripts", "Meta automated rules".
    type: string
    required: true
  - name: what_to_automate
    description: The jobs you want done, for example "email me if spend stops", "pause ads with high CPA", "alert when budget is 80% spent by the 20th".
    type: text
    required: true
  - name: targets
    description: Target CPA or ROAS, monthly budget, and anything that must never be touched (brand campaigns, certain hours).
    type: text
    required: true
  - name: account_context
    description: Number of campaigns, bid strategies in use, conversion lag, and time zone. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Rules, Implementation, Safeguards, Test plan, Review cadence]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants their ad account to watch itself: alerts when something breaks and simple actions when clear thresholds are crossed. Automation saves time and catches overnight disasters, but bad rules do real damage. What experts know: rules must require enough data before acting (spend of at least a multiple of target CPA, or a minimum number of clicks), or they pause winners after one unlucky day; lookback windows must allow for conversion lag; rules that change bids or budgets fight automated bidding and reset learning, so on smart-bidding campaigns, alerts and pauses are safer than bid edits; every action needs a cap (no more than X changes per run, never below or above a limit) and a log; alerts for silence (zero conversions or zero spend over a period) catch tracking and billing failures; and scripts should be run in preview first, act only on labelled entities, and never delete anything.
</context>

<task>
Platform: {{platform}}
What to automate:
<what_to_automate>
{{what_to_automate}}
</what_to_automate>
Targets and limits: {{targets}}
{{#account_context}}Account context: {{account_context}}{{/account_context}}

1. Turn each request into a rule: scope (which campaigns, ad groups or ads, ideally by label or naming pattern), condition with numeric thresholds derived from the targets, minimum-data guard, lookback window, action, frequency, and notification.
2. Add the rules the user did not ask for but should have: zero spend or zero conversions alert, budget pacing alert, disapproved ads alert, and a sudden CPA or CPC jump alert, marked as suggested.
3. Mark any rule that would edit bids or budgets on a smart-bidding campaign, explain the conflict, and offer an alert-only version.
4. Implementation: for automated rules, give the exact settings to enter in the platform's rule builder. For Google Ads scripts, write one script in JavaScript that reads thresholds from constants at the top, acts only on entities with a given label, logs every action, limits actions per run, sends one summary email, and does nothing destructive. Comment the code.
5. Safeguards: list the guards built in and any the user must add (excluded campaigns, maximum changes, time-of-day windows).
6. Test plan: preview or dry-run steps, what to check in the logs, and a first-week manual review.
7. Review cadence: when to revisit thresholds as targets change.
</task>

<constraints>
- Never write a rule or script that deletes campaigns, ads, keywords or assets. Pauses must be reversible and logged.
- Do not use script APIs or rule options you are not sure exist; where unsure, say so and tell the user to check the current scripts reference or rule builder.
- Every action rule needs a minimum-data guard and a cap on changes.
- Do not hard-code account IDs, emails or credentials in the example; use clearly marked placeholders.
</constraints>

<output_format>
## Rules
A table: Rule | Scope | Condition | Data guard | Lookback | Action | Frequency | Requested or suggested.

## Implementation
Rule builder settings per rule, or the script in a code block with a short explanation of each section.

## Safeguards
Bullets.

## Test plan
Numbered steps.

## Review cadence
Bullets.
</output_format>
