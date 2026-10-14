---
schema: 1
id: fix-mistaken-release-tag
kind: prompt
title: Fix a mistaken release tag
description: Fixes a wrong, misplaced or premature release tag, deciding between moving it and cutting a new version based on who already fetched it, with registry, cache and CI effects.
category: git
version: 1.0.0
status: incubating
stage: [ship]
role: [software-engineer, maintainer, devops-engineer]
stack: [git]
requires: [repo-read, shell, git]
inputs: [repo, text]
output: [plan, report]
risk: runs-commands
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [release-tag, retag, semantic-versioning, package-registry]
pairs_with:
  prompts: [cut-hotfix-from-release-tag, check-semver-impact-of-diff, write-changelog]
args:
  - name: problem
    description: What went wrong with the tag, for example "tagged v2.3.0 on the wrong commit" or "pushed v1.0.0 by accident", and what happened after the push (CI release ran, package published, users installed).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is out there, Decision, Steps, Check, Tell people]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Git tags look easy to move, but anyone who already fetched a tag keeps the old one: `git fetch` does not overwrite existing tags without `--force`, so after a move different people see different code under the same version. Git's own documentation advises against retagging a public tag for that reason. What else has consumed the tag matters more than git: package registries (npm, PyPI, crates.io, Maven Central) do not allow re-publishing the same version, Go's module proxy and checksum database cache a version permanently, container image tags may have been pushed, and CI may have built and deployed artifacts. The decision rule experienced maintainers use: if the tag was never pushed, fix it locally; if pushed but nothing consumed it and the audience is tiny, moving it is acceptable with notice; if anything consumed it, leave it and release the next version, marking the bad one as deprecated, yanked or retracted where the ecosystem supports that.
</context>

<task>
<problem>
{{problem}}
</problem>

1. Establish facts with read-only commands: `git show <tag>` (annotated or lightweight, which commit), `git ls-remote --tags origin <tag>` (pushed or not), the intended commit, and whether a CI release job ran, a package was published or images were pushed. Ask for anything you cannot check.
2. Decide and explain in two sentences:
   - not pushed: delete and recreate locally (`git tag -d`, `git tag -a`);
   - pushed, nothing consumed it, small known audience: move it (delete remote tag, recreate, push), and tell everyone to `git fetch --tags --force`;
   - consumed by a registry, proxy, deploy or unknown users: leave it, release the next patch version from the right commit, and deprecate or yank the bad version using the ecosystem's mechanism.
3. Give the exact commands for the chosen route, in order, with a note on what each changes. For annotated tags, keep the message and signing practice the project uses.
4. Note follow-ups: CI jobs that will re-run on the recreated tag, release notes on the hosting service tied to the tag, and changelog entries.
5. Show the push and delete commands and wait for confirmation before running them.
</task>

<constraints>
- Never recommend moving a tag that a registry, proxy cache or production deploy already consumed.
- Do not invent registry commands; name the ecosystem's mechanism (for example npm deprecate, PyPI yank, Go retract) and tell the user to confirm its current syntax if unsure.
- Do not delete remote tags without explicit confirmation.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What is out there
Tag, commit, pushed or not, and what consumed it.
## Decision
The route and why.
## Steps
Numbered commands.
## Check
How to confirm the tag and release are now right.
## Tell people
A short note for users or the team, if needed.
</output_format>
