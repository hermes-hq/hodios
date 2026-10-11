---
schema: 1
id: plan-monthly-giving-programme
kind: prompt
title: Plan a monthly giving programme
description: Plans a nonprofit regular (monthly) giving programme - the proposition, ask amounts, recruitment channels, the first-90-days welcome journey, retention and upgrade - with the numbers to track.
category: nonprofit
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, manager]
requires: [none]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [nonprofit]
tags: [regular-giving, donor-retention, supporter-journey, recurring-donations, lifetime-value]
pairs_with:
  prompts: [write-donor-appeal, write-donor-thank-you, analyze-donor-data]
  personas: [nonprofit-advisor]
args:
  - name: organisation
    description: What the organisation does, its supporters (numbers, how they give now, average gift), channels it already uses, team and budget for fundraising, and country.
    type: text
    required: true
  - name: goal
    description: What you want, for example "500 monthly donors in two years" or "move one-off donors to monthly". Optional.
    type: string
output_contract:
  format: markdown
  sections: [The proposition, Ask amounts, Recruitment, Welcome journey, Retention and upgrade, Numbers to track, First 90 days of work]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan monthly giving for a nonprofit. Monthly donors are usually worth far more over their lifetime than one-off donors and make income predictable, but programmes fail in two places. Recruitment fails when the ask is "support our work monthly" with no tangible proposition; it works when a monthly gift has a concrete meaning (what 10 a month does over a year) and an identity (joining a named group of supporters). Retention fails in the first three months: most cancellations happen early, from failed payments, no acknowledgement or a donor who forgot why they signed up. Experienced fundraisers plan the welcome journey before spending a penny on recruitment, recover failed payments quickly, and ask for a modest upgrade once a year.

Organisation: {{organisation}}
{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. The proposition: a name and one-sentence promise for the programme, what a monthly gift achieves over a year in the organisation's own terms, and what members receive (updates, not costly gifts).
2. Ask amounts: three suggested monthly amounts with the reasoning (anchored on the current average one-off gift and costs of the work), plus a default and an "other amount".
3. Recruitment: the two or three channels most likely to work given the organisation's supporters and budget (for example converting existing one-off donors by email and phone, a monthly option on every donation form, thank-you page conversion, events, face-to-face), each with the effort, rough cost type and a test to run first. Flag that paid face-to-face and telephone recruitment carry regulatory and reputational rules that vary by country.
4. Welcome journey: the first 90 days, step by step (instant thank-you, a welcome within a week, a first impact story, a check that the first payments went through, a personal touch such as a call), with timing and channel.
5. Retention and upgrade: how to handle failed payments, cancellation requests (an easy, respectful route, plus an option to pause or reduce), an annual impact summary, and a yearly upgrade ask.
6. Numbers to track: sign-ups, attrition in months 1-3 and in year one, failed-payment recovery rate, average monthly gift, upgrade rate, and an estimate of lifetime value using the organisation's own figures, with the formula.
7. First 90 days of work: the order to set things up.
</task>

<constraints>
- Use the organisation's figures only; mark any assumption about attrition or lifetime value as an assumption to replace with real data.
- Do not make cancelling hard or hidden; consent, data protection and payment rules (for example direct debit guarantees) differ by country - name the assumption and say to check.
- Do not promise donors that their gift funds one specific person unless the organisation does that; describe impact honestly.
- No invented benchmarks presented as fact; if you give a typical range, label it rough and variable.
</constraints>

<output_format>
## The proposition
## Ask amounts
## Recruitment
Table: Channel | Why it fits | Effort | Test first.
## Welcome journey
Table: Day | Touchpoint | Channel | Purpose.
## Retention and upgrade
## Numbers to track
Table: Metric | Formula | Target or baseline.
## First 90 days of work
Numbered.
</output_format>
