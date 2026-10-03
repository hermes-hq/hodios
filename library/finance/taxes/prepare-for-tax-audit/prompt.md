---
schema: 1
id: prepare-for-tax-audit
kind: prompt
title: Prepare for a tax inquiry or audit
description: Organises a response to a tax inquiry or audit - what is being asked, a document map, a timeline, how to communicate and when to bring in a professional.
category: taxes
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, founder, consultant]
requires: [none]
inputs: [text, document]
output: [plan, checklist, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [tax-audit, tax-inquiry, record-keeping, tax-authority, deadlines]
pairs_with:
  prompts: [explain-tax-notice, organize-tax-documents, track-business-expenses]
  personas: [tax-educator, bookkeeper]
args:
  - name: notice_summary
    description: What the letter or message from the tax authority says - type of check, tax years, items questioned, documents requested, deadline, reference number removed - or paste the text with personal identifiers taken out.
    type: text
    required: true
  - name: records_available
    description: What records you have and where (bank statements, receipts, invoices, bookkeeping files, mileage logs, previous returns), what is missing, and whether a preparer filed the return. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What they are asking, Deadline and timeline, Document map, Gaps and how to fill them, How to communicate, Do you need a professional, Next seven days]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a person or small business organise their response to a tax inquiry or audit so they meet the deadline, answer what was actually asked, and know early whether they need professional representation. Most inquiries are narrower than people fear: a request to support specific items on a return. They go badly when deadlines slip, when people send everything (or nothing) instead of what was asked, when explanations are speculative or inconsistent, and when people wait too long to get help on a serious case. Being organised, truthful, specific and on time is most of the work.
</context>

<task>
Notice:

<notice_summary>
{{notice_summary}}
</notice_summary>

{{#records_available}}Records available:

<records_available>
{{records_available}}
</records_available>{{/records_available}}

1. What they are asking: the type of check as far as the notice shows (letter or correspondence inquiry, desk review, in-person or field audit, or a general compliance check), the tax and years covered, and each specific item or question, numbered. Say what the notice does not say and should be clarified.
2. Deadline and timeline: the stated deadline, a working back-schedule (gather, review, draft, check, send with a margin), and how to ask for more time in writing before the deadline if needed. If no deadline is stated, say to find it or ask.
3. Document map: for each numbered request, the documents that would support it, whether the person has them, and where to get missing ones (bank, card issuer, suppliers, clients, employer, previous preparer).
4. Gaps and how to fill them: legitimate ways to reconstruct missing evidence (bank and card statements, duplicate invoices from suppliers, calendars and emails for business purpose, a reasoned and clearly labelled estimate where the rules allow it). Flag where an item may not be supportable and that it is usually better to acknowledge an error than to defend it weakly.
5. How to communicate: respond in writing, answer exactly what is asked, keep explanations factual and consistent with the return, send copies not originals, index and number attachments, keep a log of every contact and a copy of everything sent, and note the date and method of sending.
6. Do you need a professional: assess this case against the triggers for bringing in a tax adviser, accountant or tax lawyer now (several years or a whole business under review, large amounts, any mention of penalties for deliberate behaviour, fraud or a criminal investigation, the authority asking for an interview, the person not understanding the issue, or the return having been prepared by someone else). Say clearly which apply.
7. Next seven days: a numbered list.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never help create, alter, backdate or destroy records, invent receipts, or shape an explanation that is not true. If asked, refuse plainly, explain that it turns a tax dispute into a far more serious matter, and refocus on an honest response and professional help.
- Do not predict the outcome, penalties or amounts owed.
- Procedures, deadlines, appeal rights and penalty rules differ by country and tax; say what to confirm and do not state them as fact unless confident, otherwise mark "verify".
- Tell the person to remove identity numbers, account numbers and the case reference before pasting anything into a chat.
- If the notice suggests a criminal investigation, an interview under caution, or seizure, say they should speak to a tax lawyer before responding and stop short of drafting answers.
{{> output/uncertainty}}
</constraints>

<output_format>
## What they are asking
Type of check, scope, then numbered items.

## Deadline and timeline
Table: task | target date | done.

## Document map
Table: request item | supporting documents | have it? | where to get it.

## Gaps and how to fill them
Bullets per gap.

## How to communicate
Checklist.

## Do you need a professional
Verdict in one sentence, then the triggers that apply.

## Next seven days
Numbered list.
</output_format>
