---
schema: 1
id: ask-manager-to-prioritise-work
kind: prompt
title: Ask your manager to prioritise your work
description: Writes an email that lays out your current workload with effort and deadlines and asks your manager which items to drop, delay or reassign, with a proposed order to approve.
category: email
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, data-analyst, project-manager]
requires: [none]
inputs: [text, notes]
output: [message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [workload, overload, managing-up, capacity]
pairs_with:
  prompts: [push-back-on-deadline-by-email, rebalance-team-workload, juggle-competing-deadlines]
args:
  - name: workload
    description: Everything currently on your plate - each item with who asked, deadline, rough effort left, and how far along it is. A messy list is fine.
    type: text
    required: true
  - name: capacity
    description: How much time you really have, for example "about 25 hours a week after meetings and support", and anything coming up such as leave.
    type: string
  - name: trigger
    description: What prompted this now, for example "new urgent request from the CEO" or "I've worked late for three weeks".
    type: string
output_contract:
  format: markdown
  sections: [Workload table, Email, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Overloaded people tend to send one of two emails: a vague "I'm swamped" that a manager cannot act on, or nothing at all until something is missed. A manager can only re-prioritise what they can see. The message that works is a short table of every commitment with deadline, effort left and requester, a plain comparison of total effort against real capacity, and a proposed order with the specific items the sender suggests dropping, delaying or handing to someone else. That turns a feeling into a decision the manager can make in five minutes, and it moves the trade-off to the person whose job it is. It also protects the sender: if the manager keeps everything, the risk is now recorded and shared. Framing matters: the email is about outcomes for the team, not a complaint, and it proposes rather than demands.
</context>

<task>
Write an email asking the manager to prioritise.{{#trigger}} Trigger: {{trigger}}.{{/trigger}}{{#capacity}} Capacity: {{capacity}}.{{/capacity}}

<workload>
{{workload}}
</workload>

1. Turn the workload into a table: item, requester, deadline, effort left, status. Mark unknown effort as `?` and list it under Notes rather than guessing.
2. Add up effort left before the nearest deadlines and compare with capacity. State the gap in hours or days. If capacity was not given, use `[need: hours available]` and say the comparison depends on it.
3. Propose an order: what to do first and why (deadline, business impact, who is waiting), and two or three specific items to drop, delay (with a new date) or reassign (role, not an invented name).
4. Write the email:
   - Subject: "Help prioritising: [n] items, [gap] over capacity by [date]".
   - First lines: the problem in one sentence and the ask ("Could you confirm the order below, or tell me what to change, by [day]?").
   - The table (or a compact list if the user prefers).
   - The proposal.
   - One line on what happens if nothing changes (which item slips first).
   - An offer to talk it through in the next one-to-one or a 15-minute call.
5. Under Notes, list requesters who should hear about any delayed item once the manager decides, and any effort estimates to firm up.
</task>

<constraints>
- Body under about 220 words, excluding the table.
- Neutral and solution-focused: no complaining about colleagues, no "I can't cope", no martyr tone. If the user mentions health effects of overwork, suggest raising that in person and, if needed, with HR or a doctor, outside this email.
- Never invent tasks, estimates or deadlines.
- Do not decide on the manager's behalf; propose and ask.
</constraints>

<output_format>
## Workload table
Markdown table of the items.
## Email
Subject line, then the body (including the table or a compact list).
## Notes
Bullets: people to inform after the decision, estimates to firm up, placeholders.
</output_format>
