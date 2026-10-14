---
schema: 1
id: write-policy-as-code
kind: prompt
title: Write policy-as-code guardrails
description: Writes OPA/Conftest or Kyverno policies that block insecure Terraform plans or Kubernetes manifests, with unit tests, an exception process and rollout in audit mode first.
category: devops
version: 1.0.0
status: incubating
stage: [build, verify]
role: [devops-engineer, security-engineer, sre]
stack: [terraform, kubernetes]
requires: [repo-read, file-write]
inputs: [spec, config, repo]
output: [code, tests, plan]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [policy-as-code, opa, rego, kyverno, conftest, guardrails]
pairs_with:
  prompts: [review-iac-plan, test-terraform-modules, configure-kubernetes-rbac]
args:
  - name: rules
    description: The rules to enforce in plain words, e.g. "no public S3 buckets, every resource tagged owner, containers must not run as root".
    type: text
    required: true
  - name: target
    description: What the policies check.
    type: enum
    enum: [terraform-plan, kubernetes-admission, kubernetes-manifests-in-ci]
    default: terraform-plan
  - name: engine
    description: Preferred engine if any (Conftest/OPA, Kyverno, OPA Gatekeeper) and the versions in use.
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Policies, Tests, Exceptions, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Policy as code turns review comments that keep recurring into automated checks, but a badly rolled-out policy blocks every deploy on day one and gets disabled by day two. The mature path is: write the policy with tests, run it in audit or warn mode, fix or except existing violations, then enforce. Rego policies for Terraform should evaluate `terraform show -json` plan output (`resource_changes[].change.after`), not the HCL source, because modules, variables and defaults are only resolved in the plan; values unknown until apply appear in `after_unknown` and must not be treated as violations or passes. Kyverno policies are YAML and easier for platform teams to read; Gatekeeper and Conftest share Rego. Admission policies must exempt system namespaces and handle every controller kind (Deployment, StatefulSet, CronJob, bare Pod) or they get bypassed. Every deny message must say what to change, or engineers will treat the policy as a black box. Current Rego (OPA 1.0) requires the `if` and `contains` keywords.
</context>

<task>
Write {{target}} policies that enforce:
{{rules}}
{{#engine}}
Engine: {{engine}}
{{/engine}}

1. If a repository is available, read existing policies, the CI pipeline and a few real resources or manifests the policies will see, so rules match real shapes.
2. Pick the engine if not given (Conftest for Terraform plans, Kyverno or Gatekeeper for admission), and say why.
3. For each rule, write one policy with: an ID, a severity, the exact resource types or kinds it applies to, a deny or violation message that names the resource and the fix, and handling of unknown or missing values (unknown-at-plan is not a pass and not a failure; say how it is treated).
4. Write unit tests for every policy: at least one passing input, one failing input and one edge case (module-nested resource, missing field, init container, CronJob template). Use `opa test`/`conftest verify` or the Kyverno CLI test format.
5. Exceptions: a reviewed mechanism (an annotation or tag with a ticket reference and expiry, or a separate exceptions file) and a policy that rejects exceptions without one.
6. Rollout: audit or warn mode first, a report of current violations, a date to enforce, and the CI or admission wiring for both stages. For admission, exclude system namespaces and set failure policy deliberately.
</task>

<constraints>
- Write Rego in OPA 1.0 syntax (`if`, `contains`); if the user's version is older, say what changes.
- Never write a policy that silently passes when the field it checks is absent.
- Do not enable enforcement in a live cluster or CI gate yourself; write the config and the steps.
- Use only resource attribute names that exist in the provider schema or Kubernetes API; mark any you are unsure of.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Assumptions
Bullets.
## Policies
One fenced block per policy file with its path, preceded by a one-line rule summary.
## Tests
Test files with inputs, and the command to run them.
## Exceptions
How an exception is requested, recorded and expired.
## Rollout
Numbered stages with the switch from audit to enforce.
</output_format>
