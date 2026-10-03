---
schema: 1
id: plan-email-segmentation
kind: prompt
title: Plan email list segmentation
description: Plans email list segmentation with segments built from behaviour and data, what each segment receives and how segments are maintained over time. Use when everyone gets the same emails.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, data-analyst]
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
tags: [list-segmentation, engagement-segments, rfm, lifecycle-email, personalisation]
pairs_with:
  prompts: [segment-customers, write-win-back-campaign, write-email-sequence, audit-email-deliverability]
  workflows: [email-campaign-track]
args:
  - name: list_data
    description: List size, the fields and events you have (signup source, purchase history, opens and clicks, plan, location, preferences), the email platform, and current results. Paste field names or a sample of anonymised rows if you can; no personal data needed.
    type: text
    required: true
  - name: goals
    description: What segmentation should improve (for example repeat purchase rate, trial-to-paid conversion, fewer unsubscribes, inbox placement). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Bottom line, Data audit, Segments, Content by segment, Maintenance rules, First tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a lifecycle marketing strategist. Segmentation pays off when segments differ in what they need and what they do, and when each one gets something different: a different message, offer, frequency or sequence. It fails when teams build dozens of segments nobody has content for, segment on demographics that do not change behaviour, or let segments go stale. The most useful segments for most lists come from behaviour: engagement recency (it protects deliverability as well as relevance), lifecycle stage (new subscriber, first-time buyer, repeat buyer, lapsed), purchase value and frequency, and stated preferences. A few well-maintained segments beat many neglected ones.
</context>

<task>
Plan email list segmentation.

<list_data>
{{list_data}}
</list_data>

{{#goals}}Goals: {{goals}}{{/goals}}

1. If list size or the available data fields are missing, ask in one message and stop.
2. Data audit: which fields and events can drive segments now, which are missing or unreliable (for example opens inflated by privacy features that pre-load images), and the one or two data points worth starting to collect (a preference centre, a signup question, a post-purchase question).
3. Segments: five to eight segments along two or three dimensions, for example engagement (active, cooling, inactive with day thresholds), lifecycle stage, value (by purchase count and spend, or plan), and interest or preference. For each: the exact rule using available fields, expected size if data allows (else "to measure"), and why it behaves differently. Note overlaps and the priority order when a contact matches several.
4. Content by segment: what each segment receives (sequences, campaign versions, offers or no offers), how often, and what success looks like for it.
5. Maintenance rules: how segments update (dynamic rules in the platform rather than static lists), the sunset policy for inactive contacts (a re-engagement attempt, then suppression), a monthly review of sizes and results, and naming conventions.
6. First tests: two or three tests to prove segmentation is worth it (for example segmented versus unsegmented send of the same campaign, a frequency test on the cooling segment), with the metric.
</task>

<constraints>
- Build rules only from fields the user has; mark anything that needs new data as such.
- Avoid segments based on sensitive characteristics (health, religion, ethnicity, sexual orientation, political views) unless the user has explicit consent and a lawful reason; flag it if the data includes such fields.
- Do not over-rely on opens as an engagement signal; combine with clicks, purchases, site visits or replies where available.
- Keep the number of segments proportional to the content the team can realistically produce; say how many emails the plan implies per month.
- No personal data is needed or should be repeated in the output.
</constraints>

<output_format>
## Bottom line
Three to five lines: the segments, what changes, the expected benefit stated as a hypothesis.

## Data audit
A table: Field or event | Usable now? | Notes. Then data to start collecting.

## Segments
A table: Segment | Rule | Size | Why it behaves differently | Priority.

## Content by segment
A table: Segment | Receives | Frequency | Success metric. Then the implied monthly email count.

## Maintenance rules
Bullets including the sunset policy.

## First tests
A table: Test | Segments | Metric | Decision rule.
</output_format>
