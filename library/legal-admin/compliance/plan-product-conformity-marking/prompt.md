---
schema: 1
id: plan-product-conformity-marking
kind: prompt
title: Plan product safety conformity marking
description: Works out which product safety rules and conformity marks, such as CE or UKCA, may apply to a physical product a small maker sells, and the technical file, tests, labels and declarations to prepare.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [founder, operations-manager, designer]
subject: [law, ecommerce, retail]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [product-safety, ce-marking, ukca, technical-file, declaration-of-conformity]
pairs_with:
  prompts: [build-compliance-checklist, run-vendor-due-diligence]
args:
  - name: product
    description: The product - what it is, materials, power source (mains, battery, none), wireless features, intended users (children, adults, professionals), how it is made (in-house, factory abroad), and where you will sell it.
    type: text
    required: true
  - name: role
    description: Your role in the supply chain - manufacturer (your brand), importer, distributor or online marketplace seller.
    type: enum
    enum: [manufacturer, importer, distributor, marketplace-seller]
    default: manufacturer
output_contract:
  format: markdown
  sections: [Rules that may apply, Your obligations by role, Conformity route, Technical file, Labels and documents, Questions for a test lab, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small makers and sellers of physical products understand product safety compliance before launch. In markets such as the EU, the UK and others with similar systems, many product types (toys, electrical equipment, radio devices, machinery, personal protective equipment, some construction and medical products) fall under specific rules that require a conformity assessment, a technical file, a declaration of conformity and a mark such as CE or UKCA, while products outside those rules still face a general product safety duty. Which rules apply depends on the product's features, not its category name: a plush toy with a USB light can trigger toy, electrical, battery and chemical rules. The obligations also depend on role: the manufacturer whose name is on the product carries the main duties, and an importer or online seller must check that the manufacturer has done its part and that the product carries the required information. Many products can be self-assessed against harmonised standards, while some require a third-party conformity body. Factories' certificates are frequently incomplete, outdated or for a different product.

Role: {{role}}
</context>

<task>
Product:

<product>
{{product}}
</product>

1. Rules that may apply: for each target market, the product safety rules that may apply given the features (for example toy safety for products for children under a set age, low voltage and electromagnetic compatibility for mains electrical products, radio equipment for wireless features, battery rules, chemical restrictions, general product safety), named in general terms and marked "verify".
2. Your obligations by role: what the stated role must do and check, and when a seller is treated as a manufacturer (for example selling under their own brand).
3. Conformity route: whether self-assessment against standards is likely possible or a third-party body is likely needed, marked "verify with a test lab or notified or approved body".
4. Technical file: the contents to prepare (description, design drawings, risk assessment, list of standards applied, test reports, instructions and warnings, production controls).
5. Labels and documents: the marks, identification, manufacturer and importer contact details, warnings and instructions in local languages, the declaration of conformity, and marketplace requirements.
6. Questions for a test lab.
7. Next steps: ordered, with what to ask the factory for and what to check in their certificates (product match, standard version, issuing body, date).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state that a product is compliant or that a particular directive or regulation definitely applies. Use "may apply, verify".
- Do not invent standard numbers, age limits, chemical limits or body names.
- Never suggest applying a conformity mark without completing the assessment; misusing a mark can be an offence.
- If the product is for babies or young children, involves batteries that children could access, or is a medical, protective or high-power device, recommend a qualified test lab or compliance consultant early.
{{> output/uncertainty}}
</constraints>

<output_format>
## Rules that may apply
Table: market | rule area | why it may apply | to verify.

## Your obligations by role
Bullets.

## Conformity route
Bullets.

## Technical file
Checklist.

## Labels and documents
Checklist.

## Questions for a test lab
Numbered list.

## Next steps
Ordered list.
</output_format>
