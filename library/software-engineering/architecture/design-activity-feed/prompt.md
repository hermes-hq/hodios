---
schema: 1
id: design-activity-feed
kind: prompt
title: Design an activity feed
description: Designs an activity feed or timeline, choosing fan-out on write, on read or a hybrid, with ranking, pagination, high-follower accounts and storage estimates.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, tech-lead]
requires: [none]
inputs: [spec, text]
output: [plan, table, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [activity-feed, fan-out, timeline, pagination, capacity-planning, caching]
pairs_with:
  personas: [software-architect, backend-engineer]
  prompts: [estimate-system-capacity, design-cqrs-read-models]
args:
  - name: feed
    description: What the feed shows (following, team activity, notifications-like), who produces items and who reads them, and whether order is chronological or ranked.
    type: text
    required: true
  - name: scale
    description: Users, daily active users, items written per day, average and maximum followers or members, read to write ratio. Rough numbers are fine.
    type: text
  - name: stack
    description: Databases, caches and queues already in use.
    type: string
output_contract:
  format: markdown
  sections: [Recommendation, Estimates, Write path, Read path, Edge cases, Trade-offs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Feeds are a classic system design trade-off. Fan-out on write (push each new item into every follower's precomputed feed) makes reads cheap but write cost scales with follower count, so one account with millions of followers stalls the pipeline. Fan-out on read (query the followed sources at read time and merge) makes writes cheap but reads expensive when users follow many sources. Most real systems use a hybrid: push for normal accounts, pull and merge for high-follower accounts, and skip precomputation for inactive users. Feeds should store item ids, not full items, and hydrate at read time so edits and deletes show correctly. Offset pagination breaks when new items arrive; use a cursor on (timestamp, id) or a ranking score plus id. Ranking adds a scoring step and makes caching harder. Small products with team-scale membership usually need nothing more than an indexed query, and precomputing is premature.
</context>

<task>
<feed>
{{feed}}
</feed>
{{#scale}}
Scale: {{scale}}
{{/scale}}
{{#stack}}
Existing stack: {{stack}}
{{/stack}}

1. Do the arithmetic first: items written per second at peak, fan-out writes per second (items times average followers), feed reads per second, and storage for precomputed feeds at the stated retention. Show the numbers and label guesses.
2. If the numbers are small, say a single indexed query (or a materialised view) is enough and stop short of a fan-out pipeline, stating the threshold that would change this.
3. Otherwise choose push, pull or hybrid. For hybrid, define the follower threshold for pull-mode accounts and how their items merge into a page.
4. Describe the write path: item persisted, event emitted, fan-out workers writing ids into per-user feed storage (for example sorted sets or a wide-column table), capped length, and skipping inactive users.
5. Describe the read path: fetch ids by cursor, merge pull-mode sources, filter blocked or deleted items, hydrate in batch, and cache.
6. Handle edge cases: deletes and privacy changes (filter at read time and clean up lazily), unfollow, backfill when someone follows a new source, edits, and rebuilding a feed from scratch.
7. If ranked, place the ranking step, what features it may use, and how pagination stays stable.
</task>

<constraints>
- Show the capacity arithmetic; do not assert that a design "scales" without numbers.
- Do not recommend a fan-out pipeline for a feed a database index can serve.
- Use cursor pagination, not offsets, for any feed that changes while users scroll.
- When a choice depends on a specific database's limits, name what to measure instead of quoting figures you are not sure of.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The fan-out model and why, in at most five lines.
## Estimates
Table of the arithmetic: writes per second, fan-out writes, reads per second, storage per day and for retention.
## Write path
Steps from new item to visible in feeds, including high-follower accounts.
## Read path
Steps to serve a page, with cursor format and hydration.
## Edge cases
Deletes, privacy changes, unfollows, edits, backfill for new follows, inactive users.
## Trade-offs
What this design costs and the trigger to revisit it.
</output_format>
