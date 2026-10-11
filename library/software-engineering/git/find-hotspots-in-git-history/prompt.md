---
schema: 1
id: find-hotspots-in-git-history
kind: prompt
title: Find code hotspots from git history
description: Mines git history for files that change most, files that change together and areas known by one person, weighs them by size or complexity, and ranks where refactoring or knowledge sharing pays off.
category: git
version: 1.0.0
status: incubating
stage: [maintain, plan]
role: [tech-lead, software-engineer, engineering-manager, architect]
stack: [git]
requires: [repo-read, git, shell]
inputs: [repo]
output: [report, table]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [change-frequency, change-coupling, knowledge-silos, technical-debt, code-churn]
pairs_with:
  prompts: [investigate-code-history, write-codeowners-file, write-ownership-handover-doc]
args:
  - name: scope
    description: The period and paths to analyse, for example "last 12 months, src/ only, exclude generated code and lockfiles", and the question you want answered, such as where to refactor first or where knowledge is concentrated.
    type: text
    required: true
---
<context>
You analyse a repository's history to find where effort and risk concentrate. Code that is complex but never touched costs little; code that is complex and changes every week is where bugs and slow delivery come from. Change frequency combined with size or complexity identifies hotspots. Files that repeatedly change in the same commits reveal hidden coupling across modules. Files where nearly all recent changes come from one person are knowledge silos. The traps: generated files, lockfiles, translations and mass renames or reformatting commits dominate naive counts; author names vary for the same person; squash-merge history hides individual contributors; and commit counts say nothing about a person's performance, so findings must never be used to rank people.

<scope>
{{scope}}
</scope>
</context>

<task>
1. Confirm the period, paths and exclusions. Identify noise to exclude: lockfiles, generated and vendored code, translations, and large mechanical commits (find them with `git log --shortstat` and treat commits touching hundreds of files as candidates). List what you excluded.
2. Change frequency: count commits per file in the period with `git log --since=<date> --name-only --format=` piped through sort and uniq, after exclusions and following renames where practical.
3. Size or complexity: use line counts, or indentation depth as a cheap proxy, or a complexity tool if one is installed; say which you used.
4. Hotspots: rank files by frequency combined with size or complexity, and show the top 15 with both numbers.
5. Change coupling: for the top files, find others that change in the same commits most often, especially across module boundaries, and report pairs with how often they co-change.
6. Knowledge concentration: for the hotspots, share of commits by the top author in the period, after merging author aliases you can see (or `.mailmap`). Report the area and share, framed as a risk to the team.
7. Write findings: the three to five places where refactoring, tests or knowledge sharing would pay off most, each with evidence and a suggested first step.
</task>

<constraints>
- Run read-only git and shell commands only; do not modify files or history.
- Do not rank or judge individuals; report knowledge concentration by area, and say the data must not be used for performance evaluation.
- State the limits: commit counts depend on commit habits, squash merges and the period chosen.
- Show the commands used so the analysis can be rerun.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Scope and exclusions
Bullets.
## Hotspots
Table: file | commits in period | size or complexity | rank.
## Change coupling
Table: file A | file B | co-changes | crosses module boundary?
## Knowledge concentration
Table: area | top author share | number of active contributors.
## Where to act first
Three to five items with evidence and first step.
## Limits
Bullets.
## Commands used
Code block.
</output_format>
