---
schema: 1
id: build-team-prompt-library
kind: prompt
title: Build a team prompt library
description: Designs a shared prompt library for a team - structure, naming, an entry template with variables, ownership, review and versioning - and drafts the first entries for the team's top use cases.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [plan, design]
role: [manager, operations-manager, ml-engineer, product-manager]
requires: [none]
inputs: [text]
output: [plan, prompt, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [prompt-library, team-enablement, prompt-governance, templates]
pairs_with:
  prompts: [write-task-prompt, build-prompt-test-set, build-ai-output-review-checklist]
  personas: [prompt-engineer]
args:
  - name: team
    description: Who the team is, its size, the AI tools it uses, where shared documents live today (wiki, drive, repo), and any data rules.
    type: text
    required: true
  - name: use_cases
    description: The recurring tasks people already use AI for, or want to, ideally with who does them and how often.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Library design, Entry template, Process, Starter entries, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams that use AI daily end up with good prompts scattered across chats and personal notes, duplicated, unowned and silently outdated. A shared library pays off only if people can find the right prompt in seconds, trust that it still works, and know how to propose a better version. That needs a few conventions, kept light enough that people actually follow them: a structure by task, consistent names, a template that makes inputs and limits explicit, an owner per entry, a small test set per prompt, and a review rhythm.

<team>
{{team}}
</team>

<use_cases>
{{use_cases}}
</use_cases>
</context>

<task>
1. If the team's tools, where documents live, or the data rules are missing and would change the design, ask up to three questions and stop.
2. Design the library: where it lives (using the team's existing tools rather than a new product), folder or tag structure by task or function, and a naming convention (verb-object, such as "draft-renewal-email") with three examples from the use cases.
3. Write the entry template: name, purpose in one line, owner, when to use and not use, inputs as named variables in one consistent notation with which are required and their defaults, the prompt itself, an example input and output, known limits, tools or models it was checked on, test cases, last reviewed date and version history.
4. Define the process: who can add or change entries, how a change is proposed and reviewed (a second person runs the test cases before and after), versioning, a quarterly review that retires unused or failing entries, and how feedback from users reaches the owner.
5. Set data rules for the library: no customer or personal data in examples or test cases, no secrets, what may be pasted into which tool.
6. Draft starter entries for the three highest-value use cases in the template, with variables and test cases.
7. Give a rollout plan for the first four weeks with a way to measure adoption.
</task>

<constraints>
- Keep the conventions to what a busy team will follow; prefer five rules everyone keeps over twenty nobody reads.
- Tool-agnostic: no recommendation to buy software unless the team's setup cannot hold a shared document.
- Starter prompts must follow good structure: context, task, constraints, output format, and an instruction to ask for missing inputs rather than invent them.
- Do not invent team facts; use marked placeholders such as [TEAM SIGN-OFF] in starter prompts.
</constraints>

<output_format>
## Library design
Location, structure, naming convention with examples.
## Entry template
One fenced block to copy.
## Process
Numbered: add, change, review, retire, data rules.
## Starter entries
Three filled templates.
## Rollout
Week-by-week table and two adoption measures.
</output_format>
