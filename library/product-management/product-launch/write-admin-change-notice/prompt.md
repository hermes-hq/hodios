---
schema: 1
id: write-admin-change-notice
kind: prompt
title: Write an advance change notice for workspace admins
description: Writes an advance notice for B2B workspace admins about an upcoming product change - what changes and when, who is affected, controls, actions to take and material to brief their users.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, technical-writer, support-agent]
subject: [saas]
requires: [none]
inputs: [text, spec]
output: [message, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
depth: specific
tags: [admin-notice, change-management, enterprise-customers, advance-notice, release-communication]
pairs_with:
  prompts: [write-launch-faq, plan-staged-feature-rollout, write-in-app-announcement]
args:
  - name: change
    description: The upcoming change - what users and admins will see, dates for each stage (preview, default on, old way removed), which plans or regions, settings that control it, and any effect on integrations, data, permissions or compliance.
    type: text
    required: true
  - name: admin_context
    description: Who the admins are (IT, operations, team leads), how much notice customers are owed by contract or policy, and the channel (admin console message, email, help centre). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Notice, Timeline, Action checklist for admins, End-user briefing text, Unknowns]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are writing for administrators of a business product. Admins are not the excited early adopters of a launch announcement; they are the people who will get the helpdesk tickets, need to update their own training material, check security and compliance, and sometimes must get approval before anything changes for hundreds of users. They read change notices to answer five questions fast: what changes, when, does it affect my users, can I control it, and what do I need to do. Notices fail when they are written as marketing, bury the date, hide the setting that delays or disables the change, say nothing about integrations or data, or give too little lead time. Good notices use a predictable structure, state the effect on permissions, data and integrations explicitly (even when there is none), and give admins ready text to brief their users.
{{#admin_context}}

Admin context:

<admin_context>
{{admin_context}}
</admin_context>
{{/admin_context}}
</context>

<task>
Change:

<change>
{{change}}
</change>

1. Write the notice with a plain title that names the change and the date, then short labelled parts: What is changing; When (each stage with date and time zone); Who is affected (plans, regions, roles); How this affects your organisation (users, permissions, data, integrations and APIs, compliance; say "no change" explicitly where true); Controls available to admins; What you need to do (or "no action required"); Learn more.
2. Lay out the timeline as stages: preview or opt-in, default on, old behaviour removed.
3. Write an action checklist admins can follow, ordered by deadline.
4. Write a short end-user briefing admins can paste into their own channels, without vendor marketing language.
5. List unknowns in the input that admins will ask about, as [TBD] with a suggested owner by role.
</task>

<constraints>
- No marketing tone; benefits get one sentence at most.
- Never invent dates, settings names, plan names or compliance statements (certifications, data residency); mark them [TBD].
- If the lead time in the input is shorter than the stated contractual or policy notice, flag it at the top.
- State effects on integrations, APIs, permissions and data explicitly, including when they are unchanged.
</constraints>

<output_format>
## Notice
Title, then the labelled parts.

## Timeline
Table: stage | date and time zone | what happens.

## Action checklist for admins
Checklist with deadlines.

## End-user briefing text
Under 120 words.

## Unknowns
Table: question | suggested owner.
</output_format>
