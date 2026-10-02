---
schema: 1
id: write-contributing-guide
kind: prompt
title: Write a CONTRIBUTING guide
description: Writes a CONTRIBUTING.md from a repository's real setup, covering the dev environment, tests, branch and commit rules, PR checklist, review process and where newcomers can start.
category: docs
version: 1.0.0
status: incubating
stage: [build]
role: [maintainer, developer-advocate, tech-lead, technical-writer]
stack: []
requires: [repo-read]
inputs: [repo, text, config]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [open-source, contributing-md, good-first-issue, developer-experience, pull-request]
pairs_with:
  personas: [technical-writer]
  prompts: [write-readme, write-onboarding-guide, write-code-review-guidelines, write-agents-md]
args:
  - name: repo_facts
    description: The real setup, such as language and version, package manager, install, build, test and lint commands, CI checks, branch names and anything unusual, or a pointer to the repo to read.
    type: text
    required: true
  - name: project_policies
    description: License, DCO or CLA requirement, code of conduct, commit message convention, security reporting, AI-assisted contribution policy, and who maintains the project.
    type: text
  - name: good_first_areas
    description: Areas where newcomers can contribute safely, labels used for starter issues, and anything maintainers do not want contributions for.
    type: text
output_contract:
  format: markdown
  sections: [CONTRIBUTING.md, Unverified items]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A CONTRIBUTING guide is the difference between a first pull request that lands and one that is abandoned after the third round of "please rebase, sign off and run the linter". Most guides fail because they are copied from another project: they list commands that do not exist in this repo, omit the one check CI actually enforces, and never say what kind of contribution is welcome. A good guide is accurate to the repo, gets a newcomer from clone to a passing test run in minutes, and states every rule CI or the maintainers will enforce before the contributor discovers it the hard way.
</context>

<task>
Write CONTRIBUTING.md for this project.

<repo_facts>
{{repo_facts}}
</repo_facts>

{{#project_policies}}
<project_policies>
{{project_policies}}
</project_policies>
{{/project_policies}}
{{#good_first_areas}}
<good_first_areas>
{{good_first_areas}}
</good_first_areas>
{{/good_first_areas}}

1. If you can read the repo, verify the facts against it: the package manifest and lockfile, version files (.nvmrc, .tool-versions, rust-toolchain and similar), the scripts or Makefile, CI workflow files, linters and formatters configs, issue and PR templates, CODEOWNERS, and any existing README, CONTRIBUTING or AGENTS file. Where the repo and the facts disagree, trust the repo and list the difference.
2. Write the guide in this order:
   - **Welcome:** one short paragraph on what contributions are welcome (bugs, docs, features, translations) and what is not, plus a link placeholder to the code of conduct if one exists.
   - **Before you start:** when to open an issue or discussion first (for example new features or large changes) and when a pull request alone is fine (typos, small fixes).
   - **Set up:** prerequisites with versions, then clone, install, build and run, as copy-pasteable commands, and how to know it worked.
   - **Make a change:** branch naming, code style and how formatting is enforced, how to run tests (all, one file, one test), how to add tests, and how to run every check CI runs locally in one command if one exists.
   - **Commits:** the message convention with one real example, sign-off (DCO) or CLA requirements with the exact command or link, and squash or rebase expectations.
   - **Pull requests:** a checklist (linked issue, tests, docs, changelog entry if used, checks passing, screenshots for UI changes), what reviewers look for, and expected response time stated honestly.
   - **Where to start:** the labels for starter issues and the areas from the good first areas input, with what makes each a safe first contribution.
   - **Reporting bugs and security issues:** what a good bug report includes, and that security problems go through the private channel in the security policy, never public issues.
   - **Getting help:** where to ask questions.
3. Keep it scannable: short sections, commands in fenced blocks, and nothing a contributor would never need. Put long reference material (architecture, release process) behind links.
</task>

<constraints>
- Every command, script name, version, label and branch name must come from the repo or the facts given. Never invent one; use a clearly marked placeholder such as [TODO: confirm test command] and list it under Unverified items.
- Do not add policies the project did not state (CLA, DCO, commit conventions, response times). If a common one is missing, mention it under Unverified items as a suggestion.
- Write in a welcoming, direct tone; no "simply" or "just" before steps that may not be simple.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## CONTRIBUTING.md
The complete file in one fenced markdown block, ready to commit.
## Unverified items
Bullets: placeholders you left, facts you could not confirm in the repo, differences between the facts given and the repo, and suggested policies the maintainers may want to add. "None" if everything was verified.
</output_format>
