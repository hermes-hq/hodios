---
schema: 1
id: write-team-git-guidelines
kind: prompt
title: Write your team's git guidelines
description: Writes a team's one-page git working agreement covering branch names, commit style, pull request size, merge method, rebasing rules, review etiquette and release tagging.
category: git
version: 1.0.0
status: incubating
stage: [plan, build]
role: [tech-lead, engineering-manager, software-engineer]
stack: [git]
requires: [none]
inputs: [notes, text]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [working-agreement, team-conventions, merge-methods, rebasing, release-tags]
pairs_with:
  prompts: [choose-branching-strategy, conventional-commits-rules, write-commit-message, set-up-new-repository]
args:
  - name: team
    description: Team size, how you ship (continuous deploy, scheduled releases, mobile store releases), the host, and current pain points, for example "8 engineers, deploy main daily, merge commits make history unreadable, PRs sit for days".
    type: text
    required: true
  - name: existing_habits
    description: What the team already does and wants to keep, or notes from a team discussion.
    type: text
output_contract:
  format: markdown
  sections: [Guidelines, Why these choices, Enforcement, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A git guideline is useful when it fits on one page and every rule has a reason the team agrees with; long documents of preferences are ignored. The choices are linked. Squash merging means the pull request title becomes the commit on main, so commit conventions and changelog tools must read titles, and the commits inside a branch can be messy. Rebase-and-merge keeps every commit, so each must build and have a good message. Merge commits keep branch history but make `main` hard to read without `--first-parent`. Rewriting history is fine on a branch only you use and before review; once someone reviews or builds on it, use fixup commits and squash at the end (`git commit --fixup` and `git rebase -i --autosquash`), and always push with `--force-with-lease`. Small pull requests get reviewed faster and with fewer missed bugs. Release tags should be annotated and created from the exact commit that shipped.

<team>
{{team}}
</team>
{{#existing_habits}}
<existing_habits>
{{existing_habits}}
</existing_habits>
{{/existing_habits}}
</context>

<task>
1. Identify the team's shipping model and pain points from the input. If the shipping model is missing, ask for it, because merge method and tagging depend on it.
2. Decide each rule, keeping what the team already does unless it causes the stated pain:
   - branch naming (type and ticket id, short slug), and branch lifetime;
   - commit messages (format, imperative subject, body explaining why), and where they are enforced given the merge method;
   - pull request size target, description expectations, draft use, and review turnaround;
   - merge method (one), and who may merge;
   - rebasing and force-push rules: when allowed, `--force-with-lease` only, never on shared branches;
   - keeping branches current (rebase or merge from main) and resolving conflicts;
   - releases: tag format, annotated tags, hotfix flow;
   - what never goes in the repository (secrets, large binaries, generated files).
3. Write the guidelines as a page a new joiner can read in five minutes, with one short example per rule where it helps.
4. Explain each non-obvious choice in one line in a separate section, so the page itself stays short.
5. List how each rule is enforced (protection rules, PR title lint, hooks, templates), or "by convention".
6. List open questions the team should decide together.
</task>

<constraints>
- Keep the guidelines section under about 500 words.
- Do not impose a branching model the input does not support; if trunk-based development or long-lived release branches are implied, follow that.
- No rule without a reason.
</constraints>

<output_format>
## Guidelines
The page, ready to paste into the repository's contributing docs, with short headings per topic.
## Why these choices
One line per non-obvious rule.
## Enforcement
A table: rule | how enforced.
## Open questions
Bullets, or "None".
</output_format>
