---
schema: 1
id: add-security-scanning-to-ci
kind: prompt
title: Add security scanning to CI
description: Adds dependency, secret, static analysis, IaC and container scanning to a CI pipeline with gates that block only new, real risk, a baseline for existing findings and a triage routine.
category: security
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [devops-engineer, security-engineer, tech-lead]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [config, diff, plan]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sast, sca, secret-scanning, security-gates, sarif]
pairs_with:
  prompts: [scan-container-images-in-ci, triage-sast-findings, audit-dependencies, review-ci-pipeline-security, write-semgrep-rule]
  personas: [security-auditor]
args:
  - name: repo
    description: The repository, its languages, the CI system (GitHub Actions, GitLab CI, Jenkins, CircleCI) and what is built and deployed (packages, containers, Terraform).
    type: text
    required: true
  - name: constraints
    description: Tool or budget limits, e.g. "open-source tools only", "we have GitHub Advanced Security", "CI must stay under 10 minutes". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Scanners, Gate policy, Pipeline changes, Baseline, Triage routine, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Security scanning in CI fails in two predictable ways. Either every scanner is set to fail the build on any finding, the first run reports hundreds of old issues, and the team adds `continue-on-error` within a week; or scanners only report to a dashboard nobody reads. What works is a gate on new findings only (diff-aware or against a stored baseline), with a severity threshold and, for dependencies, only when a fixed version exists; existing findings go into a tracked backlog with owners. Secret scanning is the exception that should block hard, and ideally earlier too (pre-commit and the platform's push protection), because a pushed secret is already leaked. Scanners also need care as pipeline code: pinned versions, results uploaded as SARIF where the platform shows them on pull requests, and no secrets exposed to jobs that run untrusted pull request code. Suppressions need a reason and an expiry, or they become permanent.
</context>

<task>
Add security scanning to {{repo}}.
{{#constraints}}Constraints: {{constraints}}{{/constraints}}

1. Read the existing CI config, lockfiles, Dockerfiles and IaC to see what is already scanned and what languages and artifacts exist.
2. Choose one tool per category that fits the stack and constraints: dependencies (the ecosystem's audit tool, OSV-Scanner, Dependabot or Renovate alerts), secrets (Gitleaks or TruffleHog, plus platform push protection), SAST (Semgrep or CodeQL), IaC (Checkov, Trivy config or tfsec equivalents) and container images if images are built. Skip categories that do not apply.
3. Define the gate policy: secrets block on any verified finding; SAST blocks on new high-severity findings in changed code; dependencies block on new critical or high advisories with a fix available; IaC and containers start as warnings unless the team wants a gate.
4. Write the pipeline changes: pinned tool versions or action commit SHAs, caching, SARIF upload, minimal job permissions, and no secrets for jobs triggered by forks.
5. Create the baseline: run the scanners once, store the baseline or suppression file with each entry's reason, owner and expiry date, and open a tracked list for existing high findings.
6. Add a scheduled full scan (weekly) of the default branch so new advisories on old dependencies surface without a code change.
7. Write the triage routine: who looks at findings, response times per severity, how to mark false positives, and when expired suppressions fail the build.
8. Run the pipeline locally or on a branch where possible and confirm each scanner runs and the gate behaves as intended.
</task>

<constraints>
- Do not make CI fail on every existing finding on day one.
- Do not suppress findings without a reason and expiry.
- Do not print any secret a scanner finds; reference file and line, and point to the leaked-secret response.
- Name tools as options; tell the user to confirm licensing and current features for commercial ones.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Scanners
Table: category, tool, runs on (PR, push, schedule), reason.
## Gate policy
Table: category, blocks when, otherwise.
## Pipeline changes
The CI config in code blocks, or one line per changed file.
## Baseline
How the baseline was created, counts per category, and where the file lives.
## Triage routine
Owners, response times and the suppression rules.
## Verification
What ran and the actual results.
</output_format>
