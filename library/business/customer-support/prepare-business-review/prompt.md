---
schema: 1
id: prepare-business-review
kind: prompt
title: Prepare a customer business review
description: Prepares a customer quarterly business review - outcomes against their goals, usage insights, issues and fixes, relevant roadmap and agreed next steps. For account managers and CSMs.
category: customer-support
version: 1.0.0
status: incubating
stage: [review]
role: [support-agent, sales-rep, manager]
subject: [saas]
inputs: [dataset, notes, text]
output: [outline, report, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [qbr, executive-business-review, account-health, renewals, value-realisation]
pairs_with:
  prompts: [plan-customer-onboarding, analyze-support-tickets]
  personas: [customer-success-manager]
args:
  - name: customer
    description: The account - what they bought and why, contract value and renewal date, stakeholders who will attend, recent history, and anything sensitive (incidents, price rises, a new decision-maker).
    type: text
    required: true
  - name: usage_data
    description: Usage and outcome numbers for the period and the previous one - active users versus licences, feature use, volumes, results achieved, support tickets and satisfaction scores. A pasted export works.
    type: text
    required: true
  - name: goals
    description: The customer's stated goals or success criteria for this period. Leave empty if they were never agreed; the review will propose them.
    type: text
output_contract:
  format: markdown
  sections: [Review objective, Agenda, Outcomes against goals, Usage insights, Issues and fixes, Roadmap relevance, Recommendations, Asks and next steps, Pre-read email, Internal prep notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare customer business reviews that executives want to attend. A strong review is about the customer's business, not the vendor's product: it shows progress against the goals they bought for in their own numbers, is honest about problems, brings one or two insights they did not have, and ends with agreed actions on both sides. Reviews fail when they are a feature tour, a usage dump with no meaning, or a disguised upsell to a customer who is not yet getting value.
</context>

<task>
Prepare the business review.

<customer>
{{customer}}
</customer>

<usage_data>
{{usage_data}}
</usage_data>
{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}

1. Review objective: what this meeting must achieve for the customer and for the account (for example re-confirm goals with a new sponsor, recover from an incident, secure renewal intent), in two sentences.
2. Agenda: 45-60 minutes, timed, with most time on outcomes and the customer's priorities, not on product updates.
3. Outcomes against goals: for each goal, the target, the result this period, the trend, and the business impact in the customer's terms (time, money, risk, quality). Show the calculation when converting usage into impact and mark assumptions. If goals were not given, propose two or three measurable goals to agree in the meeting.
4. Usage insights: two or three insights that matter, such as an under-used team, a feature tied to their goal that few use, or a best-practice gap, each with the data point and the suggested action. Skip vanity numbers.
5. Issues and fixes: problems in the period (incidents, slow tickets, bugs), what was done, current status, and what remains. Be candid.
6. Roadmap relevance: only items that relate to their goals or issues, framed as confirmed, planned or exploring. Do not state dates that are not confirmed in the input.
7. Recommendations: what the customer should do next to get more value, with the expected benefit.
8. Asks and next steps: mutual actions with owners and dates, and any ask of the customer (a reference, a case study, an introduction, expansion) only if the account is healthy; explain why or why not.
9. Pre-read email: a short email to send two days before, with the agenda and the questions for them to think about.
10. Internal prep notes: account health assessment, risks, sensitive topics and how to handle them, and who in the vendor team should attend.
</task>

<constraints>
- Use only the data given. Never invent usage, results, quotes or roadmap dates; mark missing data as [NEEDED: …].
- Lead with the customer's outcomes. No feature tour; product updates appear only if they serve a goal or fix an issue.
- If the data shows the customer is not getting value, the review focuses on a recovery plan and does not include an expansion ask.
- Keep the customer-facing parts free of internal jargon and internal metrics such as health scores.
</constraints>

<output_format>
## Review objective
## Agenda
## Outcomes against goals
Table: Goal | Target | Result | Trend | Business impact.
## Usage insights
## Issues and fixes
Table: Issue | Impact | What we did | Status | Remaining.
## Roadmap relevance
## Recommendations
## Asks and next steps
Table: Action | Owner (customer or vendor) | Due.
## Pre-read email
## Internal prep notes
For the vendor team only.
</output_format>
