---
schema: 1
id: write-complaint-letter
kind: prompt
title: Write a complaint or demand letter
description: Writes a firm, factual complaint or demand letter with a dated timeline, the evidence held, the specific remedy wanted, a response deadline and the next step if it is ignored.
category: legal-correspondence
version: 1.1.0
status: incubating
stage: [build, ship]
role: [individual, founder]
subject: [law]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [demand-letter, consumer-rights, refund, escalation]
pairs_with:
  prompts: [prepare-small-claims-case, explain-legal-letter]
args:
  - name: facts
    description: What happened, in order, with dates, amounts, order or account references, who you dealt with, what was promised, what you have already tried, and what evidence you hold (receipts, emails, photos).
    type: text
    required: true
  - name: recipient
    description: Who the letter is to - a company, landlord, tradesperson, employer or other party - and the department or person if known.
    type: string
    required: true
  - name: remedy
    description: What you want - refund, repair, replacement, payment owed, return of deposit, an apology, compensation - with the amount if there is one.
    type: text
    required: true
  - name: tone
    description: How firm the letter should be - first-complaint (firm, cooperative, leaves room to fix it) or final-demand (formal letter before further action).
    type: enum
    enum: [first-complaint, final-demand]
    default: first-complaint
output_contract:
  format: markdown
  sections: [Letter, Before you send, If they do not respond]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Added address and date blocks, and the payment-dispute route for card, direct debit and payment-service purchases."}
---
<context>
You write complaint and demand letters that get results because they are easy to act on: the facts in date order, the evidence named, a specific remedy, a reasonable deadline, and a calm statement of what happens next. Angry, long or vague letters get routed to a queue; precise ones get a decision. A letter like this can also become evidence later (in a regulator complaint, an ombudsman case or small claims), so it must be accurate, unexaggerated and free of threats the writer cannot or should not carry out.

Recipient: {{recipient}}
Tone: {{tone}}
</context>

<task>
Facts:

<facts>
{{facts}}
</facts>

Remedy wanted:

<remedy>
{{remedy}}
</remedy>

1. Build a dated timeline from the facts. If dates or amounts are missing or inconsistent, use [BRACKETS] and list them under "Before you send".
2. Write the letter:
   - Sender and recipient address blocks and the letter date, as [BRACKETS] where not given.
   - Subject line with the reference number and a short description ("Complaint: order [123], faulty washing machine, request for refund").
   - Opening: who you are in relation to the recipient and what the letter is about, in two sentences.
   - Facts: short numbered paragraphs in date order, factual and specific.
   - Evidence: the documents you hold, listed and referred to as enclosed.
   - Basis: why the remedy is due, by reference to what was promised, the contract or terms, or the fact that the item or service was not as agreed. Refer to legal rights only in general terms ("my rights as a consumer") unless the person cites a specific law.
   - Remedy: exactly what you want and by when, with amount and how to pay or perform it.
   - Deadline: 14 days for a first complaint, 7 to 14 days for a final demand, unless the facts suggest otherwise, as a calendar date where possible.
   - Next step: for a first complaint, escalation in general terms (a formal complaint process, the relevant ombudsman or regulator); for a final demand, that the sender may start a claim without further notice.
3. Write a short pre-send checklist and an escalation plan if there is no satisfactory reply. If the person paid by card, direct debit or a payment service, include asking their card issuer, bank or the payment service about a chargeback or payment dispute (and, for ongoing charges after cancellation, stopping the payment), noting that these routes have their own time limits to check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given. Do not invent dates, conversations, laws, statute names, regulator names or amounts; use [BRACKETS] where something is missing.
- No insults, sarcasm, threats of public shaming, threats of criminal reports to extract payment, or claims for amounts not supported by the facts. These can weaken the person's position or create legal risk for them.
- Keep the letter to one page where possible.
- Do not predict the outcome of a claim. If the amount is large, the matter involves employment, housing, personal injury or discrimination, or a limitation deadline may be close, recommend getting legal advice (a lawyer, legal aid, or a consumer or tenant advice service) before sending a final demand.
- Advise sending by a method that proves delivery and keeping a copy.
{{> output/uncertainty}}
</constraints>

<output_format>
## Letter
The complete letter, ready to adapt, with [BRACKETS] for anything missing.

## Before you send
Checklist: missing details, enclosures, delivery method, copy kept, deadline date on the calendar.

## If they do not respond
Three to five bullets: escalation steps in general terms and what to check locally.
</output_format>
