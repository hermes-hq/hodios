---
schema: 1
id: run-coding-agent-on-local-model
kind: prompt
title: Run a coding agent on a local model
description: Sets up a coding agent to run on a local or self-hosted model, with model size chosen by hardware, context length, tool-calling support, configuration and honest expectations.
category: meta
version: 1.0.0
status: incubating
stage: [plan, build]
role: [software-engineer, ml-engineer]
requires: [none]
inputs: [text]
output: [plan, config, explanation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, local-llm, open-weight-models, tool-calling, privacy]
pairs_with:
  prompts: [choose-coding-agent-tool, cut-coding-agent-spend, self-host-open-weight-llm]
args:
  - name: hardware
    description: The machine or server - GPU model and VRAM, or Apple silicon and unified memory, system RAM, and whether several people share it.
    type: text
    required: true
  - name: goal
    description: Why local (privacy, offline, cost, policy), which coding agent or editor you want to use, and the kind of work (completions, small edits, long autonomous tasks).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit check, Model choice, Serving setup, Agent config, Expectations, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Coding agents are harder on a model than chat. The agent's system prompt and tool definitions alone often take thousands to tens of thousands of tokens before any code is read, and each turn adds file contents and command output, so a long context window actually available at runtime matters. The model must produce tool calls in the exact format the serving layer expects; many smaller open-weight models, or the wrong chat template, produce malformed calls that make the agent loop or stall. Memory needed is roughly the weights (parameter count times bytes per weight at the chosen quantisation) plus the KV cache, which grows with context length and concurrent users. Several local runtimes default to a small context and silently truncate unless it is set explicitly. Most agents connect through an OpenAI-compatible endpoint. Realistic expectations: local models are useful for completions, explanations and small, well-scoped edits; long unattended tasks usually need a larger model than a single consumer GPU holds.
</context>

<task>
Plan a local model setup.
<hardware>
{{hardware}}
</hardware>
<goal>
{{goal}}
</goal>

1. Fit check: given the hardware and goal, say what is realistic. If the goal (for example long autonomous tasks) does not fit the hardware, say so plainly and propose a split (local for some work, a hosted model for the rest) or a different goal.
2. Model choice: describe the size class and quantisation that fit the memory with room for the needed context, showing the rough calculation. Recommend checking current open-weight coding models with strong tool-calling support rather than naming a specific model as best; if you mention examples, say they may be outdated.
3. Serving setup: the kind of runtime (local desktop runner or a server-class inference engine for shared use), setting the context length explicitly, the chat template or tool-call parser, and exposing an OpenAI-compatible endpoint on localhost or a private network only.
4. Agent config: how to point the chosen agent at the endpoint (base URL, model name, API key placeholder), turning off features that assume a hosted model if needed. Mark exact keys you are unsure of with "check against the tool's documentation".
5. Expectations: speed (tokens per second range depends heavily on hardware; measure rather than promise), quality relative to hosted frontier models, and the signs that the model is the bottleneck (malformed tool calls, loops, ignoring instructions).
6. Next steps: a 30-minute trial with three tasks of increasing size and what to measure.
</task>

<constraints>
- Do not claim a specific model is the best or quote benchmark numbers you cannot support.
- Do not expose the inference endpoint to the public internet.
- Respect the model licence; tell the user to check it for commercial use.
{{> output/uncertainty}}
</constraints>

<output_format>
## Fit check
Short paragraph.
## Model choice
Size class, quantisation, the memory estimate with working.
## Serving setup
Numbered steps.
## Agent config
Fenced snippet.
## Expectations
Bullets.
## Next steps
The trial plan.
</output_format>
