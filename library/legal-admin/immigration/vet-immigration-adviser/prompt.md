---
schema: 1
id: vet-immigration-adviser
kind: prompt
title: Vet an immigration adviser
description: Checks an immigration adviser, lawyer or agent before hiring, with the register to verify, scam warning signs, questions for the first meeting and what a fair engagement letter covers.
category: immigration
version: 1.0.0
status: incubating
stage: [discover, review]
role: [individual, job-seeker, student, parent]
subject: [law]
requires: [none]
inputs: [text, message]
output: [checklist, questions, explanation]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [adviser-vetting, visa-scams, regulated-advisers, engagement-letter, consumer-protection]
pairs_with:
  prompts: [find-free-legal-help, compare-visa-routes, respond-to-visa-refusal]
args:
  - name: adviser
    description: What you know about the adviser or agent, such as their claimed title, firm, country, how they contacted you, what they promise, and their fees and payment method. Paste their message if you have one.
    type: text
    required: true
  - name: country
    description: The country whose immigration system you need help with, and where you live.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Who can lawfully give immigration advice, How to verify this adviser, Warning signs in what you shared, Questions for the first meeting, What the engagement letter should cover, If something is wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Immigration is a magnet for fraud because people are anxious, far from home and facing deadlines. Many countries restrict who may give immigration advice for payment (registered or licensed advisers, migration agents, consultants, or lawyers with a practising certificate) and keep public registers. Scam signs repeat across countries: guaranteed approval, "special contacts" in the embassy, a job offer or sponsorship for a fee, pressure to pay quickly in cash, crypto or gift cards, asking you to sign blank forms or let them keep your passport, advising you to lie, and refusing to give a written agreement. Legitimate advisers explain your options and risks, put fees and scope in writing, and keep you informed. Free help often exists from legal aid, law clinics and migrant support organisations.

Country: {{country}}

<adviser>
{{adviser}}
</adviser>
</context>

<task>
1. Who can lawfully give immigration advice for this country, in general terms (for example registered advisers, licensed consultants, lawyers), marked "typical, confirm with the official regulator". Name the regulator only if you are confident of it and tell the user to find its official site through the government's own pages.
2. How to verify this adviser: what to look up on the official register (name, registration number, level of authorisation, any sanctions), and how to check the firm independently of the contact details they gave.
3. Warning signs in what the user shared: list each sign you see, quoted, and why it matters. If several serious signs appear, say clearly to stop and not pay.
4. Questions for the first meeting: about registration, experience with this route, who will do the work, total fees and what they cover, refunds, timelines, communication, and what happens if the application is refused.
5. What the engagement letter should cover: scope, fees and payment schedule, who is responsible for what, complaints process, and confidentiality.
6. If something is wrong: steps if they have already paid or shared documents (stop payment if possible, ask for documents back, report to the regulator and police or consumer protection, keep records), and where free help is commonly available (to check locally).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not vouch for or accuse a named person or firm; describe what the evidence suggests and how to verify.
- Do not invent regulators, register names or URLs; if unsure, describe how to find the official one.
- Never suggest using an unregulated agent to get around rules.
{{> output/uncertainty}}
</constraints>

<output_format>
## Who can lawfully give immigration advice
## How to verify this adviser
## Warning signs in what you shared
Table: What they said or did | Why it matters | Severity.
## Questions for the first meeting
## What the engagement letter should cover
## If something is wrong
</output_format>
