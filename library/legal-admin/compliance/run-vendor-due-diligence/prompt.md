---
schema: 1
id: run-vendor-due-diligence
kind: prompt
title: Run due diligence on a new vendor
description: Assesses a new software or service vendor before onboarding for data protection, security, continuity and contract risk, scaled to its data and access, with questions and a go or no-go record.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [operations-manager, founder, legal-professional, engineering-manager]
subject: [law, saas]
requires: [none]
inputs: [text, document]
output: [report, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [vendor-assessment, third-party-risk, supplier-onboarding, processor-checks, procurement]
pairs_with:
  prompts: [review-data-processing-agreement, assess-international-data-transfer, assess-vendor-breach-impact, answer-security-questionnaire]
  personas: [compliance-officer]
args:
  - name: vendor
    description: The vendor and what it will do for you - the service, what data it will hold or access (personal, financial, confidential), which systems it connects to, how many users, and how critical it is to operations.
    type: text
    required: true
  - name: evidence
    description: What you have from the vendor - website security and privacy pages, certifications or audit reports, DPA, questionnaire answers, terms, references. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Risk tier, What to check, Findings so far, Questions for the vendor, Contract must-haves, Decision record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small organisation vet a vendor before it is switched on. Due diligence should be proportionate: a scheduling widget with no personal data needs a short check, while a payroll provider or a tool with admin access to email needs a real review. The useful questions are about the specific risk: what data and access the vendor gets, where it is hosted and who can reach it, how it is secured and evidenced (independent audit reports beat marketing pages), how it handles incidents and notifies customers, which subprocessors it uses, whether you can get your data back and have it deleted, how financially and operationally stable it is, and what the contract commits to. Common gaps: accepting "bank-level security" claims without evidence, ignoring the vendor's own subprocessors, no exit plan, and connecting a tool with broad OAuth permissions to company accounts without anyone reviewing scopes.
</context>

<task>
Vendor:

<vendor>
{{vendor}}
</vendor>
{{#evidence}}

Evidence available:
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Risk tier: low, medium or high, from the data, access, criticality and number of users, with reasons. The tier decides how deep the review goes.
2. What to check for this tier: data protection (role as processor or controller, DPA, location, transfers, subprocessors, retention and deletion), security (independent reports or certifications and their scope and date, access controls and MFA, encryption, vulnerability management, incident notification), continuity (uptime commitments, backups, exit and data export), integration (permissions and scopes requested), and vendor viability.
3. Findings so far: from the evidence supplied, what is satisfied, what is partial, and what is missing. Note when a certification's scope does not cover the service being bought.
4. Questions for the vendor: only the ones that matter for this tier, specific and answerable.
5. Contract must-haves: the terms to insist on or negotiate for this tier.
6. Decision record: go, go with conditions, or no-go, with the conditions, the owner, and a review date.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state facts about the vendor that were not supplied. Mark anything to confirm.
- Do not treat a certification name as proof without checking scope, date and whether it covers the purchased service.
- Keep it proportionate; do not send a 200-question questionnaire to a low-risk vendor.
- Recommend legal review of the contract for high-risk vendors, and security specialist review where the vendor gets admin or production access.
{{> output/uncertainty}}
</constraints>

<output_format>
## Risk tier
Tier and reasons.

## What to check
Checklist for this tier.

## Findings so far
Table: area | status (met, partial, missing) | evidence | note.

## Questions for the vendor
Numbered list.

## Contract must-haves
Bullets.

## Decision record
Decision, conditions, owner, review date.
</output_format>
