---
schema: 1
id: review-ci-pipeline-security
kind: prompt
title: Review a CI/CD pipeline for security
description: Reviews CI/CD workflow files for supply-chain attack paths, such as untrusted triggers with secrets, script injection, broad tokens, unpinned actions, cache poisoning and over-trusting cloud roles.
category: security
version: 1.0.0
status: incubating
stage: [review, operate]
role: [security-engineer, devops-engineer, maintainer]
stack: [github-actions, gitlab-ci]
requires: [repo-read]
inputs: [repo, config, file]
output: [report, diff]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [pipeline-security, software-supply-chain, workflow-injection, least-privilege, oidc]
pairs_with:
  prompts: [write-github-actions-workflow, plan-secrets-management, review-cloud-iam-policy, sign-release-artifacts]
  personas: [security-auditor]
args:
  - name: pipeline
    description: The workflow or pipeline files (or the repository path), whether the repository is public, who can open pull requests, and what the pipeline can deploy or publish.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Findings, Fixed configuration, Repository settings to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A CI system holds the keys to production and to package registries, and it runs code from anyone who can open a pull request. The attack paths are well known. Triggers that run with secrets or a write token on events from forks (for example `pull_request_target` or `workflow_run` that then check out and run the contributor's code). Script injection, where untrusted text such as a pull request title, branch name or issue body is interpolated directly into a shell step. Default tokens with write permissions everywhere instead of per-job least privilege. Third-party actions or images referenced by mutable tags, so a compromised upstream runs in your pipeline. Secrets exposed to steps that do not need them or printed in logs. Caches and artifacts written by untrusted runs and consumed by trusted ones. Self-hosted runners attached to public repositories. Cloud federation (OIDC) roles whose trust condition accepts any branch, any pull request or the whole organisation.
</context>

<task>
Pipeline:
{{pipeline}}

1. Map each workflow: triggers, who can cause it to run, what code it executes, permissions of its token, secrets and environments it can reach, and what it can publish or deploy.
2. Check each for: untrusted-trigger execution with secrets or write access; untrusted input interpolated into scripts; token permissions wider than needed; actions, images and scripts not pinned to immutable references; secrets passed to steps that do not use them, or echoed; cache and artifact flows from untrusted to trusted jobs; self-hosted runner exposure; cloud federation trust conditions; deployment jobs without protected environments or required approvals.
3. For each finding give an attack path in two to four steps (who does what, and what they gain), severity, and the fix.
4. Write the fixed configuration for the affected workflows: per-job permissions, safe handling of untrusted input through environment variables, pinned references with a comment naming the version, split privileged and unprivileged workflows where needed.
5. List repository or project settings to check that are outside the files: protected branches and who can change workflow files, required reviews from code owners for CI files, fork pull request approval settings, environment protection rules.
</task>

<constraints>
- Report only findings with a concrete attack path; list style issues separately or not at all.
- Never print or guess secret values.
- Do not claim the provider's current defaults as facts unless sure; mark them to verify.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Counts by severity and the single most urgent fix.
## Findings
Per finding: title, severity, `file:line`, attack path, fix.
## Fixed configuration
The corrected YAML for the affected workflows.
## Repository settings to check
Checklist.
</output_format>
