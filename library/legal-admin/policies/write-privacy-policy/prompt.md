---
schema: 1
id: write-privacy-policy
kind: prompt
title: Write a privacy policy
description: Drafts a plain-language privacy policy strictly from a product's actual data practices, structured for the stated jurisdictions, and flags every gap or risky practice for legal review.
category: policies
version: 1.0.1
status: incubating
aliases: [legal-privacy-policy]
stage: [build]
role: [founder, product-manager, legal-professional, software-engineer]
subject: [law]
requires: [none]
inputs: [text, notes]
output: [docs, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [privacy-notice, data-protection, transparency, cookies]
pairs_with:
  prompts: [map-personal-data-processing, build-compliance-checklist]
args:
  - name: data_practices
    description: What the product actually does with personal data - what is collected and how, why, tools and vendors used, cookies and trackers, sharing, international transfers, retention, how users can delete or export data, children, and the company's name and contact details as placeholders if you prefer.
    type: text
    required: true
  - name: jurisdictions
    description: Where your users are (for example "EU and UK", "California and other US states", "Brazil", "worldwide"). Optional; without it a neutral structure is used and jurisdiction-specific sections are flagged.
    type: string
  - name: product
    description: The product or service the policy covers (website, mobile app, SaaS, online shop) and who uses it. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Before you publish, Privacy policy, Gaps and risks for legal review, Practices to align]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id legal-privacy-policy."}
---
<context>
You draft privacy policies that are honest descriptions of what a product really does, written so a user can understand them. The two common failures are copying a generic template (which then promises things the company does not do, or omits what it does) and burying practices in legalese. Regulators increasingly treat an inaccurate privacy notice as a violation in itself, so accuracy beats completeness: every statement must trace back to a stated practice, and anything unknown becomes a question, not a guess.

{{#product}}Product: {{product}}{{/product}}
{{#jurisdictions}}Users in: {{jurisdictions}}{{/jurisdictions}}
</context>

<task>
Actual data practices:

<practices>
{{data_practices}}
</practices>

1. Inventory the practices: data collected (provided by the user, collected automatically, from third parties), purposes, vendors and recipients, cookies and trackers, transfers, retention, user controls. Note anything missing that a privacy policy normally must cover.
2. Draft the policy in plain language with a layered structure: a short summary at the top, then sections for who we are and how to contact us; what we collect; how we use it (and, where relevant, the legal basis, marked for confirmation); who we share it with; cookies and similar technologies; international transfers; how long we keep it; your rights and how to use them; children; security; changes to this policy; contact and complaints.
3. Add jurisdiction-specific sections only for the stated jurisdictions, describing them in general terms (for example rights of access, deletion and objection; opt-out of sale or sharing; the right to complain to a supervisory authority) and marking each "confirm requirements with counsel".
4. Use [BRACKETS] for company name, address, contact email, data protection officer or representative, effective date, and any fact not given.
5. After the draft, list gaps and risks: practices that may need consent or opt-outs (advertising trackers, sensitive data, children), statements you could not make because facts were missing, and vendors needing data processing agreements.
6. List practices the company may want to change before publishing, where the honest description would be uncomfortable (indefinite retention, no deletion process, unclear sharing).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never describe a practice, right, safeguard or certification that is not in the input. Do not write "we never sell your data" or "we use industry-standard encryption" unless the input says so.
- Mark legal bases, jurisdiction-specific obligations and required wording "confirm with counsel". Do not cite article numbers unless you are certain of them.
- Write at roughly a secondary-school reading level: short sentences, "we" and "you", examples where they help.
- Do not claim the policy is compliant with any law.
- If the practices are too thin to write an honest policy (for example only "we collect emails"), ask focused questions first and give a skeleton only.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you publish
Three to five bullets: review needed, placeholders to fill, practices to confirm.

## Privacy policy
The complete draft, with a summary box at the top and headings for each section.

## Gaps and risks for legal review
Numbered: issue - why it matters - question for counsel.

## Practices to align
Bullets: practice - suggested change to consider.
</output_format>
