---
schema: 1
id: audit-cloud-storage-exposure
kind: prompt
title: Audit cloud storage buckets for exposure
description: Finds publicly readable or writable S3, Google Cloud Storage or Azure Blob containers, risky presigned URL use and missing encryption, with fixes that keep the app working.
category: security
version: 1.0.0
status: incubating
stage: [verify, operate]
role: [devops-engineer, backend-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [report, diff, plan]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [s3, object-storage, presigned-urls, public-access, cloud-security]
pairs_with:
  prompts: [review-cloud-iam-policy, implement-file-upload, plan-data-encryption]
  personas: [security-auditor]
args:
  - name: scope
    description: The cloud provider and what to check - Terraform or CloudFormation in the repo, app code that uses storage, and read-only CLI access if available.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Findings, Fixes, App changes, Verification, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Public buckets remain one of the most common causes of data leaks, usually through drift: a bucket made public for a static site or a quick demo that later gets user uploads, or an ACL on single objects that overrides the bucket setting. Each provider has an account-level guard (S3 Block Public Access, GCS public access prevention with uniform bucket-level access, Azure "allow blob public access" off at the storage account) that stops this whole class, and the fix is to turn it on and serve public content through a CDN with origin access instead. Presigned and SAS URLs are the second risk: long expiry, write URLs without a content length or type condition, URLs built for keys the user chose (letting them overwrite other users' files), and account-level SAS tokens with every permission stored in front-end code. Listing permission is often more damaging than read, because it reveals every object key. Encryption at rest is now on by default on the major providers, so it is rarely the real gap; access is.
</context>

<task>
Audit storage exposure for: {{scope}}

1. Inventory buckets or containers from infrastructure code and, if read-only CLI access is available, from the account (`aws s3api get-public-access-block`, `get-bucket-policy-status`, `gcloud storage buckets describe`, `az storage account show`). Record for each: purpose, public read, public list, public write, account-level guard, versioning, logging.
2. Classify each bucket as intended public (static assets), private, or mixed. Mixed buckets are findings on their own.
3. Read app code that creates presigned, signed or SAS URLs. Check expiry, HTTP method, whether the object key is generated server-side and scoped to the user, content length and type conditions on uploads, and that download URLs are only issued after an authorization check.
4. Search front-end and mobile code and config for storage account keys, SAS tokens or bucket credentials (report by file, never print values).
5. Write fixes: account-level public access guard on; bucket policies that deny non-TLS requests; public content moved behind a CDN with origin access control; short-lived, narrowly scoped presigned URLs; versioning and access logging on buckets with user data.
6. Express infrastructure fixes as Terraform or the repo's IaC tool, and app fixes as code changes, then run `terraform plan` or the equivalent and the app's tests.
</task>

<constraints>
- Use read-only commands only; never change bucket settings, delete objects or download object contents.
- Before enabling an account-level guard, list every bucket and app path that currently relies on public access so nothing breaks unexpectedly.
- Never print keys, tokens or object contents.
- Do not test access against buckets the user does not own.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Inventory
Table: bucket, purpose, public read, public list, public write, guard on, verdict.
## Findings
Ranked list: severity, resource or file:line, exposure, fix.
## Fixes
IaC changes in code blocks.
## App changes
One line per file: `path`, what changed.
## Verification
Commands run (read-only and plan) and actual results.
## Rollout
Order of changes and what to check after each.
</output_format>
