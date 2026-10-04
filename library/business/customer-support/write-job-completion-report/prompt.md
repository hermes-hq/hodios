---
schema: 1
id: write-job-completion-report
kind: prompt
title: Write a job completion report
description: Writes a job completion report for a trades, repair or cleaning customer - work done, parts used, test results, photos to attach, care instructions, guarantee terms and the next service date.
category: customer-support
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [founder, individual, operations-manager]
inputs: [notes, image, text]
output: [docs, message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [job-report, handover, trades, warranty, aftercare, service-report, cleaning-jobs]
pairs_with:
  prompts: [write-customer-quote, present-repair-options, write-invoice, respond-to-online-review]
  personas: [trades-business-mentor]
args:
  - name: job_notes
    description: Your rough notes from the job - what you found, what you did, parts and materials with makes and models, readings or test results you recorded, photos you took, anything the customer should keep an eye on.
    type: text
    required: true
  - name: customer
    description: Customer name or business and the site address type (home, rental property, shop, office), and anything about them that matters (landlord, elderly, wants it brief).
    type: string
    required: true
  - name: trade
    description: Your trade or service, for example "gas engineer", "electrician", "end-of-tenancy cleaning", "appliance repair". Optional if obvious from the notes.
    type: string
  - name: guarantee
    description: Your workmanship guarantee and any manufacturer warranty on parts - length, what it covers, what voids it, and whether the customer must register the product. Optional.
    type: text
  - name: format
    description: How the report is sent.
    type: enum
    enum: [document, email]
    default: document
output_contract:
  format: markdown
  sections: [Report, Photos to attach, Missing information]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an office manager for a small trades and service firm who turns engineers' rough notes into completion reports customers keep. A good report does four jobs: it proves what was done (useful for the customer's records, their landlord or insurer, and for any later dispute), explains it in plain words, tells the customer how to look after the work, and sets up the next visit. It never claims a test was done or a certificate was issued unless the notes say so, because a report is a record that people rely on.
</context>

<task>
Write a completion report as a {{format}} for {{customer}}.
{{#trade}}
Trade: {{trade}}
{{/trade}}

<job_notes>
{{job_notes}}
</job_notes>
{{#guarantee}}
<guarantee_and_warranty>
{{guarantee}}
</guarantee_and_warranty>
{{/guarantee}}

1. Report header: business name, customer, site, job reference, date of work and engineer, as placeholders where not given.
2. Summary: two or three plain sentences on what the problem or request was and what the outcome is.
3. What we found: the condition before work, in plain words, with the technical term in brackets where it helps.
4. Work carried out: numbered steps in the order done.
5. Parts and materials: a table with item, make and model or specification, quantity and serial number where the notes give it (needed for warranty registration).
6. Tests and results: list only tests and readings that appear in the notes, with values exactly as recorded. If the trade normally involves a test or certificate that is not in the notes, add it to Missing information, not to the report. Name any certificate issued by its type and reference only if given.
7. Recommendations: issues found but not fixed, each with a priority (safety now, soon, monitor) and a plain reason, written honestly without pressure. A safety issue is stated clearly with what the customer should do.
8. Care and maintenance: short, specific instructions for looking after the work or product (for example, cleaning, settings, what not to do, curing or drying times from the notes or manufacturer).
9. Guarantee and warranty: the workmanship guarantee and manufacturer warranties as given, what voids them, and any registration deadline. If not given, insert a placeholder.
10. Next service: the recommended next service or inspection date and how to book.
11. Sign-off: engineer's name, contact details placeholder and a line for the customer's signature if this is a document.
12. Before you answer, check that every test value, part and certificate in the report comes from the notes, and that nothing was added from assumption.
</task>

<constraints>
- Never invent readings, test results, certificate numbers, serial numbers or warranty terms. Use `[ADD: …]` placeholders and list them under Missing information.
- Plain words for the customer, with technical terms explained once.
- No upselling language. Recommendations are factual and prioritised.
- For an email, keep the same content but shorter, with the full report as an attachment note if the trade normally issues a formal certificate.
- If the notes are too thin to write a report (no idea what was done), ask for the missing details instead of padding.
</constraints>

<output_format>
## Report
The report with short headings: Summary, What we found, Work carried out, Parts and materials (table), Tests and results, Recommendations (table: Issue | Priority | Why | What to do), Care and maintenance, Guarantee and warranty, Next service, Sign-off. For an email, add a subject line and greeting and keep each section short.
## Photos to attach
Table: Photo | Caption | Why it matters (before, during, after, serial plates, readings).
## Missing information
Numbered list of every `[ADD: …]` item.
</output_format>
