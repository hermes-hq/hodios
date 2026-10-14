---
schema: 1
id: design-service-to-service-auth
kind: prompt
title: Design service-to-service authentication
description: Designs how internal services authenticate and authorise each other with mTLS, signed tokens or workload identity, and how end-user context is propagated safely between them.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, backend-engineer, security-engineer, devops-engineer]
requires: [none]
inputs: [spec, text, config, repo]
output: [docs, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [mtls, workload-identity, zero-trust, service-identity, token-exchange]
pairs_with:
  personas: [software-architect]
  prompts: [threat-model-feature, review-api-security, design-authorization-model, review-auth-flow]
args:
  - name: services
    description: The services, how they call each other (HTTP, gRPC, messaging), where they run (Kubernetes, VMs, serverless, several clouds), and any service mesh or gateway.
    type: text
    required: true
  - name: current_state
    description: How internal calls are trusted today, for example "network only", "a shared static token", "an API gateway in front".
    type: text
  - name: requirements
    description: Compliance or customer requirements, sensitive services, and whether calls need to act on behalf of an end user.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Service identity, Authorisation between services, End-user context, Secrets and rotation, Migration, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many systems trust any call that arrives from inside the network, so one compromised or misconfigured service, or one server-side request forgery bug, can call every other service with full power. The fix has two parts that are often mixed up. Service identity answers "which workload is calling": mutual TLS with short-lived certificates issued automatically (a service mesh or SPIFFE-style workload identity), or short-lived signed tokens obtained from a platform identity (cloud workload identity, Kubernetes service account tokens with an audience) rather than long-lived shared secrets. Authorisation answers "may this workload call this operation": an explicit allowlist per caller and operation, enforced at the callee or in the mesh. End-user context is a third concern: forwarding the user's original token everywhere widens its exposure, so mature designs either exchange it for a downscoped internal token or pass a signed internal assertion, and the callee still checks that the user may access the specific object.
</context>

<task>
<services>
{{services}}
</services>

{{#current_state}}
<current_state>
{{current_state}}
</current_state>
{{/current_state}}

{{#requirements}}
<requirements>
{{requirements}}
</requirements>
{{/requirements}}

1. If a repository is available, read the service clients, ingress and mesh configuration, and how secrets reach services, and say what you read.
2. Recommend the identity mechanism (mesh mTLS, workload identity tokens, or a combination) for this platform, considering every runtime involved, including async consumers and jobs.
3. Specify service identity: naming scheme for workloads, issuance, certificate or token lifetime, automatic rotation, and how non-mesh workloads such as serverless functions or external jobs get identities.
4. Specify authorisation between services: a default-deny policy, allowed caller and operation pairs, where it is enforced, how policies are reviewed and changed, and audit logging of denied calls.
5. Specify end-user context propagation: what is forwarded (exchanged downscoped token or signed internal assertion), audience and lifetime, and the rule that callees check object-level access for the user, not just the calling service.
6. Specify secrets and rotation: removal of long-lived shared tokens, where any remaining secrets live, and the rotation process.
7. Plan the migration in phases: inventory current calls, issue identities, run policies in audit mode, then enforce, with rollback for each phase.
</task>

<constraints>
- Do not treat network location (inside the VPC or cluster) as authentication.
- Do not recommend long-lived shared secrets as the target state.
- Do not forward full-privilege user tokens to every downstream service without discussing exposure and audience.
- Policy enforcement must be rolled out with an audit-only phase to avoid outages.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
In at most 6 lines.
## Service identity
## Authorisation between services
Table: caller, callee, allowed operations.
## End-user context
## Secrets and rotation
## Migration
Numbered phases, each with verification and rollback.
## Open questions
Numbered.
</output_format>
