---
schema: 1
id: plan-freelance-time-off
kind: prompt
title: Plan time off as a freelancer
description: Plans a freelancer's holiday or leave - when to tell each client, work to finish or pause, cover or handover, the cash set aside for unpaid weeks and the out-of-office message.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan]
role: [consultant, designer, writer, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [holiday, unpaid-leave, client-notice, handover, out-of-office]
pairs_with:
  prompts: [write-client-welcome-pack, plan-freelance-tax-set-aside]
args:
  - name: time_off
    description: Dates or length of the break, the reason if you want it considered (holiday, parental leave, medical, sabbatical), and whether you will be fully offline.
    type: text
    required: true
  - name: clients_and_work
    description: Each client (letters are fine) with the work due around the break, retainers or ongoing tasks, and how they usually react to delays.
    type: text
    required: true
  - name: money
    description: Average monthly income and costs, and any savings already set aside for time off.
    type: text
output_contract:
  format: markdown
  sections: [Money check, Client plan, Messages, Before you leave, Coming back]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer take real time off without losing clients or money. What experienced freelancers know: clients rarely mind a break they hear about early, and resent one they discover from an auto-reply; retainer clients need a plan for the gap (pre-done work, a trusted cover freelancer, or a paused fee agreed in advance); the weeks before a break fill up, so new work should be booked to start after the return; and the real cost is income not earned plus the slow first week back, which is easiest to absorb if a set amount is saved each month. Leave for health or family reasons may come with public benefits in some countries; that is something to check, not assume.
</context>

<task>
<time_off>
{{time_off}}
</time_off>

<clients>
{{clients_and_work}}
</clients>
{{#money}}

<money>
{{money}}
</money>
{{/money}}

1. Money check: income lost, costs that continue, how much to save per month until the break, using only the given numbers and showing the arithmetic. If no figures were given, give the formula and ask.
2. Client plan: for each client, when to tell them (most important clients first, ideally four to eight weeks ahead for a long break), what to finish early, what to pause, whether cover is needed, and how retainers are handled (pre-delivered work, paused fee, or cover).
3. Write messages: the early notice to clients, a reminder one week before, the out-of-office auto-reply (dates, who to contact for what, no promise to check mail if offline), and a short note to a cover freelancer if one is used.
4. Before you leave: checklist of handovers, invoices sent before leaving, scheduled payments, access the cover needs, and new-inquiry handling.
5. Coming back: a light first week, the re-entry message to clients, and booking new work.
</task>

<constraints>
- Do not invent figures. Show every calculation from the user's numbers.
- Do not suggest hiding the break from clients or promising availability the freelancer does not want to give.
- For leave linked to health, pregnancy or caring, say benefits and rules vary by country and suggest checking official sources; do not state entitlements.
{{> output/uncertainty}}
</constraints>

<output_format>
## Money check
Calculation and the monthly saving target.

## Client plan
Table: client | tell by | finish early | pause | cover | retainer handling.

## Messages
Each message under a short heading, ready to send.

## Before you leave
Checklist.

## Coming back
Bullets.
</output_format>
