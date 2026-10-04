---
schema: 1
id: analyze-email-campaign-report
kind: prompt
title: Analyse an email campaign report
description: Reads an email campaign or flow report and explains what happened in plain words, judging clicks, revenue per recipient, unsubscribes and complaints against the list's own baseline, not opens.
category: email-marketing
version: 1.0.0
status: incubating
stage: [review]
role: [founder, marketer]
subject: [ecommerce, retail]
requires: [none]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [campaign-metrics, revenue-per-recipient, open-rate-inflation, spam-complaints, next-test]
pairs_with:
  prompts: [plan-subject-line-ab-test, set-email-frequency, audit-email-deliverability]
args:
  - name: report
    description: The campaign or flow report pasted from your email platform - recipients or delivered, opens, clicks, conversions or orders, revenue, unsubscribes, spam complaints, bounces - plus what the email was and who it went to.
    type: text
    required: true
  - name: goal
    description: What the email was meant to achieve, for example "sell the autumn bundle", "get bookings for next week" or "re-engage lapsed customers".
    type: string
    required: true
  - name: previous_benchmarks
    description: The same numbers for your last few comparable sends, so the email is judged against your own list. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What happened, Metrics against baseline, What it means, One thing to test next, Data gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain an email report to a shop owner or junior marketer who wants to know "did it work, and what do I do next?". Three habits make most report readings wrong. Open rate is treated as the headline, but mail apps that preload images now count many emails as opened that nobody read, so opens are mostly a deliverability signal, not an interest signal. Results are compared with generic industry benchmarks instead of the list's own recent sends. And small numbers are over-read: a jump from 9 to 14 orders is usually noise. Platform revenue also tends to be generous, because attribution windows credit the email for purchases people would have made anyway.

Goal of the send: {{goal}}
</context>

<task>
<report>
{{report}}
</report>

{{#previous_benchmarks}}<previous_benchmarks>
{{previous_benchmarks}}
</previous_benchmarks>{{/previous_benchmarks}}

1. Compute from the raw numbers (show the arithmetic): delivery rate, unique click rate (clicks ÷ delivered), click-to-open only as a secondary note, conversion rate (orders ÷ delivered, and orders ÷ clickers), revenue per recipient (revenue ÷ delivered), unsubscribe rate and complaint rate.
2. Compare each with the list's own baseline from previous sends. If no baseline is given, say so, give no verdict on "good or bad" beyond the health thresholds below, and tell the user which past sends to pull.
3. Check list health against widely used thresholds: hard bounces above 2% (list quality problem), spam complaints above 0.1% (warning) and 0.3% (mailbox providers may filter you), unsubscribes above about 0.5% for one send (message or frequency mismatch).
4. Judge against the goal: did it produce the outcome it was sent for? Separate the email's job (clicks to the page) from the page's job (clicks into orders); a high click rate with low conversion points at the landing page, offer or stock, not the email.
5. Flag what the numbers cannot say: attribution window, small counts (fewer than about 30 orders or 100 clicks makes differences of a few points unreliable), sends to different audiences.
6. Name one change to test next, tied to the weakest step, with how to measure it.
</task>

<constraints>
- Use only the numbers given. If a metric is missing, list it under data gaps rather than estimating it.
- Do not quote industry benchmark figures as facts; if the user asks for them, say they vary widely by sector and list and are no substitute for their own baseline.
- Plain words; define each metric once in brackets the first time.
- If the report has no recipient or delivered count, ask for it and stop, because no rate can be computed without it.
{{> output/uncertainty}}
</constraints>

<output_format>
## What happened
Three sentences maximum: the outcome against the goal and the one number that matters most.

## Metrics against baseline
Table: Metric | This send | Your baseline | Verdict (better, same, worse, no baseline) | Note. Show arithmetic beneath.

## What it means
Three to five bullets reading the numbers together (email versus page, health, audience).

## One thing to test next
The change, the hypothesis, the metric and how many sends it needs.

## Data gaps
Missing or unreliable numbers and where to find them.
</output_format>
