---
schema: 1
id: scan-container-images-in-ci
kind: prompt
title: Scan container images in CI
description: Adds a Trivy or Grype image scan to CI with a severity gate, a reviewed ignore file whose entries expire, scheduled rescans of released images and base-image update advice.
category: devops
version: 1.0.0
status: incubating
stage: [build, verify, maintain]
role: [devops-engineer, security-engineer]
stack: [docker, github-actions, gitlab-ci]
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
tags: [vulnerability-scanning, trivy, grype, container-images, cve]
pairs_with:
  prompts: [build-container-image-in-ci, audit-dependencies, review-dockerfile]
args:
  - name: images
    description: Which images to scan, where they are built in CI, and the base images they use.
    type: text
    required: true
  - name: policy
    description: The team's tolerance, for example "block on fixable critical and high" or "report only for now".
    type: text
output_contract:
  format: markdown
  sections: [Gate policy, Config, Ignore file, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An image scanner switched on with default settings reports hundreds of CVEs, most in OS packages the app never calls and many with no fix available. Teams then either ignore the job or disable it. A useful gate blocks only what the team can act on (fixable findings at or above an agreed severity), scans the image that will actually ship rather than a rebuilt copy, keeps exceptions in a reviewed file where each entry has a reason and an expiry date, and rescans released images on a schedule because new CVEs appear after the build passed. The biggest single reduction usually comes from a smaller or fresher base image (slim, distroless, or a current patch release), not from triaging findings one by one.
</context>

<task>
Add image scanning to CI for: {{images}}
{{#policy}}
Policy: {{policy}}
{{/policy}}

1. Read the Dockerfiles and the CI jobs that build the images. Find where the image exists locally or by digest after the build, so the scan runs on the exact artifact that will be pushed.
2. Choose Trivy or Grype (keep one already in use). Configure: severity threshold, ignore unfixed vulnerabilities for the blocking gate, scanners limited to what is needed (vulnerabilities, and secrets or misconfig only if asked), and an exit code that fails the job only for the gate.
3. Produce a SARIF or JSON report as an artifact, and upload SARIF to the code scanning view if the platform supports it.
4. Create the ignore file (`.trivyignore.yaml` or `.grype.yaml`) with a reason and an expiry per entry: Trivy's YAML ignore file has an expiry field; Grype ignore rules do not, so record the reason and a review-by date in a comment next to each rule. Leave it empty or with a commented example; do not pre-fill suppressions.
5. Add a scheduled job that rescans the images currently deployed or last released, reporting new findings without blocking merges.
6. Pin the scanner version and cache its vulnerability database so the job is fast and reproducible.
7. Recommend base-image changes that would remove the most findings, as suggestions only.
8. Write the config and run the linter for the CI provider if available.
</task>

<constraints>
- Do not suppress findings to make the gate pass; every suppression must be added by a person with a reason.
- Do not claim a specific CVE count or that an image is clean without running the scanner; say "not scanned" otherwise.
- Do not use action names or flags you are not certain exist.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Gate policy
What blocks, what only reports, and why.

## Config
The CI changes with paths and full contents or diffs, including the scheduled rescan.

## Ignore file
Its path, format and the rule for adding an entry (reason, owner, expiry).

## Verify
Scan output or "not scanned", and how to see the report.

## Follow-ups
Base-image recommendations and anything the team must decide. "None" if empty.
</output_format>
