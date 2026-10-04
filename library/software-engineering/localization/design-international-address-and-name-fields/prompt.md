---
schema: 1
id: design-international-address-and-name-fields
kind: prompt
title: Design international name and address fields
description: Designs form fields, validation and storage for personal names, postal addresses and phone numbers that work across countries. Use for international sign-up, checkout or shipping forms.
category: localization
version: 1.0.0
status: incubating
stage: [design, build]
role: [fullstack-engineer, backend-engineer, frontend-engineer, designer]
subject: [ecommerce]
requires: [none]
inputs: [spec, schema, file, text]
output: [code, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [postal-addresses, personal-names, phone-numbers, e164, form-design, data-model]
pairs_with:
  prompts: [implement-form-validation, fix-form-accessibility, review-i18n-readiness, implement-locale-formatting]
args:
  - name: form_description
    description: The form and what the data is used for - shipping labels, invoices, identity checks, contacting the user - plus the current fields, validation rules and database columns if they exist.
    type: text
    required: true
  - name: target_countries
    description: Countries you serve now and soon, for example "UK, Germany, Japan, Brazil, India". Leave empty to design for worldwide use.
    type: string
    default: worldwide
output_contract:
  format: markdown
  sections: [Decisions, Fields by country, Validation rules, Storage schema, Test data]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Forms built around one country's conventions quietly reject real people: a "last name" field required for someone with one name, a regex that rejects apostrophes, hyphens or non-Latin scripts, a 5-digit postcode rule that blocks Canada, a mandatory state field for Ireland, a phone field that strips the country code, or a 30-character limit that truncates a Thai or Portuguese full name. Each rejection is a lost sign-up or a misdelivered parcel. Experts design from the data's purpose (what goes on a shipping label, what a courier needs, what a payment provider requires), use per-country address formats from a maintained dataset rather than guesswork, store phone numbers in E.164, and validate only what they must.
</context>

<task>
Design name, address and phone fields for this form, serving: {{target_countries}}.

<form_description>
{{form_description}}
</form_description>

1. Purpose first: for each piece of data, state why it is collected and the downstream system that consumes it (courier label, tax invoice, payment provider address verification, identity check, greeting). Drop fields that have no consumer.
2. Names:
   - Default to one "Full name" field plus an optional "What should we call you?" field for greetings. Split into given and family name only if a consumer requires it (some payment or identity providers do), and then make neither field mandatory on its own where the provider allows.
   - Accept any Unicode letters, marks, spaces, apostrophes, hyphens and periods; no minimum length beyond one character; maximum at least 100 characters; no case changes on save.
   - For Japanese, Chinese and Korean markets, consider a phonetic reading field (furigana) if sorting or calling by name matters.
3. Addresses:
   - Choose the format per country from a maintained source (for example Google's libaddressinput metadata or a commercial address API), switching fields and labels when the country changes: "Postcode", "ZIP code", "PIN code"; state, province, prefecture or none; field order (Japan starts with postcode and prefecture).
   - Put country first so the rest of the form adapts. Use `autocomplete` tokens (`country`, `address-line1`, `address-line2`, `address-level1`, `address-level2`, `postal-code`).
   - Postcode: required only where the country uses postcodes (for example not in Hong Kong or most of the UAE); validate with the country's pattern only as a soft warning unless the courier rejects invalid codes.
   - Keep two or three free address lines; never parse house numbers out.
   - Offer address lookup as a shortcut, never as the only way; always allow manual entry.
4. Phones: one field with a country selector defaulting from the address country, parsed and validated with a maintained library (for example libphonenumber), stored in E.164 (`+4915112345678`), and displayed in national format. Do not require a mobile number unless SMS is essential.
5. Things never to validate: name "realness", the presence of a family name, Latin-only scripts, house-number presence, postcode on countries without them, phone length by your home country's rules.
6. Storage: Unicode text columns (UTF-8, `nvarchar` on SQL Server), generous lengths, country as ISO 3166-1 alpha-2, the raw input preserved alongside any normalised form, and no derived fields stored as truth (do not split full name into first and last later).
</task>

<constraints>
- Name the data source to verify country rules; do not state a country's postcode format from memory unless it is well known, and mark uncertain ones [verify].
- Respect data minimisation: collect only what a consumer needs, and say where privacy law may limit collection or retention without giving legal advice.
- If the form's consumers are not described, ask which systems use the data before deciding on split name fields.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Decisions
Table: Data | Purpose and consumer | Field design | Required? | Why.

## Fields by country
Table for each target country (or the five most different for worldwide): Field order | Labels | Required fields | Postcode rule.

## Validation rules
Bullets: hard rules, soft warnings, and things never validated.

## Storage schema
The table definition or schema with types, lengths and a note per column.

## Test data
At least ten real-world-shaped test entries that break naive forms (single names, long names, apostrophes, non-Latin scripts, addresses without postcodes, Japanese order, international phone numbers), using fictional people.
</output_format>
