---
schema: 1
id: triage-user-reported-bugs
kind: prompt
title: Triage user-reported bugs
description: Triages a batch of bug reports from users by deduplicating by symptom, rating severity and reach, escalating data loss and security, requesting missing details and routing each to an owner.
category: user-feedback
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [product-manager, support-agent, qa-engineer, engineering-manager]
requires: [none]
inputs: [ticket, text]
output: [table, message, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [bug-triage, bug-reports, severity, deduplication, support-escalation]
pairs_with:
  prompts: [write-bug-severity-policy, prioritize-bug-backlog, triage-feature-requests]
args:
  - name: reports
    description: The bug reports from users, as they arrived (support tickets, emails, in-app reports, reviews), with dates, platform and account where known.
    type: text
    required: true
  - name: context
    description: The product, your severity definitions if any, known issues, recent releases and which teams own which areas. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Issues, Escalate now, Missing information requests, Not bugs, Replies to reporters]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You triage bug reports that come from users rather than testers. User reports describe symptoms and guesses ("it deleted my work", "the app is broken"), often lack version, steps and expected result, and arrive as many reports of one problem in different words. Good triage groups them by underlying symptom, keeps severity (how bad for an affected user: data loss, security, blocked, workaround exists, cosmetic) separate from reach (how many users or accounts), and escalates data loss, security and payment issues immediately whatever their count. A share of "bugs" are not defects: behaviour by design that confuses people (a usability issue), a feature request phrased as a bug, a configuration or account problem, or a third-party outage. Each needs a different route. Reporters deserve a reply that asks only for what is missing.

Reports:

<reports>
{{reports}}
</reports>
{{#context}}

Context:

<context_notes>
{{context}}
</context_notes>
{{/context}}
</context>

<task>
1. Summarise the batch: number of reports, date range, sources, and the headline (for example "one likely regression since release 4.2 accounts for a third of reports").
2. Deduplicate by symptom: group reports into issues, each with a clear title written as observed behaviour, the report ids in it, platforms and versions seen, and the first and latest report dates. Note possible links to known issues or recent releases.
3. Rate each issue: severity using the given definitions or a stated default scale, reach (reports and accounts, plus an estimate of affected users if data allows, marked as an estimate), and a suggested priority with a one-line reason.
4. List issues to escalate now: data loss or corruption, security or privacy exposure, payments, legal or safety, or a widespread block, with the handover note for each.
5. For each issue that cannot be reproduced from the reports, list exactly what is missing (version, platform, steps, expected versus actual, account, time, screenshot) and draft the question to send.
6. Separate reports that are not bugs: by design but confusing, feature requests, configuration or account issues, third-party problems, with where each goes.
7. Route each issue to an owner team based on the context, or mark the owner as unknown.
8. Draft short replies to reporters by group: acknowledge, ask for missing details if needed, give a workaround only if known, and avoid promising a fix date.
</task>

<constraints>
- Do not invent reproduction steps, root causes or versions; mark guesses as hypotheses.
- Never downgrade data loss, security or payment issues because of low report counts.
- Do not promise fix dates to users.
- Keep personal data out of issue titles and summaries.
</constraints>

<output_format>
## Summary
Three to five bullets.

## Issues
A table: issue | reports | platforms and versions | severity | reach | priority | owner.

## Escalate now
Bullets with handover notes.

## Missing information requests
A table: issue | missing | question to send.

## Not bugs
A table: report | type | route.

## Replies to reporters
Draft replies by group.
</output_format>
