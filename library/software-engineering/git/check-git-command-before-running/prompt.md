---
schema: 1
id: check-git-command-before-running
kind: prompt
title: Check a git command before running it
description: Explains what a git command copied from the internet or an AI will do to this repository, what it could destroy, and a safer equivalent with a backup. Use before running it.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, student]
stack: [git]
requires: [none]
inputs: [text]
output: [explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [command-preview, destructive-commands, safe-alternative, backup-ref]
pairs_with:
  prompts: [explain-git-error, choose-git-undo-command, recover-lost-git-work]
  rules: [git-safety-rules]
args:
  - name: command
    description: The exact git command or commands you are about to run, and where you found them.
    type: text
    required: true
  - name: goal
    description: What you are trying to achieve, and the output of `git status` and `git log --oneline -5` if you have them.
    type: text
output_contract:
  format: markdown
  sections: [What it does, Risk, Does it match your goal, Safer way, If it goes wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People run git commands from answers and posts without knowing what they touch, and a few of them destroy work with no undo: `git reset --hard` and `git checkout -- .` or `git restore .` throw away uncommitted changes, `git clean -fdx` deletes untracked and ignored files (including local config and secrets files), `git push --force` overwrites other people's commits, `git stash drop` and `git branch -D` remove the only reference to work, and `git filter-branch` or `filter-repo` rewrite every commit. Committed work is almost always recoverable through the reflog for a while; uncommitted and untracked files are not. A command is also often fine in general but wrong for this situation, for example rebasing a shared branch. The safe habit is: know which of the three areas (working tree, index, commits and refs) and which remote the command changes, make a backup ref or stash first, and prefer the narrow or reversible variant (`--force-with-lease`, `clean -n`, `reset --keep`, `restore <one file>`).
</context>

<task>
<command>
{{command}}
</command>
{{#goal}}
<goal>
{{goal}}
</goal>
{{/goal}}

1. Split the input into individual commands and explain each one in plain words, flag by flag.
2. For each, state what it changes: working tree, index, local commits and branches, stash, remote, or configuration; and whether the effect is recoverable (reflog), recoverable only with effort, or permanent.
3. Rate it: safe, risky in some situations, or destructive. For risky and destructive commands, list exactly what would be lost in this situation, using the status output if given.
4. Compare with the goal: does this command actually do what the user wants? If not, say what it would do instead.
5. Give the safer equivalent: a backup step first (`git branch backup/<name>` or `git stash push -u`), a dry run where one exists (`git clean -n`, `git push --dry-run`), or a narrower command.
6. Say how to undo it afterwards, if possible, and the one check to run after it.
</task>

<constraints>
- Do not run anything; this is a preview.
- Never call a command safe without stating the condition under which it is safe.
- If the command includes a URL, script download or anything beyond git, flag it and do not recommend running it.
- If the goal is unclear and the right answer depends on it, ask one question.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## What it does
Each command in plain words.
## Risk
Table: command | changes | recoverable? | rating | what you would lose here.
## Does it match your goal
One or two sentences.
## Safer way
Commands in order, with the backup step first.
## If it goes wrong
How to undo, or "Cannot be undone".
</output_format>
