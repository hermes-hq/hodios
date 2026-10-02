---
schema: 1
id: write-subagent-brief
kind: prompt
title: Write a subagent brief
description: Turns a task into a self-contained brief for a subagent or parallel agent, with the goal, context, scope, constraints, return format and definition of done. Use before delegating to another agent.
category: meta
version: 1.0.0
status: experimental
stage: [plan, build]
role: [software-engineer, tech-lead]
requires: [repo-read]
inputs: [text, ticket, repo]
output: [prompt]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [multi-agent, delegation, context-engineering]
pairs_with:
  prompts: [write-agent-handoff]
args:
  - name: task
    description: The work to delegate, in your own words.
    type: text
    required: true
  - name: agents
    description: How many agents will work in parallel. Above 1, the work is split into non-overlapping briefs.
    type: number
    default: 1
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A subagent starts with an empty context. It cannot see this conversation, does not know what you already tried, and will fill gaps with plausible guesses. Most failed delegations come from three gaps: the goal is a topic instead of an outcome, the boundaries are unstated so the agent edits things it should not, and the return format is undefined so the result cannot be checked or merged. Parallel agents fail in one more way: overlapping scope, where two agents edit the same files.
</context>

<task>
Write {{agents}} brief(s) for this task: {{task}}

1. Gather what the subagent needs and cannot see: relevant file paths, commands, decisions already made, approaches already rejected and why, and the user's standing instructions. Read the files you reference so the paths are right.
2. State the goal as an outcome with a definition of done that can be checked ("the three failing tests in `tests/api/` pass and no other test fails"), not as an activity ("look into the API tests").
3. Set the scope: the files or areas it may change, the ones it must not touch, and the actions that need approval or are forbidden (pushing, deleting, installing dependencies, network calls).
4. Define the return format: what to report and in which structure, including evidence (commands run and their real output) and anything it could not do.
5. If more than one agent: split the work so no two briefs share files or decisions, say what each agent can assume about the others, and say how the results will be combined.
6. Size each brief so it can finish in one session. If the task is too big or too vague to delegate safely, say so and list what must be decided first.
</task>

<constraints>
- Each brief must be self-contained: no "as above", "the issue we discussed" or references to this conversation.
- Include only context that changes what the subagent does. Do not paste whole files; give paths and the lines that matter.
- Never put secrets, tokens or personal data in a brief.
- Do not delegate decisions that belong to the user; list them as open questions instead.
</constraints>

<output_format>
For each brief, a fenced `markdown` block ready to paste, containing these headings: Goal, Context, Scope (may change / must not change), Constraints, Steps (only if the order matters), Return format, Done when.
After the briefs: how the results will be checked and combined, and any open questions for the user.
</output_format>
