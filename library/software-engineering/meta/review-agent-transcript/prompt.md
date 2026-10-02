---
schema: 1
id: review-agent-transcript
kind: prompt
title: Review a coding agent transcript
description: Reviews a coding agent session transcript for where it went wrong (bad assumptions, skipped verification, scope creep, looping) and turns each failure into an instruction-file or prompt change.
category: meta
version: 1.0.0
status: experimental
stage: [review, maintain]
role: [software-engineer, tech-lead, engineering-manager]
requires: [none]
inputs: [transcript, file]
output: [report, diff]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, agents-md, session-review, failure-analysis]
pairs_with:
  prompts: [write-agents-md, write-subagent-brief, write-agent-skill]
args:
  - name: transcript
    description: The session transcript or log - user messages, agent messages, tool calls and their results. Trim very long tool outputs but keep errors.
    type: text
    required: true
  - name: instructions_file
    description: The instruction files the agent had loaded (AGENTS.md, CLAUDE.md, GEMINI.md, rules files, custom instructions), and the original prompt if separate.
    type: text
  - name: goal
    description: What you wanted from the session and what went wrong from your point of view.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Key moments, Failures, Instruction file changes, Prompt changes, Other setup changes, Keep doing, Not fixable by instructions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a coding agent session goes badly, the cause is usually visible in the transcript a few turns before the visible failure: an assumption it never checked, a file it never read, a test it never ran, an instruction that was missing, ambiguous or contradicted by another one. Adding a vague line such as "be careful" or an all-caps "NEVER" to the instruction file rarely helps. What helps is a specific instruction placed where the agent will read it, with the reason, or a change to the setup (a command, a check, a tool) that makes the right behaviour the easy one. Some failures are model variance and no instruction will fix them; saying so prevents instruction files from bloating.
</context>

<task>
Review this agent session:

<transcript>
{{transcript}}
</transcript>
{{#instructions_file}}

<instructions_file>
{{instructions_file}}
</instructions_file>
{{/instructions_file}}
{{#goal}}

What the user wanted and what went wrong: {{goal}}
{{/goal}}

1. Reconstruct the task: what the user asked, what a good outcome would have been, and how the session actually ended.
2. Find the key moments: the turns where the session's direction changed, for better or worse. For each failure, find the earliest turn where it became likely, not only where it became visible.
3. Classify each failure:
   - Misread the request, or invented scope the user did not ask for.
   - Acted on an assumption it could have checked (an API, a file's contents, a command's behaviour, the project's conventions).
   - Missing context: did not read relevant files, docs or existing patterns.
   - Skipped verification: claimed success without running the tests, build, type check or the app; or misreported a result.
   - Scope creep: changed files or behaviour outside the task.
   - Looping or thrashing: repeated a failing approach, or edited back and forth, without new information.
   - Stopped early or handed work back that it could have finished; or the opposite, pushed on when it should have asked.
   - Unsafe or destructive action, or one taken without the confirmation the instructions require.
   - Ignored an existing instruction, or followed one that was wrong, outdated or contradicted by another.
   - Context loss: forgot earlier decisions in a long session.
   Quote the evidence (turn and a short excerpt) for each.
4. For each failure, decide the cause in the setup: instruction missing, ambiguous, buried, contradicted or outdated; the prompt was underspecified; a tool, command or permission was missing; the environment misled the agent (flaky test, stale docs); or model variance with no setup cause.
5. Propose the smallest change that would have prevented it, in order of leverage: fix or remove a wrong or conflicting instruction; add a specific instruction with its reason and the exact command or file it refers to; change how the task is prompted; add a check the agent can run (a script, a test command, a pre-commit hook); change permissions. Write each instruction as the agent would read it: concrete, positive ("Run `npm test -- path` after editing a file under src/") rather than vague or shouted.
6. Note what the agent did well that the instructions should keep encouraging.
7. Check the result for bloat: if the instruction file would grow by more than a few lines, merge or cut instead, and point out any existing lines that are now redundant.
</task>

<constraints>
- Every failure cites transcript evidence. Do not speculate about the model's internal reasoning beyond what the transcript shows.
- Prefer one high-leverage instruction over several narrow ones. Do not propose an instruction for a one-off mistake unless the cost of a repeat is high.
- Keep proposed instructions tool-neutral where possible, so they work in any agent that reads the file.
- Do not include secrets, tokens or personal data from the transcript in the output.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five lines: what was asked, what happened, and the root causes.

## Key moments
Table: turn | what happened | effect.

## Failures
Numbered, most costly first. Each: category - evidence (turn and quote) - setup cause - proposed change.

## Instruction file changes
A unified diff against the given instruction file, or the new lines with where they go if no file was given. Include removals of conflicting or redundant lines.

## Prompt changes
How the user could phrase the task next time, if that was a cause. "None" otherwise.

## Other setup changes
Commands, checks, hooks, tools or permissions to add or change.

## Keep doing
Bullets.

## Not fixable by instructions
Failures that look like model variance, and how to work around them (smaller tasks, checkpoints, review).
</output_format>
