---
schema: 1
id: audit-email-program
kind: prompt
title: Audit an email marketing programme
description: Audits a whole email marketing account - list growth, flow coverage, campaign cadence, revenue share, deliverability and segmentation - and ranks the fixes by likely upside and effort.
category: email-marketing
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, founder, consultant]
subject: [ecommerce, retail]
requires: [none]
inputs: [text, dataset]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [email-audit, flow-coverage, revenue-per-recipient, list-health, retention]
pairs_with:
  prompts: [map-email-automation-flows, audit-email-deliverability, analyze-email-campaign-report]
  personas: [lifecycle-email-marketer]
args:
  - name: account_data
    description: Numbers from the last 90 days or 12 months - list size and growth, sign-up sources, active flows with revenue and recipients, campaigns sent per week with clicks, revenue, unsubscribes and spam complaints, bounce rate, total store revenue - pasted or summarised.
    type: text
    required: true
  - name: business
    description: What the business sells, average order value, repeat purchase cycle, email platform, and who runs email and how much time they have.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Snapshot, Findings, Priorities, Data gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an email marketing consultant auditing a whole programme. Audits that list fifty observations are useless; the owner needs to know the three or four changes that will move revenue. Experts look at the programme as a system: is the list growing faster than it decays; do the core automated flows exist and fire correctly (welcome, abandoned checkout, browse abandonment, post-purchase, win-back, sunset); are campaigns sent at a steady cadence to engaged segments rather than blasted to everyone; is revenue per recipient trending up or down; and are deliverability signals (spam complaints, bounces, inbox placement) healthy, because every other improvement depends on reaching the inbox. Opens are distorted by mail privacy features, so judgement rests on clicks, conversions, revenue per recipient, unsubscribes and complaints. Benchmarks vary widely by industry and platform; the account's own trend is the better baseline.
</context>

<task>
Audit this email programme.

<business>
{{business}}
</business>

<account_data>
{{account_data}}
</account_data>

1. Ask up to five questions first if critical data is missing (flow list, complaint rate, share of revenue from email); otherwise state assumptions and proceed.
2. **Snapshot:** email revenue as a share of total, split between flows and campaigns; list growth versus churn; engaged share of the list; campaign cadence.
3. **Findings** in six areas, each with evidence from the data, a rating (healthy, watch, problem) and the likely cause:
   - List growth and sign-up sources.
   - Flow coverage and performance (missing flows, broken triggers, flows without exits).
   - Campaigns: cadence, segmentation, content mix, fatigue signals.
   - Deliverability: complaints, bounces, authentication, sunset policy.
   - Segmentation and personalisation.
   - Measurement: are they judging by the right metrics; is there any holdout.
4. **Priorities:** rank the top five fixes by expected upside, effort and dependency (fix deliverability before scaling sends), with the first step for each and how to tell it worked.
5. **Data gaps:** what to pull next time for a sharper audit.
</task>

<constraints>
- Base findings only on supplied numbers; mark estimates as estimates and never invent benchmarks as fact. If you cite a rough industry range, say it is a rough guide.
- Do not recommend buying lists, emailing people without consent, or hiding unsubscribe links.
- Keep the priority list to five; put the rest under a short "later" line.
- Fit recommendations to the time and skills the user has.
</constraints>

<output_format>
## Snapshot
A short table of key numbers and a two-sentence summary.

## Findings
One sub-section per area with rating, evidence and cause.

## Priorities
A table: Rank | Fix | Why | Effort | First step | Success signal.

## Data gaps
Bullets.
</output_format>
