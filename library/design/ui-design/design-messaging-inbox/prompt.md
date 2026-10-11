---
schema: 1
id: design-messaging-inbox
kind: prompt
title: Design a messaging inbox
description: Designs person-to-person messaging in a product, with conversation list, thread view, composer, read and delivery states, attachments, notifications, blocking and reporting.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, frontend-engineer, mobile-engineer]
requires: [none]
inputs: [text, spec]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [direct-messages, message-inbox, conversation-list, read-receipts, blocking]
pairs_with:
  prompts: [spec-in-app-messaging, spec-content-reporting-and-moderation, design-notification-strategy, design-file-upload-experience]
  personas: [product-designer]
args:
  - name: messaging_context
    description: Who messages whom (buyers and sellers, patients and clinics, teammates, members), one-to-one or groups, what conversations are about (a listing, an order, a job), attachments allowed, safety concerns, and how messaging fits the rest of the product.
    type: text
    required: true
  - name: platform
    description: Main platform.
    type: enum
    enum: [web, mobile-app, both]
    default: both
output_contract:
  format: markdown
  sections: [Conversation model, Inbox list, Thread view, Composer, Message states, Notifications, Safety controls, Errors and edge states, Accessibility]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Messaging inside a product is not a general chat app: conversations are usually about something (a listing, an order, a booking, a case), and people need that context pinned to the thread. Common failures: an inbox that does not show which item a conversation is about, unread counts that do not match, messages that look sent when they failed, no way to find old conversations, notifications that leak private content on lock screens, and safety tools (block, report, mute) buried or missing. In marketplaces, users also need protection from off-platform scams, which affects how phone numbers, links and payments in messages are handled.
</context>

<task>
<messaging_context>
{{messaging_context}}
</messaging_context>

Design for {{platform}}. If it is unclear who messages whom, ask and stop. Other gaps become assumptions marked [confirm].

1. **Conversation model.** One thread per pair, per item or per order; group rules; who can start a conversation and whether the first message needs acceptance (message requests).
2. **Inbox list.** Row anatomy (avatar, name, item context, last message preview, time, unread marker), sorting, filters (unread, archived, by item), search, archive and mute, and the empty inbox.
3. **Thread view.** Header with the person and the linked item or order and its status, message grouping by sender and time, date separators, system events (offer made, order shipped), jump to unread, loading older messages.
4. **Composer.** Text, attachments with limits, quick replies or templates if relevant, drafts preserved, send on Enter rules per platform.
5. **Message states.** Sending, sent, delivered, read (if the product shows receipts, and a user setting to hide them), failed with retry, edited, deleted.
6. **Notifications.** Push, email and in-app badge rules, batching, lock-screen preview privacy, and what happens when the user is already viewing the thread.
7. **Safety controls.** Block, report with reasons, mute; what the blocked person sees; warnings on risky content (requests to pay off-platform, suspicious links) if relevant.
8. **Errors and edge states.** Offline queueing, attachment too large or blocked type, the other person deleted their account, item removed, conversation closed by moderation.
9. **Accessibility.** New-message announcements without flooding screen readers, focus when opening a thread, keyboard sending, readable timestamps.
</task>

<constraints>
- Messaging is between people in the product; do not design an AI chatbot interface here.
- Never mark a message as sent before the server confirms it; show failure clearly with retry.
- Do not invent moderation policies or legal retention rules; mark them [confirm].
- Lock-screen previews default to the safer setting for sensitive domains such as health or finance.
{{> output/uncertainty}}
</constraints>

<output_format>
## Conversation model
## Inbox list
## Thread view
## Composer
## Message states
| State | Visual | Copy | User action |
## Notifications
## Safety controls
## Errors and edge states
| Situation | Message (exact copy) | Recovery |
## Accessibility
</output_format>
