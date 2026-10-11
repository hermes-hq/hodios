---
schema: 1
id: implement-usage-quotas
kind: prompt
title: Implement per-plan usage quotas
description: Implements per-plan usage limits with race-free metering, enforcement before costly work, threshold warnings, period resets, plan changes and overage handling.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
subject: [saas]
tags: [quotas, metering, usage-limits, entitlements]
pairs_with:
  prompts: [add-rate-limiting, implement-subscription-billing, implement-idempotency-keys]
args:
  - name: quota_spec
    description: What is limited, per what and how often, for example "API calls per organisation per billing month - Free 1,000, Pro 100,000, Business unlimited with overage billed".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Quota model, Enforcement points, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer implementing plan quotas in a SaaS product. Quotas are not rate limits: rate limits smooth bursts per second, quotas cap what a plan includes per period and are tied to money. What goes wrong:
- Check-then-act races: reading the count, checking it, doing the work and then incrementing lets concurrent requests all pass at the limit. Reserve atomically (increment and compare in one operation, such as a Redis `INCRBY` or a conditional `UPDATE ... WHERE used + n <= limit`) and release the reservation if the work fails.
- The period must be defined: calendar month in UTC or the customer's billing cycle anchor. Put the period in the counter key (for example `usage:{org}:{metric}:{period}`) so resets need no cron job.
- Counters are for enforcement; an append-only usage event log with idempotent event ids is the source of truth for billing and disputes. Reconcile the two.
- Quotas belong to the account that pays (organisation or workspace), not to the individual user.
- Enforce before expensive work (generation, export, upload), not after. For long jobs, reserve an estimate and settle the actual amount at the end.
- Warnings at thresholds (such as 80% and 100%) are sent once per threshold per period, not on every request.
- Plan changes: an upgrade raises the limit at once; a downgrade below current usage blocks new usage but never deletes data. Decide hard stop, grace or billed overage per plan, and report overage to the billing provider's metered usage API if one is used.
- The over-quota response is distinct from a rate limit: a clear code and message, the limit, the usage and the reset time, so clients do not retry blindly.
</context>

<task>
Implement these quotas:
{{quota_spec}}

1. Read how plans and entitlements are stored, the billing integration, existing rate limiting, Redis or database access, and the code paths that consume the metered resource.
2. Write the quota model: metrics, limits per plan, period definition, counter keys, event log, and hard, grace or overage behaviour.
3. List the enforcement points and the reservation and settlement for each.
4. Implement plan limit lookup with caching, atomic reservation and release, the usage event log, threshold notifications deduplicated per period, the over-quota error, and a usage read endpoint for the UI.
5. Write tests: exactly at the limit, one over, concurrent requests at the boundary, failed work releasing the reservation, period rollover, upgrade and downgrade mid-period, duplicate usage events.
6. Run the tests and linters. Fix what fails.
</task>

<constraints>
- No check-then-increment without atomicity.
- Never delete customer data because they exceeded a quota.
- Do not invent plan limits or prices; take them from the spec or code and list gaps.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Quota model
A table: Metric | Plan | Limit | Period | At limit.
## Enforcement points
One line per code path: where it reserves, settles and releases.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Open questions
Business decisions still needed.
</output_format>
