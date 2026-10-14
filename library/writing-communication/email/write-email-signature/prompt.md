---
schema: 1
id: write-email-signature
kind: prompt
title: Write an email signature
description: Writes a clean professional email signature with the details people need, optional pronouns, company information some countries require, and a short version for replies.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [individual, founder, consultant, job-seeker]
requires: [none]
inputs: [notes, preferences]
output: [copy, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
depth: specific
tags: [signature-block, contact-details, company-information, personal-branding, plain-text]
pairs_with:
  prompts: [write-out-of-office-message, write-professional-bio, design-stationery-set]
args:
  - name: details
    description: Name, job title, organisation, phone, website, booking link, pronouns if wanted, working hours or time zone if relevant, and anything else you want in it.
    type: text
    required: true
  - name: context
    description: Who you email (clients, students, internal staff), the country the business is registered in, whether it is a company, freelancer or personal signature, and any brand or employer template rules.
    type: text
output_contract:
  format: markdown
  sections: [Full signature, Reply signature, Plain-text version, Legal information to check, Formatting tips]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A good signature is short and useful: name, role, organisation, one or two ways to reach you, and nothing that makes the email look like spam. People who manage company email know the common mistakes: an image-only signature that shows up as an attachment or a blank box, eight social icons, inspirational quotes, a long confidentiality disclaimer nobody reads, and repeating the full block on every reply in a thread. In some countries companies must show registration details on business emails (for example registered name, number, registered office, sometimes VAT or tax number and legal form), so business signatures may need a short legal line. A shorter signature for replies keeps threads readable.
</context>

<task>
Write an email signature from these details.

<details>
{{details}}
</details>
{{#context}}
<context_details>
{{context}}
</context_details>
{{/context}}

1. Full signature: name; title and organisation; one phone number; website or booking link; optional pronouns after the name; optional working hours or time zone line if the user works across time zones or part-time. Five lines or fewer before any legal line.
2. Reply signature: name, title and one contact, one or two lines.
3. Plain-text version of the full signature (no images, links written out).
4. Legal information to check: if this is a business signature and the country is known, list the kinds of company information that jurisdiction commonly requires on business email, phrased as items to confirm with an accountant or the company registry; never state registration numbers. If the country is unknown, say that some countries require this and ask.
5. Formatting tips: keep the logo small and optional, avoid image-only signatures, use real text for phone and email so they can be tapped, at most two social links, how to set a different reply signature in common apps described generically, and test on a phone.
6. If the input includes a long disclaimer or quote, suggest trimming or removing it and say why.
</task>

<constraints>
- Use only details given; never invent phone numbers, addresses, registration numbers or titles. Use [placeholders].
- No inspirational quotes, emojis or more than two social links unless the user insists.
- Do not state what the law requires as fact for a specific country; present it as items to check.
</constraints>

<output_format>
## Full signature
In a code block so line breaks are preserved.
## Reply signature
In a code block.
## Plain-text version
In a code block.
## Legal information to check
Bullets.
## Formatting tips
Bullets.
</output_format>
