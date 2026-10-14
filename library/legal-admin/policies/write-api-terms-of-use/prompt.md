---
schema: 1
id: write-api-terms-of-use
kind: prompt
title: Write API terms of use for developers
description: Drafts developer and API terms of use - keys and accounts, rate limits, permitted and banned uses, data handling, attribution, changes and deprecation, suspension and liability.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, product-manager, developer-advocate, backend-engineer]
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
tags: [api-terms, developer-terms, rate-limits, api-deprecation, platform-policy, data-access]
pairs_with:
  prompts: [write-terms-of-service, write-acceptable-use-policy, draft-data-processing-agreement, write-trademark-usage-guidelines]
args:
  - name: api
    description: What the API exposes (your own data, users' data, actions on users' behalf, AI model outputs), who uses it (customers, partners, public developers), free and paid tiers, rate limits, how keys or OAuth work, versioning and deprecation practice, and abuse you worry about.
    type: text
    required: true
  - name: jurisdiction
    description: Country or state whose law governs, and where most developers are.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Key decisions, API terms, Developer portal summary, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft the terms developers accept to use an API. API terms govern a different relationship from end-user terms: the developer builds their own product on yours and often handles your users' data. The clauses that matter most: accounts and credentials (keys are confidential, the developer is responsible for everything done with them, and must report compromise); limits (rate limits and quotas, no circumvention through multiple accounts, fair use); permitted and prohibited uses (no scraping beyond the API, no building a directly competing product or clone where that is the policy, no reverse engineering or security testing without permission, no reselling raw access, no high-risk uses the service is not built for, and restrictions on using outputs to train competing models where relevant); data (what developers may store and for how long, caching limits, deletion when users disconnect or on request, compliance with privacy law, a privacy policy for their app, no selling user data, and security incident notice); branding and attribution (when to credit and how to use marks); changes (versioning, notice periods for breaking changes and deprecations, and emergency changes for security); monitoring and audit; fees and billing for paid tiers; suspension and termination with what happens to data and apps afterwards; disclaimers and liability; and confidentiality of non-public features. Platforms often get the change and deprecation clause wrong, either promising stability they cannot keep or reserving rights so broad that developers will not build on them.

Jurisdiction: {{jurisdiction}}
</context>

<task>
API:
<api>
{{api}}
</api>

1. Key decisions: commercial use, competing products, data retention limits, deprecation notice period, attribution requirements, audit rights, and AI training restrictions, each with a recommendation and trade-off.
2. API terms: numbered sections in plain language covering acceptance and relationship to other terms, accounts and keys, licence to use the API, limits, prohibited uses, user data and privacy, security, branding and attribution, fees, changes and deprecation, monitoring, confidentiality, intellectual property and feedback, suspension and termination, effect of termination, disclaimers, liability, indemnity, and governing law. Use [BRACKETS] for anything not supplied.
3. Developer portal summary: a short "the rules in brief" section that matches the terms.
4. Points to confirm, including whether a data processing agreement is needed for developers processing personal data on your behalf or vice versa.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent rate limits, prices or notice periods; use brackets and recommend a range only as a suggestion.
- Keep the prohibited-uses list tied to the risks the user described plus common baseline items; do not pad it.
- Make the change and deprecation clause balanced: a real notice period for breaking changes, with an exception for urgent security or legal changes.
- Recommend legal review where the API handles health, financial or children's data, or where developers act on behalf of end users.
{{> output/uncertainty}}
</constraints>

<output_format>
## Key decisions
Table: decision | recommendation | trade-off.

## API terms
Numbered sections with headings.

## Developer portal summary
Short bulleted list.

## Points to confirm
Numbered list.
</output_format>
