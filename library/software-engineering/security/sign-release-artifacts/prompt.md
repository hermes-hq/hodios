---
schema: 1
id: sign-release-artifacts
kind: prompt
title: Sign release artifacts and publish provenance
description: Plans signing for releases (binaries, packages, container images) with build provenance, an SBOM, key custody or keyless signing, and verification steps users and deploy systems will run.
category: security
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [maintainer, devops-engineer, security-engineer]
stack: []
requires: [repo-read]
inputs: [repo, config, text]
output: [plan, config, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [software-supply-chain, code-signing, provenance, sbom, slsa]
pairs_with:
  prompts: [review-ci-pipeline-security, write-security-policy, audit-dependency-licenses]
  personas: [security-auditor]
args:
  - name: project
    description: What you release (binaries, language packages, container images), where they are published, the CI system that builds them, who consumes them (end users, other teams, Kubernetes clusters), and what signing exists today.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What to sign, Signing approach, Provenance and SBOM, CI changes, Verification for consumers, Key and identity management, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Signing only helps if someone verifies, so a signing plan is really a verification plan. There are two families. Key-based signing (GPG, minisign, platform code-signing certificates) needs a private key kept safe, rotated and revocable, and a published public key users can trust. Keyless signing (the Sigstore model) signs with a short-lived certificate bound to the CI workload's identity and records it in a public transparency log, so there is no long-lived key to steal, but verification must check the expected identity and issuer, not just "signed by someone". Build provenance (for example SLSA-style attestations) states which source commit and workflow produced an artifact; an SBOM lists what is inside. Several package registries now support provenance or trusted publishing from CI, which removes long-lived publish tokens. The CI pipeline itself becomes the root of trust, so its own security sets the ceiling.
</context>

<task>
Project: {{project}}

1. List every artifact that leaves the build (archives, installers, language packages, container images, checksums files, SBOMs) and who consumes each.
2. Choose the signing approach per artifact type and explain it: keyless with workload identity, key-based, or the platform's code-signing scheme (for operating systems that require it). Use the registry's native provenance or trusted publishing where it exists.
3. Provenance and SBOM: generate provenance in the build that produced the artifact, generate an SBOM in a standard format (SPDX or CycloneDX), and attach or publish both next to the artifact.
4. CI changes: the job layout (build, then sign and attest in a job with minimal permissions), permissions needed for identity tokens, and protection of the release workflow (protected tags or branches, required reviews, environment approvals).
5. Verification for consumers: exact steps or commands users run, the identity and issuer they must check, how deploy systems enforce it (admission policy for images, install scripts that verify before use), and what to do when verification fails.
6. Key and identity management: where keys live (hardware or a managed KMS, never in the repository), rotation and revocation, or for keyless, which identities are allowed and how a change is announced.
7. Rollout: sign alongside the current process, publish verification docs, then enforce verification in your own deployments, then announce.
</task>

<constraints>
- Never put private keys, passphrases or tokens in the repository, logs or examples.
- Do not claim a registry or tool supports a feature unless sure; mark it to verify.
- Verification steps must check identity or a trusted key, not only that a signature exists.
{{> output/uncertainty}}
</constraints>

<output_format>
## What to sign
Table: artifact | published where | consumers.
## Signing approach
Per artifact type: approach and reason.
## Provenance and SBOM
Bullets.
## CI changes
Bullets and a pipeline sketch.
## Verification for consumers
Steps users and systems follow, ready to paste into docs.
## Key and identity management
Bullets.
## Rollout
Numbered phases.
</output_format>
