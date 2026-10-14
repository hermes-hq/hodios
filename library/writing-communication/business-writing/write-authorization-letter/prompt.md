---
schema: 1
id: write-authorization-letter
kind: prompt
title: Write an authorization letter
description: Writes a letter authorising someone to act, collect documents or sign on your behalf, with both parties' identity details, exact scope, limits and validity, and checks to make first.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, founder, operations-manager, parent]
advice_risk: [legal]
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
tags: [authorisation-letter, letter-of-authority, document-collection, proxy, formal-letter]
pairs_with:
  prompts: [write-formal-letter, write-no-objection-certificate]
args:
  - name: task
    description: Exactly what the person may do - collect a passport, a parcel, a certificate or a vehicle; submit or sign specific documents; deal with a named office or bank - and where.
    type: text
    required: true
  - name: parties
    description: Your full name, address and ID document type and number; the authorised person's full name, relationship to you, and ID document type and number; and the organisation receiving the letter.
    type: text
    required: true
  - name: limits
    description: Dates the authority is valid, anything they may not do, and why you cannot act yourself.
    type: text
output_contract:
  format: markdown
  sections: [Letter, Check with the receiving organisation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write authorization letters: the short letter that lets a family member, colleague or agent collect a document, submit an application or deal with an office on someone's behalf for a specific, limited task. Offices accept them when they can match both people to their ID documents and see exactly what is allowed: a letter that says "to handle all my affairs" is either refused or, worse, used beyond what was intended. Experienced writers state the exact act, the place, the validity dates and what is not authorised, attach copies of both IDs, and sign consistently with the signature on file. Many banks, courts, land registries and passport offices refuse simple letters and require their own form, a notarised letter or a formal power of attorney; anything ongoing, financial or legal in effect usually needs a power of attorney, which is a different document.

<task_description>
{{task}}
</task_description>

<parties>
{{parties}}
</parties>
{{#limits}}
<limits>
{{limits}}
</limits>
{{/limits}}
</context>

<task>
1. If the task is broad or open-ended ("manage my bank accounts", "sell my car and sign everything"), say that a simple authorization letter is unlikely to be accepted or safe for this, suggest asking the organisation about its form or a power of attorney, and offer a narrow letter only for any specific step that fits.
2. Write the letter: sender's name and address, date, recipient office and address, subject "Authorization for [name] to [act] on my behalf".
3. Body:
   - "I, [full name], holder of [ID type and number], residing at [address], authorize [full name], holder of [ID type and number], my [relationship], to [exact act] at [place] on my behalf."
   - Why you cannot attend, in one sentence if the user gave a reason.
   - Validity: from and to dates, or "on [date] only".
   - Limits: what the person is not authorised to do, if relevant.
   - Enclosures: copies of both IDs, and any reference numbers, receipts or application numbers.
   - A line asking the office to contact you at [phone or email] to verify.
4. Signature block for the sender, and a specimen signature line for the authorised person if the receiving office matches signatures.
5. Check with the receiving organisation: whether they accept a letter or need their own form, notarisation or a power of attorney; which ID copies and originals the authorised person must bring; and any reference number they need.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent ID numbers, addresses or reference numbers; use [brackets].
- Keep scope as narrow as the user's task; do not add general powers.
- Do not describe the letter as a power of attorney or claim it is legally sufficient.
- One page; plain formal English, or the user's language if they write in another.
</constraints>

<output_format>
## Letter
The letter laid out for printing.
## Check with the receiving organisation
Bullets.
</output_format>
