---
schema: 1
id: audit-repo-for-secrets
kind: prompt
title: Audit a repository and its history for secrets
description: Scans a repository and its git history for committed secrets, triages real ones, reports exposure windows and rotation steps, never printing a value. Use before open-sourcing or after a scare.
category: security
version: 1.0.1
status: incubating
aliases: [sec-secrets]
stage: [verify, review]
role: [security-engineer, devops-engineer, maintainer]
requires: [repo-read, file-write, shell, git]
inputs: [repo]
output: [report, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [secret-scanning, git-history, credential-rotation, redaction, open-sourcing]
pairs_with:
  prompts: [respond-to-leaked-secret, plan-secrets-management]
  personas: [security-auditor]
args:
  - name: repo_path
    description: Path to the local clone to audit. It should be a full clone (not shallow) when history is scanned.
    type: string
    required: true
  - name: history_depth
    description: current scans only the working tree; full also scans every commit on every branch and tag.
    type: enum
    enum: [current, full]
    default: full
output_contract:
  format: markdown
  sections: [Scope, Findings, Exposure, Rotation plan, Prevention, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id sec-secrets."}
---
<context>
A secret committed once stays in git history after the file is fixed, in every clone, fork and CI cache that fetched it. Deleting the line or even rewriting history does not make it safe; only rotating the credential does. Audits fail in two directions: they drown the team in false positives (test fixtures, example keys, hashes), or they leak the secrets a second time by pasting them into a report, a ticket or a chat log.
</context>

<task>
Audit the repository at `{{repo_path}}` for committed secrets. Scope: {{history_depth}}.

1. Check the clone: if `full` was asked and the clone is shallow or missing branches, say so and ask for a full clone (or fetch all refs if allowed) before continuing.
2. Use a dedicated scanner that is already installed (for example gitleaks, trufflehog in local mode, detect-secrets or git-secrets). Do not install tools or contact the network without asking, and turn off any live verification the scanner does by default (for example trufflehog's `--no-verification`), because verifying a key means using it. If none is available, fall back to targeted searches with `git grep` on the working tree and `git log -p --all -G '<pattern>'` for history, using high-signal patterns: private key headers, cloud access key id formats, provider token prefixes, connection strings with embedded passwords, `password=` and `secret=` assignments with literal values, committed `.env`, `.npmrc`, `.pypirc`, kubeconfig, keystore and credential files.
3. Write raw scanner output only to a file outside the repository with restrictive permissions, and tell the user where it is and to delete it after triage.
4. Triage every hit: **likely real** (production-looking value, real provider format, used in config), **test or example** (documented fake, fixture, obviously placeholder), or **unclear**. Check entropy, format, the surrounding code and whether the value appears in docs as an example. Do not test a secret against its provider's API to see if it works; treat likely real and unclear secrets as live.
5. For each real or unclear finding, establish the exposure window: the commit and date it was introduced, the commit and date it was removed (or "still present"), the branches and tags that contain it, and whether the repository is or was public, mirrored or forked.
6. Write a rotation plan per credential type: who owns it (a placeholder if unknown), how to rotate or revoke it, what depends on it, and how to check provider access logs for use during the exposure window. Rotation comes first; history rewriting (for example with git filter-repo) is optional, needs coordination with every clone holder, and you do not perform it.
7. Recommend prevention that fits the repo: a pre-commit hook and CI scan with the same tool, `.gitignore` entries for the file types found, a baseline or allowlist file for verified false positives, and where secrets should live instead.
</task>

<constraints>
- Never print, quote or paste a secret value. Identify each finding by file, line, commit, type and a redacted fingerprint: the provider's public prefix only when the format has one (such as `AKIA` or `ghp_`, never characters of a password or generic token), the length, and a short hash of the value, for example `AKIA… (20 chars, sha256:3f9a1c)`.
- Read-only on the repository: do not commit, rewrite history, delete files or push. The only files you write are the report and the raw scan file outside the repo.
- Do not contact providers or use any found credential for anything.
- If the scan is incomplete (tool limits, binary files, huge history), say what was not covered.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Scope
Repository, refs and commit count scanned, tools and patterns used, what was not covered.

## Findings
Table: ID | Type | Fingerprint | File and line | Triage | Still present.

## Exposure
Table: ID | Introduced (commit, date) | Removed (commit, date) | Branches and tags | Public exposure.

## Rotation plan
Ordered checklist per finding: owner, rotate or revoke step, dependents to update, access-log check, done criteria.

## Prevention
Concrete changes, each one line.

## Verification
Commands run and their real results, and where the raw scan file is (to be deleted after triage).
</output_format>
