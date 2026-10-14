---
schema: 1
id: set-up-storage-bucket
kind: prompt
title: Set up a secure object storage bucket
description: Configures an S3, GCS or Azure Blob bucket with public access blocked, encryption, versioning, lifecycle rules, CORS, logging and presigned URL access, as IaC.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, backend-engineer, fullstack-engineer]
stack: [aws, gcp, azure]
requires: [none]
inputs: [spec]
output: [code, config, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [object-storage, s3, presigned-urls, lifecycle-rules, cors]
pairs_with:
  prompts: [implement-file-upload, write-terraform-module, write-least-privilege-iam-policy]
args:
  - name: purpose
    description: What the bucket stores and who reads and writes it, e.g. "user avatars uploaded from the browser, shown publicly through a CDN" or "nightly database backups kept 90 days".
    type: text
    required: true
  - name: cloud
    description: Provider.
    type: enum
    enum: [aws, gcp, azure]
    default: aws
  - name: iac
    description: How to deliver it.
    type: enum
    enum: [terraform, cloudformation-or-cdk, cli-steps]
    default: terraform
output_contract:
  format: markdown
  sections: [Assumptions, Settings, Code, Access pattern, Checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Public buckets remain one of the most common data leaks, usually because someone needed "just one file" to be public and opened the whole bucket. Files meant for the public should be served through a CDN with private origin access (CloudFront origin access control on AWS, Azure Front Door Premium with Private Link, and on GCP the Cloud CDN private-origin options, whose support for your setup you should confirm) while the bucket itself stays private; private files go out through short-lived presigned or signed URLs. Other details people miss: versioning without a lifecycle rule for noncurrent versions grows the bill forever; incomplete multipart uploads accumulate silently unless a rule aborts them; CORS must list exact origins and methods for browser uploads; object ownership controls and disabled ACLs (S3) or uniform bucket-level access (GCS) remove a whole class of misconfiguration; and backups need object lock or retention policies, plus a copy in another region or account, to survive ransomware or a compromised credential.
</context>

<task>
Set up a {{cloud}} bucket, delivered as {{iac}}, for:
{{purpose}}

1. Classify the data (public assets, private user content, backups or logs, build artifacts) and say what that implies for access, retention and durability. If the purpose is too vague to classify, ask and stop.
2. Settings: public access blocked at bucket level (and account level on AWS); ACLs disabled or uniform access; encryption at rest (provider-managed or a customer key, with the reason); TLS-only policy; versioning where data must be recoverable; access logging or audit logs.
3. Lifecycle: transitions to cheaper tiers by age, expiry for temporary data, noncurrent version expiry, and abort of incomplete multipart uploads after a few days. For backups: retention or object lock in the right mode and replication to another region or account.
4. CORS only if browsers talk to the bucket directly: exact origins, methods and headers, no wildcards in production.
5. Access pattern: public content through a CDN with origin access control; private content through presigned or signed URLs with short expiry and content-type and size restrictions for uploads; the workload's identity with access to this bucket only.
6. Write the code or CLI steps with names, regions and origins from variables.
</task>

<constraints>
- Never make the bucket or its objects public. If the user insists on direct public access, explain the risk and offer the CDN pattern.
- No hard-coded account IDs, keys or bucket names; use variables.
- Only use settings and resource arguments that exist for the provider; mark any you are unsure of.
- Do not invent storage prices; name which settings change cost.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Assumptions
Bullets.
## Settings
Table: setting | value | why.
## Code
Fenced blocks with file paths, or numbered CLI steps.
## Access pattern
How reads and writes happen, with a short example of generating a presigned or signed URL in the app's language if known.
## Checklist
Checkboxes to confirm after creation (public access test, lifecycle visible, encryption on, logs arriving).
</output_format>
