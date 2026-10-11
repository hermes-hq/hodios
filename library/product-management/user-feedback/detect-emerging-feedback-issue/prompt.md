---
schema: 1
id: detect-emerging-feedback-issue
kind: prompt
title: Detect an emerging feedback issue
description: Checks recent feedback against a baseline to spot a new or fast-growing issue early - normalising for volume, checking for one-off causes - and drafts an alert with evidence and an owner.
category: user-feedback
version: 1.0.0
status: incubating
stage: [operate, review]
role: [product-manager, support-agent, operations-manager, data-analyst]
requires: [none]
inputs: [dataset, text]
output: [table, message, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [early-warning, issue-detection, feedback-monitoring, trend-break, escalation, release-regression]
pairs_with:
  prompts: [analyze-user-feedback, compare-feedback-before-after-change, design-feedback-tagging-taxonomy, diagnose-metric-drop]
args:
  - name: recent_feedback
    description: Feedback from the recent window (for example the last 3-7 days) with dates, channel and tags or text, and the total volume of contacts or users in that window.
    type: text
    required: true
  - name: baseline
    description: The same counts for a comparable earlier period (ideally several weeks), with totals, plus releases, campaigns, outages or channel changes in either period.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Signals, Checks before alerting, Verdict, Alert draft, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You look for problems that are just starting to show in customer feedback, before they become a crisis or a monthly-report footnote. Raw counts mislead: complaints rise when contacts rise (a campaign, a seasonal peak, a new channel), and a tagging change can create a "new" issue overnight. The useful signals are a theme's share of all feedback rising beyond its normal range, a brand-new phrase or error message that did not appear before, a cluster tied to one release, platform, region or customer segment, and severity words (lost, charged twice, cannot log in, unsafe). Small absolute numbers can still matter when the issue is new and severe. Every alert needs evidence, a likely scope and an owner, and false alarms erode trust, so check the obvious one-off causes first.
</context>

<task>
<recent_feedback>
{{recent_feedback}}
</recent_feedback>

<baseline>
{{baseline}}
</baseline>

1. Signals: for each theme or recurring phrase, compute its share of total feedback now and in the baseline, the change, and whether it is new. Flag clusters by release version, platform, region or segment, and severe wording. Show the arithmetic.
2. Checks before alerting: for each candidate, rule out or note volume changes, tagging or form changes, a known outage already handled, a campaign or seasonal effect, and one customer or one thread producing most mentions.
3. Verdict: for each candidate, alert now, watch (with what would trigger an alert), or dismiss, with the reason.
4. Alert draft: for each alert, a short message for the owning team with what is happening, the evidence (counts, shares, example quotes), likely scope, when it started and what is known about the cause, and what is asked of them.
</task>

<constraints>
- Compare shares, not only counts; if totals are missing, ask for them because the analysis depends on them.
- Never fabricate quotes or counts; quote only text given, without personal details.
- Severity can justify an alert on very few reports (data loss, payments, security, safety); say so explicitly when it does.
- Do not diagnose a technical root cause; state what the feedback suggests and leave cause to the owning team.
{{> output/uncertainty}}
</constraints>

<output_format>
## Signals
Table: theme or phrase | count now | share now | share baseline | change | new? | cluster.

## Checks before alerting
Table: candidate | check | result.

## Verdict
Table: candidate | alert, watch or dismiss | reason | trigger to escalate.

## Alert draft
One message per alert, ready to send.

## Questions
What to confirm.
</output_format>
