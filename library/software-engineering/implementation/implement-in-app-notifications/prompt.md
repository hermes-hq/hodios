---
schema: 1
id: implement-in-app-notifications
kind: prompt
title: Implement an in-app notification centre
description: Implements an in-app notification inbox with storage, fan-out, unread counts, mark-as-read, grouping, preferences and live updates. Use when users need a bell icon with activity.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [notifications, activity-feed, unread-count, fan-out, realtime]
pairs_with:
  prompts: [implement-realtime-updates, implement-push-notifications, implement-transactional-email, implement-background-job]
  personas: [backend-engineer]
args:
  - name: requirements
    description: Which events notify whom, expected users and volume, whether broadcast announcements are needed, and preferences per type.
    type: text
    required: true
  - name: stack
    description: Backend, frontend, database and any realtime channel already in place. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Design decisions, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a full-stack engineer building an in-app notification centre (the bell icon). The data model decides whether it stays fast:
- A notification row holds recipient, type, actor, a reference to the subject (type and id), a small JSON payload, created time and read time. Store the type and data, and render the text at read time, so wording and language can change without rewriting history.
- Fan-out on write (one row per recipient) is simple and fast to read for normal audiences. For announcements to everyone, store one broadcast and per-user read markers instead of millions of rows.
- Create notifications after the triggering transaction commits, through a background job or an outbox, so a rolled-back action never notifies and slow fan-out does not slow the request. Never notify the actor about their own action.
- Unread count: a count over a partial index `WHERE read_at IS NULL` is fine at moderate scale; cache it or keep a counter beyond that, and cap the display (99+).
- "Mark all as read" must only mark notifications up to the newest one the user saw, or it hides ones that arrived meanwhile.
- Group repeated events ("Ana and 3 others commented") at write time with a group key, or at read time; choose one.
- Check access when the notification is opened: the subject may have been deleted or the user's access removed.
- Preferences per type (and per channel if email or push also exist) are checked before creating the notification.
- Live updates reuse the existing realtime channel (WebSocket or server-sent events) with polling as fallback. Purge old notifications on a schedule.
</context>

<task>
Build the notification centre:
{{requirements}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read where the triggering events happen, the job system, any realtime channel, and the existing UI shell.
2. State the design: schema and indexes, fan-out strategy, creation path, grouping, unread count method, mark-as-read semantics, preferences, live updates, retention.
3. Implement the migration, a single `notify` service used by all triggers, the API (list with cursor pagination, unread count, mark one, mark all up to a given id), preferences, live push of new items and counts, the bell and inbox UI, and the purge job.
4. Write tests, then run them and the type check.
</task>

<constraints>
- Never create notifications inside the triggering transaction before it commits.
- Never expose another user's notifications; scope every query by recipient.
- Never invent library functions; if unsure, say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test. Cover at least: the actor is not notified, preferences suppress a type, mark-all does not mark later arrivals, unread count stays correct, a notification for a deleted or inaccessible subject is handled, and users cannot read others' notifications.
## Verification
Commands run and their actual results.
## Open questions
Choices left open, with the default chosen.
</output_format>
