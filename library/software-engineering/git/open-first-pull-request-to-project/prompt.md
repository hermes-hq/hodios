---
schema: 1
id: open-first-pull-request-to-project
kind: prompt
title: Open your first pull request to a project
description: Walks a developer through a first contribution to someone else's repository, from reading the contributing guide through fork, branch, commits, sign-off, pull request and updates after review.
category: git
version: 1.0.0
status: incubating
stage: [build, ship, learn]
role: [software-engineer, student]
stack: [git]
requires: [none]
inputs: [text]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [first-contribution, fork-workflow, open-source-contribution, pull-request-etiquette, sign-off]
pairs_with:
  prompts: [sync-fork-with-upstream, fix-missing-dco-signoff, write-pr-description, address-review-with-fixup-commits]
args:
  - name: project
    description: The project you want to contribute to (name and host), what you want to change (a bug fix, docs, a feature), and whether an issue exists.
    type: text
    required: true
  - name: experience
    description: How comfortable you are with git and the command line, and your operating system.
    type: string
output_contract:
  format: markdown
  sections: [Before you start, Setup, Making the change, Opening the pull request, After review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
First pull requests to other people's projects usually fail for social and process reasons, not code. Contributors open a large feature nobody asked for, skip the contributing guide and miss the required sign-off, CLA or commit format, work on their fork's main branch so every later PR is tangled, push unrelated formatting changes, or disappear when review asks for changes. Maintainers are volunteers or busy staff: a small, focused change linked to an issue, with tests and a clear description, gets merged; a surprise refactor does not. The mechanics are: fork, clone your fork, add the original as `upstream`, create a branch from the latest upstream default branch, commit in small steps (signed off if the project uses DCO), push to your fork, open the PR against the upstream default branch, then update the same branch in response to review.

<project>
{{project}}
</project>
{{#experience}}
<experience>{{experience}}</experience>
{{/experience}}
</context>

<task>
1. Before any code: tell the user what to read and check in the project (CONTRIBUTING file, code of conduct, issue templates, labels such as "good first issue", whether a CLA or DCO sign-off is required, commit message format, and whether the change needs an issue or discussion first). For anything beyond a small fix, suggest commenting on the issue to confirm the approach and avoid duplicate work.
2. Give the setup commands: fork on the host, clone the fork, add `upstream`, fetch, and create a branch from `upstream/<default-branch>` with a descriptive name. Explain why not to work on the fork's main.
3. Explain how to build and run the project's tests locally, following its own instructions, before changing anything, so failures can be told apart.
4. Guide the change: keep it focused on one issue, follow the project's style and linters, add or update tests and docs, no unrelated formatting. Commit with the project's message format, using `git commit -s` if sign-off is required and with the same email as the commit author.
5. Push to the fork and open the PR: target the upstream default branch, fill in the template, link the issue ("Fixes #123" style if the host supports it), describe what and why and how it was tested, and allow edits from maintainers if offered.
6. After review: how to push follow-up commits to the same branch, how to rebase on upstream when asked (and why that needs `--force-with-lease` on your own branch only), how to respond to comments politely, and what to do if there is no response for a few weeks (a polite ping, once).
7. Adjust explanations to the user's experience level, one step at a time if they are new, and wait for them to report back before moving on when interactive.
</task>

<constraints>
- Do not invent the project's rules; tell the user where to find them and what to look for.
- Never suggest force-pushing to anything but the contributor's own feature branch, and always with `--force-with-lease`.
- Do not suggest signing off or agreeing to a CLA on someone else's behalf; the sign-off is the contributor's own statement.
- Encourage a small first change; push back on a large unrequested feature as a first PR.
</constraints>

<output_format>
## Before you start
What to read and check.
## Setup
Commands with short explanations.
## Making the change
Steps.
## Opening the pull request
Checklist.
## After review
What to do and how.
</output_format>
