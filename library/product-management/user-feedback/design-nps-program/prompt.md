---
schema: 1
id: design-nps-program
kind: prompt
title: Design an NPS or CSAT programme
description: Designs a customer satisfaction programme, choosing relationship or transactional surveys and NPS, CSAT or effort scores, with triggers, sampling, frequency caps, reporting and a closed loop.
category: user-feedback
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, manager, founder, operations-manager]
subject: [saas, ecommerce, hospitality]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [net-promoter-score, customer-satisfaction, customer-effort-score, closed-loop, survey-fatigue, cx-program]
pairs_with:
  prompts: [explain-nps-change, design-in-product-survey, write-csat-survey, close-feedback-loop]
args:
  - name: product_and_customers
    description: What you sell, to whom (consumers, businesses, how many accounts and contacts), how often customers interact with you, and any surveys you run today.
    type: text
    required: true
  - name: decisions_it_should_inform
    description: The decisions the scores should feed (for example "which onboarding steps to fix", "which accounts are at risk before renewal", "whether support quality is slipping").
    type: text
    required: true
  - name: channels
    description: Optional. How you can reach customers (email, in-app, SMS, receipt QR code, phone) and the tools you already have.
    type: text
output_contract:
  format: markdown
  sections: [Metric choice, Survey design, Triggers and sampling, Fatigue and fairness rules, Reporting, Closed loop, Pitfalls to avoid, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design a satisfaction measurement programme that drives decisions, not a score for a slide. Each metric answers a different question. Relationship NPS (would you recommend us) tracks overall loyalty and is asked on a schedule. Transactional CSAT (how satisfied were you with this) judges one interaction soon after it. Customer effort (how easy was it) predicts repeat contact and churn after service and self-service tasks. Picking one metric for everything blurs all three.

Programmes fail when every touchpoint sends a survey and customers stop answering, when staff are paid on the score and start asking for 10s, when only the score is reported and the comments are never read, and when segment scores are reported from 12 responses.
</context>

<task>
<product_and_customers>
{{product_and_customers}}
</product_and_customers>

<decisions>
{{decisions_it_should_inform}}
</decisions>

{{#channels}}
<channels>
{{channels}}
</channels>
{{/channels}}

1. Map each decision to the metric that serves it: relationship NPS, transactional CSAT, customer effort, or none (if behaviour data answers it better, say so). Recommend at most three survey types; fewer is better.
2. For each survey: the score question with its exact scale (NPS 0-10, CSAT 1-5, effort 1-7 "strongly disagree" to "strongly agree" that it was easy), one open follow-up asking for the main reason, and at most one optional diagnostic question. No other questions.
3. Triggers and sampling: relationship surveys every 6 or 12 months per person, staggered so a sample goes out each month; transactional surveys within 24 hours of the event, sampled not sent to everyone when volume is high. For business customers, survey several contacts per account (users, admin, buyer) and report by account and role.
4. Fatigue and fairness: one survey per person per 90 days across all programmes, no survey during an open complaint, exclude people who opted out, and track response rate by segment so silent groups are visible.
5. Reporting: the score with its sample size and margin of error, the distribution (not only the net figure), trend over at least four periods, segment cuts only where each segment has about 100 responses or more (show smaller ones as directional), and the top reasons from coded comments.
6. Closed loop: inner loop (a named role contacts low scorers within 2 working days, logs the cause, fixes what they can) and outer loop (a monthly review that turns recurring reasons into owned product or process work and tells customers what changed).
7. Pitfalls: list the ones that apply here and the rule that prevents each.
</task>

<constraints>
- Do not invent benchmarks or "industry average" scores; if they want comparisons, say to compare against their own trend.
- Advise against tying individual pay or bonuses to scores and against asking customers for a particular score.
- If the decisions are vague ("know if customers are happy"), propose two or three concrete decisions, ask which apply, and design for those marked as assumptions.
- Survey and consent rules differ by country; say to check marketing consent and privacy rules for survey emails locally.
</constraints>

<output_format>
## Metric choice
Table: decision | metric | survey type | why this one.

## Survey design
Per survey, the exact questions and scales.

## Triggers and sampling
Table: survey | trigger | timing | who is included | sampling rule | expected responses per month (or [X]).

## Fatigue and fairness rules
Numbered rules.

## Reporting
What appears on the monthly report, with minimum sample rules.

## Closed loop
Inner loop and outer loop: who, when, what is logged.

## Pitfalls to avoid
Bullets: pitfall and the rule that prevents it.

## Questions
What to confirm.
</output_format>
