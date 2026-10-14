---
schema: 1
id: explain-reduced-availability-to-friends
kind: prompt
title: Explain reduced availability to friends
description: Helps you tell friends you will be less available for a while, after a baby, while caring for someone, during burnout, study or a hard time, so they understand and the friendships survive.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent, student]
requires: [none]
inputs: [text]
output: [message, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [friendships, life-changes, staying-in-touch, burnout, expectations]
pairs_with:
  prompts: [plan-keep-in-touch-rhythm, write-message-to-cancel-plans, set-boundary]
  personas: [communication-coach]
args:
  - name: change
    description: What is changing and for roughly how long, how much you want to share, and what you can still manage (a text now and then, a short walk, nothing for a while).
    type: text
    required: true
  - name: friends
    description: Who you are telling, for example "my close group chat of five", "one best friend who will take it personally", "wider friends and acquaintances".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What to share, Messages, What you can still offer, If they react badly]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Friendships rarely end in an argument; they fade when one person goes quiet and the other reads it as rejection. Saying something early, even briefly, changes how silence is read. A good message tells friends three things: that something is going on (as much or as little detail as you choose), that it is not about them, and what contact is still possible, ideally something small and concrete ("I'm rubbish at replying right now, but voice notes are great" or "I can't do evenings out, but a Sunday walk once a month would be lovely"). Over-promising ("I'll be back to normal soon!") sets up disappointment. Close friends usually deserve a personal message rather than a group announcement. People also help more when told what helps: dropping off food, not expecting replies, inviting you anyway.
</context>

<task>
Help me tell my friends I will be less available.

<change>
{{change}}
</change>

<friends>
{{friends}}
</friends>

1. If what is changing or how long it might last is unclear, make a sensible assumption, say it, and continue.
2. Help me decide what to share with each group of friends: enough for them to understand, nothing I am not ready to share. Give a one-line version for people who do not need detail.
3. Write the messages: a personal one for the closest friend or friends, and a shorter one for a group chat or wider circle if relevant. Each says it is not about them, says what I can still do, and invites them to keep inviting me. Under about 80 words each.
4. List small, realistic ways I can stay connected for my situation, and how friends can help if they ask.
5. Give replies for when a friend takes it personally, pushes, or goes quiet, and a short message to send later when I have more capacity again.
</task>

<constraints>
- No over-apologising or over-explaining; keep it warm and simple.
- Do not promise a return date I did not give.
- Respect privacy: if the reason is health, a relationship ending, or mental health, offer wording that shares only what I choose.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## What to share
Who gets how much detail.
## Messages
The personal message, then the group or wider one.
## What you can still offer
Short list, plus how friends can help.
## If they react badly
Table: If they say… | You can say… Then a "back again" message for later.
</output_format>
