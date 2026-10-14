---
schema: 1
id: spec-form-fields-and-validation
kind: prompt
title: Specify form fields and validation
description: Specifies a form field by field with type, required rules, formats, limits, defaults, dependencies between fields, error message wording and when validation runs, for design, build and QA.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, frontend-engineer, qa-engineer]
stack: []
requires: [none]
inputs: [spec, ticket, text]
output: [table, docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [form-fields, validation-rules, error-messages, requirements]
pairs_with:
  prompts: [implement-form-validation, design-international-address-and-name-fields, write-acceptance-criteria]
args:
  - name: form_purpose
    description: What the form is for, who fills it in, and the fields you think it needs.
    type: text
    required: true
  - name: context
    description: Countries and languages served, devices, data the system already knows, and downstream systems that consume the data.
    type: text
output_contract:
  format: markdown
  sections: [Field table, Cross-field rules, Validation timing, Error messages, Submission behaviour, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Forms are where vague requirements turn into user frustration: a phone field that rejects valid international numbers, a name field that refuses apostrophes, a postcode required in a country without postcodes, errors shown before the person finished typing, or a whole form wiped after one server error. Each field needs a reason to exist, because every field lowers completion. A field-level spec decides type, required or optional, accepted formats and limits, normalisation (trim, case), defaults and prefills, and the exact error message, written to say how to fix the problem rather than that something is invalid. Server-side validation is the authority; client checks only help. Cross-field rules (end date after start date, at least one contact method) and conditional fields are where most bugs hide.
</context>

<task>
<form_purpose>
{{form_purpose}}
</form_purpose>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Challenge the field list: for each proposed field, state why it is needed and who uses the data; recommend removing or deferring fields that are not needed now.
2. Build the field table: label, type and input control, required or optional, format and allowed values, min and max length or range, normalisation, default or prefill, and help text where needed.
3. Write cross-field and conditional rules: fields shown or required only in some cases, dependencies, and uniqueness checks against existing data.
4. Specify validation timing: on blur, on submit, or as typed, per field; server-side checks; and what happens to entered data when validation fails.
5. Write every error message: specific, in plain language, saying how to fix it, and placed next to the field, plus a summary at the top for long forms.
6. Specify submission behaviour: double-submit protection, slow or failed server responses, saving drafts for long forms, and the success state.
7. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Do not impose one country's formats for names, addresses, phone numbers, postcodes or dates unless the form serves only that country; say what the assumption is.
- Never require personal or sensitive data without a stated use; flag fields that may need consent or legal review.
- Error messages must never blame the user or expose system details.
- State that the server enforces every rule; client-side checks are a convenience.
- If the purpose is unclear, ask what the form is for before listing fields.
</constraints>

<output_format>
## Field table
Table: field, why needed, type and control, required, format and limits, normalisation, default, help text.
## Cross-field rules
Numbered rules.
## Validation timing
Table: field or rule, when checked, client or server.
## Error messages
Table: field, condition, message.
## Submission behaviour
Bullets.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
