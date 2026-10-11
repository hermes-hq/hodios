---
schema: 1
id: generate-sbom
kind: prompt
title: Generate SBOMs in CI
description: Generates CycloneDX or SPDX SBOMs for an app and its container images in CI, checks they are complete, publishes them with each release and uses them to answer "are we affected" questions.
category: security
version: 1.0.0
status: incubating
stage: [build, ship]
role: [devops-engineer, security-engineer, maintainer]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [config, docs]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [sbom, software-supply-chain, cyclonedx, spdx, ci]
pairs_with:
  prompts: [sign-release-artifacts, audit-dependencies, add-security-scanning-to-ci, audit-dependency-licenses]
args:
  - name: project
    description: The project, its languages and package managers, what it ships (container images, binaries, libraries, a SaaS deployment), and the CI system.
    type: text
    required: true
  - name: reason
    description: Why an SBOM is needed, for example a customer or regulator request, a required format, or vulnerability response.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Pipeline changes, Completeness check, Using the SBOM, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An SBOM is only useful if it is accurate for the exact thing shipped, and the common shortcuts make it inaccurate. Generating from a manifest (`package.json`, `requirements.txt`) without a lockfile lists ranges, not the versions installed; generating from the source tree misses what the Dockerfile adds (OS packages, a downloaded binary, a base image's libraries); and generating once per repository instead of per build means the SBOM describes some other version. Two formats dominate: CycloneDX (strong for security use, VEX and services) and SPDX (strong for licensing, an ISO standard); customers and regulators often name one, and converters lose some fields. Good practice is one SBOM per shipped artifact, built in the same pipeline run from the lockfile or the built image (Syft, Trivy, cdxgen, or the ecosystem's CycloneDX plugin for Maven, Gradle, npm, pip or .NET), with package URLs (purl) so scanners can match vulnerabilities, the artifact's version and digest, and the generating tool's version. Attaching it to the release, or as an attestation on the image, keeps it findable. The payoff is answering "are we affected by this CVE" across all releases in minutes, by scanning stored SBOMs (Grype, Trivy, OSV-Scanner, Dependency-Track) instead of rebuilding old versions. VEX statements record that a listed vulnerability is not exploitable in this product.
</context>

<task>
Set up SBOM generation for {{project}}.
{{#reason}}Reason: {{reason}}{{/reason}}

1. Read the build and release pipeline, lockfiles, Dockerfiles and what artifacts each release produces. List each shipped artifact.
2. Choose the format (the one the requester names, otherwise CycloneDX for security use and SPDX if licensing is the goal) and one generator per artifact type that fits the ecosystems, pinned to a version.
3. Add pipeline steps that generate an SBOM per artifact in the same run that builds it: from lockfiles for libraries and binaries, from the built image (by digest) for containers, with the artifact version recorded.
4. Add a completeness check: the SBOM parses and validates against its schema, the component count is above a sanity floor, and a few known dependencies (including an OS package for images) appear with exact versions and purls. Fail the job if not.
5. Publish: attach SBOMs to the release, push an attestation for images if the registry supports it, and keep them for every release that is still supported.
6. Show how to use them: scan stored SBOMs for a given CVE or package, where VEX notes go, and how to hand an SBOM to a customer.
7. Run the new steps locally or on a branch, and report what was generated with component counts.
</task>

<constraints>
- Do not generate SBOMs from manifests without lockfiles and call them accurate; say what is missing.
- Pin generator versions and action references; do not pipe a download into a shell.
- Do not include secrets, internal URLs or build paths in published SBOMs; check for them.
- Do not invent regulatory requirements; if the user cites one, ask for the exact text.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
Artifacts, format, and generator per artifact, in a short table.
## Pipeline changes
The CI config in fenced blocks with paths.
## Completeness check
What is checked and the real result on this project.
## Using the SBOM
Commands for "are we affected", VEX, and sharing with customers.
## Open questions
Numbered, or "None".
</output_format>
