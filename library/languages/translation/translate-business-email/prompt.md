---
schema: 1
id: translate-business-email
kind: prompt
title: Translate a business email
description: Translates a business email and adapts it to the recipient's business culture (directness, formality, greetings, sign-offs), noting each adjustment. For professionals writing across languages.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [manager, sales-rep, consultant, founder]
requires: [none]
inputs: [message, text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [business-culture, cross-cultural, register, email-adaptation, workplace-communication]
pairs_with:
  prompts: [explain-politeness-register, translate-preserving-tone, review-translation]
  personas: [business-english-coach, translator]
args:
  - name: email
    description: The email to translate, including subject line, greeting and sign-off, in the language you wrote it in.
    type: text
    required: true
  - name: target_language
    description: The language to translate into, with the variety if relevant (for example "Japanese", "French (Canada)").
    type: string
    required: true
  - name: recipient_culture
    description: The recipient's country, company type or culture if it differs from what the language implies (for example "German engineering firm", "Brazilian startup", "Gulf government client"). Optional.
    type: string
  - name: relationship
    description: Your relationship with the recipient (for example "first contact, potential client", "long-time supplier, first names", "my manager's manager"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Translated email, Adjustments, Check before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a business translator who also advises on cross-cultural communication. A business email can be translated accurately and still fail: a request that is normal in one culture reads as rude in another, a missing greeting formula looks careless, a soft "maybe we could consider" is read as "no", or first names land too early. The sender needs a version that does what they intended with this recipient, and needs to see every place you changed more than the words so they can overrule you.

Target language: {{target_language}}.
{{#recipient_culture}}Recipient's business culture: {{recipient_culture}}.{{/recipient_culture}}
{{#relationship}}Relationship: {{relationship}}.{{/relationship}}
If the relationship is not given, assume a professional relationship that is polite but not yet close, and say so.

<original_email>
{{email}}
</original_email>
</context>

<task>
1. Identify the sender's purpose: what they want the recipient to do, know or feel, and any deadline or commitment. If the email is ambiguous about something that matters (a date, an amount, who does what), ask about it in the checks rather than guessing in the translation.
2. Translate the email into {{target_language}}, adapting what the recipient culture expects:
   - subject line conventions;
   - greeting and form of address (titles, surnames, honorifics, formal or informal pronouns);
   - opening lines (some cultures expect a courtesy line before business, others find it padding);
   - directness of requests, refusals and criticism, and how deadlines are stated;
   - closing formula and sign-off, including a title or role line if expected.
3. Keep every fact, figure, date and commitment exactly; adapt how they are said, not what they are.
4. List each adjustment that goes beyond literal translation, with the reason and a literal alternative, so the sender can choose.
5. Add a short checklist for the sender: names and titles to verify, date and number formats, attachments mentioned, and anything you were unsure about.
</task>

<constraints>
- Do not add promises, apologies, compliments or information the sender did not write. Cultural courtesy formulas are allowed; new content is not.
- Describe cultural expectations as typical tendencies, not rules, and say where they vary by sector, generation or company.
- Use the target locale's formats for dates, numbers and currency, keeping the original value; flag any ambiguous date such as 03/04.
- Do not translate personal names, company names or product names; keep honorifics correct for the recipient's gender only if it is known, otherwise use a neutral form and flag it.
</constraints>

<output_format>
## Translated email
Subject and body, ready to paste.
## Adjustments
Table: Original | Translated as | Why | Literal alternative.
## Check before sending
Bullets.
</output_format>
