---
schema: 1
id: write-eula
kind: prompt
title: Write an end user licence agreement
description: Drafts an end user licence agreement for a desktop, mobile or downloadable app from how it is actually sold and used, with a plain-language summary per section and points flagged for a lawyer.
category: policies
version: 1.0.0
status: incubating
aliases: [legal-eula]
stage: [build, ship]
role: [founder, product-manager, maintainer]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [eula, software-licensing, licence-grant, startup-legal]
pairs_with:
  prompts: [write-terms-of-service, write-privacy-policy, choose-software-license]
  personas: [tech-law-guide]
args:
  - name: app
    description: What the app is, how it is distributed (direct download, app stores, bundled), the licence model (free, purchase, subscription, trial), users (consumers or businesses), updates, data collected, open-source components and device or seat limits.
    type: text
    required: true
  - name: jurisdictions
    description: Where the company is established and where users are. Consumer law in users' countries shapes several clauses.
    type: text
output_contract:
  format: markdown
  sections: [Decisions to make, End user licence agreement, Lawyer review list]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An end user licence agreement grants the right to install and use a copy of software on stated terms; it is not a sale of the software. It matters most for software that runs on the user's device. Apps sold through app stores are already covered by the store's standard licence unless the developer provides its own, and hosted services are usually covered by terms of service instead, so say which applies. Copied EULAs fail in the same ways as copied terms: they describe a different product and include exclusions that consumer law may not allow.
{{#jurisdictions}}
Jurisdictions: {{jurisdictions}}
{{/jurisdictions}}
</context>

<task>
App:
<app>
{{app}}
</app>

1. Say whether a custom EULA is needed, or whether app store standard terms or terms of service would do, and why. Continue with the draft unless it is clearly unnecessary.
2. List the decisions the owner must make (perpetual versus subscription licence, number of devices or seats, transfer rights, governing law, refund approach), each with the options and one-line trade-offs.
3. Draft the EULA with numbered sections, each starting with a one-sentence plain-language summary in italics, covering what applies: the licence grant and its scope (personal or business use, devices, seats, perpetual or subscription), restrictions (reverse engineering to the extent law allows, redistribution, sublicensing, circumventing licence checks), ownership and intellectual property, automatic updates, data collection pointing to the privacy policy, third-party and open-source components with their own licences, trials and subscriptions with renewal and cancellation, warranty disclaimer, limitation of liability with consumer carve-outs, termination and what happens to the software, export and app store terms where relevant, governing law and contact.
4. Mark points needing a lawyer's check inline as [LAWYER: reason] and missing facts as [BRACKETS].
5. List lawyer review items ranked by risk.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Draft from the description only; do not invent features, prices or data practices.
- Do not copy or imitate any named company's EULA.
- Do not include clauses that try to remove rights users cannot waive, hide renewals, or forbid reverse engineering where law allows it for interoperability; mark such limits [LAWYER: ...].
- Keep open-source components under their own licences; never claim to relicense them.
- Recommend a lawyer review before publishing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decisions to make
Numbered: decision - options - trade-off.
## End user licence agreement
The draft with numbered sections, italic summaries, [BRACKETS] and [LAWYER: ...] markers.
## Lawyer review list
Numbered by risk, each tied to a section.
</output_format>
