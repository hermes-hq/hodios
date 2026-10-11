---
schema: 1
id: plan-layoff-day-logistics
kind: prompt
title: Plan layoff day logistics
description: Plans how a layoff or redundancy announcement day runs - the hour-by-hour sequence, meetings or calls, access changes, information packs, support on hand and care for the people who stay.
category: hr-operations
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, executive, founder]
advice_risk: [legal]
requires: [none]
inputs: [text]
output: [plan, checklist, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [layoffs, redundancy, notification-day, run-of-show, restructuring]
pairs_with:
  prompts: [plan-layoff-conversation, write-layoff-announcement, write-redundancy-letters, lead-team-after-layoffs]
  personas: [hr-business-partner]
args:
  - name: situation
    description: How many people are affected and where (sites, remote, time zones), whether they are being told they are at risk (consultation) or that their role ends, and the date.
    type: text
    required: true
  - name: resources
    description: Managers and HR people available to hold conversations, meeting rooms or video set-up, IT and security capacity, an assistance programme or outplacement provider, and anything already decided (for example garden leave, access timing).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Key decisions, Day sequence, Conversation schedule, Access and equipment, Packs and support, The people who stay, Day-before checklist, Questions to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan layoff days the way an experienced HR operations lead does after running several. What experts know: the order of communication is the biggest decision - affected people should hear in a private conversation with their manager or a senior leader and HR before anything company-wide, and the all-company message follows within the hour so rumours do not fill the gap; mass video calls and emails that announce someone's job has ended cause lasting damage and may breach consultation rules; in many countries the first step is a consultation, not a final notice, which changes what can be said; access changes should be dignified and timed after the conversation, not before it, with a reason if accounts are cut immediately; people need a written pack because they will not remember the meeting; conversations take 15 to 30 minutes with a buffer, and a manager should not hold more than a handful in a row; and the remaining staff need a meeting the same day. Time zones, holidays and people on leave need specific plans.

<situation>
{{situation}}
</situation>

<resources>
{{resources}}
</resources>
</context>

<task>
1. Key decisions: whether the day is a consultation start or a final notification (confirm locally), the order of communication, who tells whom, access timing, and how people on leave, sick or remote in other time zones are reached.
2. Day sequence: an hour-by-hour run of show from the leadership briefing through manager briefings, individual conversations, the company announcement, team meetings and the end-of-day debrief.
3. Conversation schedule: a template allocating people to conversation holders and slots, with buffers and limits per holder, and a back-up holder.
4. Access and equipment: when accounts and building access change, how belongings and equipment are handled with dignity, and handover of critical access.
5. Packs and support: contents of the written pack (letter, next steps, dates, pay and benefits information to verify, support contacts, appeal or consultation details), and support on the day (assistance programme, outplacement, a quiet space, HR drop-in).
6. The people who stay: team meetings, manager talking points, how work will be covered, and a check-in a week later.
7. Day-before checklist for HR, IT, managers and communications.
8. Questions to confirm with an employment lawyer and leadership.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never plan for people to learn about their job loss from a group call, a mass email or a disabled login.
- Do not state notice periods, consultation duties or severance terms as fact; mark them "confirm locally".
- Use roles and counts, not names.
- Keep security steps proportionate; do not treat affected people as suspects without a specific reason.
{{> output/uncertainty}}
</constraints>

<output_format>
## Key decisions
## Day sequence
Table: Time | What | Who | Notes.
## Conversation schedule
Table: Slot | Conversation holder | HR support | Back-up.
## Access and equipment
## Packs and support
## The people who stay
## Day-before checklist
## Questions to confirm
Numbered.
</output_format>
