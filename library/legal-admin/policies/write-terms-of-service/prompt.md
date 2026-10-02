---
schema: 1
id: write-terms-of-service
kind: prompt
title: Write terms of service
description: Drafts terms of service from how the product actually works, covering accounts, payments, acceptable use, IP, liability and disputes, with decisions to make and gaps flagged for a lawyer.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, product-manager, operations-manager]
subject: [law, saas]
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
tags: [user-agreement, acceptable-use, subscriptions, startup-legal]
pairs_with:
  prompts: [write-privacy-policy, write-refund-policy, review-consumer-terms]
args:
  - name: product
    description: How the product works - what it does, who it is for (consumers, businesses or both), accounts, pricing and billing (free tier, trials, subscriptions, renewals), user content, AI features, integrations, age limits, and how you handle cancellations and refunds today.
    type: text
    required: true
  - name: jurisdictions
    description: Where the company is established and where its users are, for example "Delaware company, users in the US, EU and UK". Optional, but consumer law in users' countries shapes several clauses.
    type: text
output_contract:
  format: markdown
  sections: [Decisions to make, Terms of service, Lawyer review list]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft terms of service for early-stage products, starting from how the product actually works rather than from another company's template. Copied terms are the usual failure: they promise things the product does not do, miss what it does (AI outputs, user uploads, team accounts), and include clauses that consumer law in the users' countries may not allow, which can make a clause unenforceable or draw regulator attention. Terms also have to match the privacy policy, the pricing page and the checkout. Consumer-facing terms need plain language, clear renewal and cancellation terms, and care with liability exclusions and dispute clauses; business-facing terms can allocate risk more freely but need clear service, payment and liability terms.

{{#jurisdictions}}Jurisdictions: {{jurisdictions}}{{/jurisdictions}}
</context>

<task>
Product:

<product>
{{product}}
</product>

1. Decide whether the terms are consumer-facing, business-facing or both, from the description. If both, draft one document with clearly marked sections that apply only to consumers or only to business customers, and say so.
2. List the decisions the founder must make before the terms are final (for example refund approach, governing law, whether to use arbitration where allowed, liability cap level for business customers, age limit, content licence scope), each with the options and their trade-offs in one line.
3. Draft the terms in plain language with numbered sections, covering only what applies to this product:
   - Who we are, acceptance and changes to the terms (with notice).
   - Eligibility and accounts: age, account security, team or organisation accounts.
   - The service: what it is, availability, changes and beta features.
   - Payments: prices, taxes, billing cycle, trials, automatic renewal with how and when to cancel, price changes with notice, refunds (pointing to the refund policy).
   - Acceptable use: concrete prohibited uses relevant to this product.
   - User content: ownership stays with the user, the narrowest licence the product needs, and responsibility for content; how notices of infringing content are handled.
   - AI features if any: what outputs are, that they can be wrong, user responsibility for reviewing them, and whether inputs are used to train models (matching the privacy policy).
   - Our intellectual property and feedback.
   - Third-party services and integrations.
   - Suspension and termination: by the user and by us, with reasons and notice, and what happens to data.
   - Disclaimers and limitation of liability, with consumer carve-outs where consumer law likely requires them.
   - Indemnity (business customers only, unless the founder decides otherwise).
   - Governing law and disputes, including consumer protections for consumers' home courts where applicable.
   - General terms and contact details.
4. Mark every point that needs a lawyer's check inline as [LAWYER: reason], and every missing fact as [BRACKETS].
5. List the lawyer review items, ranked by risk.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Draft from the product description only. Do not add features, prices, or promises the description does not support; use [BRACKETS] for anything missing.
- Do not copy or imitate any named company's terms.
- Do not invent laws or name specific statutes unless you are confident they apply to the stated jurisdictions; for consumer-law limits use [LAWYER: ...] markers.
- Do not include clauses whose purpose is to hide terms from users (buried auto-renewal, cancellation only by post, waiver of rights users cannot waive); say why if the description asks for one.
- Recommend a lawyer review before publishing, especially for consumer products, payments, user-generated content, children, health or financial features, or AI outputs that people may rely on.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decisions to make
Numbered: decision - options - trade-off.

## Terms of service
The full draft with numbered sections, plain headings, [BRACKETS] and [LAWYER: ...] markers.

## Lawyer review list
Numbered by risk, each tied to a section.
</output_format>
