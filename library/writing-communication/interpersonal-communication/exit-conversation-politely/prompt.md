---
schema: 1
id: exit-conversation-politely
kind: prompt
title: Exit a conversation politely
description: Gives graceful lines to end conversations that run on, with talkers at events, chatty neighbours, long phone calls, colleagues at your desk and video calls, fitted to the setting and relationship.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker, manager, founder]
requires: [none]
inputs: [text]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [small-talk, social-skills, awkward-situations, networking, ending-conversations]
pairs_with:
  prompts: [prepare-networking-conversation, set-boundary, decline-request-gracefully]
  personas: [communication-coach]
args:
  - name: situations
    description: The situations where you struggle to end conversations, for example "a neighbour who catches me on the stairs", "a colleague who stops at my desk", "my aunt on the phone", "networking events".
    type: text
    required: true
  - name: style
    description: How you would like to come across. Optional, for example "warm", "brisk and professional", "I'm shy and freeze".
    type: string
output_contract:
  format: markdown
  sections: [How a good exit works, Lines for your situations, When they keep going, Habits that help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most people stay in conversations too long because they wait for a natural pause that never comes, or fear seeming rude. A graceful exit has three parts said in one breath: a warm signal that wraps up ("It's been great hearing about the trip"), a reason or simply the exit ("I'm going to grab a drink before the talk starts" or "I'll let you get on"), and a forward-looking close ("Let's pick this up at the next meeting"). Body language does half the work: shifting weight, stepping back slightly, offering a handshake. You do not need an elaborate excuse, and invented ones are easy to catch; "I need to get back to this" is enough. Interrupting kindly is fine with people who rarely pause: touch the conversation with their name and a summary, then exit. At networking events, introducing the person to someone else is the warmest exit.
</context>

<task>
Give me ways to end conversations in these situations.

<situations>
{{situations}}
</situations>
{{#style}}How I want to come across: {{style}}{{/style}}

1. Explain briefly how a good exit works, in two or three sentences.
2. For each situation I listed, give two or three ready-to-say lines that fit the setting and relationship, plus a body-language or timing tip. Include a pre-emptive line for situations I can see coming ("I've only got five minutes, but…").
3. Give lines for when the person does not take the hint or keeps talking as I leave, firm but kind, including interrupting politely.
4. Give a few habits that help: setting a time limit at the start, standing rather than sitting, ending phone calls with a reason and a next contact.
</task>

<constraints>
- Lines must be short, natural and honest; avoid elaborate fake excuses.
- Warm by default, but without promising things I will not do ("let's get coffee" only if I mean it).
- Fit the register to each relationship (a senior colleague, an elderly relative, a stranger at an event).
- If the situation is someone who makes me feel unsafe or will not let me leave, say leaving abruptly is fine and safety comes first.
</constraints>

<output_format>
## How a good exit works
Two or three sentences.
## Lines for your situations
One subsection per situation, with lines and a tip.
## When they keep going
Lines for persistent talkers.
## Habits that help
Short list.
</output_format>
