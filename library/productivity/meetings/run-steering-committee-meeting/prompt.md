---
schema: 1
id: run-steering-committee-meeting
kind: prompt
title: Run a steering committee meeting
description: Plans and chairs a project or programme steering committee meeting around decisions, escalations and risks - pre-read pack, agenda, how to frame each ask, chairing notes and the decisions record.
category: meetings
version: 1.0.0
status: incubating
stage: [operate, review]
role: [project-manager, executive, manager, consultant]
requires: [none]
inputs: [text, document]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [governance, programme-management, escalations, risks, decision-records]
pairs_with:
  prompts: [build-steering-committee-update, build-decision-log-from-meetings, build-risk-register, write-status-report]
args:
  - name: programme
    description: The project or programme, its stage, overall status and who sits on the committee (sponsor, senior users, suppliers, finance).
    type: text
    required: true
  - name: items
    description: What needs the committee this time - decisions, escalations, change requests, risks above tolerance, budget or timeline changes.
    type: text
    required: true
  - name: my_role
    description: Your role (project manager presenting, sponsor chairing, secretary). Optional.
    type: text
  - name: minutes
    description: Meeting length in minutes.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Purpose check, Pre-read pack, Agenda, Framing each ask, Chairing notes, Decisions and actions record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help project managers and sponsors run steering committee meetings. Steering committees exist to make decisions the project team cannot: approve changes to scope, time or budget beyond agreed tolerances, resolve escalated issues, accept or act on major risks, and unblock resources across departments. They fail when they become a long status presentation, when senior members see the papers for the first time in the room, when asks are vague ("we need your support"), when the right decision-maker sends a delegate without authority, and when decisions are not recorded and get re-litigated. Experienced programme managers send a short pack in advance with status by exception, put decisions first on the agenda, frame each ask with options, impact and a recommendation, confirm who has authority to approve what, and circulate a decisions and actions record within a day.

Programme: {{programme}}
<items>
{{items}}
</items>
{{#my_role}}My role: {{my_role}}{{/my_role}}
Length: {{minutes}} minutes
</context>

<task>
1. Purpose check: from the items, say which genuinely need the committee (decision, escalation, risk acceptance) and which are information that belongs in the pack only. Flag if nothing needs a decision, and suggest a shorter meeting or written update.
2. Specify the pre-read pack: one-page status by exception (overall rating with reason, milestones, budget, top risks and issues), one page per decision with options and recommendation, and when to send it (typically three to five working days before).
3. Write the agenda with decisions and escalations first, status taken as read, and timeboxes; include confirmation that members present have the authority needed.
4. For each item, frame the ask: the decision needed in one sentence, background in two, options with cost, time and risk impact, the recommendation, and the consequence of not deciding today. Use placeholders where facts are missing.
5. Give chairing notes for whoever chairs: keep to decisions, ask members to state concerns before deciding, handle a member who reopens a past decision, and what to do when the committee will not decide (a deadline and owner for the missing information).
6. Provide a decisions and actions record template, and how and when to circulate it and track actions to the next meeting.
</task>

<constraints>
- Do not invent status ratings, figures or dates; use placeholders.
- Do not let routine status updates take more than about a fifth of the meeting.
- Respect the governance in place (terms of reference, tolerances); if unknown, recommend checking them rather than assuming.
- Keep asks honest: do not frame a recommendation as the only option when real alternatives exist.
</constraints>

<output_format>
## Purpose check
Table: Item | Needs the committee? | Type (decision, escalation, risk, information).

## Pre-read pack
Contents and timing.

## Agenda
Table: Time | Item | Lead | Outcome sought.

## Framing each ask
One block per item.

## Chairing notes
Bullets with phrases.

## Decisions and actions record
Template plus circulation rules.
</output_format>
