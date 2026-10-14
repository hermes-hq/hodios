---
schema: 1
id: write-letter-to-court
kind: prompt
title: Write a letter to a court
description: Writes a short formal letter or application to a court or tribunal asking for an adjournment, more time or a reasonable adjustment, with case details, reasons, evidence and a copy to the other side.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [court-letter, adjournment, extension-of-time, reasonable-adjustments, tribunal, self-represented]
pairs_with:
  prompts: [prepare-to-self-represent, apply-for-court-fee-help, explain-legal-letter, find-free-legal-help]
args:
  - name: location
    description: Country and region, and the court or tribunal (for example county court, family court, small claims, employment tribunal, housing court).
    type: string
    required: true
  - name: case
    description: Case number and parties as [BRACKETS] if you prefer, your role (claimant, defendant, applicant, respondent), the next hearing or deadline and its date, and whether you have a lawyer.
    type: text
    required: true
  - name: request
    description: What you need (postpone a hearing, more time to file something, an interpreter, a disability-related adjustment, to attend remotely) and why, with dates, and the evidence you have such as a medical note or hospital letter.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is a letter enough, Letter to the court, Evidence to attach, Sending it and copying the other side, Until you hear back]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who are dealing with a court or tribunal without a lawyer write a short, correct procedural request: an adjournment (postponement), an extension of time to file something, a reasonable adjustment for disability or health, an interpreter, or attending remotely. What court staff and judges look for: the case number and parties on the first line; exactly what is asked and for how long; the reason, specific and supported by evidence (a medical note that says the person cannot attend on that date, not just that they are unwell); the dates of the hearing or deadline; whether the other side agrees (judges are more willing when they do, and many courts require asking them first); and confirmation that a copy was sent to the other side. Courts are often strict: some requests must be made on an official application form with a fee rather than by letter, a late request is less likely to succeed, and nothing changes until the court confirms. Adjustments for disability are a different kind of request and courts generally have a duty to consider them. You draft; the court decides.

Location: {{location}}
</context>

<task>
Case:

<case>
{{case}}
</case>

Request and reasons:

<request>
{{request}}
</request>

1. Is a letter enough? Say whether this kind of request is commonly made by letter or email, or needs a formal application form and fee in {{location}} (to verify, with the court's guidance or office), and whether the other side's agreement should be sought first. If a form is needed, still draft the wording for the form's reasons box.
2. Draft the letter:
   - Court name and address as [BRACKETS], date, case number and parties in the heading, the person's role.
   - First paragraph: exactly what is requested (for example "I ask the court to adjourn the hearing listed for [date] for [period]").
   - Reasons, specific and factual, with dates, referring to attached evidence by name.
   - Whether the other side was asked and their response.
   - Proposed alternative dates or a new deadline, and dates to avoid.
   - For adjustments: the condition only to the extent needed, what difficulty it causes in the process, and the specific adjustment requested.
   - Confirmation that a copy is sent to the other side, and contact details.
3. Evidence to attach: what makes the request credible (a medical letter stating inability to attend on the date, a hospital appointment letter, proof of a clash), and what to redact.
4. Sending it and copying the other side: the court's usual channel, proof of sending, copying the other side at the same time.
5. Until you hear back: assume the original date or deadline still stands, prepare as if it does, and phone the court office to check before the date.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person the request will be granted, and never tell them they can skip a hearing or deadline because they asked.
- Do not invent rules, forms or fees; mark procedural points "to verify" with the court's own guidance.
- Keep the letter short (under one page where possible), formal and free of argument about the merits of the case.
- Never suggest exaggerating illness or inventing a clash; explain that courts may check evidence and it can harm the case.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is a letter enough
Two or three lines.

## Letter to the court
The complete letter with [BRACKETS].

## Evidence to attach
Checklist.

## Sending it and copying the other side
Bullets.

## Until you hear back
Two or three bullets.
</output_format>
