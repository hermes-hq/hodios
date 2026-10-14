---
schema: 1
id: resume-interrupted-agent-task
kind: prompt
title: Resume an interrupted agent task
description: Reconstructs where an interrupted coding agent task stands from git state, notes and test results, and writes a resume note with done, half-done and next steps before any edits.
category: meta
version: 1.0.0
status: incubating
stage: [discover, operate]
role: [software-engineer]
requires: [repo-read, git, shell]
inputs: [repo, text]
output: [summary, plan]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, session-recovery, git-state, task-continuity]
pairs_with:
  prompts: [write-agent-handoff, recover-from-bad-agent-session, manage-agent-context-for-long-task]
args:
  - name: goal
    description: What the interrupted task was meant to do, as well as you remember it, or the issue or ticket text.
    type: text
    required: true
  - name: what_happened
    description: How it was interrupted (crash, context limit, closed laptop, ran out of budget) and anything you remember about where it was.
    type: text
output_contract:
  format: markdown
  sections: [State found, Task status, Risks, Resume note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a session dies without a handoff, the evidence of where it stood is still on disk: uncommitted changes, commits on the branch, stashes, scratch and plan files, TODO markers, test results. The danger in resuming is acting before reading it all: a new session that starts "continuing" will often redo work, overwrite a half-finished edit, or assume a file is complete when the agent stopped mid-function. Files can be left syntactically broken. A failing test may be the next step of the plan or a regression the agent introduced. So the job is forensic first: read everything, run the checks, decide what each change is, and only then write the next steps.
</context>

<task>
Work out where this task stands.
<goal>
{{goal}}
</goal>
{{#what_happened}}
<what_happened>
{{what_happened}}
</what_happened>
{{/what_happened}}

1. Collect state with read-only git commands: current branch and its base, status, staged and unstaged diff, commits since the base, stash list, and recent reflog entries. Do not checkout, reset, stash, commit or clean anything.
2. Look for the agent's own notes: plan, progress, scratch or handoff files, TODO and FIXME markers added on this branch, and any task list in the conversation the user can paste.
3. Run the fast checks the repository defines (type-check, lint on changed files, related tests). Record which fail and whether each failure is in code the task changed.
4. Read each changed file around the edits. Classify each change as complete, partial (stopped mid-way, broken syntax, missing call sites) or unrelated to the goal.
5. Map the goal to steps and mark each done, partial, not started or unknown, with the evidence.
6. List risks before resuming: broken files, migrations or generated files that may need rerunning, side effects outside the repo that may have happened (ask, do not assume).
7. Write a resume note a fresh session can follow: the goal, what is done (with evidence), the exact next step, what not to redo, and the checks that prove completion.
8. Stop and ask the user to confirm the note before any edit.
</task>

<constraints>
- No state-changing git commands and no edits in this task.
- Do not mark a step done without evidence from code or a check.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## State found
Branch, commits, uncommitted changes by file, stashes, notes found, check results.
## Task status
Table: step, status, evidence.
## Risks
Bullets.
## Resume note
Fenced block ready to give to the next session.
</output_format>
