---
schema: 1
id: audit-compliance-controls
kind: prompt
title: Audit a codebase's compliance controls
description: Checks a codebase against the technical controls behind SOC 2, GDPR or HIPAA, like encryption, audit logging, access control, retention and deletion, and marks each pass, partial or fail with a fix.
category: security
version: 1.0.0
status: incubating
aliases: [sec-compliance]
stage: [review, operate]
role: [security-engineer, backend-engineer, tech-lead, engineering-manager]
stack: []
requires: [repo-read]
inputs: [repo, config]
output: [report, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [soc-2, hipaa, audit-logging, encryption, data-retention, right-to-erasure]
pairs_with:
  personas: [security-auditor, compliance-officer]
  prompts: [audit-repo-for-secrets, implement-audit-log, plan-data-archival, map-personal-data-processing]
args:
  - name: target
    description: The repository or services to check, plus infrastructure code if it lives elsewhere.
    type: text
    required: true
  - name: framework
    description: The framework to check against.
    type: enum
    enum: [soc-2, gdpr, hipaa, all]
    default: all
  - name: data_notes
    description: What personal, health or customer data the system holds, if you know.
    type: text
output_contract:
  format: markdown
  sections: [Scope, Control checklist, Gaps to fix first, Outside the code, Professional review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Auditors of SOC 2, GDPR or HIPAA ask for evidence that specific technical controls exist: data is encrypted, access is limited and logged, personal data can be found, exported and deleted, and data is not kept forever. Many of those controls live in code and infrastructure configuration, and engineers can check them before an auditor does. Compliance itself also depends on policies, contracts and processes that a codebase cannot show, so this check covers the technical side and says clearly what it cannot decide.
</context>

<task>
Check {{target}} against the technical controls for {{framework}}.
{{#data_notes}}Data held: {{data_notes}}
{{/data_notes}}
1. Find the regulated data: which tables, fields, files, logs and third-party services hold personal, health or customer data. Note where it flows.
2. Check each control and record the evidence (file and line, or config):
   - encryption in transit (TLS everywhere, including internal calls and database connections) and at rest (database, backups, object storage, disks);
   - access control: least-privilege roles, authorisation on every endpoint that touches regulated data, admin access limited and reviewed, service credentials scoped;
   - audit logging: who read or changed regulated data and when, tamper-resistant storage, retention of the logs themselves;
   - secrets management: no secrets in code or images, rotation possible;
   - personal data handling: data minimisation, regulated data kept out of logs, analytics and error trackers;
   - retention and deletion: retention periods enforced in code or jobs, right to deletion and export supported across primary stores, replicas, backups and third parties;
   - consent: consent recorded with time and version where processing depends on it;
   - change management and availability: reviewed changes, backups that are restored in tests, monitoring and alerting.
3. Mark each control pass, partial or fail, with the evidence and the remediation step.
4. Rank the gaps by risk to people's data and by how hard an auditor would push on them.
</task>

<constraints>
- Mark a control as passing only with evidence you found; otherwise mark it unknown and say what would show it.
- Do not claim the system is compliant or non-compliant overall; compliance also depends on policies, contracts and processes outside the code.
- Do not copy real personal data or secrets into the report.
{{> guardrails/professional-limits}}
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Scope
Framework, systems checked, and where regulated data lives.
## Control checklist
Table grouped by control area: control, status (pass, partial, fail, unknown), evidence, remediation.
## Gaps to fix first
Up to 7 gaps, ranked, each with the concrete change.
## Outside the code
Requirements the code cannot show (policies, vendor agreements, training, risk assessments) to confirm with the team.
## Professional review
What to take to a compliance professional or auditor, and what to bring.
</output_format>
