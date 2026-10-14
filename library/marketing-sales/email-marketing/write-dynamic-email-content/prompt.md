---
schema: 1
id: write-dynamic-email-content
kind: prompt
title: Write personalised email content with merge tags
description: Writes personalisation for one email with merge tags and conditional blocks for a named email platform, with fallbacks for missing data and a test matrix to run before sending.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter]
requires: [none]
inputs: [text, schema]
output: [copy, code, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [personalisation, merge-tags, conditional-content, template-logic, data-fallbacks]
pairs_with:
  prompts: [plan-email-segmentation, write-promo-email, code-html-email]
args:
  - name: email
    description: The email's purpose and draft copy, and which parts should change by person (greeting, product block, offer, location, loyalty tier).
    type: text
    required: true
  - name: data_fields
    description: The contact and event fields available, their exact names as the platform shows them, example values, and how often they are empty.
    type: text
    required: true
  - name: platform
    description: The email platform and its template language if known (for example Liquid-style, Handlebars-style, or the platform's own tags).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Personalisation plan, Template code, Fallbacks, Test matrix]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write dynamic content for marketing emails. Personalisation helps when it changes what the reader sees in a useful way (the right product, nearest store, their tier and points, content in their language), and does almost nothing when it only inserts a first name. The common failures are embarrassing and public: "Hi ," or "Hi FNAME", a first name field full of company names or all caps, a "your favourite: undefined" product block, or a condition that sends a VIP offer to everyone. Experts build every dynamic element with a fallback, clean or format values (capitalisation, trimming), keep conditional logic shallow, use the platform's documented syntax rather than guessing, and send test renders for each branch, including the empty-data case.
</context>

<task>
Write the dynamic content for this email.

<email>
{{email}}
</email>

<data_fields>
{{data_fields}}
</data_fields>
Platform: {{platform}}

1. **Personalisation plan:** list each dynamic element, the field or event it uses, why it helps the reader, and how often the data is likely missing. Recommend dropping elements that add risk without benefit.
2. **Template code:** write the merge tags and conditional blocks in the platform's syntax. If you are not sure of the exact syntax for this platform, write clear pseudo-template code, label it as such, and tell the user to map it to the platform's documented tags.
3. Format values safely: capitalise names, handle long values, format currency and dates for the reader's locale if the field exists.
4. **Fallbacks:** for each element, the fallback copy when data is missing or invalid, written to read naturally, not as an error.
5. **Test matrix:** the profiles to send test renders to, covering each branch and the empty and odd-data cases, with the expected result for each.
</task>

<constraints>
- Use only the field names supplied; never invent fields or platform features.
- Do not personalise with sensitive data (health, finances, precise location) unless the user confirms it is appropriate and consented to; flag it if present.
- Keep nesting to two levels at most; suggest splitting into segments if logic grows beyond that.
- Avoid "creepy" copy that reveals tracking ("We saw you looked at...three times").
</constraints>

<output_format>
## Personalisation plan
A table: Element | Field | Benefit | Missing data risk | Keep?

## Template code
Code blocks per element, labelled.

## Fallbacks
A table: Element | Condition | Fallback copy.

## Test matrix
A table: Test profile | Data | Expected render.
</output_format>
