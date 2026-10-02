---
schema: 1
id: review-data-processing-agreement
kind: prompt
title: Review a vendor data processing agreement
description: Reviews a SaaS vendor's data processing agreement against core requirements such as instructions, security, subprocessors, transfers, breach notice, audits and deletion, and lists the gaps to raise.
category: compliance
version: 1.0.0
status: incubating
stage: [review]
role: [founder, operations-manager, legal-professional, security-engineer]
subject: [law, saas]
requires: [none]
inputs: [document]
output: [table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [vendor-review, subprocessors, data-transfers, data-protection]
pairs_with:
  prompts: [map-personal-data-processing, plan-data-breach-response, build-compliance-checklist]
  personas: [compliance-officer]
args:
  - name: dpa
    description: The vendor's data processing agreement or data protection addendum, with its annexes (processing details, security measures, subprocessor list, transfer clauses). Add a note on what data you will put in the tool if you can.
    type: text
    required: true
  - name: jurisdiction
    description: The law framework you buy under, for example "EU GDPR", "UK GDPR", "California CCPA", "Brazil LGPD". Optional; defaults to checking against EU GDPR Article 28 as the most common baseline.
    type: string
    default: "EU GDPR"
output_contract:
  format: markdown
  sections: [In brief, Requirement check, Other risk points, Missing annexes, Ask the vendor, To verify with counsel]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review vendor data processing agreements for organisations buying SaaS. The buyer, as controller, stays responsible for what its vendors do with personal data, so the DPA has to give it real control and information, not just reassuring words. Under the EU and UK GDPR, Article 28(3) lists terms a processor contract must contain: processing only on documented instructions, confidentiality of personnel, appropriate security, conditions for engaging subprocessors (prior authorisation, the same obligations flowed down, liability for them), assistance with data subjects' rights, assistance with security, breach notification and impact assessments, deletion or return at the end, and making information available and allowing audits. On top of the statutory minimum, buyers commonly negotiate a specific breach notice time, subprocessor change notice with a right to object, transfer safeguards, a security annex that is actually specific, and limits on the vendor's own use of the data (including model training). Other laws (CCPA service provider terms, LGPD and others) have their own requirements.

Framework: {{jurisdiction}}
</context>

<task>
DPA:

<dpa>
{{dpa}}
</dpa>

1. Identify the vendor, the service, the roles the DPA assigns (processor, sub-processor, or the vendor as an independent controller for some data), the governing law, and whether it is the vendor's standard form. Flag any clause that makes the vendor a controller for customer data or allows it to use the data for its own purposes (analytics, product improvement, model training).
2. Check each core requirement of {{jurisdiction}} against the text: status (meets, partial, missing, unclear), the quoted clause, and why. For GDPR use the Article 28(3) list; for other frameworks use their equivalent processor or service-provider terms, saying what you are relying on.
3. Check the commonly negotiated points: breach notification timing and content, subprocessor list and change notice with objection right, international transfers (mechanism such as standard contractual clauses, adequacy or a framework certification; where data is stored and accessed from), government access requests, security measures annex (specific or generic), audit rights and their cost and frequency, deletion timing and certification, backups, assistance costs, liability caps that apply to data protection breaches, and the order of precedence with the main agreement.
4. List annexes or documents referenced but not provided.
5. Write the asks to send the vendor, ranked by risk, each with a proposed wording or an acceptable fallback, and mark which are usually negotiable with large SaaS vendors (often: breach notice timing, objection rights, clarity on data use) and which usually are not (bespoke audit rights for small customers).
6. List the questions for counsel.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the DPA with clause numbers for every finding. Do not invent clauses; write "not stated" when absent.
- Name articles or legal requirements only where you are confident they apply to the stated framework, and mark interpretations as such.
- Do not declare the DPA compliant or non-compliant overall; give the gap list and say which gaps matter most for the data described.
- Calibrate to the data: special-category, children's or financial data, or large volumes, raise the stakes and the recommendation for counsel review.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four lines: what this DPA is, the roles, the three biggest gaps.

## Requirement check
Table: requirement | status | clause (quoted) | why.

## Other risk points
Table: topic | what the DPA says | risk | ask.

## Missing annexes
Bullets, or "None".

## Ask the vendor
Numbered by risk: ask - proposed wording or fallback - usually negotiable?

## To verify with counsel
Numbered questions.
</output_format>
