---
schema: 1
id: investigate-insider-data-exfiltration
kind: prompt
title: Investigate suspected insider data theft
description: Plans an authorised investigation into suspected data theft by an employee or leaver across email, cloud storage, USB, SaaS and endpoint logs, with HR and legal coordination and fairness checks.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate, review]
role: [security-engineer, manager]
requires: [none]
inputs: [text, logs]
output: [plan, report, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [insider-threat, data-exfiltration, departing-employee, chain-of-custody, hr-legal]
pairs_with:
  prompts: [triage-dlp-alert, build-forensic-timeline, plan-evidence-acquisition, investigate-compromised-mailbox]
args:
  - name: concern
    description: What raised the concern - a DLP alert, a manager's report, a resignation to a competitor, a customer saying a rival has your data - and the person's role and dates (notice given, last day).
    type: text
    required: true
  - name: log_sources
    description: Which telemetry you have - mail logs, cloud storage and SaaS audit logs, proxy or CASB, EDR with USB and file events, print logs, source code platform audit logs - and retention.
    type: text
  - name: constraints
    description: Country or countries involved, monitoring policy and employee notices, works council or union agreements, and who has authorised the investigation.
    type: text
output_contract:
  format: markdown
  sections: [Authorisation check, Hypotheses, Evidence plan, Findings, Fairness checks, Recommendations, Handover]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Insider cases are as much about process as technology. Investigating an employee without proper authorisation, beyond what the monitoring policy and local law allow, or in a way that tips them off, can make the evidence unusable and expose the company to claims. Employee monitoring rules differ widely between countries, and some require works council involvement or proportionality assessments. The common exfiltration paths are forwarding to personal email (including auto-forward rules), uploads to personal cloud storage, sync clients, USB storage, bulk exports from CRM or other SaaS, cloning many repositories, printing, and photos of screens, which leave no log. The strongest signals compare behaviour against the person's own baseline and timeline: a spike in downloads in the weeks before resignation, access to data outside their role, renaming or archiving files before transfer, and deleting traces. Suspicion often starts from a manager's belief, so investigators must look as hard for innocent explanations as for guilt, and record both.
</context>

<task>
Plan and support the investigation:

<concern>
{{concern}}
</concern>
{{#log_sources}}

<log_sources>
{{log_sources}}
</log_sources>
{{/log_sources}}
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Authorisation check: confirm who authorised the investigation (HR and legal at minimum), that it fits the monitoring policy and local law, and who is on the need-to-know list. If authorisation is missing, stop and say what is needed before any log review.
2. Hypotheses: the specific allegation, plausible innocent explanations, and what each would look like in the data.
3. Evidence plan: for each available source, the searches to run for the person's accounts and devices within a defined window (for example 90 days before notice to now), compared against their own earlier baseline and peers in the same role. Include mail forwarding rules and external recipients, cloud storage shares and personal-domain uploads, USB and file copy events, SaaS bulk exports, repository clones, printing. Note retention limits and preserve logs now.
4. Findings: if results are given, build a timeline and assess each item against the hypotheses, citing the source.
5. Fairness checks: evidence that supports innocent explanations, business reasons for the access, and gaps in what the logs can show.
6. Recommendations: proportionate next steps for HR and legal to decide (access reduction, preserving the person's devices at exit, a recovery or deletion request, legal action), and whether access must be cut immediately to prevent further loss.
7. Handover: a factual summary with chain-of-custody notes, written so it can be read by HR and legal without technical background.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not proceed with log review without stated authorisation; say what to obtain.
- Stay within the allegation and window. Do not search personal communications beyond what is authorised and relevant.
- State facts and evidence, not conclusions about guilt or intent. Decisions about the person belong to HR and legal.
- Monitoring and employment law vary by country; do not state what is legal for this case, and recommend legal counsel.
- Do not suggest covert surveillance, accessing personal accounts or devices without consent, or confronting the person.
{{> output/uncertainty}}
</constraints>

<output_format>
## Authorisation check
Checklist with status.

## Hypotheses
Table: Hypothesis | Would look like | Data source.

## Evidence plan
Table: Source | Search | Window | Retention risk.

## Findings
Timeline table: Time | Source | Event | Supports which hypothesis. Or "No results provided yet".

## Fairness checks
Bullets.

## Recommendations
Numbered, labelled as for HR and legal to decide.

## Handover
A plain-language summary in a fenced block.
</output_format>
