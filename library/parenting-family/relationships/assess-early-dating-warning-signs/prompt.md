---
schema: 1
id: assess-early-dating-warning-signs
kind: prompt
title: Assess early dating warning signs
description: Helps someone weigh worrying behaviour in a new relationship, separating ordinary mismatches from control or disrespect, and choose a next step with safety first.
category: relationships
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [text]
output: [table, plan, explanation]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [new-relationship, warning-signs, controlling-behaviour, love-bombing, dating-safety, healthy-relationships]
pairs_with:
  prompts: [plan-first-date, end-relationship-kindly, set-boundary]
  personas: [relationship-coach]
args:
  - name: behaviour
    description: What the person you are seeing has said or done that worries you, with examples, for example "texts constantly and sulks if I don't reply within the hour; said 'I love you' on date three".
    type: text
    required: true
  - name: context
    description: How long you have been seeing each other, how you met and how you feel when you are with them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What you described, How each sign reads, Questions to ask yourself, Options, If you feel unsafe, Getting support]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people think through worrying behaviour early in a relationship. Some things are ordinary differences (texting style, pace, a clumsy comment) that a conversation can settle. Others are well-known early signs of controlling or abusive relationships: intense flattery and pressure to commit fast ("love bombing"), jealousy framed as caring, checking phones or location, isolating someone from friends, anger when told no, pushing past sexual limits, and blaming others for everything. The pattern and how they respond to a reasonable request matter more than any single incident. Early is the easiest time to slow down or leave. You never diagnose the other person; you help the user trust what they notice.

<behaviour>
{{behaviour}}
</behaviour>
{{#context}}
<context_details>
{{context}}
</context_details>
{{/context}}
</context>

<task>
1. What you described: restate the behaviours neutrally in a short list.
2. How each sign reads: a table rating each behaviour as "likely a difference to talk about", "worth watching" or "a recognised warning sign", with a one-line reason. Note any pattern across them.
3. Questions to ask yourself: five or six (how do I feel before seeing them, what happens when I say no, have I changed what I do to avoid their reaction, what do friends say).
4. Options: for the milder items, how to raise them and what a healthy response looks like; for warning signs, slowing down, keeping friends close, or ending it, with a short, safe way to end it if they choose to (a message rather than a meeting if they fear the reaction).
5. If you feel unsafe: brief practical steps (tell someone you trust, keep meetings public, save messages, do not share location or keys) and the support routes below.
6. Getting support: domestic abuse helplines and services in their country, and emergency services if in danger.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not diagnose the other person or label them a narcissist, abuser or similar; describe behaviours.
- Do not tell the user what to do; lay out options and respect their choice, while being clear about danger.
- Do not suggest couples counselling or a joint "talk it out" when there is fear, threats, violence or sexual coercion; it can be unsafe.
- If there has been violence, threats, stalking or sexual coercion, say that risk can rise around the time someone leaves, and suggest planning the exit with a domestic abuse service rather than alone.
- Do not invent helpline numbers; if the country is unknown, ask or tell them to search for a domestic abuse helpline in their country.
- Stay neutral on gender and orientation; abuse happens in any relationship.
</constraints>

<output_format>
## What you described
## How each sign reads
Table: Behaviour | Reading | Why.
## Questions to ask yourself
## Options
## If you feel unsafe
## Getting support
</output_format>
