---
schema: 1
id: review-ci-workflow-change
kind: prompt
title: Review a CI workflow change
description: Reviews changes to CI or CD pipeline files for skipped or renamed required checks, unsafe triggers, broad token permissions, secret exposure, unpinned actions, cache mistakes and deploy gates.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [devops-engineer, software-engineer, maintainer]
stack: [github-actions, gitlab-ci]
requires: [none]
inputs: [diff, config]
output: [report, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [ci-pipelines, workflow-files, required-checks, action-pinning, pull-request]
pairs_with:
  personas: [code-reviewer, devops-engineer]
  prompts: [review-ci-pipeline-security, write-github-actions-workflow, review-config-only-change, configure-branch-protection]
args:
  - name: diff
    description: The diff of the workflow or pipeline files, with paths.
    type: text
    required: true
  - name: repo_context
    description: Whether the repo is public and accepts fork pull requests, which checks are required by branch protection, and which secrets or environments the pipeline can reach.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Required checks impact, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pipeline files decide what gets tested, what runs with production credentials and what reaches users, yet they are reviewed as "just YAML". Typical failures: a job renamed so the required status check never reports and merges are blocked, or the opposite, a check marked as passing because it is skipped by a path filter; a trigger that runs untrusted fork code with secrets (on GitHub, `pull_request_target` or `workflow_run` combined with checking out the PR head); `permissions` left at broad defaults; third-party actions referenced by a moving tag instead of a commit SHA; secrets echoed into logs or passed to scripts from forks; caches keyed so one branch can poison another; and deploy jobs that lost their environment approval or branch condition. Repo context changes the severity: a public repo taking fork PRs is far more exposed. This review covers one pull request's effect on the pipeline, gates included; a full security audit of every workflow is a separate job.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#repo_context}}
<repo_context>
{{repo_context}}
</repo_context>
{{/repo_context}}

1. Summarise what the change does to the pipeline: jobs added, removed or renamed, triggers, conditions, and which branches and events now run what.
2. Check:
   - **Required checks:** renamed or removed jobs that branch protection still requires, path or branch filters that skip a required job, `continue-on-error` or `allow_failure` hiding failures, tests or linters removed from a job.
   - **Triggers and untrusted code:** fork pull requests running with secrets or write tokens, checkout of the PR head in a privileged trigger, user-controlled values (branch names, PR titles, commit messages) interpolated straight into shell commands.
   - **Permissions and secrets:** token permissions broader than the job needs, secrets passed to steps that do not need them, secrets printed or written to artifacts, long-lived cloud keys where short-lived federated credentials would work.
   - **Supply chain:** third-party actions, images or scripts pinned by tag or branch instead of an immutable digest or SHA, install scripts piped from the network straight into a shell, new marketplace actions from unknown publishers.
   - **Caching and artifacts:** cache keys that ignore the lockfile, caches shared between untrusted and trusted runs, artifacts retained with sensitive content.
   - **Deploy safety:** environment protections, manual approvals, concurrency groups that cancel a running deploy, branch conditions on deploy jobs.
   - **Correctness:** matrix changes that drop a supported version, conditions that never evaluate true, runner changes (OS, architecture) that change behaviour.
3. Rate each finding: critical (secret or write access exposed to untrusted code, deploy without gate), high (required check silently skipped or removed), medium, low.
</task>

<constraints>
- Cite file and line for each finding with the corrected YAML.
- If repo context is missing, review under the worst plausible case (public, fork PRs allowed) and say so.
- Use syntax for the CI system in the diff; do not mix GitHub Actions and GitLab CI keywords.
- At most 10 findings, most severe first.
- Review what the diff changes; if the unchanged workflows look risky, say so in one line and suggest a full pipeline security audit instead of reviewing them here.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, with the main risk.
## Findings
Numbered: severity, `path:line`, problem, what an attacker or failure could do, fix as YAML.
## Required checks impact
Which required checks are affected and whether branch protection settings must change in the same rollout.
## Questions
</output_format>
