---
schema: 1
id: design-workflow-orchestration
kind: prompt
title: Design a long-running business process
description: Designs a long-running business process (onboarding, order fulfilment, approvals) on a durable workflow engine or on queues and cron, with timers, retries, human steps and versioning.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, backend-engineer, tech-lead]
requires: [none]
inputs: [spec, text, document, repo]
output: [docs, diagram, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [durable-execution, workflow-engine, temporal, step-functions, state-machine]
pairs_with:
  personas: [software-architect]
  prompts: [design-distributed-transaction, move-cron-jobs-to-orchestrator, implement-background-job, choose-service-communication-style]
args:
  - name: process
    description: The business process from start to finish, with its steps, waits (for a user, a payment, a deadline), the systems involved, and how long it can take.
    type: text
    required: true
  - name: environment
    description: Current stack, cloud, existing job or queue tools, any workflow engine already in use, and team familiarity.
    type: text
  - name: problems
    description: What goes wrong today if the process exists, for example stuck orders, lost reminders, no visibility.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Process model, Steps and activities, Timers and human steps, Failures and compensation, Versioning and operations, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Processes that last minutes to months (onboarding with document checks, order fulfilment, subscription dunning, approval chains) are usually built as a status column, a few queue consumers and cron jobs that scan for rows in a state. That works until steps get lost between them, timers drift, nobody can tell where a given order is stuck, and changing the flow breaks instances already in progress. Durable workflow engines (Temporal, AWS Step Functions, Azure Durable Functions, Camunda and similar) persist the progress of each instance, so code can wait for days, retry activities with policies and resume after crashes. They add their own constraints: workflow code must be deterministic (no direct clock, random or I/O calls outside activities), activities must be idempotent because they can be retried, and changing a running workflow's definition needs explicit versioning. A state machine in your own database with an outbox and a scheduler is a valid choice for simple flows; the decision depends on the number of steps, waits, branches and how much visibility is needed.
</context>

<task>
<process>
{{process}}
</process>

{{#environment}}
<environment>
{{environment}}
</environment>
{{/environment}}

{{#problems}}
<problems>
{{problems}}
</problems>
{{/problems}}

1. If a repository is available, read how the process is implemented today (status fields, consumers, scheduled jobs) and say what you read.
2. Choose the approach: a durable workflow engine (name the realistic options for this environment), a database state machine with outbox and scheduler, or a managed state-machine service, from the number of steps, length of waits, branching, volume, need for visibility and the team's capacity to run another system.
3. Model the process: states and transitions or workflow steps, inputs and outputs, and one instance identifier that ties everything together. Draw it.
4. Define steps and activities: the external call each makes, timeout, retry policy, idempotency key, and which are safe to retry.
5. Define timers and human steps: deadlines and reminders, waiting for signals such as a payment or an approval, escalation when nobody acts, and cancellation by the user.
6. Define failures and compensation: what happens when a step fails permanently, which earlier steps must be undone, and when a person is alerted to fix an instance by hand.
7. Define versioning and operations: how definition changes apply to in-flight instances, how to find and inspect stuck instances, metrics and alerts, and data retention for completed instances.
</task>

<constraints>
- Do not put non-deterministic calls (current time, random values, network or database access) directly in workflow code for engines that replay; keep them in activities.
- Every activity that can be retried must be idempotent or protected by an idempotency key.
- Do not recommend adding a workflow engine for a two-step process without saying what it costs to run.
- Do not invent engine limits or prices; say how to check.
{{> output/uncertainty}}
</constraints>

<output_format>
## Approach
Choice and reason in at most 6 lines.
## Process model
Mermaid state or flow diagram, then a short description.
## Steps and activities
Table: step, external call, timeout, retry policy, idempotency.
## Timers and human steps
## Failures and compensation
## Versioning and operations
## Open questions
Numbered.
</output_format>
