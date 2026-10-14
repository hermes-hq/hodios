---
schema: 1
id: write-beta-programme-terms
kind: prompt
title: Write beta and early-access terms
description: Drafts terms for a beta, pilot or early-access programme - pre-release disclaimers, data loss risk, feedback rights, confidentiality, fees and pricing after launch, and ending the programme.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, product-manager]
subject: [law, saas]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [beta-programme, early-access, pilot-agreement, feedback-licence, pre-release-software, confidentiality]
pairs_with:
  prompts: [plan-beta-program, plan-beta-to-ga-transition, write-terms-of-service, draft-data-processing-agreement]
args:
  - name: programme
    description: The product and what is in beta, who joins (consumers, businesses, design partners), open or invite-only, whether testers use real data, any fee or discount, how long it runs, what happens at launch (pricing, data migration), and whether you want to use testers' names or logos.
    type: text
    required: true
  - name: jurisdiction
    description: Country or state whose law governs, and where testers are.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Key decisions, Beta terms, Sign-up wording, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft the terms for a pre-release programme. Beta terms sit alongside or override the main terms of service, and they exist to set expectations: the product is unfinished, may change or be withdrawn, may have bugs, outages and data loss, and has no service level or guaranteed support. The important clauses are: what the beta is and how long it lasts; eligibility and invitations; a clear disclaimer that it is provided as is, with advice not to rely on it for critical work and to keep backups; feedback, where the company asks for a free, perpetual right to use suggestions without paying or crediting the tester; confidentiality for closed betas, defining what is confidential and for how long; data handling, including whether beta data will be kept, migrated or deleted at launch, and a data processing agreement if business testers put personal data in; fees, discounts and what price applies after launch, because vague promises of "founder pricing" cause disputes; publicity, since using a design partner's logo or quote needs permission; ending or suspending the beta, with notice and a data export window where possible; and liability. Disclaimers have limits: for consumers, statutory rights and liability for negligence causing injury cannot be excluded, and for business pilots, customers often negotiate security commitments, a data processing agreement and a short exit.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Programme:
<programme>
{{programme}}
</programme>

1. Key decisions: open or closed, confidentiality, data retention at launch, launch pricing promise, feedback rights, publicity, and support level, each with a recommendation.
2. Beta terms: numbered sections in plain language covering relationship to the main terms, the beta and its duration, eligibility, pre-release nature and no reliance, availability and changes, your data and backups, feedback, confidentiality, fees and post-launch pricing, publicity, acceptable use, suspension and ending, liability, and contact. Use [BRACKETS] for missing details and separate consumer and business wording where they differ.
3. Sign-up wording: the short summary and acceptance line shown before joining, and the message sent when the beta ends.
4. Points to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not exclude liability for death or injury caused by negligence, or statutory consumer rights.
- Do not draft a feedback clause that takes ownership of the tester's own pre-existing content or data; limit it to feedback.
- Do not promise post-launch pricing or data migration the user has not committed to; use brackets and flag the decision.
- If testers will process other people's personal data in the beta, say a data processing agreement and security basics are needed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Key decisions
Table: decision | recommendation | why.

## Beta terms
Numbered sections with headings.

## Sign-up wording
Short text blocks.

## Points to confirm
Numbered list.
</output_format>
