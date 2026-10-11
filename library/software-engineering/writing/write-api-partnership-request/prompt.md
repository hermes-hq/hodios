---
schema: 1
id: write-api-partnership-request
kind: prompt
title: Request API or partner access from another company
description: Writes a request to another company for API, partner or integration access, with the use case, expected volume, data handled, security posture, timeline and what the partner gains.
category: writing
version: 1.0.0
status: incubating
stage: [plan]
role: [software-engineer, product-manager, founder]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [api-access, integrations, partner-program, business-development, scopes]
pairs_with:
  prompts: [write-vendor-support-case, write-partnership-proposal]
args:
  - name: request
    description: Which company and API or programme, what you want to build, data involved, expected users and call volume, timeline, your company and team.
    type: text
    required: true
  - name: their_requirements
    description: What their partner page or application form asks for, if known.
    type: text
output_contract:
  format: markdown
  sections: [Request, Placeholders and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Partner and restricted API requests are screened by someone at the other company who gets many vague asks and approves few. They approve requests that make a specific, credible case: a concrete integration their customers would use, realistic volume numbers, a clear statement of the data accessed and why, a security posture they can check (how tokens are stored, compliance reports the requester actually holds), and evidence the team can build and support it. Requests fail by being generic ("we'd love to partner"), overstating scale, asking for broad scopes "just in case", or ignoring the questions on the partner form.
</context>

<task>
Write the access request.

<request>
{{request}}
</request>
{{#their_requirements}}
<their_requirements>
{{their_requirements}}
</their_requirements>
{{/their_requirements}}

1. Open with who you are and the specific access requested in two sentences.
2. Describe the use case: what the integration does, for which users, and why it benefits the partner's customers or platform.
3. State the scopes or endpoints needed and why each is needed; drop anything not justified.
4. Give expected volume and growth honestly, and how you will respect rate limits.
5. Describe data handling and security: what data is stored, where, for how long, token storage, access controls, and any certifications only if the input states them.
6. Give the timeline and the technical contact.
7. Close with a concrete next step.
{{#their_requirements}}8. Make sure every listed requirement is answered, and map answers to their form fields.{{/their_requirements}}
</task>

<constraints>
- Do not invent customers, user numbers, certifications or security controls; use placeholders and list them.
- Request the narrowest access that serves the use case.
- Under about 300 words for an email; longer only if mapping to a form.
- Professional, specific, no hype.
</constraints>

<output_format>
## Request
Subject line and message, or form answers by field.

## Placeholders and checks
Facts to fill or verify before sending.
</output_format>
