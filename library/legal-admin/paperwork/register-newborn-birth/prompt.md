---
schema: 1
id: register-newborn-birth
kind: prompt
title: Register a newborn's birth
description: Plans registering a baby's birth and the first official steps after it - deadline, who can register, unmarried parents, the child's surname, ID number, health cover and early benefits.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [birth-registration, newborn-paperwork, parental-recognition, child-surname, child-benefits]
pairs_with:
  prompts: [prepare-for-new-baby, plan-newborn-immigration-status, replace-birth-or-marriage-certificate]
args:
  - name: birth_country
    description: Country (and region or state) where the baby was or will be born.
    type: string
    required: true
  - name: parents
    description: Whether the parents are married or in a civil partnership, whether either is a foreign national, and anything unusual such as a parent unable to attend or missing identity documents.
    type: text
    required: true
  - name: birth_date
    description: Date of birth or due date, so deadlines can be worked out. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Deadlines, Registering the birth, Name and parentage, Documents and ID numbers, After registration, Confirm with the registry]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Birth registration deadlines are short in most countries (from a few days to several weeks) and missing them can mean late-registration procedures or fines. Hospitals in some countries register automatically and in others only notify the registry, so parents must still attend. The biggest variations: whether an unmarried father or second parent is recorded automatically or must recognise or acknowledge the child (sometimes before birth, sometimes jointly at registration), rules on the child's surname when parents have different surnames, and what happens when one parent cannot attend. The child's personal ID or social security number, health cover, benefits and tax allowances usually flow from the registration, and the birth certificate is needed for almost everything later, so ordering extra copies early saves time. Parents living in a country they are not citizens of have a second set of tasks (passing on citizenship, the baby's residence status) that is planned separately.

Birth country: {{birth_country}}
{{#birth_date}}Birth or due date: {{birth_date}}{{/birth_date}}
</context>

<task>
Parents:
<parents>
{{parents}}
</parents>

1. Deadlines: list each deadline that typically applies (birth registration, parental recognition if relevant, health cover, benefits and parental leave pay claims), with dates calculated from the birth date if given, all marked verify.
2. Registering the birth: whether the hospital registers or the parents must, which office, who can or must attend, documents usually needed (hospital notice, parents' IDs, marriage certificate, recognition document), and whether foreign documents need translation or legalisation.
3. Name and parentage: how the second parent gets on the record if unmarried, surname rules to check when parents' names or nationalities differ, and what changing a name later usually involves.
4. Documents and ID numbers: the birth certificate versions and copies to order, the child's personal, tax or social security number and how it is issued, and the first passport or ID card if travel is planned. If either parent is a foreign national, say in one line that citizenship and residence status for the baby need a separate plan and must be checked with the consulate or immigration authority.
5. After registration: health insurance or health service registration, child benefits and parental leave pay, tax allowances, and copies to order.
6. Confirm with the registry: questions to ask.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state deadlines, fees or citizenship rules as fact for a country; give typical patterns and mark them verify with the official registry or consulate.
- Point out early when a situation needs specialist help: a parent who disputes parentage, surrogacy, a birth abroad with no clear nationality, or a risk of the child being stateless.
- Do not give advice on concealing a parent or recording false details.
- Keep personal identifiers out of the output.
{{> output/uncertainty}}
</constraints>

<output_format>
## Deadlines
Table: task | typical deadline | date if known | verify.

## Registering the birth
Bullets and checklist.

## Name and parentage
Bullets.

## Documents and ID numbers
Checklist.

## After registration
Checklist.

## Confirm with the registry
Numbered questions.
</output_format>
