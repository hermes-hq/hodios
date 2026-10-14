---
schema: 1
id: write-vendor-support-case
kind: prompt
title: Write a non-urgent support case to a vendor
description: Writes a non-incident support case to a software or cloud vendor - a how-to question, a suspected bug, a limit increase, a feature gap or a billing discrepancy - shaped so the first reply answers it.
category: writing
version: 1.0.0
status: incubating
stage: [build, operate]
role: [software-engineer, backend-engineer, devops-engineer, dba]
requires: [none]
inputs: [notes, logs, text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [vendor-support, support-case, quota-increase, billing-dispute, feature-gap]
pairs_with:
  prompts: [escalate-incident-to-vendor, write-actionable-bug-report]
args:
  - name: issue
    description: What you need from the vendor and why - the product, versions or plan, what you tried, docs you read, identifiers (account, project, resource, invoice), errors or figures, and any deadline on your side.
    type: text
    required: true
  - name: case_type
    description: question, bug, limit-increase, feature-gap or billing. Leave empty to have it inferred.
    type: string
output_contract:
  format: markdown
  sections: [Case, Before sending, Redaction check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most vendor cases are not outages: a configuration question, a bug with a workaround, a quota that blocks a launch next month, a feature the product lacks, a charge nobody expected. These cases sit in low-severity queues where the first responder is often a generalist, so they stall in a predictable loop: the responder asks for the version, the account id or the exact steps, a day passes, and the answer is a docs link the customer already read. Each case type needs different evidence. A question needs what was tried and which docs did not answer it. A bug needs versions and a minimal reproduction. A limit increase needs current usage, the forecast and the date it is needed, because quota reviews take time. A feature gap needs the use case and an ask to log it as a feature request with a reference. A billing case needs the invoice and line item, the expected and charged amounts, and the usage evidence.
</context>

<task>
Write a support case.

<issue>
{{issue}}
</issue>
{{#case_type}}
Case type: {{case_type}}
{{/case_type}}

1. If the input describes a production outage or severe degradation happening now, say so at the top of Case, recommend escalating it as an incident at the vendor's highest appropriate severity instead of a routine case, and keep the rest short.
2. Use the case type given, or infer it from the input, and recommend a low or normal severity with a one-line reason. Say what would justify a higher one.
3. Write a subject line that names the product, the case type and the specific point, for example "Managed Postgres: request to raise max connections on prod-eu from 500 to 1,500 before 1 Dec".
4. Write the body with one clear ask in the first two sentences, then the evidence for this case type:
   - question: goal, what you tried, the docs pages you read and where they fall short, the exact question;
   - bug: versions, minimal reproduction, expected versus actual, frequency, workaround in use;
   - limit increase: current limit and usage, forecast with its basis, the date needed, and the resource ids;
   - feature gap: the use case, current workaround and its cost, and a request to log a feature request and share its reference;
   - billing: invoice and line item, expected versus charged amount, the usage or contract terms behind your expectation, and the resolution you want.
5. State your deadline, if any, and what happens on your side if it is missed, without threats.
6. Under Before sending, list what to attach, the placeholders to fill and what to do if the reply is a docs link that does not answer the question (reply with the specific gap, ask for the case to go to a specialist).
</task>

<constraints>
- Use only identifiers, amounts, versions and dates from the input; missing ones become `[add: ...]` placeholders. Never invent the vendor's severity names, limits, prices, SLAs or contract terms.
- For billing cases, do not assert the vendor is wrong; state the discrepancy and ask for an explanation or correction.
- Calm and factual; the body under about 250 words.
</constraints>

<output_format>
## Case
Case type, recommended severity and why, subject line, then the body.

## Before sending
Bullets: attachments, placeholders to fill, follow-up if the first reply misses.

## Redaction check
Bullets: anything in the input that looks like a secret, token, connection string, card number or personal data, or "None found".
</output_format>
