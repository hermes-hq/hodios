---
schema: 1
id: check-website-accessibility-obligations
kind: prompt
title: Check your website's accessibility obligations
description: Works out which accessibility laws likely apply to a website or app - such as the ADA or the European Accessibility Act - the standard expected, deadlines, exemptions and evidence to keep.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, operations-manager, product-manager]
subject: [law, ecommerce, saas]
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
tags: [accessibility-law, ada, european-accessibility-act, wcag, digital-accessibility, legal-risk]
pairs_with:
  prompts: [write-accessibility-statement, assess-european-accessibility-act-readiness, audit-web-accessibility]
args:
  - name: organisation
    description: What the organisation does (shop, bank, booking service, publisher, public body, school, SaaS), its size (staff and turnover band), where it is based, where its customers are, and which websites and apps it runs.
    type: text
    required: true
  - name: current_state
    description: Any audits done, known problems, an accessibility statement, overlay widgets in use, complaints or demand letters received. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Laws that likely apply, Standard expected, Deadlines and exemptions, What to do now, Evidence to keep, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an organisation understand its legal duties on digital accessibility, as a map for decisions, not a technical audit. In the US, courts have often treated websites of businesses open to the public as covered by the Americans with Disabilities Act, though courts differ on whether a link to a physical location is needed; there is no detailed federal technical rule for private businesses, settlements usually point to WCAG 2.1 or 2.2 level AA, and state laws such as California's add damages, so demand letters and lawsuits against online shops are common. Separate federal rules set WCAG-based standards and compliance dates for state and local government sites, and federal agencies have their own procurement rules. In the EU, the European Accessibility Act applies from June 2025 to certain products and services, including e-commerce, banking, e-books, passenger transport services and electronic communications, with national laws implementing it, a harmonised standard that refers to WCAG, and an exemption for microenterprises providing services; public sector bodies have had separate duties for longer. Other countries have equality or accessibility laws with their own reach. Two traps: overlay widgets do not make a site compliant and are often cited in lawsuits, and exemptions such as disproportionate burden usually require a documented assessment.
</context>

<task>
Organisation:
<organisation>
{{organisation}}
</organisation>
{{#current_state}}

Current state:
<current>
{{current_state}}
</current>
{{/current_state}}

1. Laws that likely apply: by country or region where the organisation operates or sells, which laws likely apply and why, with likely, possible or unlikely.
2. Standard expected: the technical standard each law points to or that courts and regulators commonly use, and which conformance level.
3. Deadlines and exemptions: dates that are known with confidence, and exemptions that may apply (microenterprise, disproportionate burden, content types) with what must be documented to rely on them.
4. What to do now: ordered steps such as an audit by a qualified tester including assistive technology users, fixing critical journeys first (sign-up, checkout, booking, payments), an accessibility statement and feedback route, procurement terms for third-party widgets and platforms, staff training, and a monitoring cycle.
5. Evidence to keep: audit reports, remediation plan and progress, statements, disproportionate burden assessments, complaint handling records.
6. Points to verify, and when to involve a lawyer (a demand letter, a lawsuit, a regulator inquiry, or relying on an exemption).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state deadlines, turnover thresholds or penalties unless you are confident; mark them "confirm for [country]".
- Do not recommend overlay widgets as a compliance solution.
- Do not claim the site is or is not compliant; you have not tested it.
- If a demand letter or lawsuit has been received, say to involve a lawyer before replying and to preserve records.
{{> output/uncertainty}}
</constraints>

<output_format>
## Laws that likely apply
Table: region | law | why it applies | likelihood.

## Standard expected
Bulleted list.

## Deadlines and exemptions
Table: law | date or status | exemption | what to document.

## What to do now
Numbered list.

## Evidence to keep
Checklist.

## Points to verify
Numbered list.
</output_format>
