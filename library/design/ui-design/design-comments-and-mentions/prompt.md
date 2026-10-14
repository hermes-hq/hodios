---
schema: 1
id: design-comments-and-mentions
kind: prompt
title: Design comments and mentions UI
description: Designs comment threads in a collaborative product, with anchoring, replies, mentions, reactions, resolve and reopen, edit and delete, unread markers and the notification entry points.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, frontend-engineer]
requires: [none]
inputs: [text, spec]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [comments, mentions, comment-threads, collaboration, resolve-states]
pairs_with:
  prompts: [spec-comments-and-mentions, design-notification-strategy, design-sharing-and-permissions-ui, write-ux-microcopy]
  personas: [product-designer]
args:
  - name: collaboration_context
    description: What people comment on (documents, designs, tasks, records, code), whether comments attach to a selection, a region or the whole item, team size, who can comment or view, and current problems (missed mentions, cluttered threads, lost context after edits).
    type: text
    required: true
  - name: platform
    description: Main platform.
    type: enum
    enum: [web, desktop, mobile-app]
    default: web
output_contract:
  format: markdown
  sections: [Anchoring model, Comment entry, Thread anatomy, Mentions, Resolve and lifecycle, Overview and navigation, Edge states, Accessibility]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Comments in collaborative tools work when each thread is clearly tied to what it is about and has a lifecycle. The usual failures: comments anchored to text that later changes, leaving orphaned threads; a long flat list nobody can scan; mentions that suggest people who cannot see the item, so the mention silently fails; no distinction between open and resolved threads; and no way to see "what needs my reply" across items. Good design picks an anchoring model, makes open threads easy to find and close, checks access when someone is mentioned, and keeps history after resolve.
</context>

<task>
<collaboration_context>
{{collaboration_context}}
</collaboration_context>

Design for {{platform}}. If the commented object is unknown, ask and stop. Other gaps become assumptions marked [confirm].

1. **Anchoring model.** Selection, region or pin, or whole-item comments; how the anchor is shown in the content; what happens when the anchored content is edited, moved or deleted (keep thread with a "content changed" or "orphaned" marker).
2. **Comment entry.** How to start a comment (selection toolbar, shortcut, comment mode), composer behaviour, formatting kept minimal, attachments if needed, drafts kept when the user clicks away.
3. **Thread anatomy.** Author, time, text, replies (one level or nested, with a reason), reactions, edited marker, and the actions menu.
4. **Mentions.** Trigger character, suggestion list order (recent collaborators first), mentioning someone without access (offer to share or warn), groups or teams, and what the mentioned person receives.
5. **Resolve and lifecycle.** Resolve, reopen, delete, who can do each, what resolved threads look like and where they go, and whether resolving notifies.
6. **Overview and navigation.** Comment panel with filters (open, resolved, mentions me, unread), counts, jumping between threads, and an inbox of threads awaiting the user's reply.
7. **Edge states.** Many threads on one spot, deleted author, permission removed, offline comment queued, comment on a read-only or locked version.
8. **Accessibility.** Comments reachable without pointer selection, anchors announced, focus moves into and out of threads predictably, unread state not shown by colour alone.
</task>

<constraints>
- Mentioning someone must never silently fail; show access problems at the moment of mention.
- Do not invent notification channel strategy beyond the entry points; note where it connects to notification settings.
- Keep resolved threads recoverable; do not design resolve as delete.
{{> output/uncertainty}}
</constraints>

<output_format>
## Anchoring model
## Comment entry
## Thread anatomy
## Mentions
## Resolve and lifecycle
| Action | Who can | Result | Notifies |
## Overview and navigation
## Edge states
| Situation | What the user sees | Action |
## Accessibility
</output_format>
