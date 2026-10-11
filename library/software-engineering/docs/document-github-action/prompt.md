---
schema: 1
id: document-github-action
kind: prompt
title: Document a reusable GitHub Action
description: Writes the README and action.yml descriptions for a reusable GitHub Action, with inputs, outputs, token permissions, runner support, versioning and copy-ready examples taken from the code.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship, maintain]
role: [devops-engineer, maintainer, software-engineer]
stack: [github-actions]
requires: [repo-read, file-write]
inputs: [repo, file]
output: [docs, config]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [action-yml, reusable-action, token-permissions, marketplace-listing, ci-docs]
pairs_with:
  prompts: [build-github-action, write-readme, write-release-notes]
args:
  - name: notes
    description: Anything the code cannot tell you, such as the published owner/repo name, the current major tag or who the action is for.
    type: text
output_contract:
  format: markdown
  sections: [Files changed, Mismatches, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People use a GitHub Action by copying the usage block from its README, so that block has to be right: the exact `uses: owner/repo@ref`, every required input, and the `permissions:` the job's GITHUB_TOKEN needs. Missing permissions are the most common reason a working action fails for a new user with a 403. Action docs also go wrong in other ways. Input names and defaults in the README drift from action.yml. Inputs the code treats as required are marked optional. Outputs are listed without showing how to read them through `steps.<id>.outputs`. Docker and some composite actions run only on Linux runners, and the docs do not say so. Secrets passed as plain inputs end up in logs. The descriptions in action.yml also show up in the Marketplace and in editor tooling, so they need the same care as the README.
</context>

<task>
Document the GitHub Action in this repository.
{{#notes}}
Notes from the maintainer: {{notes}}
{{/notes}}

1. Read action.yml, the entry point (dist or src JavaScript, entrypoint script, Dockerfile or composite steps), tests, the workflows in this repo that use the action, and the tags or releases if visible.
2. For each input, find how the code reads it (for example `core.getInput(name, {required: true})` or an env var in a composite step), its real default, its accepted format, and whether it is a secret. For each output, find where it is set.
3. Fix action.yml descriptions so each input and output says what it does, its format and its default, with `required` matching how the code behaves. Change descriptions only; report behaviour mismatches instead of changing code.
4. Write the README: one sentence on what the action does, a minimal usage example with the `permissions:` block and pinned ref, an inputs table (name, required, default, description), an outputs table with an example of reading one, supported runners, two or three real scenarios taken from tests or this repo's workflows, how versions work (moving major tag, pinning to a full commit SHA for security), and troubleshooting for the error messages the code actually raises.
5. Mark secrets clearly and show them passed from `secrets.*`, never as literals.
</task>

<constraints>
- Every input, output, default and permission must come from action.yml or the code. Write `TODO(maintainer): ...` for what you cannot confirm, such as the published repository name.
- Do not change the action's code, its inputs or its defaults.
- Ask for the least token permissions the code needs, and explain each one.
- No marketing language and no badges the repo does not already have.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Files changed
The files written or edited.
## Mismatches
Bullets where action.yml, the old README and the code disagreed, and which one the docs now follow. Or "None found".
## Open questions
Every `TODO(maintainer)` left, as a checklist.
</output_format>
