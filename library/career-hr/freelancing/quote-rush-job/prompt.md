---
schema: 1
id: quote-rush-job
kind: prompt
title: Quote a rush job
description: Prices and scopes an urgent freelance request - whether the deadline is feasible, what it displaces, a rush fee from real costs, a smaller first version, and the conditions to set before saying yes.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan]
role: [designer, writer, software-engineer, consultant]
requires: [none]
inputs: [message, text]
output: [report, message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [rush-fee, tight-deadline, quoting, capacity, client-expectations]
pairs_with:
  prompts: [price-services, write-scope-change-email, triage-overbooked-client-schedule, write-statement-of-work]
  personas: [freelance-business-advisor]
args:
  - name: request
    description: The client's request and deadline, pasted in full, plus what the deliverable involves.
    type: text
    required: true
  - name: capacity
    description: Your normal rate and how long this work usually takes you, what is already booked in that window, and what you would have to move, work late on or turn down.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Feasibility, What it costs you, Quote options, Conditions, Reply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer decide whether and how to take an urgent job. What experienced freelancers know: a rush fee is not a punishment, it pays for real costs (evenings and weekends, moving other clients, turning down work, higher error risk); urgent projects fail mostly on the client side (slow feedback, missing content, late approvals), so a rush quote is only safe if the client commits to fast turnarounds too; and a smaller first version by the deadline, with the rest later, often serves the client better than a rushed full version. Saying "not by then, but by this date" is a legitimate answer.
</context>

<task>
<request>
{{request}}
</request>

<capacity>
{{capacity}}
</capacity>

1. Feasibility: the hours needed against the hours actually free before the deadline, including client feedback rounds. Say plainly if it is not feasible at full scope.
2. What it costs you: hours outside normal time, work that moves and who that affects, and work turned down. Use the freelancer's numbers; mark gaps.
3. Quote options: full scope at the deadline with a rush fee; a reduced first version at the deadline at normal or modest rush pricing with the rest later; full scope at a later date at the normal rate. Show the rush fee as a calculation from the costs, not a guessed percentage.
4. Conditions: what the client must commit to (feedback within set hours, all inputs by a set time, one decision-maker, payment upfront or a larger deposit), and what happens if they miss them (the deadline moves).
5. Reply: a short message presenting the options, recommending one, with the conditions stated plainly.
</task>

<constraints>
- Do not invent market rush-fee percentages; derive the fee from stated costs or leave the rate as the freelancer's choice.
- Never commit to a deadline the hours do not support, and do not plan around moving another client's work without telling that client.
- Keep the reply under 170 words.
{{> output/uncertainty}}
</constraints>

<output_format>
## Feasibility
Hours needed versus available, and a verdict.

## What it costs you
Bullets.

## Quote options
Table: Option | Scope | Date | Price | Risk.

## Conditions
Bullets.

## Reply
Ready to send.
</output_format>
