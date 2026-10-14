---
schema: 1
id: draft-litigation-hold-notice
kind: prompt
title: Draft a litigation hold notice
description: Drafts a litigation hold notice for a client's custodians, with the matter in neutral terms, what to keep, where it lives, what to stop doing, an acknowledgment and a custodian tracking list.
category: legal-practice
version: 1.0.0
status: incubating
stage: [build]
role: [legal-professional, operations-manager]
subject: [law]
requires: [none]
inputs: [text, notes]
output: [docs, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [litigation-hold, preservation-notice, e-discovery, custodians, spoliation]
pairs_with:
  prompts: [draft-discovery-requests, index-case-documents, draft-privilege-log]
  personas: [paralegal]
args:
  - name: matter
    description: What the dispute or investigation is about, stated neutrally, the date the duty to preserve was likely triggered, and the relevant date range.
    type: text
    required: true
  - name: custodians
    description: The people and teams likely to hold relevant material, with their roles, and the systems the organisation uses (email, chat, shared drives, phones, paper, databases, departing employees' accounts).
    type: text
    required: true
  - name: jurisdiction
    description: Where the matter is or is likely to be litigated, because preservation duties and their trigger differ.
    type: string
  - name: routine_deletion
    description: Any automatic deletion, retention schedules, device recycling or ephemeral messaging in use that must be suspended. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before issuing, Hold notice, Custodian list, IT and records instructions, Follow-up plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A litigation hold fails in predictable ways: it goes out late, it describes the dispute so vaguely that custodians cannot tell what to keep, it reaches the named people but not the IT team running auto-delete, it ignores chat apps, personal phones and the mailbox of someone who left last month, and nobody re-sends it as the case grows. Where a duty to preserve applies, courts typically judge it by what was reasonable once litigation was reasonably anticipated (the trigger and scope differ by jurisdiction), so the notice must be specific, sent to the right people, paired with instructions to stop routine deletion, acknowledged in writing and refreshed. It must also be written so that, if disclosed later, it does not read as an admission: neutral description, no commentary on the merits.

Matter:
<matter>
{{matter}}
</matter>

Custodians and systems:
<custodians>
{{custodians}}
</custodians>
{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
{{#routine_deletion}}
<routine_deletion>
{{routine_deletion}}
</routine_deletion>
{{/routine_deletion}}
</context>

<task>
1. Before issuing: the decisions the lawyer must make first, such as the trigger date, the date range, whether any custodian is adverse or a likely witness who needs different handling, and whether collection (not just preservation) should start now.
2. Draft the hold notice addressed to custodians: why they are receiving it (neutral, one or two sentences), that it overrides normal retention, what to keep by subject and date range with concrete examples, where it may live (email, chat and messaging apps, texts on work and personal phones used for work, shared drives, paper, notebooks, calendars, databases), what not to do (delete, edit, move to personal accounts, wipe or replace devices), that it applies to new material created from now on, who to contact with questions, and that it stays in force until released in writing.
3. Acknowledgment: a short form the custodian signs and returns, confirming they read it, will comply, and listing where they hold material.
4. Custodian list: table of each custodian and team with likely sources and any special risk (departing employee, personal device, ephemeral messaging).
5. IT and records instructions: separate instructions to suspend auto-deletion, retain the accounts and devices of leavers, pause device recycling, and preserve backups or logs where relevant, with what IT should confirm in writing.
6. Follow-up plan: acknowledgment chasing, reminders at set intervals, adding custodians as the case develops, interviews with key custodians, and release at the end.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a draft for the responsible lawyer; mark it "DRAFT - PRIVILEGED AND CONFIDENTIAL" only if the lawyer confirms privilege applies, and otherwise note that the notice may be disclosed.
- Describe the matter neutrally. No views on the merits, no admissions, no speculation about wrongdoing.
- Do not state the trigger date or the scope of the duty as settled law; flag them for the lawyer under the stated jurisdiction.
- Never suggest narrowing the hold to avoid preserving unhelpful material.
- Use [BRACKETS] for names, dates and contacts not given. Do not invent custodians or systems.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before issuing
Bullets.
## Hold notice
The full notice, then the acknowledgment form.
## Custodian list
Table: Custodian or team | Role | Likely sources | Special risk.
## IT and records instructions
Numbered.
## Follow-up plan
Table: When | Action | Owner.
</output_format>
