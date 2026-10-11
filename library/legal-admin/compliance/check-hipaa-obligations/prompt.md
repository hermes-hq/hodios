---
schema: 1
id: check-hipaa-obligations
kind: prompt
title: Check whether HIPAA applies to you
description: Works out whether a US practice, vendor or health app is a HIPAA covered entity, a business associate or neither, and lists the privacy, security, breach and contract duties that follow.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, operations-manager, software-engineer, product-manager]
subject: [law, healthcare, saas]
requires: [none]
inputs: [text]
output: [report, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [hipaa, health-data, business-associate-agreement, phi, health-apps, security-risk-analysis]
pairs_with:
  prompts: [run-vendor-due-diligence, plan-data-breach-response, map-personal-data-processing, write-patient-privacy-notice]
args:
  - name: organisation
    description: Who you are and what you do - for example a therapist, dental practice, billing company, telehealth start-up, wellness app or IT provider - and whether you or your clients bill health insurance.
    type: text
    required: true
  - name: data_flows
    description: What health information you create, receive, store or send, for whom, and through which tools (practice software, email, texting, cloud storage, analytics or ad pixels). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your HIPAA status, Why, Duties that apply, Business associate agreements, Gaps to fix first, Other laws to check, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a US organisation work out whether HIPAA applies and what it requires. HIPAA does not cover all health data. It applies to covered entities (health plans, health care clearinghouses, and health care providers who conduct certain standard transactions electronically, such as billing insurance) and to their business associates (anyone who creates, receives, maintains or transmits protected health information on a covered entity's behalf, such as billing services, practice software and cloud hosts, transcription and IT support), and subcontractors of business associates. A provider who takes only cash and never sends standard electronic transactions may fall outside it, and a consumer app that people use on their own, not on behalf of a provider or plan, is usually outside it, but those may still face the FTC's health breach rules, unfair practices rules and state consumer health data laws. Once in scope, the Privacy Rule governs uses and disclosures, the notice of privacy practices, minimum necessary and patients' rights such as access; the Security Rule requires a documented risk analysis and administrative, physical and technical safeguards; the Breach Notification Rule sets duties to notify individuals, the regulator and sometimes the media. The most common findings in enforcement are no risk analysis, missing business associate agreements, and patients being refused or delayed access to records. Marketing and analytics pixels on patient-facing pages and texting patient details from personal phones are frequent traps, and a vendor calling itself "HIPAA compliant" means nothing without a signed agreement.
</context>

<task>
Organisation:
<organisation>
{{organisation}}
</organisation>
{{#data_flows}}

Data flows:
<flows>
{{data_flows}}
</flows>
{{/data_flows}}

1. Your HIPAA status: covered entity, business associate, subcontractor, hybrid, or likely outside HIPAA, with confidence.
2. Why: the facts that decide it and the facts that would change the answer, such as starting to bill insurance or signing a contract with a clinic.
3. Duties that apply: grouped by Privacy Rule, Security Rule and Breach Notification Rule, written as concrete tasks (appoint privacy and security officers, risk analysis, policies, training, access controls, audit logs, encryption decisions, notice of privacy practices, patient access process, documentation retention).
4. Business associate agreements: which vendors or clients need one in which direction, what it must cover, and tools that should not be used for patient information without one.
5. Gaps to fix first: from the data flows given, the highest-risk issues in order.
6. Other laws to check: if HIPAA does not apply, or alongside it, which other rules may apply (FTC health breach rules, state health data and privacy laws, state medical records laws, rules on substance use disorder records).
7. Points to verify.
If the organisation is not in the US, say that HIPAA is a US law and that the local health data and data protection laws apply instead.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state penalty amounts, notification deadlines or thresholds as fact unless you are confident; mark each "confirm current rule".
- Do not say a tool or vendor is "HIPAA compliant"; say what to check and that a business associate agreement is needed where it handles protected health information.
- Recommend a healthcare privacy lawyer for unclear status, a suspected breach, or new data-sharing deals, and a security professional for the risk analysis if no one in-house can do it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your HIPAA status
One line with confidence.

## Why
Bulleted facts for and against, and what would change it.

## Duties that apply
Three sub-lists: Privacy, Security, Breach notification.

## Business associate agreements
Table: party | direction | why needed | status.

## Gaps to fix first
Numbered list.

## Other laws to check
Bulleted list.

## Points to verify
Numbered list.
</output_format>
