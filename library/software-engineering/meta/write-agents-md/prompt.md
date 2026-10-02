---
schema: 1
id: write-agents-md
kind: prompt
title: Write an AGENTS.md
description: Writes or updates a repository's AGENTS.md with the verified commands, layout, conventions and boundaries a coding agent needs, and nothing generic. Use when setting up a repo for coding agents.
category: meta
version: 1.0.0
status: experimental
stage: [build, maintain]
role: [software-engineer, tech-lead, maintainer]
requires: [repo-read, file-write]
inputs: [repo]
output: [docs]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [agents-md, agent-instructions, context-engineering]
args:
  - name: notes
    description: Rules the code cannot show, such as "never edit generated clients" or "ask before adding dependencies".
    type: text
output_contract:
  format: markdown
  sections: [Commands, Layout, Conventions, Boundaries]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
AGENTS.md is the instruction file that coding agents read at the start of every session (several tools read it directly; others read CLAUDE.md, GEMINI.md or their own rules files, which can point to it). Every line costs context in every session, so it should hold only what an agent would otherwise get wrong: the exact commands, the non-obvious layout, the conventions that differ from the language defaults, and the things it must never do. Generic advice ("write clean code", "add tests") is ignored and wastes space. A wrong command is worse than none, because the agent will run it with confidence.
</context>

<task>
Write `AGENTS.md` for the repository in the working directory.
{{#notes}}
Rules from the maintainers: {{notes}}
{{/notes}}

1. Read what exists: any AGENTS.md, CLAUDE.md, GEMINI.md, `.cursor/rules/`, `.github/copilot-instructions.md`, CONTRIBUTING and README. If an AGENTS.md exists, update it and keep accurate content.
2. Collect the commands from the sources of truth: package scripts, Makefile or task runner, CI workflows (the commands CI runs are the ones that must pass), and lint, format and type-check configs. Include how to run a single test, not only the whole suite.
3. If you can run commands, run the cheap ones (install check, lint, type check, one test) and record which you ran. Mark the ones you could not run.
4. Map the layout only where it is not obvious: where the entry points are, which folders are generated or vendored, where tests live, and module boundaries.
5. Write down the conventions an agent would get wrong from defaults: naming, error handling, logging, the test style, import rules, the commit and PR format, the branch policy. Take each from the config files or from consistent patterns in the code, and cite the file.
6. Write boundaries: files and folders never to edit, commands never to run, actions that need the user's approval (dependencies, migrations, deleting files, pushing).
</task>

<constraints>
- Every command must come from the repo's scripts, CI or docs. Never invent a script name or flag.
- No generic advice, no restating the README, no product description beyond one line.
- Keep it under about 120 lines. Prefer short imperative bullets.
- Do not include secrets, tokens, internal hostnames or personal data.
- Do not create tool-specific files (CLAUDE.md, rules folders) unless asked; mention in your reply which tools need a pointer to AGENTS.md.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
Write `AGENTS.md` with: a one-line project description, then `## Commands`, `## Layout`, `## Conventions`, `## Boundaries` (add `## Commits and PRs` if the repo has rules for them).
Then reply with: the commands you ran and their real results, the commands you could not verify, and anything in the existing instruction files that contradicted the code.
</output_format>
