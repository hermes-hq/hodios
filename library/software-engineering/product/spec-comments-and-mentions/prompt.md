---
schema: 1
id: spec-comments-and-mentions
kind: prompt
title: Specify comments and mentions
description: Specifies comments on items, with threading, mentions and who can be mentioned, edit and delete rules, notifications, access on private items, moderation and what happens on item deletion.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, fullstack-engineer]
stack: []
requires: [none]
inputs: [spec, ticket, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [comments, mentions, collaboration, requirements]
pairs_with:
  prompts: [spec-roles-and-permissions, design-notification-strategy, spec-delete-and-restore-behaviour]
args:
  - name: feature_description
    description: Which items get comments (tasks, documents, tickets, orders), who uses them, and why.
    type: text
    required: true
  - name: context
    description: Existing roles and sharing rules, whether external people (clients, guests) see items, and existing notification channels.
    type: text
output_contract:
  format: markdown
  sections: [Comment model, Mentions, Editing and deletion, Notifications, Access and privacy, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Comments look like a small feature and touch permissions, notifications, privacy and data lifecycle at once. The classic incidents: someone @mentions a person who cannot see the item, and the notification email leaks its content; an internal comment shows up for a client guest; an edited comment changes the meaning of a decision after others replied; a notification storm when a bot comments on every item; comments surviving after the item is deleted, or vanishing with history people needed. The spec needs a clear comment model (flat or threaded, rich text, attachments, reactions), explicit mention rules, edit and delete rules with visible history where it matters, notification rules tied to the product's existing channels and preferences, and moderation for products where outsiders can comment.
</context>

<task>
<feature>
{{feature_description}}
</feature>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Define the comment model: where comments attach, flat or threaded and depth, formatting, attachments, reactions, resolve or close threads, length limit, and ordering.
2. Specify mentions: who can be mentioned (only people with access, groups, everyone), what happens when mentioning someone without access (block, offer to share, warn), mentions of deactivated users, and mention limits to prevent spam.
3. Specify editing and deletion: who can edit or delete their own and others' comments, time windows, "edited" markers and history, deleting a comment with replies, and what happens to comments when the item or the author's account is deleted.
4. Specify notifications: who is notified for new comments, replies and mentions, following and unfollowing a thread, batching, and how this fits existing preferences and channels; never put restricted content in a notification to someone without access.
5. Specify access and privacy: internal versus external comments where outsiders see items, visibility in search and exports, and moderation tools (report, hide, remove) where needed.
6. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- A comment or notification must never reveal item content to someone who cannot open the item.
- Do not redesign the whole notification system; refer to existing channels and preferences.
- Deletion rules must state what remains visible (for example "comment deleted" placeholders) so threads stay readable.
- If it is unclear whether external people see items, ask, because internal-only comments change the model.
</constraints>

<output_format>
## Comment model
Bullets.
## Mentions
Numbered rules.
## Editing and deletion
Table: action, who, window, what others see.
## Notifications
Table: event, who is notified, channel, batching.
## Access and privacy
Bullets.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
