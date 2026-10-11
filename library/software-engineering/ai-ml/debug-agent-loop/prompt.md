---
schema: 1
id: debug-agent-loop
kind: prompt
title: Debug an LLM agent that loops or stalls
description: Diagnoses an LLM agent you built that loops, repeats tool calls, picks the wrong tool or stops early, by reading its traces, then fixes tool design, prompts or stop rules.
category: ai-ml
version: 1.0.0
status: incubating
stage: [maintain, verify]
role: [ml-engineer, backend-engineer, software-engineer]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [logs, repo]
output: [report, diff, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [agent-debugging, tool-selection, infinite-loop, stop-conditions]
pairs_with:
  prompts: [design-tool-schema, run-tool-using-agent-loop, design-agent-architecture]
args:
  - name: traces
    description: One or more full traces of the bad runs, with the messages, tool calls with arguments, tool results and the final state, plus what should have happened.
    type: text
    required: true
  - name: agent_code
    description: Where the agent loop, system prompt and tool definitions live (paths), or the pasted code.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What happened, Root causes, Fixes, Tests, Check, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Agents that loop or stall are usually not "confused models"; the trace shows a concrete cause. The most common: a tool returns an error or empty result in a form the model cannot act on ("Error" with no detail, a 5,000-line dump that gets truncated), so it calls the same tool again; two tools have overlapping descriptions, so it alternates between them; a tool's result does not say whether the action succeeded, so the model re-checks forever; the system prompt says "be thorough" with no completion criterion; the loop code drops tool results or appends them with the wrong id, so the model never sees them; history trimming removes the result the model needs; and there is no step cap or repeated-call detector. Fixes belong mostly in tool design and loop code, not in more prompt text.
</context>

<task>
Debug this agent.

Traces of the bad runs:
{{traces}}

Agent code: {{agent_code}}

1. Read the loop, system prompt and tool definitions. Then walk each trace step by step and mark the first step where the run went wrong, quoting it.
2. Classify the cause: tool result unusable (error without detail, too large, ambiguous success), tool overlap or poor description, missing tool for the needed action, prompt with no completion criterion or conflicting rules, loop bug (results lost, wrong ids, truncated history), model capability limit, or input outside the agent's scope.
3. Reproduce if possible: write a test or script that replays the trace's inputs against the agent with recorded or stubbed tool results and shows the loop or stall.
4. Fix at the root, smallest change first:
   - Tool results: clear success or failure, an actionable error message, size limits with a summary and a way to page.
   - Tool definitions: distinct names and descriptions saying when to use each and when not to; merge or remove overlapping tools.
   - Prompt: an explicit done condition and what to do when a tool keeps failing (report back, ask the user).
   - Loop: correct result appending, a maximum step count, detection of the same tool call with the same arguments repeated, and a graceful final answer when limits are hit.
5. Rerun the reproduction and the agent's existing tests or evals, and report results. Say which traces are now fixed and which are not verified.
</task>

<constraints>
- Quote trace steps; do not describe behaviour that is not in the trace.
- Do not "fix" by adding longer prompt instructions when the trace shows a tool or loop problem.
- Step caps and repeat detectors are safety nets, not root-cause fixes; ship them alongside the real fix.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What happened
Per trace: the first wrong step quoted, and what followed.
## Root causes
Ranked, each with its class and evidence.
## Fixes
Code and definition changes with file paths.
## Tests
The reproduction and any new tests.
## Check
Commands run with real results.
## Remaining risks
What is not yet verified.
</output_format>
