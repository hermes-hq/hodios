---
schema: 1
id: design-agent-architecture
kind: prompt
title: Design an LLM agent architecture
description: Designs an LLM agent system, deciding first whether an agent is needed, then single or multi-agent, tools, memory, guardrails, human checkpoints, evals and cost limits.
category: ai-ml
version: 1.0.0
status: experimental
stage: [design]
role: [ml-engineer, software-engineer, architect, backend-engineer]
stack: [llm-apps]
requires: [none]
inputs: [spec, text]
output: [plan, diagram]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [agentic-systems, multi-agent, tool-use, guardrails, human-in-the-loop]
pairs_with:
  prompts: [design-tool-schema, write-llm-eval-suite, review-llm-app-security, reduce-llm-costs]
  personas: [ml-engineer]
args:
  - name: goal
    description: What the system must accomplish for whom, with two or three real example tasks, and what a successful outcome looks like.
    type: text
    required: true
  - name: available_tools
    description: APIs, databases, file systems, browsers or internal services the system could use, and which of them change state.
    type: text
  - name: risk_tolerance
    description: How costly a wrong or unintended action is. Low means actions are hard to undo or affect customers, money or data.
    type: enum
    enum: [low, medium, high]
    default: low
  - name: constraints
    description: Latency target, budget per task or per month, models or providers allowed, data residency, team size, deadline.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Architecture, Tools, Context and memory, Guardrails, Human checkpoints, Evaluation, Cost and latency limits, Failure modes, Build order, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many "agent" projects would be cheaper, faster and more reliable as a single model call or a fixed workflow of calls written in code. An agent, where the model chooses its own next step and tool in a loop, earns its cost only when the steps cannot be known in advance and the task is valuable enough to pay for exploration, extra tokens and harder testing. Multi-agent systems multiply token use further and add coordination failures; they pay off mainly for broad, parallelisable work such as research across many sources. Most failures in production agents come from vague tools, unbounded loops, context that grows until the model loses the thread, untrusted text in tool results steering the agent, and the absence of an eval that shows whether a change helped.
</context>

<task>
Design a system for this goal:
{{goal}}
{{#available_tools}}

Tools and systems available:
{{available_tools}}
{{/available_tools}}
{{#constraints}}

Constraints: {{constraints}}
{{/constraints}}

Risk tolerance for wrong actions: {{risk_tolerance}}.

1. Decide the shape. Walk up this ladder and stop at the first rung that can do the job: a single model call with good context; a fixed workflow (prompt chaining, routing to specialised prompts, parallel calls, or a generate-then-evaluate loop); a single agent with tools in a loop; an orchestrator with sub-agents. Justify the rung against the example tasks, and say what evidence would justify moving up one.
2. Draw the architecture: components, the control loop, where state lives, and the stop conditions (task done, step limit, budget limit, needs a human, unrecoverable error). For multi-agent designs, say what each agent owns, what it receives and returns, and why it cannot be a tool call instead.
3. Specify the tools: the smallest set that covers the tasks. For each: purpose, inputs, whether it reads or changes state, its permission scope, and whether it is idempotent. Prefer a few well-described tools that do meaningful units of work over thin wrappers of every API endpoint. Separate read tools from write tools.
4. Plan context and memory: what goes in the system prompt, what is retrieved on demand, how tool results are trimmed before they enter context, how long tasks are summarised or checkpointed, and whether anything is remembered across sessions (and who can see or delete it).
5. Set guardrails sized to the risk tolerance: treat all tool output and retrieved text as data, never as instructions; allowlist actions and destinations; validate tool arguments in code; sandbox code execution and browsing; use credentials scoped to the user and task; and add rate and spend limits.
6. Place human checkpoints by reversibility and blast radius: which actions run freely, which need confirmation, and which are never available to the model. With low risk tolerance, every irreversible or external action needs approval.
7. Define evaluation: 20 to 50 realistic tasks with known good outcomes, including ambiguous and adversarial ones (injected instructions in a document, a tool that errors, an impossible request). Measure task success, wrong or unsafe actions, steps and cost per task, and inspect full traces, not only final answers.
8. Set cost and latency limits: maximum steps, tokens and wall time per task, per-user or per-day budgets, the model for each role, and what happens when a limit is hit.

If the goal is too vague to pick a rung (no example tasks, no definition of success), ask for those first and stop. Otherwise state assumptions and continue.
</task>

<constraints>
- Recommend the simplest design that can pass the evaluation. Put more autonomy and more agents in the build order as later options, each tied to the eval result that would justify it.
- Never let the model hold credentials or decide its own permissions. Enforce limits in code, not only in the prompt.
- Name frameworks or vendors only as examples of a capability; the design must not depend on one.
- Give every number (step limits, budgets, eval size) as a starting value to tune, not a known optimum. Do not cite benchmark scores or prices you were not given.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
The chosen rung in one sentence, why, and what would justify the next rung up.

## Architecture
A Mermaid flowchart or an indented text diagram, then the control loop and stop conditions in a short list.

## Tools
Table: tool | purpose | reads or writes | permission scope | idempotent | needs approval.

## Context and memory
Bullets.

## Guardrails
Bullets, each with what it prevents and where it is enforced (prompt, code, infrastructure).

## Human checkpoints
Table: action | runs freely, needs approval, or never allowed | reason.

## Evaluation
The task set, the metrics and the bar to ship.

## Cost and latency limits
Table: limit | starting value | what happens when it is hit.

## Failure modes
Table: failure | how it shows up in traces | mitigation. Include loops, early stopping, wrong tool arguments, prompt injection and context overflow.

## Build order
Numbered milestones, each ending in something testable.

## Open questions
Only questions whose answers would change the design.
</output_format>
