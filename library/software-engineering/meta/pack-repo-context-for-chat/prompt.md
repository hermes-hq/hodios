---
schema: 1
id: pack-repo-context-for-chat
kind: prompt
title: Pack repo context for a chat assistant
description: Selects and bundles the files, tree and summary a chat assistant needs to answer one coding question, within a token budget and with secrets and irrelevant files left out.
category: meta
version: 1.0.0
status: incubating
stage: [discover]
role: [software-engineer]
requires: [repo-read]
inputs: [repo, text]
output: [summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [coding-agents, context-engineering, token-budget, chat-assistant]
pairs_with:
  prompts: [exclude-files-from-agent-context, write-agent-handoff, write-subagent-brief]
args:
  - name: question
    description: The question you will ask the chat assistant, such as why a request fails, how to add a feature, or a design review of one module.
    type: text
    required: true
  - name: budget
    description: Rough token budget for the pack (for example 30000). Leave empty for about 25000.
    type: string
output_contract:
  format: markdown
  sections: [Selection, Context pack, Left out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A chat assistant without repository access answers from what you paste. Pasting the whole repository wastes the budget on lockfiles and generated code and buries the relevant lines; pasting one file leaves out the caller, the type definition and the config that explain the bug. A good pack follows the question: the files on the code path in full, their direct neighbours as signatures only, the config that changes behaviour, a pruned directory tree so the assistant knows what exists, and a short summary of stack and conventions. Rough sizing is about four characters per token for code. Secrets hide in places people forget: .env files, test fixtures with real tokens, config with connection strings, logs.
</context>

<task>
Build a context pack for this question:
<question>
{{question}}
</question>
{{#budget}}Token budget: {{budget}}.{{/budget}} If no budget is given, aim for about 25000 tokens.

1. Find the code path the question touches: entry point, the functions involved, types, config and tests. Read them before selecting.
2. Rank files into full (on the path), signatures only (neighbours: exported function and type signatures, no bodies) and mention only (exists, not included).
3. Estimate the size of each selected item and fit the pack into the budget, cutting from the bottom of the ranking.
4. Exclude secrets and noise: .env and key files, credentials in config (replace values with a placeholder and say so), lockfiles, generated code, build output, binaries, vendored dependencies, large data.
5. Write the pack: a three-to-five line summary (stack, versions, how to run, conventions relevant to the question), the pruned tree, then each file under a heading with its path, then the question restated at the end.
</task>

<constraints>
- Never include secret values. If you find one, leave it out and tell the user where it is.
- Do not summarise code you include in full; the assistant should read the real code.
- Do not invent file contents; only include what you read.
</constraints>

<output_format>
## Selection
Table: path, treatment (full, signatures, mention), estimated tokens, why.
## Context pack
One fenced block ready to paste, under the budget.
## Left out
What was excluded and why, including any secrets found (location only).
</output_format>
