---
schema: 1
id: script-call-to-customer-service
kind: prompt
title: Script a call to customer service
description: Scripts a phone call to cancel a contract, dispute a charge, chase a refund or get a problem escalated, with what to say, the retention offers and stalls to expect and what to write down.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [phone-calls, cancellations, refunds, escalation, consumer-rights, call-centre]
pairs_with:
  prompts: [write-complaint-letter, cancel-contract-or-subscription, practice-assertive-responses]
args:
  - name: goal
    description: What you want from the call, for example "cancel my broadband contract", "get a refund for a double charge", "get a technician booked after three missed visits".
    type: text
    required: true
  - name: details
    description: The company type, account details you have to hand (not the numbers themselves), dates, amounts, what happened, previous calls and any reference numbers, and your country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before you call, Opening, What they may say, Escalating, Before you hang up, If the call fails]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Customer service calls go wrong in predictable ways: the caller tells a long story before stating what they want, gets transferred and starts over, accepts a vague "we'll look into it", or is talked into a retention deal they did not want. Agents work from scripts and often have limited authority; cancellations are commonly routed to a retention team whose job is to keep you. What works: one clear sentence stating the outcome you want in the first 30 seconds, facts in order with dates and amounts ready, calm repetition of the request ("I understand, and I'd still like to cancel today"), asking what the agent can do and who can do more, and ending every call with a reference number, the agent's name or ID, and what will happen by when. If the call fails, a written complaint, the company's formal complaints process, a card chargeback, or an ombudsman or regulator may be the next step, depending on the country and sector.
</context>

<task>
Script my call.

<goal>
{{goal}}
</goal>

<details>
{{details}}
</details>

1. If my goal or key facts (amounts, dates, what went wrong) are unclear, ask up to three short questions and stop.
2. Give a short checklist of what to have ready (account identifiers, dates, amounts, previous reference numbers, notes paper, a time I am not rushed) and the best time to call if it helps.
3. Write my opening: who I am for verification, then the outcome I want in one sentence, then the key facts in order. Under about 60 spoken words.
4. List what they are likely to say for this kind of call (retention offers, "it's company policy", "the system won't let me", "you'll need to email", promises of a callback) and a calm reply to each that keeps to my goal. Include how to judge a retention offer quickly if it might suit me.
5. Write how to escalate politely: asking for a supervisor or the complaints team, and what to say if refused.
6. Give the close: what to confirm (outcome, reference number, agent name or ID, dates, written confirmation) and a line to say it back to them.
7. Say what to do if the call fails: a written follow-up, the formal complaints process, payment-provider dispute or chargeback, and ombudsman or regulator routes to check for my country and sector, with timing.
</task>

<constraints>
- Do not state consumer rights, cooling-off periods, notice periods or chargeback deadlines as fact; tell me what to check in my contract and with the local consumer body.
- Never ask me to share full card numbers, passwords or one-time codes in this chat; and remind me that a genuine company calling me back will not ask for my full password or PIN.
- No lying, threats I will not carry out, or abuse of the agent; calm and firm works better.
- Keep spoken lines short enough to read off a screen while on hold.
</constraints>

<output_format>
## Before you call
Checklist.
## Opening
The words to say.
## What they may say
Table: If they say… | You can say…
## Escalating
Lines to escalate.
## Before you hang up
What to confirm and a line to say back.
## If the call fails
Next steps in order, to check locally.
</output_format>
