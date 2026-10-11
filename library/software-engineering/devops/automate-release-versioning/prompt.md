---
schema: 1
id: automate-release-versioning
kind: prompt
title: Automate release versioning
description: Sets up release-please, semantic-release or Changesets so versions, tags and changelogs come from commits or change files, covering monorepos, pre-releases and the first release.
category: devops
version: 1.0.0
status: incubating
stage: [ship, maintain]
role: [devops-engineer, maintainer, tech-lead]
stack: [github-actions]
requires: [repo-read, file-write]
inputs: [repo, config]
output: [config, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [semantic-versioning, conventional-commits, release-please, semantic-release, changesets, release-automation]
pairs_with:
  prompts: [publish-package-from-ci, write-changelog, write-github-actions-workflow]
args:
  - name: project
    description: The repository (single package or monorepo, ecosystem), how versions and changelogs are handled today, and whether commits follow Conventional Commits.
    type: text
    required: true
  - name: preference
    description: A tool the team wants or rules out, or how releases should be approved (merge a release PR, publish on every merge).
    type: text
output_contract:
  format: markdown
  sections: [Choice, Config, First release, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Release automation tools differ in one decision that matters more than features: when a release happens. semantic-release publishes on every qualifying merge to main, which suits libraries with good commit discipline. release-please opens a release pull request that accumulates changes until someone merges it, which gives a human checkpoint and a place to edit the changelog. Changesets asks authors to add a change file in each pull request, which suits monorepos where commit messages are unreliable. Commit-based tools are only as good as the commits: with squash merging, the pull request title becomes the commit, so titles need linting. The first run is where most setups break: without a bootstrap version or the last release tag, the tool computes the wrong version or tries to release the whole history.
</context>

<task>
Set up automated versioning for:
<project>
{{project}}
</project>
{{#preference}}
Preference: {{preference}}
{{/preference}}

1. Read the repository: manifests and where the version lives, existing tags and their format, existing changelog, merge strategy settings if visible, commit history style (sample recent commits), and CI files.
2. Choose the tool and explain why in two or three sentences tied to the release decision above and the repo's commit discipline.
3. Write its configuration: package paths and release types for each package in a monorepo, tag format matching existing tags, changelog sections, and pre-release handling (for example a `next` branch or prerelease mode).
4. Bootstrap from the current state: the last released version or tag, so the first automated release continues from it instead of re-releasing history.
5. Write the CI workflow that runs the tool with the minimum permissions it needs. If publishing to a registry is part of the release, hand off to a separate publish job triggered by the created tag or release.
6. If the tool relies on Conventional Commits and the repo squash merges, add a pull request title check, or explain how to require it.
7. Run the tool in dry-run mode if a shell and the tool are available, and report the version it would produce.
</task>

<constraints>
- Do not rewrite existing tags, changelog history or published versions.
- Do not invent configuration keys; if unsure of a key name for the chosen tool version, say so.
- Tokens the tool needs beyond the CI default token are secrets referenced by name only.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Choice
The tool and why, in two or three sentences.

## Config
Every file with path and full contents.

## First release
What version the first automated run will produce and why, and how the bootstrap works.

## Verify
Dry-run output or "not run".

## Follow-ups
Repository settings (merge strategy, PR title check, token for triggering other workflows) and team conventions to adopt. "None" if empty.
</output_format>
