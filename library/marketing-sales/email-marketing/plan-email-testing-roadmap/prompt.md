---
schema: 1
id: plan-email-testing-roadmap
kind: prompt
title: Plan a quarter of email tests
description: Plans a quarter of email A/B tests across offers, content, design, timing and flows, sized to the list's real volume, with one hypothesis per test and a log for what was learned.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder]
requires: [none]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ab-testing, test-roadmap, conversion-optimisation, sample-size, test-log]
pairs_with:
  prompts: [plan-subject-line-ab-test, analyze-email-campaign-report, audit-email-program]
args:
  - name: programme
    description: List size, sends per week, typical click rate and conversion rate per campaign, main flows and their volumes, and the email platform's testing features.
    type: text
    required: true
  - name: goals
    description: What you most want to improve (revenue per recipient, flow conversion, unsubscribe rate, bookings) and what you have already tested.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Testing capacity, Test backlog, Quarter schedule, Test log template]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan email testing programmes. Most small lists cannot detect small differences: with a few thousand recipients and a 2% click rate, a test can only reliably spot large effects, so testing button colours is wasted effort, while testing the offer, the angle or a flow's timing can be worth it. Experts start from the list's real volume, prefer tests with big potential effects, run tests in flows (where volume accumulates over weeks) as well as campaigns, judge winners on clicks, conversions or revenue per recipient rather than opens, run one change at a time, decide sample size and duration before starting, and write down every result, including "no difference", so the team stops re-testing the same ideas.
</context>

<task>
Plan a quarter of email tests.

<programme>
{{programme}}
</programme>

<goals>
{{goals}}
</goals>

1. **Testing capacity:** estimate how many recipients per variant a campaign or flow gives in a week, and roughly what size of difference that can detect for the main metric. Show the reasoning simply and say it is approximate. Recommend whether to test in campaigns, flows or both.
2. **Test backlog:** list 8 to 12 candidate tests across offer, angle or message, content length or format, design (plain text versus designed), call to action, send time or flow delay, and segmentation. For each: hypothesis, variants, metric, minimum audience, and expected impact versus effort.
3. **Quarter schedule:** choose the tests that fit the capacity, in order, with start date, duration or sample size, and the stop rule decided in advance.
4. Say what to do with inconclusive results and how to roll out winners (and re-check them later).
5. **Test log template:** columns for date, test, hypothesis, audience, result with numbers, decision, and what was learned.
</task>

<constraints>
- Sample-size estimates are approximate; state assumptions and suggest the platform's or a standard calculator for the final number.
- Do not judge winners on opens.
- One variable per test unless the user explicitly chooses a multi-change test, and then say what it can and cannot tell them.
- Do not invent past results.
</constraints>

<output_format>
## Testing capacity
Short explanation with the numbers used.

## Test backlog
A table: Test | Hypothesis | Variants | Metric | Audience needed | Impact | Effort.

## Quarter schedule
A table: Weeks | Test | Where | Stop rule.

## Test log template
A blank table.
</output_format>
