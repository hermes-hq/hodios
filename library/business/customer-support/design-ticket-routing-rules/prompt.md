---
schema: 1
id: design-ticket-routing-rules
kind: prompt
title: Design helpdesk routing rules
description: Designs helpdesk routing and automation rules - assignment by skill, language, priority and customer tier, with overflow, fallbacks and checks for loops and conflicts.
category: customer-support
version: 1.0.0
status: incubating
stage: [design]
role: [manager, operations-manager, support-agent]
requires: [none]
inputs: [text, config, dataset]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [ticket-routing, helpdesk-automation, skills-based-routing, queue-management, sla]
pairs_with:
  prompts: [design-ticket-tagging-scheme, design-escalation-process, plan-support-staffing]
args:
  - name: support_setup
    description: "Channels, teams or queues and their skills and languages, hours and time zones, customer tiers or plans, service targets, the fields available on tickets (contact reason, language, plan), and the volume per channel."
    type: text
    required: true
  - name: current_problems
    description: "What goes wrong today: tickets in the wrong queue, VIPs waiting, agents cherry-picking, rules firing twice, and your current rules if you have them. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Routing model, Rule table, Priority and targets, Overflow and fallback, Loop and conflict checks, Test cases, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design routing for support teams. Routing breaks in predictable ways: rules evaluated in the wrong order so a general rule catches tickets before the specific one, two automations that update the same field and trigger each other in a loop, a specialist queue with one person so tickets sit when they are off, priority based on how loud the customer is instead of impact, and agents picking easy tickets from a shared pool. Good routing uses few inputs that are reliable at arrival (channel, language, plan or tier, a contact reason the customer selected or a classifier set), sends everything else to a general queue rather than guessing, has an owner for every queue in every open hour, and has a timed fallback so no ticket waits forever in a queue nobody is watching.
</context>

<task>
Design the routing rules.

<support_setup>
{{support_setup}}
</support_setup>
{{#current_problems}}
<current_problems>
{{current_problems}}
</current_problems>
{{/current_problems}}

1. Choose the routing model: push assignment (tickets assigned to the next available agent) or a shared pool, per queue, with the reason. Define the queues and who staffs each in each open hour.
2. Write the rule table in evaluation order, most specific first: condition (using only fields reliable at arrival), action (queue, priority, tags), and whether evaluation stops after it. End with a catch-all rule to the general queue.
3. Set priority: an impact-based order (service outage, security or data, payment failure, customer tier, then age) and the response target for each priority, linked to the targets given.
4. Design overflow and fallback: when a queue is over a set wait or the specialist is off, where tickets go next; out-of-hours handling; and how reassigned tickets keep their original arrival time.
5. Check for loops and conflicts: rules that change a field another rule reads, overlapping conditions, tickets that could match no rule, and reopened tickets going back to the right owner.
6. Write 8-12 test cases (an example ticket and the expected queue and priority) to run before going live, including edge cases.
7. Plan the rollout: shadow or test mode if available, a go-live time outside peak, what to watch in week one (unassigned tickets, misroutes, wait by queue), and a rollback.
</task>

<constraints>
- Use only the fields and tools described; mark anything that needs a field you were not told exists as [NEEDS FIELD].
- Do not route on customer sentiment or caps lock alone for priority.
- Every queue must have cover or a fallback for every open hour.
- Describe rules generically; do not assume a specific helpdesk product's features.
</constraints>

<output_format>
## Routing model
## Rule table
Table: Order | Condition | Action | Stop?
## Priority and targets
## Overflow and fallback
## Loop and conflict checks
## Test cases
Table: Example ticket | Expected queue | Expected priority.
## Rollout
</output_format>
