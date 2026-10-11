---
schema: 1
id: choose-freelance-marketplace
kind: prompt
title: Choose a freelance marketplace
description: Compares freelance marketplaces and direct client-finding for one freelancer's service, fees, client type and payment protection, and recommends where to spend effort with a 60-day test.
category: freelancing
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [designer, writer, software-engineer, copywriter]
requires: [none]
inputs: [text, preferences]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [freelance-platforms, platform-fees, channel-choice, payment-protection, experiment]
pairs_with:
  prompts: [write-freelance-profile, write-freelance-proposal, build-freelance-pipeline-routine]
args:
  - name: service
    description: What you sell, your experience, target price per project or day, languages, time zone, and the clients you want (local, international, startups, enterprises).
    type: text
    required: true
  - name: options
    description: Platforms or channels you are considering, if any. Optional; without it the comparison uses platform types rather than names.
    type: text
  - name: hours_per_week
    description: Hours a week you can put into finding work.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [What matters for you, Comparison, Recommendation, 60-day test, Facts to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer decide where to look for work: general marketplaces, specialist or vetted talent networks, project boards, or direct channels (network, referrals, own site). They differ in ways that matter more than size: who the buyers are and what they pay, service fees on both sides and fees to bid, whether payment is held in escrow, how much the platform controls the client relationship (rules on taking work off-platform), whether entry is vetted, and how long it takes to build a rating. A newcomer on a race-to-the-bottom marketplace can spend months underpricing to get reviews; a specialist network can bring better clients but may take weeks to accept you. Fees and rules change often, so any figure must be checked on the platform's current terms.

Hours per week: {{hours_per_week}}
</context>

<task>
<service>
{{service}}
</service>
{{#options}}

<options>
{{options}}
</options>
{{/options}}

1. What matters for you: from the service, rank the four or five criteria that decide this choice (for example client budget, payment protection, vetting, speed to first job, freedom to work direct later).
2. Comparison: compare the given options, or the main platform types if none were given, against those criteria. For named platforms, describe only what you are confident about and mark every fee, rule or policy as "check current terms".
3. Recommendation: where to spend most of the hours and what to keep as a secondary channel, with the reason in two or three sentences tied to the criteria.
4. 60-day test: weekly actions sized to the hours, the measures to track (proposals sent, replies, calls, jobs, effective rate after fees), and the decision rule at day 60.
5. Facts to verify before committing: the list of fee, payout, off-platform, dispute and account rules to read in each platform's current terms.
</task>

<constraints>
- Never state a platform's fee percentages, bid costs or rules as current fact; mark them to verify on the platform's own terms page.
- Do not recommend working around a platform's off-platform rules once a client was met there.
- Do not invent success rates or earnings figures.
{{> output/uncertainty}}
</constraints>

<output_format>
## What matters for you
Ranked list.

## Comparison
Table: option | buyers and budgets | fees (check) | payment protection | vetting | relationship rules | fit.

## Recommendation
Short paragraph.

## 60-day test
Weekly plan, measures and the day-60 decision rule.

## Facts to verify
Checklist.
</output_format>
