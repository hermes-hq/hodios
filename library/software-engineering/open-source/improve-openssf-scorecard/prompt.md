---
schema: 1
id: improve-openssf-scorecard
kind: prompt
title: Improve a repository's OpenSSF Scorecard result
description: Reads a repository's OpenSSF Scorecard result and makes the changes that raise the checks worth fixing, such as token permissions, pinned actions and branch protection, and says which to skip.
category: open-source
version: 1.0.0
status: incubating
stage: [maintain, verify]
role: [maintainer, security-engineer, devops-engineer]
stack: [github-actions]
requires: [repo-read, file-write]
inputs: [repo, text, config]
output: [diff, report, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [openssf, scorecard, pinned-dependencies, token-permissions, software-supply-chain, security-policy]
pairs_with:
  prompts: [harden-maintainer-accounts, review-ci-pipeline-security, configure-dependency-update-bot]
  personas: [open-source-maintainer]
args:
  - name: scorecard
    description: The Scorecard output (JSON or the per-check list with scores and reasons) for the repository, or say that you want the checks reviewed from the repository files alone.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Check by check, Changes made, Settings for the maintainer, Not worth it here, Verified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
OpenSSF Scorecard scores a repository on supply-chain practices with checks such as Token-Permissions, Pinned-Dependencies, Dangerous-Workflow, Branch-Protection, Code-Review, Security-Policy, Dependency-Update-Tool, SAST, Fuzzing, Signed-Releases, Binary-Artifacts, CI-Tests, Maintained and Vulnerabilities. Some checks are cheap, high-value fixes in the repository: setting top-level `permissions: read-all` or `contents: read` in workflows and granting writes per job; pinning third-party actions to full commit SHAs with a dependency bot to keep them current; removing dangerous patterns such as `pull_request_target` that checks out PR code, or untrusted input interpolated into `run` steps; adding a SECURITY.md. Others are settings outside the repository (branch protection, required reviews). Some depend on project size and are not worth gaming: Code-Review is hard for a solo maintainer, Fuzzing only fits code that parses untrusted input, and Signed-Releases depends on how artefacts ship. The score is a guide, not a goal; a change that raises it without reducing risk is wasted.

{{> guardrails/investigate-before-answering}}

Scorecard result:
<scorecard>
{{scorecard}}
</scorecard>
</context>

<task>
1. Read every workflow, the dependency manifests, SECURITY.md, CODEOWNERS and release config. Match each failing or low check to the specific files or settings causing it.
2. Check by check: for each, say what it measures, why it is low here, the fix, the effort, and whether it is worth doing for this project.
3. Make the in-repository fixes worth doing: least-privilege `permissions` per workflow and job, pinning actions and container images to digests with the version in a comment, fixing dangerous workflow patterns, adding or updating SECURITY.md with the project's real reporting route, adding a dependency update config that covers GitHub Actions, and a SAST workflow if the language is supported.
4. Settings for the maintainer: branch protection or rulesets, required reviews, and private vulnerability reporting, described as steps since they are not files.
5. Not worth it here: checks to leave, with the reason.
6. Validate changed workflows (YAML parse, actions linter if available) and say what was run.
</task>

<constraints>
- Do not invent commit SHAs for pinned actions; look them up if you can, otherwise leave [PIN SHA for owner/action@vX] and say how to get it.
- Do not change what workflows do beyond permissions, pinning and security fixes; keep behaviour the same.
- Do not write a SECURITY.md with a contact you were not given; use a placeholder.
- Do not add a check or tool purely to raise the score when it would not reduce real risk; say so instead.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
Use the contract's section headings in order. Check by check as a table: Check | Score | Cause | Fix | Effort | Worth it? Changes made as a list of files with one line each. Verified lists checks run and results.
</output_format>
