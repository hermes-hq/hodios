---
schema: 1
id: batch-email-and-messages
kind: prompt
title: Batch email and messages
description: Sets a routine for checking email and chat at set times, with notification rules per app, a fast lane for real urgency and a note telling colleagues how quickly you reply, fitted to your role.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, software-engineer, support-agent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [message-batching, notifications, response-times, team-chat, focus, communication-norms]
pairs_with:
  prompts: [protect-deep-work-blocks, set-up-inbox-filters, plan-around-interruptions]
args:
  - name: role
    description: Your job, who depends on fast replies from you, and what genuinely cannot wait (for example "on-call for production issues", "my manager's requests same day").
    type: text
    required: true
  - name: channels
    description: Every place messages arrive - work email, Slack or Teams, WhatsApp groups, phone, ticket queue - and roughly how much traffic each has.
    type: text
    required: true
  - name: current_habit
    description: How you check now and what bothers you about it. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Response-time promises, Check schedule, Notification rules, Urgent lane, Note to colleagues, Two-week trial]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people stop living in their inbox and chat apps without becoming unreachable. Constant checking feels responsive but costs focus: every glance pulls attention away for minutes, and most messages do not need a reply within the hour. What works is matching check frequency to what the role really requires, turning off notifications for everything except a defined urgent lane, and telling colleagues the response times they can expect so they stop sending "did you see my message?" follow-ups. The schedule must fit the role: a support agent or on-call engineer needs a different rhythm from a writer.

Role: {{role}}

Channels:
<channels>
{{channels}}
</channels>
{{#current_habit}}Current habit: {{current_habit}}{{/current_habit}}
</context>

<task>
1. Set response-time promises per channel and sender type that the role can actually keep (for example "chat from my team within 2 hours, email within 1 working day, urgent via phone").
2. Build a check schedule with clock times: how many check windows a day, how long each lasts, and what to do in each (reply, triage, archive). Leave the first focus block of the day free of checks unless the role forbids it.
3. Write notification rules per app and device: what stays on, what goes to badges only, what goes off completely, and focus or do-not-disturb settings in general terms.
4. Define the urgent lane: who may break through, through which one channel, and what counts as urgent.
5. Draft a short note for colleagues or the team explaining the new response times and the urgent lane, in a tone that fits the workplace.
6. Set a two-week trial with one measure and a review point, and say what to adjust if someone is let down.
</task>

<constraints>
- Never promise response times the role cannot meet; if the role demands near-instant replies (support queue, on-call), design around shifts or rotations instead of fewer checks, and say so.
- Do not give step-by-step settings menus for a specific app version; describe the setting and tell the user to find it in their app.
- Keep the urgent lane narrow: one channel, a short list of people or triggers.
- If the user's manager sets expectations, suggest agreeing the plan with them before announcing it.
</constraints>

<output_format>
## Response-time promises
Table: Channel | Sender | Response time.

## Check schedule
Table: Time | Window length | What to do.

## Notification rules
Table: App / device | On / badge / off | Note.

## Urgent lane
Bullets.

## Note to colleagues
Ready-to-send message.

## Two-week trial
Measure, review date, adjustments.
</output_format>
