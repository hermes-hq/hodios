---
schema: 1
id: write-no-objection-certificate
kind: prompt
title: Write a no objection certificate
description: Writes a no objection certificate (NOC) from an employer, landlord, parent or institution for a visa, study, job change or property purpose, with identities, purpose, conditions and validity.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, individual, parent, founder]
requires: [none]
inputs: [notes]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [noc, no-objection-letter, visa-documents, employer-letters, formal-letter]
pairs_with:
  prompts: [write-authorization-letter, write-employment-verification-letter, write-formal-letter]
args:
  - name: issuer
    description: Who issues it.
    type: enum
    enum: [employer, landlord, parent-or-guardian, institution, other]
    required: true
  - name: purpose
    description: What the NOC is for and who will receive it, for example "tourist visa for Schengen, embassy of Italy", "employee taking a part-time course", "tenant registering a business at the flat", "minor travelling abroad with one parent".
    type: text
    required: true
  - name: facts
    description: Issuer's name, title, organisation and address; the subject's name, ID or passport number and role or relationship; dates; conditions (leave approved, position retained, who pays, return date); and any wording the receiving authority requires.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Certificate, Attachments and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft no objection certificates (NOCs), common in South Asia, the Gulf, parts of Africa and for many visa and property processes. The receiving authority (an embassy, university, registrar, passport office or new employer) reads an NOC to confirm three things: the issuer has the standing to object, the subject is clearly identified, and the issuer does not object to this specific purpose under stated conditions. Rejections come from missing passport or ID numbers, a vague purpose, no dates, no issuer designation or stamp, or wording that does not match what the authority asked for. Typical conditions: for an employer, leave is approved for the dates, the position is retained, and who bears costs; for a landlord, permission is limited to a stated use; for a parent, travel dates, destination and the accompanying adult. NOCs should not guarantee things the issuer cannot control (for example that the person will certainly return), and employer NOCs should not promise future employment beyond what is decided.

Issuer: {{issuer}}

<purpose>
{{purpose}}
</purpose>

<facts>
{{facts}}
</facts>
</context>

<task>
1. If the purpose or the subject's identity is unclear, ask and stop.
2. Write the certificate on letterhead layout (or with the issuer's address for individuals): date, reference placeholder, "To whom it may concern" or the named authority, title "NO OBJECTION CERTIFICATE".
3. Body:
   - Who the issuer is and their standing (designation and organisation, owner of the property, parent or legal guardian).
   - The subject's full name, ID or passport number and relationship or role (for employees: designation and joining date).
   - The specific purpose, with destination, institution or address and dates.
   - The statement of no objection.
   - Conditions as applicable: leave approved for exact dates and position retained; costs borne by whom; permitted use only; travel with a named adult.
   - Validity or the period it covers.
   - Contact for verification.
4. Signature block with name, designation, stamp or seal placeholder where customary, and for parents a line for the other parent if both must consent.
5. Attachments and checks: documents to attach (ID copies, property papers, leave approval, birth certificate), whether the authority needs a notarised or attested NOC or its own format, and placeholders to fill.
</task>

<constraints>
- Never invent passport numbers, dates, addresses or reference numbers; use [brackets].
- Do not guarantee the person's return, conduct or future employment unless the facts state it as decided; prefer "has been granted leave from … to … and is expected to resume duties on …".
- Keep to the stated purpose; no broader permissions.
- One page, formal and factual.
</constraints>

<output_format>
## Certificate
The NOC laid out for printing.
## Attachments and checks
Bullets.
</output_format>
