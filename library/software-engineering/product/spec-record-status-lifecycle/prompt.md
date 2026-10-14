---
schema: 1
id: spec-record-status-lifecycle
kind: prompt
title: Specify a record's status lifecycle
description: Specifies the statuses of a business record such as an order, claim or request, with allowed transitions, who or what triggers each, side effects, what each role sees and how mistakes are reversed.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, backend-engineer, qa-engineer]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [docs, table, diagram, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [statuses, workflow-states, business-rules, requirements]
pairs_with:
  prompts: [implement-state-machine, spec-approval-workflow, write-acceptance-criteria]
args:
  - name: record_and_process
    description: The record (order, support case, application, purchase request...) and how it moves through the business today, in words.
    type: text
    required: true
  - name: context
    description: Roles involved, systems that change the status automatically, and statuses already shown to customers.
    type: text
output_contract:
  format: markdown
  sections: [Statuses, Transition table, Side effects, Visibility by role, Lifecycle diagram, Reversals and stuck records, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Status fields grow by accretion: someone adds "On hold", another team adds "Partially shipped", and soon nobody knows which transitions are legal, which ones send an email to the customer, or how to undo a status set by mistake. A useful lifecycle spec is a short list of statuses each with an exact meaning and entry condition, a transition table that is the only source of allowed moves, a named trigger for each move (a person in a role, a system event, a timer), and the side effects that fire (notifications, payments, stock, SLAs). It separates the internal status from what a customer sees, since customers rarely need ten states. It also covers the unhappy paths that real operations hit daily: records stuck because an integration never answered, corrections after a wrong transition, and statuses that must not be reversed because money or stock already moved.
</context>

<task>
<process>
{{record_and_process}}
</process>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Propose the list of statuses, each with a one-sentence meaning, an entry condition, and whether it is final. Merge statuses that mean the same thing and split ones that hide two meanings; explain each merge or split.
2. Write a transition table: from, to, trigger (role, system event or timer), guard conditions, and whether the transition is reversible.
3. List side effects per transition: notifications and to whom, payments or refunds, stock or capacity, timers started or stopped, integrations called, and what happens if a side effect fails.
4. Specify visibility by role, including a simplified customer-facing status mapping if customers see the record.
5. Specify reversals and stuck records: how a wrong transition is corrected, which transitions can never be reversed and the compensating action instead, timeouts for records waiting on people or systems, and who is alerted.
6. Draw the lifecycle as a Mermaid state diagram that matches the transition table exactly.
7. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- The diagram and the transition table must agree; every arrow appears in the table and vice versa.
- Do not invent business rules that change money, legal status or customer commitments; propose them as questions.
- Keep the status list as short as the process allows; justify every status beyond about seven.
- If the process description is missing who acts at each step, ask instead of guessing roles.
</constraints>

<output_format>
## Statuses
Table: status, meaning, entry condition, final (yes/no).
## Transition table
Table: from, to, trigger, guards, reversible.
## Side effects
Table: transition, effects, on failure.
## Visibility by role
Table: internal status, customer-facing label, roles that see it.
## Lifecycle diagram
A Mermaid stateDiagram-v2 block matching the transition table.
## Reversals and stuck records
Numbered rules.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
