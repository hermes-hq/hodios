---
schema: 1
id: translate-request-into-problem
kind: prompt
title: Turn a solution request into a problem
description: Uncovers the problem behind a stakeholder's request for an app, dashboard or form, with questions to ask, a draft problem framing, evidence to gather and non-software alternatives.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover]
role: [product-manager, business-analyst, project-manager, consultant]
requires: [none]
inputs: [text, message, ticket]
output: [questions, explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [solution-requests, problem-framing, stakeholder-management, internal-tools, non-software-options]
pairs_with:
  prompts: [write-problem-statement, estimate-problem-cost, map-internal-tool-workarounds, interview-frontline-staff]
args:
  - name: request
    description: The request as it arrived (paste the email, ticket or meeting note), for example "we need an app for X" or "build a dashboard showing Y".
    type: text
    required: true
  - name: requester_and_context
    description: Who asked, their role and influence, the deadline or pressure behind it, and anything you already know about the situation. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What is being asked, Questions for the requester, Draft problem framing, Evidence to gather, Possible solutions, How to respond]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product manager for internal tools and public services who receives requests that arrive as solutions: "we need an app", "build a dashboard", "add a field to the form", "can we automate this?". Building exactly what was asked often fails because the real problem was different (the dashboard was meant to answer one question once a month; the app was meant to stop missed appointments, which a text reminder could fix). Refusing outright damages the relationship and the requester usually knows something real. The skill is to respect the request, find the outcome behind it, check how big and frequent the problem is, and compare options, including process, training, policy or an existing tool, before committing to build.
</context>

<task>
Request:

<request>
{{request}}
</request>
{{#requester_and_context}}

Requester and context:

<requester_and_context>
{{requester_and_context}}
</requester_and_context>
{{/requester_and_context}}

1. Restate the request neutrally and list the assumptions built into it (who would use it, what it would change, that software is the answer).
2. Questions for the requester, five to eight, in a respectful order: the trigger ("What happened recently that made this come up?"), the last specific time the problem occurred, who is affected and how often, what happens today and what it costs, what would be different if it were solved (the outcome), how they would know it worked, and the deadline's real reason. Include a "five whys" style chain of probes for the most important answer.
3. Draft problem framing based only on what the request and context say, with gaps marked [to confirm]: who has the problem, in what situation, what it causes, and how we would measure improvement.
4. Evidence to gather before deciding: data that already exists, two or three people to talk to (including the people who would use the solution day to day, not only the requester), and a quick way to size frequency and cost.
5. Possible solutions, at least four, from lightest to heaviest: do nothing or change a policy; process or training change; use or configure an existing tool; a small manual or low-code fix; a new build. For each, what it solves, cost and effort in rough terms, and what would make it the right choice.
6. How to respond: a short, warm reply the user can send to the requester that thanks them, says what you will check and by when, and asks for a 30-minute conversation, without promising the build or dismissing it.
</task>

<constraints>
- Do not decide the solution before the problem is confirmed; keep the requested build as one option, fairly described.
- Never invent facts about the organisation, volumes or costs; mark them [to confirm].
- Neutral, respectful tone about the requester; assume good intent.
- If the request is a legal, safety or compliance obligation (for example a regulator requires a form), say so and focus on how to meet it well rather than questioning whether to do it.
</constraints>

<output_format>
## What is being asked
The request restated and its built-in assumptions as bullets.

## Questions for the requester
Numbered, with the probe chain under the most important one.

## Draft problem framing
Four lines, with [to confirm] markers.

## Evidence to gather
Bullets: data, people, sizing method.

## Possible solutions
Table: option | what it solves | rough effort | when it is the right choice.

## How to respond
The reply, under 120 words.
</output_format>
