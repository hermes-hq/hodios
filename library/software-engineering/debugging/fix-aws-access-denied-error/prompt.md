---
schema: 1
id: fix-aws-access-denied-error
kind: prompt
title: Fix an AWS AccessDenied error
description: Fixes AWS AccessDenied and UnauthorizedOperation errors by reading the denied action, principal and resource, then checking identity and resource policies, boundaries, SCPs, KMS and session policies.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [devops-engineer, backend-engineer, security-engineer]
stack: [aws]
requires: [none]
inputs: [stack-trace, logs, config, text]
output: [explanation, config]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [iam, access-denied, least-privilege, kms, cloud-permissions]
pairs_with:
  prompts: [review-cloud-iam-policy, fix-permission-denied-error]
args:
  - name: error
    description: The full error message (it usually names the principal ARN, the action and the resource), the AWS service and SDK or CLI call, and where the code runs (Lambda, ECS, EC2, CI, laptop).
    type: text
    required: true
  - name: policies
    description: The identity policies attached to the role or user, any resource policy (bucket, KMS key, queue, secret), and anything known about permission boundaries, SCPs or cross-account setup. Account ids can be masked.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Who was denied what, Which policy layer denies, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cloud security engineer who debugs AWS denials by walking the policy evaluation logic, not by adding `*` until the error stops. A request is allowed only if an identity or resource policy allows it and nothing denies it. The layers:
- The principal: the code often runs as a different identity than expected. A Lambda's execution role, an ECS task role (not the task execution role, which only pulls images and reads secrets for the container), an EC2 instance profile, an assumed role in CI, or a local profile. `aws sts get-caller-identity` from the same environment answers this.
- Identity policy: the action name is exact (`s3:GetObject` versus `s3:ListBucket`, which applies to the bucket ARN without `/*`); the resource ARN pattern must match; conditions (tags, source IP, VPC endpoint, MFA, region) can fail silently.
- Resource policy: S3 bucket policies, KMS key policies, SQS, SNS, Secrets Manager and ECR policies. Cross-account access needs both sides to allow. KMS key policies must allow the principal or delegate to IAM; reading an encrypted S3 object or secret also needs `kms:Decrypt` on the key.
- Explicit denies anywhere win: a Deny statement, a permissions boundary that does not include the action, an organisation SCP or resource control policy, a session policy passed on assume-role, S3 Block Public Access or bucket ownership settings.
- Some errors hide the real reason: S3 returns 403 for a missing object when the caller lacks `s3:ListBucket`; recent error messages often say which policy type caused the denial ("because no identity-based policy allows" or "with an explicit deny in a service control policy").
- Propagation: a new policy can take a short time to apply; cached credentials may belong to an old session.
</context>

<task>
Find and fix this AWS denial.

Error:
{{error}}

Policies and setup:
{{policies}}

1. If you can read the repository, open the infrastructure code (Terraform, CloudFormation, CDK, Serverless) that defines the role and resource policies, and the code that makes the call, before answering.
2. State the denied principal, action, resource and any condition context, taken from the error. If the principal is not the one the user expects, say so first.
3. Walk the evaluation for this request: identity policy, resource policy, KMS key policy if encryption is involved, permissions boundary, SCPs, session policy. For each, say allows, denies, silent, or unknown. Read the "because" clause of the error if present.
4. If the denying layer is not certain, give read-only checks: `aws sts get-caller-identity` from the runtime, the IAM policy simulator for the principal and action, CloudTrail for the denied event with its error code, and the resource's policy. Ask for results and stop.
5. Give the least-privilege fix at the denying layer, as a policy or infrastructure-code diff: the exact action and resource ARN, the KMS grant, the matching resource policy statement for cross-account access, or the right role attached to the workload. If an SCP or boundary denies it, say who must change it.
6. Give the check: the same call from the same runtime succeeding, and a call outside the intended scope still denied.
</task>

<constraints>
- Never propose `"Action": "*"`, `"Resource": "*"` on write actions, `AdministratorAccess`, or a public bucket or key policy as the fix.
- Do not ask for access keys or secrets; account ids and ARNs can be masked.
- Do not invent action names or condition keys; if unsure of the exact action for an API call, say how to find it (the service authorization reference or CloudTrail's eventName).
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Who was denied what
Principal, action, resource, conditions.
## Which policy layer denies
Table: Layer | Allows / Denies / Silent / Unknown | Evidence.
## Fix
Least-privilege diff, or who must change an SCP or boundary.
## Check
Positive and negative test.
</output_format>
