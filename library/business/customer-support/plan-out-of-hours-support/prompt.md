---
schema: 1
id: plan-out-of-hours-support
kind: prompt
title: Plan out-of-hours support
description: Plans what customers get outside opening hours or over holidays - auto-replies, a real emergency route, a fair on-call rota and what waits until morning - for a small team without burning people out.
category: customer-support
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, operations-manager, manager]
requires: [none]
inputs: [text, notes]
output: [plan, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [out-of-hours, on-call-rota, emergency-line, auto-reply, holiday-cover]
pairs_with:
  prompts: [plan-support-staffing, triage-service-call, organise-shared-support-inbox]
args:
  - name: business
    description: What you do, your opening hours, channels customers use out of hours (phone, email, chat, social), and what happens now when someone contacts you after hours.
    type: text
    required: true
  - name: emergencies
    description: What a real emergency is for your customers (a burst pipe, a lockout, a system down, a tenant with no heating) and what you are obliged to cover under contracts or tenancies. Optional.
    type: text
  - name: team_size
    description: How many people could share out-of-hours cover.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [What counts as urgent, Out-of-hours routes, On-call rota, Messages, Morning pick-up, Protecting the team, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small businesses decide what customers get when the doors are closed. Without a plan, the owner answers every message at 11pm, a real emergency waits until Monday, or one keen person burns out. The fix is to separate the few true emergencies from everything else, give emergencies a reliable route, tell everyone else clearly when they will hear back, and share on-call fairly with rest and pay rules agreed up front. With about {{team_size}} people to share cover, the rota must be survivable: as a rule of thumb, aim for nobody on call more than about one week in three or four, with extra rest or pay agreed for the weeks they are.
</context>

<task>
<business>
{{business}}
</business>
{{#emergencies}}
<emergencies>
{{emergencies}}
</emergencies>
{{/emergencies}}

1. What counts as urgent: a short table of situations that are emergencies (act tonight), urgent (first thing next working day) and routine, using the business's own examples. If contracts or tenancies oblige cover, the plan must meet them.
2. Out-of-hours routes: for each channel, what the customer sees or hears (voicemail, auto-reply, website banner), and the single emergency route (an on-call number, a keyword that pages, a partner service), plus the safety message for danger to life or property: contact local emergency services first.
3. On-call rota: pattern for the team size, handover times, response time for genuine emergencies, how call-outs are logged, and what happens when the on-call person cannot be reached (a named back-up). If the team is too small for safe cover, say so and suggest alternatives (a partner firm, an answering service, a narrower promise).
4. Messages: voicemail script, email auto-reply, chat or social away message, and a holiday-period notice, each stating when the customer will hear back and what to do in an emergency.
5. Morning pick-up: who clears the overnight queue first thing, in what order, and the target for replying.
6. Protecting the team: limits on non-emergency replies after hours, rest after a night call-out, on-call pay or time off to agree, and a monthly review of call-out volume. Note that working-time and on-call pay rules vary by country and should be checked.
7. Questions: anything to confirm.
</task>

<constraints>
- Use only the facts given; mark unknown obligations, numbers or hours as [X].
- Never write a message that discourages customers from calling emergency services when there is danger to life, health or property.
- Do not state employment law as fact; flag on-call pay and rest rules to check locally.
- Keep promises in messages to what the rota can deliver.
</constraints>

<output_format>
## What counts as urgent
Table: Situation | Category | Response.
## Out-of-hours routes
Table: Channel | Customer sees or hears | Emergency route.
## On-call rota
Pattern, back-up, logging, as bullets or a small table.
## Messages
Each ready to use, under a bold label.
## Morning pick-up
Numbered steps.
## Protecting the team
Bullets.
## Questions
Bullets.
</output_format>
