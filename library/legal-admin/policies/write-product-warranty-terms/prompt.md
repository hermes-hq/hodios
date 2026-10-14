---
schema: 1
id: write-product-warranty-terms
kind: prompt
title: Write product warranty terms
description: Drafts a manufacturer's or seller's product warranty that sits on top of statutory consumer rights, with coverage, length, exclusions, how to claim, remedies and the mandatory wording to verify.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, product-manager, operations-manager]
subject: [law, retail]
requires: [none]
inputs: [text]
output: [docs, table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [product-warranty, guarantee-terms, statutory-rights, warranty-claims, consumer-goods]
pairs_with:
  prompts: [write-refund-policy, answer-product-warranty-claim, write-terms-of-service]
args:
  - name: product
    description: The product, price range, who you are (manufacturer, brand, retailer), where it is sold, how long you want to cover it, what usually fails, and how repairs or replacements work today.
    type: text
    required: true
  - name: jurisdictions
    description: Countries or states where the product is sold to consumers.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Statutory baseline, Warranty terms, Claim process, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A voluntary warranty (or commercial guarantee) is a promise on top of what the law already gives consumers. In the EU and UK, sellers are liable for goods that do not conform to the contract for a legal period regardless of any warranty, and a commercial guarantee must not mislead people into thinking it replaces those rights; the guarantee document usually has to state that statutory rights are unaffected and give the guarantor's details. In the US, written warranties on consumer products are shaped by the Magnuson-Moss Warranty Act (labelling as "full" or "limited", disclosure rules, limits on disclaiming implied warranties and on "warranty void if seal broken" conditions tying cover to brand parts or repairers). Common mistakes: exclusions so broad the warranty means nothing, requiring the original box, voiding cover for independent repair, and no clear claim route.

Jurisdictions: {{jurisdictions}}
</context>

<task>
Product:
<product>
{{product}}
</product>

1. Statutory baseline: the consumer rights that exist anyway in each jurisdiction (typical periods, who is liable, the burden of proof in the first period) marked to confirm, and how the voluntary warranty adds to them.
2. Warranty terms in plain language: who gives it [BRACKETS], what is covered (defects in materials and workmanship, named components), length and when it starts, who can claim (first owner or transferable), remedies (repair, replace, refund) and who decides, exclusions that are specific and fair (accidental damage, misuse, normal wear, cosmetic), what does not void it, territorial limits, the statement that statutory rights are unaffected, and for US sales the designation full or limited.
3. Claim process: steps, proof needed, who pays shipping, timescales as [DAYS], what happens if a defect is not found, and a contact.
4. Points to confirm: mandatory content and wording per jurisdiction, implied warranty rules, right-to-repair rules.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never draft terms that suggest the warranty replaces or limits statutory consumer rights.
- Do not void cover for using independent repairers or third-party parts unless the user confirms a lawful basis; flag the risk.
- Do not state legal periods or statutes as fact unless supplied; describe them and mark "confirm for [jurisdiction]".
- Keep exclusions specific; avoid catch-alls such as "any other cause".
{{> output/uncertainty}}
</constraints>

<output_format>
## Statutory baseline
Table: jurisdiction | right | typical period (confirm) | who is liable.

## Warranty terms
Numbered sections.

## Claim process
Numbered steps.

## Points to confirm
Numbered.
</output_format>
