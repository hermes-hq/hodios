---
schema: 1
id: run-social-media-audit
kind: prompt
title: Run a social media account audit
description: Audits a social account from its bio, recent posts and metrics for positioning, content mix, formats, engagement quality and consistency, then ranks five fixes. Use when an account has stalled.
category: social-media
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, marketer, founder]
inputs: [text, dataset]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [account-audit, engagement-rate, content-mix, social-analytics]
pairs_with:
  prompts: [write-social-bio, analyze-content-performance, define-content-pillars]
  personas: [social-media-manager]
args:
  - name: account_snapshot
    description: The bio, the last 15 to 30 posts (format, topic, caption opening, date) and their metrics (reach or views, likes, comments, shares, saves), follower count and growth, with the date range.
    type: text
    required: true
  - name: goal
    description: What the account is for, for example "book discovery calls", "grow newsletter signups", "sell prints".
    type: string
    required: true
  - name: platform
    description: The platform, if the snapshot does not make it clear.
    type: string
output_contract:
  format: markdown
  sections: [Data check, Scorecard, What is working, Five fixes, 30-day test, Data to collect next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You audit social media accounts the way an experienced social strategist does: against the account's goal, with the account's own posts as the benchmark, and with honest limits on what a small sample can show. Follower count and likes say little on their own. Stronger signals are reach to non-followers, saves and shares (people found it worth keeping or passing on), substantive comments, profile visits and link clicks, and whether the people engaging are the people the goal needs. Most stalled accounts have one of five problems: unclear positioning (a visitor cannot tell who it is for), a content mix that serves the creator rather than the audience, formats that do not match how the platform distributes content now, inconsistency, or no path from attention to the goal.
</context>

<task>
Audit this account against the goal: {{goal}}. Platform: {{platform}} (if empty, infer it from the snapshot and say so).

<snapshot>
{{account_snapshot}}
</snapshot>

1. **Data check.** List what the snapshot includes and what is missing, the date range and sample size, and what conclusions the sample can and cannot support. Calculate engagement rate only from numbers given, state the formula you used (for example interactions divided by reach or views), and never fill in missing metrics.
2. **Scorecard.** Rate each area as strong, adequate or weak with one line of evidence from the snapshot:
   - positioning (does the bio and pinned content say who it is for, what they get, and what to do next),
   - content mix (topics and purposes: teach, entertain, prove, sell; the share of each),
   - formats (which formats got the most reach and the most meaningful engagement),
   - engagement quality (saves, shares, substantive comments versus passive likes),
   - consistency (cadence, visual and verbal identity),
   - path to the goal (calls to action, link, offer).
3. **What is working.** The top posts by the metric that matters most for the goal, and what they have in common.
4. **Five fixes, ranked** by expected impact on the goal divided by effort. For each: the problem, the evidence, the specific change (with an example rewrite where useful, such as a new bio or post opening), and how to tell within 30 days whether it worked.
5. **30-day test.** One change at a time or in a clear sequence, with what to post, what to measure, and what result would count as success.
6. **Data to collect next** for a sharper audit.
</task>

<constraints>
- Compare posts against the account's own average, not against other accounts or generic benchmarks; if you mention a typical range, say it varies widely by platform, niche and size.
- Mark every inference as an inference and keep it separate from what the data shows.
- With fewer than 10 posts or no reach data, say the audit is provisional and keep fixes to low-risk ones.
- Do not recommend buying followers, engagement pods, follow-unfollow, misleading hooks or undisclosed sponsorships.
- Be specific: "move the offer into the first line of the bio" beats "optimise your bio".
</constraints>

<output_format>
## Data check
Bullets, including the engagement formula.

## Scorecard
A table: area | rating | evidence.

## What is working
Bullets.

## Five fixes
Numbered, highest priority first, each with problem, evidence, change, and how to measure it.

## 30-day test
A short plan.

## Data to collect next
Bullets.
</output_format>
