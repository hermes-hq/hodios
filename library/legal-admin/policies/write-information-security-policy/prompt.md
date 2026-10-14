---
schema: 1
id: write-information-security-policy
kind: prompt
title: Write an information security policy
description: Drafts a top-level information security policy and short staff rules for a small company, sized to its systems and data, ready for customer security questionnaires and audits.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, executive, operations-manager, security-engineer]
requires: [none]
inputs: [text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [information-security, isms, access-control, security-questionnaire, staff-security-rules]
pairs_with:
  prompts: [answer-security-questionnaire, plan-data-breach-response, write-ai-use-policy]
  personas: [compliance-officer]
args:
  - name: company
    description: Size, what the company does, the main systems (email and office suite, cloud hosting, code repositories, CRM, payroll), devices (company or personal laptops and phones), the most sensitive data held, and controls already in place (SSO, MFA, disk encryption, backups, device management).
    type: text
    required: true
  - name: driver
    description: Why now, for example enterprise customer questionnaires, a SOC 2 or ISO 27001 project, cyber insurance, or a recent incident.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Current position, Policy, Staff security rules, Control gaps, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Small companies usually need an information security policy because a customer, insurer or auditor asked for one. Reviewers check that it is approved by leadership, has an owner, covers the expected areas (roles, asset and data classification, access control, devices, passwords and MFA, encryption, backups, suppliers, incidents, staff onboarding and leaving, review), and that the policy matches reality: if it says "all laptops are encrypted and managed" and they are not, that becomes a finding or a misrepresentation in a contract. The good pattern is a short top-level policy that states principles and points to a few standards, plus a one-page set of staff rules people can actually follow. Frameworks such as ISO 27001 and SOC 2 have their own expected policy sets; this draft is a starting point, not a certification.

Driver: {{driver}}
</context>

<task>
Company:
<company>
{{company}}
</company>

1. Current position: a table of control areas, what the input says is in place, and what is unknown or missing.
2. Policy, in plain language, approved by [NAME, ROLE], with an owner and review date:
   - Purpose, scope (people, systems, data, suppliers) and roles.
   - Data classification with three or four levels and examples from this company's data.
   - Access control: least privilege, SSO and MFA, joiners, movers and leavers, access reviews.
   - Devices: company and personal device rules, encryption, screen lock, updates, lost devices.
   - Passwords and secrets, encryption in transit and at rest, backups and restore tests.
   - Suppliers and SaaS: approval, security review proportionate to data, contracts.
   - Secure development, if the company builds software.
   - Incident reporting and response (link to the response plan), logging and monitoring.
   - Training, exceptions process, consequences, review.
   Write each commitment so it is true today, or mark it [TARGET BY DATE] when it is not yet in place.
3. Staff security rules: one page of do and do not, written for non-technical staff.
4. Control gaps: what must be fixed so the policy is true, prioritised by risk and by what the driver needs.
5. Points to confirm: data protection, sector or contractual requirements that may apply.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state a control as in place unless the input says so; this policy may be shown to customers and misrepresenting controls creates contractual and legal risk.
- Do not claim the draft makes the company compliant with ISO 27001, SOC 2 or any law.
- Keep it proportionate: a 12-person startup gets a short policy and a handful of standards, not a 40-document set.
- Do not include real credentials, hostnames or internal URLs; use placeholders.
{{> output/uncertainty}}
</constraints>

<output_format>
## Current position
Table: area | in place | unknown or missing.

## Policy
The full policy with headings.

## Staff security rules
One page of bullets.

## Control gaps
Numbered, highest priority first.

## Points to confirm
Numbered.
</output_format>
