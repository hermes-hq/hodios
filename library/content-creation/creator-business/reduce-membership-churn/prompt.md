---
schema: 1
id: reduce-membership-churn
kind: prompt
title: Reduce membership churn
description: Finds why paying members of a creator's Patreon, channel membership or paid community leave - failed payments, unclear value, stale perks, weak welcome - and plans fixes and a 60-day test.
category: creator-business
version: 1.0.0
status: incubating
stage: [review, plan]
role: [content-creator, writer]
inputs: [dataset, notes, text]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [memberships, churn, member-retention, member-welcome, member-survey]
pairs_with:
  prompts: [design-membership-tiers, review-creator-income-mix]
  personas: [creator-business-manager]
args:
  - name: membership
    description: The platform, tiers and prices, what members get and how often, how long it has run, and how much time it takes you each month.
    type: text
    required: true
  - name: numbers
    description: Members joining and leaving by month, cancellation reasons if the platform collects them, failed or declined payments, and how long members typically stay.
    type: text
    required: true
  - name: feedback
    description: Optional. Comments or messages from members or people who left.
    type: text
output_contract:
  format: markdown
  sections: [Where members are lost, Likely reasons, Fixes, Member survey, 60-day test, What not to do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Creator memberships lose members in predictable places. Many leave in the first month or two, which usually means onboarding failed: they joined for one perk or on impulse, did not find it, or felt nothing happened. Some leave because of failed card payments, not a decision, and the platform's retry and reminder settings matter. Long-time members leave when perks feel stale, when the creator promised more than they can deliver and quietly stops (a common route to burnout), or when their own budget changes, which the creator cannot fix. Retention improves with a clear welcome, an early win in the first week, a predictable rhythm of member-only content, recognition, and perks that cost the creator little time. Discount-to-stay offers and guilt messages tend to cheapen the membership. Monthly churn rate is members lost in a month divided by members at the start of that month.
</context>

<task>
<membership>
{{membership}}
</membership>

<numbers>
{{numbers}}
</numbers>

{{#feedback}}
<feedback>
{{feedback}}
</feedback>
{{/feedback}}

1. **Where members are lost:** monthly churn rate from the numbers (show the arithmetic), when in the member lifecycle they leave if the data shows it, and the share lost to failed payments versus active cancellations. Say what the data cannot show.
2. **Likely reasons:** ranked, each tied to evidence in the numbers or feedback, and marked as likely, not proven.
3. **Fixes:** for each reason, specific fixes: a welcome message and first-week plan, a predictable posting rhythm the creator can sustain, trimming perks that cost too much time, recognition ideas, payment-failure reminders (check the platform's settings), and clearer tier descriptions. Include the time each fix costs per month.
4. **Member survey:** five short questions for current members and three for people who left, neutral in wording, and how to send them.
5. **60-day test:** the one or two fixes to try first, what to measure, and what change would count as real given the member numbers.
6. **What not to do:** guilt-based messages, hard-to-find cancellation, or perks the creator cannot keep up.
</task>

<constraints>
- Use only the given numbers; never invent churn benchmarks for "typical" creators.
- Do not suggest making cancellation harder or other dark patterns.
- Keep fixes within the time the creator says they have; if the current perks are unsustainable, say so and suggest trimming with a clear note to members.
- Platform features change; mark settings as things to check.
</constraints>

<output_format>
## Where members are lost
Table: month | start | joined | left | churn rate.

## Likely reasons
## Fixes
Table: reason | fix | time per month.

## Member survey
## 60-day test
## What not to do
</output_format>
