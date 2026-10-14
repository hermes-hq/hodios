---
schema: 1
id: spec-in-app-messaging
kind: prompt
title: Specify direct messaging between users
description: Specifies private messaging between users of a product, covering who can message whom, conversation model, attachments, read receipts, blocking and reporting, notifications, retention and deletion.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, fullstack-engineer, mobile-engineer]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [direct-messages, chat, trust-and-safety, requirements]
pairs_with:
  prompts: [spec-comments-and-mentions, spec-content-reporting-and-moderation, spec-roles-and-permissions]
args:
  - name: feature_description
    description: Who messages whom (buyers and sellers, clients and providers, team members, members of a community) and why.
    type: text
    required: true
  - name: context
    description: Platform (web, mobile), existing notification channels, whether minors may use the product, and business rules such as keeping payments on the platform.
    type: text
output_contract:
  format: markdown
  sections: [Conversation model, Who can message whom, Message features, Safety controls, Notifications and read state, Retention and deletion, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Messaging is the feature most likely to turn a product into a channel for spam, scams and harassment, and its rules decide whether that happens. Marketplaces learn that open messaging lets scammers move buyers off-platform; community apps learn that anyone-can-message-anyone means unsolicited abuse unless there are message requests and blocking; B2B tools learn that conversations must survive when a person leaves the company. Other gaps: read receipts nobody can turn off, attachments that carry malware, deleting a message on one side only, notifications that show a message preview on a locked screen, and no plan for the legal requests and reports that come in. The spec must start from who may contact whom and why, then add the conversation model, safety controls proportionate to the audience, notification rules and retention.
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

1. Define the conversation model: one-to-one and or group, linked to an object (order, listing, booking) or free-standing, participants joining and leaving, conversation titles, and ordering and history loading.
2. Specify who can message whom: allowed pairs by role or relationship, message requests for first contact, rate limits for new accounts, and whether contact details (phone, email, links) are allowed or masked when the business requires on-platform communication.
3. Specify message features: text length, formatting, links and previews, attachments with type and size limits and scanning, editing and deleting with visible markers, reactions, and typing indicators if any.
4. Specify safety controls: blocking (what the blocked person sees), muting, reporting a message or conversation with context sent to moderators, spam and scam signals, extra protections if minors can use the product, and what staff can access and when.
5. Specify notifications and read state: push, email and in-app rules, previews hidden when the device is locked or by preference, batching, read receipts and whether users can disable them, and unread counts.
6. Specify retention and deletion: how long messages are kept, delete for me versus for everyone, what happens when an account is deleted or a member leaves an organisation, and export.
7. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Every spec must include blocking and reporting, even for B2B products.
- Do not promise end-to-end encryption or claim a legal standard is met; state the security properties as requirements to confirm.
- If minors may use the product, call out stricter defaults and flag the need for a child safety review.
- Do not invent business rules about contact sharing; ask if unclear.
</constraints>

<output_format>
## Conversation model
Bullets.
## Who can message whom
Table: sender, recipient, allowed, conditions.
## Message features
Table: feature, rule, limit.
## Safety controls
Numbered rules.
## Notifications and read state
Bullets.
## Retention and deletion
Bullets.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
