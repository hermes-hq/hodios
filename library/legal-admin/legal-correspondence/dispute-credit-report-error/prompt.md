---
schema: 1
id: dispute-credit-report-error
kind: prompt
title: Dispute a credit report error
description: Drafts a dispute of an error on a credit report to the credit bureau and the lender that reported it, with an evidence list, a tracking log and follow-up steps if the error is not fixed.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual]
subject: [law]
requires: [none]
inputs: [text, document]
output: [message, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [credit-report, credit-bureau, identity-theft, consumer-rights]
pairs_with:
  prompts: [respond-to-debt-collector, request-my-personal-data]
args:
  - name: error
    description: What is wrong on the report - which bureau, the account or entry, what it shows and what it should show (for example a late payment that was on time, an account that is not yours, a debt shown as unpaid that was settled).
    type: text
    required: true
  - name: evidence
    description: What proof you have - bank statements, payment confirmations, settlement letters, a police or identity theft report, letters from the lender. Optional; the prompt lists what to gather.
    type: text
  - name: country
    description: Country (and state if relevant) whose credit bureaus hold the record, for example "USA", "UK" or "Germany". Optional, but the process differs by country.
    type: string
output_contract:
  format: markdown
  sections: [The error, Who to write to, Bureau dispute letter, Lender dispute letter, Evidence pack, Tracking log, If it is not fixed]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people get mistakes removed from their credit files. Errors on credit reports affect loans, rent applications and sometimes jobs, and they do not fix themselves. A dispute succeeds when it is specific (which entry, what is wrong, what it should say), backed by evidence, sent to the right parties (usually both the credit bureau and the organisation that reported the data), and followed up on a schedule. Most countries give people a right to have inaccurate data about them corrected, and many set a time for bureaus to investigate; the details and names differ by country.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
The error:

<error>
{{error}}
</error>
{{#evidence}}

Evidence held:

<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Restate the error precisely: bureau, creditor or furnisher, account (last four digits only), the entry as reported, and the correction requested. Classify it: wrong personal details, account not mine, possible identity theft, wrong status or balance, wrong late payment, duplicate account, outdated negative item, or a mixed file with someone else's data. If the details are too vague to dispute, ask for what is missing.
2. Say who to write to and why: the bureau that shows the error, the lender or furnisher that reported it, and the other bureaus if the same error likely appears there. Recommend getting a current copy of the report from each bureau through the official free route in the country, marked "to verify".
3. If identity theft is possible, put first: report it through the official route in the country, consider a fraud alert or credit freeze where available, and check for other unfamiliar accounts.
4. Draft the bureau dispute letter: the person's identifying details as [BRACKETS], the specific entry, why it is inaccurate, the correction requested, the enclosed evidence, and a request for written results and an updated report. Keep it to one page and factual.
5. Draft a shorter letter to the lender or furnisher asking them to correct what they report to all bureaus.
6. List the evidence pack: what they hold, what to gather, and what to redact (full account numbers, unrelated transactions).
7. Build a tracking log template and a follow-up timeline. Mention that bureaus commonly have a set period to investigate (in the US, generally around 30 days) as "to verify for your country".
8. Explain next steps if the error is not corrected: re-dispute with new evidence, ask the bureau to add a short statement to the file where that is allowed, escalate to the financial or data protection regulator or ombudsman for the country (as "to verify"), and when to get advice.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Dispute only what is inaccurate or cannot be verified. Do not draft disputes of accurate negative information as if they were errors, and say so if that is what the facts show; suggest a goodwill request to the lender instead.
- Do not invent laws, regulator names or deadlines. Name a law or body only if you are confident it applies to the stated country, and mark it "to verify".
- Warn against paid credit-repair services that promise to remove accurate information.
- Advise sending by a method that proves delivery or using the bureau's official online dispute with screenshots, and keeping copies.
{{> output/uncertainty}}
</constraints>

<output_format>
## The error
Three to five lines: entry, what is wrong, correction requested, type of error.

## Who to write to
Bullets.

## Bureau dispute letter
Complete letter with [BRACKETS].

## Lender dispute letter
Complete short letter with [BRACKETS].

## Evidence pack
Table: item | proves | have it or get it.

## Tracking log
Table template: date | sent to | method | reference | response due | outcome.

## If it is not fixed
Numbered next steps.
</output_format>
