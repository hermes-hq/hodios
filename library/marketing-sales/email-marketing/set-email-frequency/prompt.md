---
schema: 1
id: set-email-frequency
kind: prompt
title: Set an email sending frequency
description: Decides how often a small business should email each engagement segment, using fatigue signals (unsubscribes, complaints, falling clicks), and designs a four-week frequency test with stop rules.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, marketer]
subject: [ecommerce, retail]
requires: [none]
inputs: [text, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [send-frequency, list-fatigue, engagement-segments, holdout-test, stop-rules]
pairs_with:
  prompts: [analyze-email-campaign-report, plan-email-segmentation, write-email-preference-center]
args:
  - name: business
    description: What you sell and how often customers typically buy, for example "online plant shop, most customers buy 2-3 times a year".
    type: string
    required: true
  - name: current_sending
    description: How often you email now, to whom (everyone or segments), what kinds of emails, and why you are asking (for example "sales are flat, thinking of going from weekly to twice a week").
    type: text
    required: true
  - name: metrics
    description: Recent per-send numbers - delivered, unique clicks, orders or revenue, unsubscribes, complaints - ideally for 8-12 sends, and engagement segment sizes if your platform shows them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Frequency by segment, Fatigue signals to watch, Four-week test, Stop rules, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small business owner decide how often to email. The honest answer is "it depends on the segment", and the evidence is in their own numbers, not in a rule of thumb. Common mistakes: one frequency for everyone, so recent buyers are under-mailed and long-inactive contacts are over-mailed until they complain; judging a frequency change by revenue per send (which falls when you send more) instead of revenue per recipient over the whole period (which is what pays the bills); and changing frequency for the whole list at once, so there is no comparison group.

Business: {{business}}
</context>

<task>
<current_sending>
{{current_sending}}
</current_sending>

{{#metrics}}<metrics>
{{metrics}}
</metrics>{{/metrics}}

1. Build engagement segments by last click or purchase (not opens): for example engaged (0-30 days), warm (31-90), cooling (91-180) and inactive (180+), adjusted to the purchase cycle given. Estimate sizes from the metrics or ask for them.
2. Read the trend in the metrics: is click rate per send falling across consecutive sends, are unsubscribes or complaints rising, is total monthly revenue rising when sends rise? Show the arithmetic for anything you compute.
3. Recommend a frequency per segment (more for engaged, less for cooling, a monthly best-of or a sunset for inactive), and the content mix that justifies it: more sends need more reasons, not the same promo repeated.
4. Design a four-week test on the engaged segment (and warm if large enough): randomly split into control (current frequency) and test (the new frequency), keep a small group for both if the list is large, and judge on revenue or conversions per recipient over the four weeks, plus unsubscribe and complaint rates per recipient over the period. Say how many recipients each group needs to show a difference; if the segment is small, say the test will be directional only.
5. Set stop rules in advance: stop the test group if complaint rate exceeds 0.1% on any send, if unsubscribes per send exceed roughly twice the control's, or if hard bounces or spam-folder signs appear.
</task>

<constraints>
- Use only the numbers given; label assumptions and do not cite industry benchmark figures as facts.
- Do not recommend increasing sends to inactive contacts; their path is re-engagement or sunset.
- If neither current frequency nor any metrics are given, ask for at least the last 8 sends' delivered, clicks, orders and unsubscribes, and stop.
- Mention giving subscribers a frequency choice (preference centre or pause option) as a complement, not a substitute, for the test.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Two or three sentences: the frequency per segment and the main reason.

## Frequency by segment
Table: Segment | Definition | Size | Sends per week or month | Content mix.

## Fatigue signals to watch
Bullets with the metric, how to compute it and the threshold.

## Four-week test
Groups, split, schedule, primary metric (per recipient over the period), secondary metrics and sample note.

## Stop rules
Numbered rules.

## Questions
Data you need to firm up the recommendation.
</output_format>
