---
schema: 1
id: investigate-ci-cd-compromise
kind: prompt
title: Investigate a CI/CD compromise
description: Investigates a suspected CI/CD compromise such as a tampered action, a malicious pull request run or a leaked runner token, scoping exposed secrets, builds and releases and the rotation order.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer, devops-engineer]
requires: [repo-read]
inputs: [repo, logs, text]
output: [report, checklist, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [software-supply-chain, build-pipeline, secret-rotation, runner-security, release-integrity]
stack: [github-actions, gitlab-ci]
pairs_with:
  prompts: [review-ci-pipeline-security, respond-to-leaked-secret, investigate-cloud-audit-logs, vet-dependency]
args:
  - name: suspicion
    description: What happened or was reported - a third-party action or tag changed upstream, a strange workflow run, unexpected commits, a leaked token, a runner behaving oddly - and when.
    type: text
    required: true
  - name: platform
    description: CI platform and runners (GitHub-hosted, self-hosted persistent or ephemeral, GitLab shared or group runners), plus where artifacts and releases go.
    type: text
    required: true
  - name: details
    description: Optional workflow files, run logs, audit log excerpts or lists of secrets and environments.
    type: text
output_contract:
  format: markdown
  sections: [What may have happened, Do now, Exposure window, Secrets exposed, Builds and releases affected, Evidence to export, Rotation order, Hardening follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
CI pipelines hold the keys to production: deploy credentials, package registry tokens, signing keys and cloud roles. A compromise usually arrives one of four ways: a third-party action or script whose tag was moved to malicious code; a workflow triggered by an outsider's pull request that runs with secrets (`pull_request_target` checking out PR code, or a self-hosted runner shared with forks); a stolen personal access token or deploy key used to push workflow changes; or a persistent self-hosted runner compromised once and reused by every later job. Malicious steps typically print or exfiltrate environment variables and memory of the runner process, so "the secret is masked in logs" offers no comfort. Scope is defined by time: every run of an affected workflow in the exposure window could have leaked every secret that job could read, and every artifact it produced could be tampered. Platform logs expire, so exporting them comes early. When the coding agent has repository access, it should read the workflow files and history rather than guess.
</context>

<task>
Investigate:

<suspicion>
{{suspicion}}
</suspicion>

<platform>
{{platform}}
</platform>
{{#details}}

<details>
{{details}}
</details>
{{/details}}

1. Read the workflow files in the repository (for example `.github/workflows/*.yml` or `.gitlab-ci.yml`) and the commit history touching them, if you have access. List which workflows use the suspect component or trigger, and whether references are pinned to full commit SHAs.
2. What may have happened: the most likely path given the evidence, and alternatives.
3. Do now: steps to stop further exposure, each marked for approval - disable the affected workflows or remove the suspect component, take self-hosted runners offline (do not wipe them yet), and restrict who can trigger runs.
4. Exposure window: from the earliest moment the malicious code or access could have run to now, with the evidence for each end.
5. Secrets exposed: every secret, variable, OIDC-federated cloud role, deploy key and token available to the affected jobs and environments in the window, plus anything on a persistent runner's disk.
6. Builds and releases affected: artifacts, container images (by digest), packages and releases produced in the window; how to verify them (rebuild and compare, check provenance or attestations, compare checksums) and whether to yank or re-release.
7. Evidence to export now: run logs, platform audit logs, OIDC token issuance records in the cloud provider, runner host images for self-hosted runners, and their retention limits as known to the user.
8. Rotation order: highest blast radius first (cloud deploy roles, registry publish tokens, signing keys), revoke rather than just rotate where possible, and check cloud and registry audit logs for use of each in the window.
9. Hardening follow-up: pin actions to SHAs, least-privilege tokens, OIDC instead of long-lived keys, ephemeral runners, environment protection rules, and point to the pipeline security review.
</task>

<constraints>
- Read-only investigation. Disabling workflows, revoking tokens and yanking releases are changes; mark them and wait for confirmation.
- Never print secret values in the output, even if they appear in logs you read.
- Do not invent advisory details for an upstream component. Ask for the advisory or the known-bad commit.
- Do not wipe or reimage runners before their state is captured.
{{> output/uncertainty}}
</constraints>

<output_format>
Use the eight sections as headings. "Secrets exposed" and "Builds and releases affected" are tables (item | where used | evidence of use | action). "Do now" and "Rotation order" are numbered with "(approval)" marks. End with what you verified by reading the repository and what remains inferred.
</output_format>
