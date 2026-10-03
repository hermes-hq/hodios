---
schema: 1
id: write-client-intake-questionnaire
kind: prompt
title: Write a client intake questionnaire
description: Writes a plain-language client intake questionnaire for a practice area covering conflict checks, key facts, deadlines, documents to bring and goals, plus an internal triage sheet for the firm.
category: legal-practice
version: 1.0.0
status: incubating
stage: [plan, build]
role: [legal-professional, operations-manager]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, questions, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [client-intake, conflict-check, law-firm-operations, onboarding-forms]
pairs_with:
  prompts: [draft-engagement-letter, write-client-status-update]
  personas: [paralegal]
args:
  - name: practice_area
    description: The practice area and matter types the form is for (for example "residential landlord-tenant, tenant side", "employment claims for employees", "uncontested divorce", "small business formation"), and who fills it in.
    type: string
    required: true
  - name: jurisdiction
    description: Where the firm practises, so deadlines and terms can be framed correctly. Optional; without it the form stays jurisdiction-neutral and flags where local rules matter.
    type: string
output_contract:
  format: markdown
  sections: [Client questionnaire, Internal triage sheet, Notes for the firm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design client intake questionnaires for law firms and legal clinics. Intake is where firms catch conflicts of interest before confidential information is received, spot urgent deadlines (limitation periods, hearing dates, response deadlines) while there is still time, and collect facts in a form a lawyer can triage in five minutes. Prospective clients are often stressed, unfamiliar with legal terms and unsure what matters, so the questions have to be plain, specific and short, and the form must not read as advice or as a promise of representation. The duty of confidentiality to prospective clients and the rules on what creates a lawyer-client relationship vary by jurisdiction, so the form carries a clear notice the firm adapts.
{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Write an intake questionnaire for: {{practice_area}}

1. Notice at the top, in plain language: completing the form does not make the person a client; the firm will check for conflicts first; deadlines may apply and they should not wait for a reply if a court date or deadline is close; how the information is kept confidential. Mark it for the firm to adapt to its rules.
2. Section 1, conflict check, asked first and kept minimal: the person's name and contact details, every other party and related person or company (with former names), and any lawyers already involved. Tell the person not to describe the facts yet if the form is used before conflicts clear (offer this as a two-stage option).
3. Section 2, urgency: questions that surface hard deadlines for this practice area (dates of letters, notices, court papers received, hearing dates, the date the problem happened), each with a "not sure" option.
4. Section 3, facts: questions tailored to the practice area, in chronological or logical order, using everyday words with a short example where a term may confuse. Prefer specific questions ("What date did you receive the notice?") over open ones ("Tell us what happened"), with one open box at the end.
5. Section 4, documents: a checklist of what to bring or upload for this matter type.
6. Section 5, goals and constraints: what outcome they want, budget or fee concerns, preferred contact method, accessibility or language needs, safety concerns about being contacted.
7. Internal triage sheet (for staff, not the client): red-flag answers that need same-day attorney review, likely deadlines to calculate and confirm, conflict check result fields, and a fit/no-fit decision with referral options.
8. Note any questions you included that the firm should check against local rules (for example questions on immigration status, criminal history or health, which can be sensitive or restricted).
</task>

<constraints>
{{> guardrails/professional-limits}}
- The form gathers information; it never gives legal advice, predicts an outcome or promises representation.
- Write for a reading age of about 12: short questions, no Latin, no undefined legal terms.
- Ask only what triage needs. Every sensitive question (health, immigration status, criminal record, finances) must have a clear purpose for this practice area; leave it out otherwise.
- Do not state limitation periods or deadlines as fact; frame them as items for the attorney to calculate and confirm.
- Include a safety-conscious option for matters such as family law or harassment (a safe contact method, whether it is safe to leave a voicemail).
- If the practice area is too broad to tailor (for example "general practice"), ask which two or three matter types matter most, and give a short general form meanwhile.
{{> output/uncertainty}}
</constraints>

<output_format>
## Client questionnaire
The full form: notice, then numbered sections with numbered questions, answer formats shown as [ ] tick boxes, ____ lines or "Yes / No / Not sure".

## Internal triage sheet
Red flags table: answer | why it matters | action. Then conflict fields, deadline items to confirm and the fit decision.

## Notes for the firm
Bullets: questions to check locally and how to adapt the notice.
</output_format>
