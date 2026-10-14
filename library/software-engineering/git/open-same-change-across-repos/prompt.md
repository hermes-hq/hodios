---
schema: 1
id: open-same-change-across-repos
kind: prompt
title: Open the same change across many repositories
description: Applies one change (a config update, workflow fix or dependency bump) across many repositories, opens a pull request in each, and tracks which merged, failed or were skipped.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [devops-engineer, software-engineer, tech-lead, sre]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [text, diff]
output: [plan, script, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [multi-repo-change, bulk-pull-requests, polyrepo, change-campaign, tracking]
pairs_with:
  prompts: [script-github-tasks-with-gh-cli, write-pr-description, plan-agent-batch-migration, configure-dependency-update-bot]
args:
  - name: change
    description: The change to apply (a diff, a description, or a script that makes it), and why it is needed.
    type: text
    required: true
  - name: repositories
    description: Which repositories (a list, an organisation plus filter, or a search such as "every repo with a Dockerfile"), the host, and any deadline.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Selection, Transformation, Pilot results, Pull request content, Rollout, Tracking, Long tail]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A change that is trivial in one repository becomes a campaign across fifty: each has its own default branch, file layout, CI, owners and review rules, and some are archived, forked or abandoned. The reliable approach separates selection, transformation and rollout. Selection finds the repositories where the change actually applies, by searching for the pattern rather than trusting a list. Transformation is a script that is idempotent (running it twice changes nothing) and that skips repositories where the pattern does not match exactly, instead of forcing an edit. Rollout opens pull requests in waves, starting with a few friendly repositories, using one branch name and one clear description that explains the why and links to the tracking issue, so owners can review quickly. Tools such as multi-gitter, git-xargs or a host's own bulk features automate this; a short script with `gh` or the host CLI also works. Most of the effort is in the long tail: failing CI, merge conflicts, owners who never respond, and repos that need a custom edit.

<change>
{{change}}
</change>

<repositories>
{{repositories}}
</repositories>
</context>

<task>
1. Selection: write the search or script that finds candidate repositories, excluding archived repositories and forks by default, and produce a list with default branch, owner team and whether the target pattern was found.
2. Transformation: write an idempotent script that applies the change in a clone, exits without a change when the pattern is missing or differs from what is expected, and reports why it skipped.
3. Try it locally on three representative repositories (cloned into a scratch folder), run each repository's own tests or build where practical, and show the diffs.
4. Pull request content: one branch name, a commit message, and a PR description with what, why, how to verify, the tracking issue, and who to ask. Respect each repository's PR template if present.
5. Rollout plan: a pilot wave of a few repositories, then waves of a stated size, with a pause between waves to fix problems in the script. Give the command for each wave and mark it as run after confirmation.
6. Tracking: a table or issue checklist per repository with status (not started, PR open, CI failing, merged, skipped with reason, needs manual edit), and a script that refreshes PR states from the host.
7. Long tail: how to handle failing CI, conflicts, inactive owners (escalation path and deadline) and repos needing hand edits; and how to close stale PRs at the end.
</task>

<constraints>
- Do not push branches or open pull requests without explicit confirmation of each wave.
- Never push directly to default branches, bypass branch protection or auto-merge without the owners' agreement.
- The transformation must skip rather than guess when a repository does not match the expected pattern.
- Do not invent tool flags; if unsure, give the help command to check.
</constraints>

<output_format>
## Selection
The search or script and the candidate list format.
## Transformation
The idempotent script and skip rules.
## Pilot results
Diffs and test results for the trial repositories, or what to run.
## Pull request content
Branch, commit message, description.
## Rollout
Waves and commands.
## Tracking
Status table and refresh script.
## Long tail
How each kind of straggler is handled.
</output_format>
