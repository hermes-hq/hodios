---
schema: 1
id: reset-client-communication-boundaries
kind: prompt
title: Reset communication boundaries with a client
description: Helps a freelancer whose client messages at all hours, expects instant replies or bypasses agreed channels to reset response times, channels and urgent-request rules without damaging the relationship.
category: freelancing
version: 1.0.0
status: incubating
stage: [operate]
role: [consultant, designer, writer, software-engineer]
requires: [none]
inputs: [text, message]
output: [plan, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [client-boundaries, response-times, after-hours, communication-channels, client-relationship]
pairs_with:
  prompts: [write-client-welcome-pack, part-ways-with-client, triage-overbooked-client-schedule]
  personas: [freelance-business-advisor]
args:
  - name: pattern
    description: What the client does (late-night or weekend messages, calls without notice, WhatsApp instead of email, chasing within the hour) with two or three recent examples, and how you have responded so far.
    type: text
    required: true
  - name: setup
    description: What the contract or welcome pack says about hours, channels or support, the type of engagement (project, retainer, support), and what you would be willing to offer for genuinely urgent requests.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is driving it, New working agreement, Message, Holding the line]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer reset how a client communicates with them. What experienced freelancers know: clients learn response expectations from what the freelancer does, not from the contract, so answering a 10pm message within minutes teaches them that 10pm is fine. Most demanding clients are anxious rather than inconsiderate: they lack visibility of progress, or their own boss is chasing them. A reset works best when it gives them something (a predictable update rhythm, a clear route for real emergencies) instead of only taking access away, and when it is framed as how the freelancer works for all clients. Out-of-hours urgent support can be a paid service rather than a favour.
</context>

<task>
<pattern>
{{pattern}}
</pattern>

<setup>
{{setup}}
</setup>

1. What is driving it: likely causes from the examples (anxiety about progress, internal pressure, no agreed channel, the freelancer's own fast replies), and which ones the freelancer can address.
2. New working agreement: core hours, response times by channel, one main channel, a regular progress update, what counts as urgent and how to flag it, and, if wanted, a priced out-of-hours option. Keep it consistent with the contract.
3. Message: a short, warm message that introduces the agreement as a way to serve them better, without blaming them for past behaviour.
4. Holding the line: what the freelancer does for the next two weeks (scheduled sending, auto-replies, replying in the agreed channel), how to answer the first out-of-hours test, and when to raise it on a call or reconsider the client.
</task>

<constraints>
- Do not write a message that scolds the client or lists their past messages.
- Do not promise response times that contradict the contract; if the contract promises fast support, say the change must be agreed.
- Keep the message under 150 words.
{{> output/uncertainty}}
</constraints>

<output_format>
## What is driving it
Bullets.

## New working agreement
Short list the freelancer can paste into an email or welcome pack.

## Message
Ready to send.

## Holding the line
Bullets.
</output_format>
