---
schema: 1
id: organise-shared-support-inbox
kind: prompt
title: Organise a shared support inbox
description: Organises a small team's shared support inbox with labels, ownership rules, response targets, a definition of done, a daily sweep and saved replies, so no customer falls between people.
category: customer-support
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, support-agent, operations-manager, manager]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [shared-inbox, ticket-ownership, response-targets, saved-replies, team-workflow]
pairs_with:
  prompts: [build-support-macros, design-escalation-process, write-support-reply]
args:
  - name: team
    description: Who answers customers - names or roles, hours they work, what each can decide (refunds, bookings, technical fixes), and any part-timers or owners who dip in.
    type: text
    required: true
  - name: channels
    description: Where customer messages arrive (shared email address, website form, social DMs, marketplace messages, phone voicemail) and the tool you use, if any (plain email, a helpdesk, a shared phone).
    type: text
    required: true
  - name: volume
    description: Rough number of customer messages per day or week, and the busiest times. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What is going wrong, Labels and statuses, Ownership rules, Response targets, Definition of done, Daily sweep, Saved replies to write, First week setup, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small team (2 to 10 people) run one shared customer inbox so nothing is missed. Shared inboxes fail in the same few ways: everyone reads a message and assumes someone else will answer it; two people reply to the same customer with different answers; a reply is promised "tomorrow" and nobody owns the follow-up; and messages that need the owner's decision sit for days. The fix is not a bigger tool. It is a small set of labels, one owner per conversation, visible response targets, a clear meaning of "done" and a short daily sweep. Simple beats clever: a scheme with more than about eight labels stops being used within a month.
</context>

<task>
<team>
{{team}}
</team>

<channels>
{{channels}}
</channels>
{{#volume}}
Volume: {{volume}}
{{/volume}}

1. Name the likely failure points for this team and channel mix (for example social DMs nobody checks, the owner's personal phone, a form that emails one person only). Recommend funnelling every channel into one place where the tool allows, or a named person who forwards it within a set time where it does not.
2. Labels and statuses: at most eight topic labels from the business's real contact reasons, plus statuses: New, Mine (owned), Waiting on customer, Waiting on us (internal or supplier), Done. Say how to show each in the tool the team uses, or in plain email with folders or colour tags.
3. Ownership rules: whoever replies first owns the conversation until done; how to hand over (a one-line internal note: what happened, what is promised, by when); who takes what by topic or rota; what happens to an owner's open conversations when they are off.
4. Response targets: first reply and resolution targets per channel and urgency, set from the team's real hours and volume (a typical small-team starting point is first reply within one working day for email and forms, same working day for urgent issues). State that these are starting points to adjust after two weeks.
5. Definition of done: the customer has an answer or the fix, any promise made is logged with a date, and the conversation is labelled. "Replied" is not "done" if a callback, refund or delivery is still pending.
6. Daily sweep: a 10-minute routine at fixed times (for example opening and mid-afternoon) - unowned messages first, then anything past target, then "Waiting on us" items with a date today.
7. Saved replies: list the six to ten to write first, from the contact reasons, each with its purpose and the facts it needs. Do not write promises into them that only the owner can make.
8. First week setup: ordered tasks with who does each.
</task>

<constraints>
- Use only the team, channels and volume given. If the team's hours or who decides refunds are missing, ask, and mark them [X] in the plan.
- Do not recommend or name specific helpdesk products or prices; describe what to set up in the tool the team already has, and what a helpdesk would add if they outgrow it.
- Keep it proportionate: a two-person shop gets a lighter scheme than a ten-person team.
- Never put customer personal data in internal notes beyond what the job needs.
</constraints>

<output_format>
## What is going wrong
Three to five bullets of likely gaps for this setup.
## Labels and statuses
Table: Label or status | Meaning | When to apply.
## Ownership rules
Numbered rules, including handover and absence.
## Response targets
Table: Channel | Urgency | First reply | Resolution or next update.
## Definition of done
A short checklist.
## Daily sweep
A timed checklist.
## Saved replies to write
Table: Saved reply | Use it when | Facts it needs.
## First week setup
Numbered tasks with an owner.
## Questions
Anything to confirm.
</output_format>
