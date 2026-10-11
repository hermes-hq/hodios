---
schema: 1
id: set-up-accountability-partnership
kind: prompt
title: Set up an accountability partnership
description: Sets up a goal-buddy partnership with a friend or colleague - choosing a partner, an agreement on goals, check-in format and tone, what to do when one of you slips, and when to end it.
category: habits
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, founder, writer]
requires: [none]
inputs: [topic, preferences, text]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [accountability-partner, goal-buddy, peer-support, check-ins, mastermind]
pairs_with:
  prompts: [set-smart-goals, design-commitment-device, run-daily-accountability-check-in]
  personas: [life-coach]
args:
  - name: goal
    description: Your goal and why you want a partner for it.
    type: text
    required: true
  - name: partner
    description: Optional - who you have in mind (a friend, colleague, someone from a class or online group), their goal if known, and how you usually keep in touch.
    type: text
output_contract:
  format: markdown
  sections: [Choosing a partner, The ask, Agreement, Check-in script, When things slip, Review and ending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Accountability partnerships help when they have structure: both people state specific commitments, check in at a fixed time, and report honestly. They drift for predictable reasons: one person is more committed, check-ins become chats, nobody agreed what to say when someone misses, the partner is a close friend who will not challenge, or the partner is a manager, which makes honesty risky. The best partner is reliable, roughly as committed, working on something of similar size, and someone you can admit failure to. A short written agreement and a trial period (four to six weeks) make it easy to adjust or end without hurt feelings.

<goal>
{{goal}}
</goal>
{{#partner}}
Partner details:
<partner>
{{partner}}
</partner>
{{/partner}}
</context>

<task>
1. Give criteria for a good partner and, if a person was named, check them against the criteria, gently noting risks such as power imbalance or a very close relationship. If the goal is unclear, ask one or two questions and stop.
2. Write the ask: a short message inviting the partner, explaining what it involves and the trial length, with an easy way to say no.
3. Draft the agreement: each person's commitments in specific terms, check-in day, time, channel and length, what to report, how direct feedback should be, privacy (what stays between you), and the trial period.
4. Write a check-in script that keeps to time: done, not done and why, next commitments, one request for help.
5. Plan for slips: what each person says when the other misses commitments or check-ins, and the point at which you renegotiate.
6. Set a review at the end of the trial: questions to ask each other and how to end or change the partnership kindly.
</task>

<constraints>
- Keep both people's goals equal in the agreement; it is a two-way partnership.
- Do not invent details about the partner; use placeholders such as [name].
- Avoid shaming or punitive consequences; firmness comes from clarity, not penalties.
- If the goal is about health, money or mental wellbeing, the partner supports but does not replace professional advice.
</constraints>

<output_format>
## Choosing a partner
Criteria and notes on any named person.

## The ask
Message in a quote block.

## Agreement
Bulleted agreement both can copy.

## Check-in script
Numbered items with timings.

## When things slip
Bullets with suggested wording.

## Review and ending
Review questions and a kind ending message.
</output_format>
