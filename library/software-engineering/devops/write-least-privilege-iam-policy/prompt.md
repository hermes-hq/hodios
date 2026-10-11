---
schema: 1
id: write-least-privilege-iam-policy
kind: prompt
title: Write a least-privilege IAM policy for a workload
description: Writes a least-privilege IAM role and policy for a workload from the cloud API calls its code actually makes, scoped by resource and condition, with a check against access logs or analysers.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, backend-engineer, security-engineer]
stack: [aws, gcp, azure]
requires: [repo-read]
inputs: [repo, spec, logs]
output: [config, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [iam, least-privilege, workload-identity, access-policy]
pairs_with:
  prompts: [review-cloud-iam-policy, set-up-keyless-ci-deploys, write-terraform-module]
args:
  - name: workload
    description: The service, function or job that needs access, where it runs (Lambda, ECS, EKS, GKE, VM, CI), and what it does with cloud resources. Point at the code if a repo is available.
    type: text
    required: true
  - name: cloud
    description: Cloud provider.
    type: enum
    enum: [aws, gcp, azure]
    default: aws
  - name: evidence
    description: Optional evidence of real usage, such as CloudTrail or audit log extracts, Access Analyzer or IAM Recommender output, or the error messages of denied calls.
    type: text
output_contract:
  format: markdown
  sections: [Calls found, Identity, Policy, Scoping notes, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Least privilege fails in two directions. Over-broad policies (`s3:*` on `*`, the `Editor` role, `Contributor` on a subscription) turn a small bug into a large breach, because any code execution bug becomes account takeover. Over-narrow policies written by guesswork break at runtime on the one call nobody listed, and the fix under pressure is usually a wildcard. The reliable method starts from evidence: the SDK calls in the code, mapped to IAM actions (not always one-to-one: an S3 `upload` with multipart needs several actions, KMS-encrypted objects need `kms:Decrypt` or `GenerateDataKey`, and reading a secret may need the key too), confirmed against access logs or the provider's analyser. Then scope resources to exact ARNs or names, add conditions (resource tags, source VPC, `aws:SecureTransport`), and bind the identity to the workload itself (IRSA or Pod Identity, GKE Workload Identity, Azure managed identity) instead of long-lived keys.
</context>

<task>
Write a least-privilege identity and policy on {{cloud}} for:
{{workload}}
{{#evidence}}
Evidence of real usage:
{{evidence}}
{{/evidence}}

1. If the repository is available, search the code for every cloud SDK client and call (including retries, pagination and helper libraries) and list them with file and line. Include calls made by frameworks the code configures (log shipping, tracing exporters, secret loaders).
2. Map each call to the exact IAM actions or permissions it needs, noting hidden dependencies (KMS for encrypted resources, `iam:PassRole` for launching resources, list permissions for pagination).
3. Choose the identity mechanism for where the workload runs, with no static access keys, and write the trust policy or binding scoped to that one workload (service account, namespace, function).
4. Write the policy: one statement per resource group, exact resource identifiers built from variables, no wildcard actions, conditions where they narrow risk. On GCP or Azure, prefer predefined roles only when they are close; otherwise a custom role with the listed permissions, bound at the narrowest scope (resource, not project or subscription).
5. Compare with the evidence if given: actions used but missing from the policy, and actions granted but never used.
6. Give the verification steps: the provider's policy simulator or analyser, a test run in non-prod, and how to read denials in the logs.
</task>

<constraints>
- Never use `*` as both action and resource. Any remaining wildcard must be justified in one line.
- Only list actions and permissions that exist; if unsure of an exact action name, mark it and say how to confirm it.
- Do not invent account IDs, ARNs or project IDs; use placeholders or variables.
- If you could not see the code, say the call list is based on the description and is incomplete until checked against logs.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Calls found
Table: call | file:line or source | IAM actions | resource.
## Identity
The mechanism and the trust policy or binding as a fenced block.
## Policy
The policy or custom role as a fenced block (JSON, HCL or YAML to match the repo).
## Scoping notes
Bullets: each wildcard or broad grant left and why, and each condition and what it prevents.
## Verify
Numbered steps.
</output_format>
