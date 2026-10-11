---
schema: 1
id: evaluate-agent-trajectories
kind: prompt
title: Evaluate multi-step agent trajectories
description: Builds an eval for a multi-step LLM agent that runs scripted scenarios with simulated tools and scores task success, tool choice, step count and unsafe actions across repeated runs.
category: ai-ml
version: 1.0.0
status: incubating
stage: [verify]
role: [ml-engineer, qa-engineer, backend-engineer, software-engineer]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [agent-evals, trajectory-scoring, simulated-tools, pass-at-k]
pairs_with:
  prompts: [write-llm-eval-suite, design-agent-architecture, generate-synthetic-test-data]
args:
  - name: agent
    description: What the agent does, its tools, where the code lives, and the tasks it must handle well.
    type: text
    required: true
  - name: risks
    description: Actions that must never happen or need approval (for example deleting data, emailing customers, spending money).
    type: text
output_contract:
  format: markdown
  sections: [Scenarios, Metrics, Harness, Code, Results, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Single-response evals miss what goes wrong with agents: the right final answer reached through an unsafe action, ten wasted tool calls, a task that succeeds one run in three, or a loop that only appears after a tool error. Agent evals need scenarios with a known start state, tools that are simulated or sandboxed so runs are repeatable and harmless, and graders on the end state (did the order actually get refunded in the fake system?) rather than on how the final message sounds. Because agents are non-deterministic, each scenario should run several times and report the pass rate, not one pass or fail. Scoring the exact sequence of tool calls is usually too strict; score outcomes, forbidden actions and efficiency bounds instead.
</context>

<task>
Build a trajectory eval for: {{agent}}
{{#risks}}
Forbidden or gated actions: {{risks}}
{{/risks}}

1. Read the agent loop and tool implementations. Find the seam where tools can be swapped for simulated versions with an in-memory state.
2. Write 15 to 40 scenarios across: common tasks, tasks needing several tools in order, ambiguous requests where the right move is to ask, impossible tasks where the right move is to say so, tool failures injected mid-run, and adversarial inputs (instructions hidden in tool results or user text). Each scenario has an initial state, the user input, the success condition on the end state, forbidden actions and a step budget.
3. Metrics per scenario: success (end-state check by code), forbidden action taken (any one fails the scenario), steps and tool calls used against the budget, tokens and latency, and a judge-scored criterion only where code cannot check (for example whether a clarifying question was appropriate).
4. Harness: run each scenario N times (at least 3, more for flaky ones), record full traces, and report pass rate per scenario and overall, plus pass-all-N for critical scenarios.
5. Implement the simulated tools, scenario files, runner and report in the project's language and test framework. Reuse an eval framework the project already has.
6. Run the suite once if possible and report the results and the three most common failure patterns seen in traces.
7. Say how to use it in CI: which scenarios gate merges, the thresholds, and the cost of a full run.
</task>

<constraints>
- Never point the eval at real external systems with side effects; simulate or sandbox every tool that writes.
- Do not grade only the final message text when the end state can be checked by code.
- Report results honestly with run counts; do not claim reliability from a single run.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Scenarios
Table: id | type | input | success condition | forbidden actions | step budget.
## Metrics
Each metric, how it is computed and its threshold.
## Harness
How tools are simulated, how runs repeat, where traces go.
## Code
Code blocks with file paths.
## Results
Pass rates from the run, or a plain statement that it was not run.
## Next steps
CI gating, thresholds and the failure patterns to fix first.
</output_format>
