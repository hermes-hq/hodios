---
schema: 1
id: write-anti-money-laundering-policy
kind: prompt
title: Write an anti-money laundering policy
description: Drafts an anti-money laundering policy and procedures for a small regulated firm - roles, customer due diligence, monitoring, reporting suspicions, tipping off, training and records.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, legal-professional]
subject: [law]
requires: [none]
inputs: [text, document]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [anti-money-laundering, aml, customer-due-diligence, suspicious-activity-reporting, regulated-sector, financial-crime]
pairs_with:
  prompts: [write-aml-risk-assessment, plan-customer-due-diligence, set-up-sanctions-screening, plan-staff-compliance-training]
args:
  - name: firm
    description: What the firm does (for example accountancy, bookkeeping, estate or letting agency, legal services, art or high-value dealing, money service, crypto), size, number of staff, who will be the nominated officer, typical clients and services, and its supervisor if known.
    type: text
    required: true
  - name: jurisdiction
    description: Country whose anti-money laundering law and supervisor apply.
    type: string
    required: true
  - name: risk_assessment
    description: The main findings of your firm-wide risk assessment (higher-risk clients, services, channels, countries). Optional, but the policy should follow it.
    type: text
output_contract:
  format: markdown
  sections: [Policy statement, Roles and responsibilities, Customer due diligence, Enhanced and simplified measures, Ongoing monitoring, Reporting suspicions, Training, Records, Review and approval, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft the policy, controls and procedures document that anti-money laundering law expects of a small firm in a regulated sector. Supervisors look for a policy that is proportionate, approved by senior management, and visibly based on the firm's own risk assessment, not a generic template. It usually covers: who is responsible (a senior manager accountable for compliance and a nominated officer or money laundering reporting officer who receives internal reports and decides on external ones); customer due diligence (identifying and verifying the client and any beneficial owners, understanding the purpose and intended nature of the relationship, and doing it before the work starts, with limited exceptions); when to apply enhanced due diligence (politically exposed persons, high-risk third countries, complex or unusual structures or transactions, non-face-to-face risks) and when simplified measures are allowed; what to do when due diligence cannot be completed (do not proceed, and consider whether to report); ongoing monitoring and refreshing information; internal reporting of suspicions to the nominated officer, the external report to the financial intelligence unit, and the offence of tipping off the client; any consent or defence procedure before continuing with a suspicious transaction; training on joining and regularly; record keeping for a set period after the relationship ends; and periodic review or independent audit. The failures supervisors find most often are policies that do not match practice, due diligence decisions not recorded, no politically exposed person or sanctions checks, staff who do not know who the nominated officer is, and no evidence of training.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Firm:
<firm>
{{firm}}
</firm>
{{#risk_assessment}}

Risk assessment findings:
<risks>
{{risk_assessment}}
</risks>
{{/risk_assessment}}

1. Policy statement: the firm's commitment, scope (services and staff covered), and the link to the firm-wide risk assessment.
2. Roles and responsibilities: senior management, nominated officer and deputy, all staff, with [NAME] placeholders.
3. Customer due diligence: step-by-step procedure for individuals and for companies or trusts, acceptable evidence types, beneficial ownership, timing, and recording the risk rating and decision.
4. Enhanced and simplified measures: triggers drawn from the risk assessment or typical for this sector, what extra steps apply, who approves, and when simplified measures may be used.
5. Ongoing monitoring: what to watch for in this sector, refresh frequency by risk level, and sanctions screening.
6. Reporting suspicions: what a suspicion is, internal report form contents, the nominated officer's decision and record, external reporting, tipping off, and what to do with the work while waiting.
7. Training: who, when, content, and records.
8. Records: what to keep, for how long (marked to confirm), and where.
9. Review and approval: review triggers and frequency, and a sign-off block for senior management.
10. Points to verify with the supervisor's guidance.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent the supervisor, the financial intelligence unit's name, reporting portals, retention periods or thresholds; name them only if confident and mark "confirm for {{jurisdiction}}".
- Do not include steps that would tip off a client or advice on how to avoid reporting.
- If the firm wants a policy only "for the file" that staff will not follow, explain that supervisors test practice against the policy and that a mismatch is itself a finding.
- If no risk assessment is given, say the policy must be aligned with one and recommend writing it first or alongside.
{{> output/uncertainty}}
</constraints>

<output_format>
## Policy statement
Short paragraphs.

## Roles and responsibilities
Table: role | person | responsibilities.

## Customer due diligence
Numbered procedure, then an evidence table.

## Enhanced and simplified measures
Table: trigger | extra measures | approval.

## Ongoing monitoring
Bulleted list.

## Reporting suspicions
Numbered procedure, with a tipping-off warning box.

## Training
Table: who | when | content | record.

## Records
Table: record | retention | location.

## Review and approval
Review schedule and sign-off block.

## Points to verify
Numbered list.
</output_format>
