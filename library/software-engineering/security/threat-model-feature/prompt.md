---
schema: 1
id: threat-model-feature
kind: prompt
title: Threat model a feature
description: Builds a threat model for one feature or change, mapping data flows and trust boundaries to ranked threats and mitigations. Use during design, before the code is written or merged.
category: security
version: 1.0.0
status: experimental
stage: [design]
role: [security-engineer, software-engineer, architect, tech-lead]
stack: []
requires: [repo-read]
inputs: [spec, repo]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [threat-model, stride, design-review]
pairs_with:
  personas: [security-auditor]
  prompts: [review-pr-for-security]
args:
  - name: feature
    description: The feature to model. A spec, design doc, ticket, or a description of what it does and which code implements it.
    type: text
    required: true
  - name: system_context
    description: What surrounds it, if not in the repo. Deployment, users, auth model, data it touches, external services.
    type: text
  - name: depth
    description: How far to go. quick lists the top 5 threats; standard covers every trust boundary; thorough adds abuse cases and supply chain.
    type: enum
    enum: [quick, standard, thorough]
    default: standard
output_contract:
  format: markdown
  sections: [Scope and assumptions, Data flows, Threats, Top mitigations, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A threat model is useful only when it is specific to this feature. Generic lists ("use HTTPS", "validate input") are already known and get ignored. The value is in naming the exact place where an attacker crosses a trust boundary, what they gain, and the one control that stops them, while the design is still cheap to change.
</context>

<task>
Threat model this feature:
{{feature}}
{{#system_context}}
System context:
{{system_context}}
{{/system_context}}
Depth: {{depth}}.

1. Read the spec and, if the code exists, the code that implements it. State what you read.
2. List the elements: actors (human and machine), processes, data stores and external services. Mark each data store with the most sensitive data it holds (credentials, personal data, payment data, secrets, internal only).
3. Draw the data flows between elements and mark every trust boundary: where data or control crosses from less trusted to more trusted (internet to service, tenant to tenant, user to admin, service to third party, CI to production).
4. At each boundary, apply STRIDE (spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege). Keep a threat only when you can name the attacker, the entry point, what they send or do, and what they gain.
5. For each kept threat, check whether a control already exists. Mark it "verified" only if you saw it in code or config, otherwise "assumed" or "missing".
6. Rate likelihood and impact as low, medium or high, and rank by their combination.
7. For each threat rated high on either axis, give the smallest mitigation that closes it and the test that would prove the mitigation works.
8. Only at thorough depth: also cover abuse of legitimate features (scraping, enumeration, free-tier abuse, spam) and the dependencies and build steps the feature adds.
</task>

<constraints>
- Every threat names a specific element and boundary from step 3. Drop threats that would apply to any web app unchanged.
- Never claim a control exists unless you saw it. Say what you would need to see to verify it.
- Prefer design changes (remove the boundary crossing, narrow a permission, drop a field) over adding more checks.
- For quick depth, stop at 5 threats. For standard and thorough, stop at 15 and say how many you dropped as low risk.
- Describe attacks at the level a defender needs to test them. No weaponised exploit code.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and assumptions
What is in and out of scope, what you read, and each assumption you made.

## Data flows
A numbered list of flows (`1. Browser -> API: session cookie, order JSON`), with each trust boundary marked `[TB-n: name]`. A Mermaid flowchart is welcome if it stays under 20 nodes.

## Threats
| ID | Boundary | STRIDE | Threat (attacker, entry, action, gain) | Control (verified / assumed / missing) | Likelihood | Impact |

## Top mitigations
Numbered, highest risk first. Each: threat IDs it closes, the change, and the test that proves it.

## Open questions
Questions whose answers would change a rating, each with the threat ID it affects. "None" if there are none.
</output_format>
