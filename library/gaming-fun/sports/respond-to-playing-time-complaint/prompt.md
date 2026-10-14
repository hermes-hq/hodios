---
schema: 1
id: respond-to-playing-time-complaint
kind: prompt
title: Respond to a playing time complaint
description: Drafts a coach's reply to a parent or player unhappy about playing time, with the facts checked against the team's policy, a meeting plan, what the player can work on and where to draw the line.
category: sports
version: 1.0.0
status: incubating
stage: [operate]
role: [individual]
requires: [none]
inputs: [message, notes]
output: [message, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [playing-time, parent-communication, difficult-conversation, volunteer-coach, touchline-disputes]
pairs_with:
  prompts: [plan-match-lineup, plan-team-season, tell-player-not-selected]
args:
  - name: complaint
    description: The message or what was said, as close to word for word as you can. Remove surnames and contact details.
    type: text
    required: true
  - name: facts
    description: The player's actual minutes or innings over recent matches, attendance at training, the team's playing-time policy (if any) and your honest view of why their time is what it is.
    type: text
    required: true
  - name: context
    description: Age group, level (recreational or competitive), and anything else relevant such as earlier conversations. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Check the facts first, Reply, Meeting plan, What the player can work on, Where to draw the line]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help volunteer and club coaches answer complaints about playing time, the most common source of conflict in amateur and youth sport. Experienced coaches do three things: check the real numbers before replying (perception and reality often differ, in both directions), move the conversation out of the touchline and the group chat into a calm private talk with a 24-hour cooling-off period, and talk about what the player can do rather than about other children. A published playing-time policy is the coach's best friend; where none exists, the reply should not invent one after the fact. Sometimes the complaint is fair, and the right answer is to admit it and fix the rotation.

Complaint:
{{complaint}}

Facts:
{{facts}}
{{#context}}

Context: {{context}}
{{/context}}
</context>

<task>
1. Check the facts first: compare the complaint with the minutes and the stated policy. Say plainly whether the complaint looks fair, partly fair or not supported, and what you could not check.
2. Write a short written reply that thanks them for raising it, does not argue the details in writing, proposes a time to talk privately (not before or straight after a match), and is honest if the coach got something wrong.
3. Meeting plan: the opening, the facts to share, the policy, what the player is doing well, what decides playing time, and how to end with an agreed next step. Include the player in the conversation when age-appropriate.
4. What the player can work on: two or three specific, observable things that would earn more time, if that is how the team decides minutes.
5. Where to draw the line: what is not up for negotiation (other children's minutes, tactics), how to respond to abuse or repeated pressure, and when to involve the club welfare officer or committee.
</task>

<constraints>
- Never discuss or compare other named children's minutes or ability.
- Do not invent a policy; if none exists, say so and suggest the coach adopt one for the future.
- If the facts show the coach has been unfair or inconsistent, say so and suggest a correction.
- Keep the written reply short, calm and free of sarcasm or blame.
- In recreational youth sport, treat fair playing time as the default expectation unless the league says otherwise.
</constraints>

<output_format>
## Check the facts first
## Reply
Ready to send.
## Meeting plan
## What the player can work on
## Where to draw the line
</output_format>
