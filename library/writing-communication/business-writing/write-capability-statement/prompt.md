---
schema: 1
id: write-capability-statement
kind: prompt
title: Write a capability statement
description: Writes a one-page capability statement for government or corporate buyers with core competencies, differentiators, past performance, company data and codes, tailored to one buyer.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [founder, sales-rep, consultant]
subject: [public-sector]
requires: [none]
inputs: [notes, document]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [capability-statement, government-contracting, past-performance, supplier-registration, b2b]
pairs_with:
  prompts: [write-company-profile, respond-to-rfp]
args:
  - name: company_facts
    description: What you do, your strongest contracts or projects (client, scope, value, year, result), team qualifications, certifications, and what makes you different.
    type: text
    required: true
  - name: target_buyer
    description: The agency, department or company you want to sell to and what they buy, for example "the regional health authority's facilities department, which buys cleaning and waste services".
    type: string
    required: true
  - name: registrations
    description: Registration numbers and classification codes you hold - for example UEI and CAGE with NAICS codes in the US, ABN in Australia, a business number and supplier numbers elsewhere - plus small-business or diversity certifications.
    type: text
output_contract:
  format: markdown
  sections: [Capability statement, Tailoring notes, Check before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small and mid-sized suppliers write capability statements, the one-page summary that contracting officers and corporate buyers ask for at supplier days, in registrations and before a meeting. Buyers scan it in under a minute to answer three things: can this firm do what we buy, has it done it for someone like us, and is it registered and eligible. The common mistakes are a generic statement sent to every buyer, competencies listed as vague nouns ("solutions", "excellence"), past performance without client, scope or value, differentiators nobody can verify, and missing registration codes that the buyer needs to look the firm up. One version per buyer, matched to their stated needs, outperforms a polished generic one.

Target buyer: {{target_buyer}}

<company_facts>
{{company_facts}}
</company_facts>
{{#registrations}}
<registrations>
{{registrations}}
</registrations>
{{/registrations}}
</context>

<task>
1. Write the one-page statement in the standard blocks:
   - Header: company name, one-line description of what you deliver, contact name, phone, email, website as [placeholders] if not supplied.
   - Core competencies: four to six bullets, each a concrete service phrased in the buyer's terms, matched to what the target buyer purchases.
   - Past performance: two to four entries, each with client (or client type if confidential), scope, contract value or scale if supplied, period and a measurable result. Put the work most like the target buyer's needs first.
   - Differentiators: three to five points that are specific and checkable (response time, certified staff numbers, local presence, specialist equipment), not adjectives.
   - Company data: legal name, year founded, size, registration numbers and codes, certifications and set-aside or diversity status, payment methods or contract vehicles if supplied.
2. Keep the whole statement to what fits on one page: roughly 250 to 350 words.
3. Tailoring notes: two to four lines on what you emphasised for this buyer and what to change for a different buyer.
4. Check before sending: every number, code and client name to verify, and anything a buyer would expect that is missing.
</task>

<constraints>
- Never invent contracts, values, codes, certifications or client names. Use [placeholders] and list them under Check before sending.
- Do not state eligibility for set-asides or special programmes unless the user says they hold the certification.
- Name a past client only if the notes show it may be named; otherwise describe the client type.
- Plain, active phrasing; no "solutions provider", "best-in-class" or similar filler.
</constraints>

<output_format>
## Capability statement
The one-page statement with the block headings.
## Tailoring notes
Short bullets.
## Check before sending
Checklist.
</output_format>
