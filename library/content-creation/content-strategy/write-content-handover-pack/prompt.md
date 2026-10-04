---
schema: 1
id: write-content-handover-pack
kind: prompt
title: Write a content handover pack
description: Writes a handover pack for when the person running an organisation's content leaves, covering accounts, owners and recovery routes (never passwords), voice, recurring posts and open threads.
category: content-strategy
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [content-creator, manager, operations-manager]
subject: [nonprofit, education-sector]
requires: [none]
inputs: [notes, text]
output: [docs, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [handover, account-access, succession, volunteers, password-hygiene, continuity]
pairs_with:
  prompts: [write-editorial-guidelines, plan-content-calendar]
args:
  - name: current_setup
    description: Everything the current person does, in rough notes - accounts and platforms, who else has access, regular posts, tools, where files live, who approves, people they deal with, and anything unfinished.
    type: text
    required: true
  - name: successor
    description: Who takes over, if known, and how experienced they are, for example "a new volunteer, not very confident with social media" or "our office manager, 2 hours a week".
    type: string
    default: not yet known
output_contract:
  format: markdown
  sections: [At a glance, Accounts and access, Voice and rules, Regular content, Calendar and files, Approvals and contacts, Open threads, First two weeks for the successor, Gaps to fill before leaving]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the handover pack for when the person who runs content for a club, school, charity, parish, shop or small business is about to step back. Content often dies with one volunteer: accounts registered to their personal email or phone, two-factor codes on their device, the brand voice in their head, recurring posts nobody else knows about, and half-finished conversations with partners. A good pack lets a less experienced successor keep things running in week one and take over properly within a month. It records who owns each account and how to recover it, never the passwords themselves, which belong in a shared password manager or with the organisation's account owner.

Successor: {{successor}}
</context>

<task>
<current_setup>
{{current_setup}}
</current_setup>

1. At a glance: what is published, where, how often, and the two or three things that must not stop.
2. Accounts and access: every account (social, email platform, website, domain, scheduling tool, design tool, shared drive, payment or shop links), the organisation owner, the login email, where credentials are kept, two-factor and recovery method, admins, and any account tied to a personal email, phone or profile that must be moved before the person leaves.
3. Voice and rules: how the organisation sounds, words to use and avoid, emoji and hashtags, photo consent rules (especially children), what never to post, and how to handle negative comments.
4. Regular content: recurring posts and emails with day, channel, template location and source of information.
5. Calendar and files: key dates in the coming year, folder structure, templates, brand assets and image library.
6. Approvals and contacts: who approves what, partner and supplier contacts by role, and who to call in a crisis.
7. Open threads: unfinished conversations, promised posts, pending collaborations, messages awaiting reply.
8. First two weeks for the successor: a day-by-day or week-by-week checklist, sized to their experience.
9. Gaps to fill before leaving: everything missing from the notes, especially access risks.
</task>

<constraints>
- Never put passwords, two-factor codes or recovery codes in the document; if the notes contain any, leave them out and tell the user to move them into a password manager and change them.
- Avoid personal contact details of private individuals in the pack where a role-based contact will do; note that personal data should be shared only with people who need it.
- Mark missing facts as [X] and list them under Gaps to fill before leaving; do not invent accounts, dates or contacts.
- Write for the successor's experience level: explain any tool term once in plain words.
</constraints>

<output_format>
## At a glance
Four or five lines.

## Accounts and access
Table: account | purpose | organisation owner | login email | credentials kept in | 2FA and recovery | admins | action needed.

## Voice and rules
Bullets.

## Regular content
Table: what | when | channel | template | source.

## Calendar and files
Key dates table, then the folder map.

## Approvals and contacts
Table: area | approver or contact role | how to reach | notes.

## Open threads
Bullets with next step and deadline.

## First two weeks for the successor
Checklist.

## Gaps to fill before leaving
Checklist, access risks first.
</output_format>
