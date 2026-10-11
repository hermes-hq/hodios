---
schema: 1
id: review-low-csat-ticket
kind: prompt
title: Review a low-rated support ticket
description: Reviews a ticket that got a bad satisfaction rating to separate agent, policy, product and expectation causes, then gives the fix and whether and how to recontact the customer.
category: customer-support
version: 1.0.0
status: incubating
stage: [review]
role: [support-agent, manager, operations-manager]
requires: [none]
inputs: [ticket, transcript, text]
output: [report, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [csat, bad-rating, root-cause, service-recovery, ticket-review]
pairs_with:
  prompts: [build-support-qa-scorecard, write-csat-survey, critique-draft-support-reply, build-service-recovery-playbook]
args:
  - name: ticket
    description: "The full ticket or chat thread with timestamps, the rating and any comment the customer left. Remove personal details you do not need."
    type: text
    required: true
  - name: policies
    description: "Relevant policies, what the agent was allowed to offer, and service targets such as first reply time. Optional."
    type: text
output_contract:
  format: markdown
  sections: [What happened, Main cause, What the agent could control, Fixes, Recontact decision, Recontact message]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review unhappy support interactions for team leads. A low rating is a signal about the whole experience, not a verdict on the agent: many bad ratings come from the policy (the answer was correct but the customer disliked it), the product (a bug the agent could not fix), or expectations set elsewhere (a sales promise, a delivery estimate), and some are rating the company in general. Treating every bad score as an agent failure demotivates good agents and leaves the real cause untouched. The useful review finds the main cause, separates what the agent could control (speed of reply, clarity, ownership, tone, offering what was allowed) from what they could not, and decides whether recontacting the customer would help or annoy.
</context>

<task>
Review this low-rated ticket.

<ticket>
{{ticket}}
</ticket>
{{#policies}}
<policies>
{{policies}}
</policies>
{{/policies}}

1. Summarise what happened in order, with the waits between replies, and what the customer wanted versus what they got.
2. Classify the main cause as agent, process or policy, product, expectation set elsewhere, or unclear, plus any contributing causes. Quote the parts of the thread that show it. If the customer's comment points one way and the thread another, say so.
3. List what the agent could control and did well or badly: reply speed, understanding the actual question, accuracy, ownership, tone, offering allowed options, setting expectations. Be specific and fair.
4. Give fixes at the right level: coaching point for the agent, a macro or article change, a policy question for the owner, or a product issue to log with this ticket as evidence.
5. Decide whether to recontact: yes if something is still unresolved, the business was at fault, or the customer is at risk of leaving; no if the issue is resolved and the customer simply disliked a fair policy. Say who should do it.
6. If recontact is advised, write a short, human message that names what went wrong, says what has been done, and does not ask them to change their rating.
</task>

<constraints>
- Do not blame the agent for causes outside their control, or excuse them for causes within it.
- Do not invent offers or exceptions; use only what the policies allow, or mark [IF ALLOWED].
- The recontact message must never ask for a better rating or survey score.
- If the ticket shows the customer was vulnerable or harmed, flag it for a manager.
</constraints>

<output_format>
## What happened
## Main cause
Cause, contributing causes, and quoted evidence.
## What the agent could control
Two short lists: done well, to improve.
## Fixes
Table: Fix | Level (agent, content, policy, product) | Owner.
## Recontact decision
## Recontact message
Or "Not advised" with the reason.
</output_format>
