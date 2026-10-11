---
schema: 1
id: vet-new-supplier
kind: prompt
title: Vet a new goods supplier
description: Vets a new goods supplier before the first order - legitimacy, finances, capacity, quality, references, compliance and fraud red flags - with questions, evidence to request and a go or no-go call.
category: operations
version: 1.0.0
status: incubating
stage: [discover, verify]
role: [operations-manager, founder]
subject: [supply-chain]
inputs: [notes, document, message]
output: [checklist, questions, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [supplier-vetting, sourcing, procurement, fraud-red-flags, supplier-qualification, first-order]
pairs_with:
  prompts: [compare-vendors, audit-supplier-factory, write-supplier-onboarding-pack, map-supply-risk]
args:
  - name: supplier
    description: Who the supplier is and what you know - name as given, country, how you found them (trade show, marketplace, referral, cold email), claimed status (factory, trading company, distributor), website or profile details you have.
    type: text
    required: true
  - name: goods
    description: What you plan to buy, how much, how often, and how critical it is to your business.
    type: text
    required: true
  - name: terms
    description: Optional. The quote and terms offered - prices, minimum order, deposit and payment method, lead time, samples.
    type: text
  - name: your_location
    description: Your country, so import and compliance points can be framed.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Risk level, Red flags in what you shared, Checks to run, Questions to send, Evidence to request, Trial order plan, Decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sourcing manager who qualifies new suppliers for small and mid-sized businesses. Most losses with new suppliers come from a small set of causes: a trading company posing as a factory (so quality and lead times are out of its control), payment fraud (bank details that do not match the company name, or "changed" bank details by email), samples made specially that do not match production, capacity claims that collapse at the first large order, and missing compliance documents that stop goods at customs or make them unsellable. Checks should scale with the risk: a small trial purchase of a non-critical item needs a light check; a large deposit for a critical product needs registration checks, references, an audit or inspection and a staged payment plan.
</context>

<task>
Vet this supplier before the first order.

<supplier>
{{supplier}}
</supplier>

<goods>
{{goods}}
</goods>
{{#terms}}
<terms>
{{terms}}
</terms>
{{/terms}}
Buyer location: {{your_location}}

1. Risk level: rate the risk of this first order (low, medium, high) from order value, deposit, how critical the goods are, how the supplier was found and the payment method. Say how deep the vetting should go as a result.
2. Red flags in what you shared: list any warning signs in the information given (for example prices far below others, pressure to pay fast, personal or third-country bank accounts, free email addresses, no fixed address, refusal of video calls or samples). If there are none, say so; do not manufacture concerns.
3. Checks to run: a checklist grouped by legitimacy (company registration in its country, name and address match, bank account in the company's name, years trading), finances and stability, capacity (production lines, staff, current customers, peak season), quality (quality system, certificates, inspection practice), compliance (documents your goods need in {{your_location}}), and ethics (working conditions, subcontracting). For each, say how a small business can check it, for example official company registers, a video tour, third-party verification or inspection services, references.
4. Questions to send: 10 to 15 specific questions for the supplier, written so they are easy to answer and hard to dodge.
5. Evidence to request: documents and proof (business licence, bank letter, test reports, certificates with numbers you can verify with the issuer, photos or video of production, references with contact details).
6. Trial order plan: a small first order, with pre-production sample approval, a pre-shipment inspection for medium or high risk, payment staged to milestones and a safe payment method, and how to confirm bank details by phone using a number you found independently.
7. Decision: the criteria for go, go with conditions, or no-go, and what would change the rating.
</task>

<constraints>
- Do not claim to have checked any register, website or reference; you cannot. Tell the user how to check.
- Do not label a supplier as a fraud from the information given; describe red flags and the checks that would resolve them.
- Do not give legal or customs rulings; flag compliance documents to confirm with a customs broker or compliance specialist in {{your_location}}.
- Never advise paying to a bank account that does not match the supplier's legal name without independent verification.
</constraints>

<output_format>
## Risk level
Rating with a two-sentence reason.
## Red flags in what you shared
Bullets, or "None seen in what you shared".
## Checks to run
Table: Area | Check | How to check | Priority.
## Questions to send
Numbered questions, ready to paste.
## Evidence to request
Bullets.
## Trial order plan
Numbered steps with the payment schedule.
## Decision
Go, go with conditions, no-go criteria.
</output_format>
