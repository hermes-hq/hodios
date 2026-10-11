---
schema: 1
id: choose-submodule-or-subtree
kind: prompt
title: Choose submodule, subtree or a package for shared code
description: Chooses how to share code between repositories, comparing git submodules, git subtree, a versioned package and vendoring for your team, then gives the setup and daily commands for the choice.
category: git
version: 1.0.0
status: incubating
stage: [design, build]
role: [software-engineer, tech-lead, architect]
stack: [git]
requires: [none]
inputs: [text]
output: [explanation, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [submodules, subtree, vendoring, shared-code, multi-repo]
pairs_with:
  prompts: [extract-folder-into-new-repo, choose-branching-strategy, set-up-git-lfs]
args:
  - name: situation
    description: What code is shared and between which repositories, how often it changes, whether consumers edit it, the languages and package managers involved, team size and git experience, and how CI checks out code.
    type: text
    required: true
---
<context>
You help a team decide how to share code between repositories. The options trade off differently. Submodules pin an exact commit of another repository and keep histories separate, but every clone and CI job must initialise them, developers end up with detached HEADs and forgotten pointer updates, and changing shared code takes two commits in two repositories. Subtree copies the other repository's files and optionally its history into a folder, so clones just work, but pushing changes back upstream is awkward and the history gets noisy. A versioned package (through the language's package manager or an internal registry) is usually best when consumers do not edit the shared code, because it gives semantic versions and changelogs. Vendoring a plain copy is simplest for code that rarely changes. A monorepo removes the problem but is a much bigger decision.

<situation>
{{situation}}
</situation>
</context>

<task>
1. Restate the key facts that drive the choice: change frequency, whether consumers modify the shared code, whether a package manager exists for the language, team git skill, CI setup. Ask for any of these that are missing and would change the answer, and give a provisional recommendation.
2. Compare submodule, subtree, package and vendoring for this situation in a table: clone and CI experience, updating to a new version, contributing changes back, version pinning, failure modes. Mention a monorepo only as a pointer if the situation suggests it.
3. Recommend one option and say what would make you choose differently.
4. Give the setup commands for the recommendation, and the daily commands: cloning, updating to a newer version, making a change to the shared code, and what CI needs (for example `git submodule update --init --recursive` or checkout settings).
5. List the mistakes teams make with the chosen option and how to prevent them (for example `git config submodule.recurse true`, a CI check that the pointer is on a published commit).
6. If they are moving away from an existing setup, outline the migration steps.
</task>

<constraints>
- Do not default to submodules; justify the choice from the situation.
- Explain each command in one line; use placeholder repository URLs.
- Do not claim specific package registry or hosting features beyond common behaviour; tell the user to confirm for their tools.
</constraints>

<output_format>
## Deciding facts
Bullets, plus open questions.
## Comparison
Table: option | clone and CI | updating | contributing back | pinning | failure modes.
## Recommendation
The choice and what would change it.
## Setup and daily use
Commands grouped by task.
## Mistakes to prevent
Bullets.
## Migration
Steps, or "Not needed".
</output_format>
