---
schema: 1
id: check-old-debt-time-limit
kind: prompt
title: Check an old debt's time limit
description: Helps someone chased for an old debt understand whether a legal time limit on collecting it may apply, what can restart the clock, what to avoid saying or paying, and what to verify with free advice.
category: debt
version: 1.0.0
status: incubating
stage: [discover]
role: [individual]
requires: [none]
inputs: [text, document]
output: [explanation, checklist, message]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [statute-of-limitations, old-debts, time-barred, collections]
pairs_with:
  prompts: [respond-to-debt-collector, dispute-credit-report-error, prepare-for-debt-advice-appointment]
args:
  - name: debt
    description: What the debt is, the original creditor, who is chasing it now, roughly when you last paid or wrote to them acknowledging it, whether there was ever a court judgment, and what the latest letter says.
    type: text
    required: true
  - name: location
    description: Country and state or region where you lived when you took the debt and where you live now. Time limits are set locally.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Short answer, How time limits usually work, Dates that matter here, Do not do yet, What to verify, Draft letter]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people understand old debts that collectors are chasing. Many places set a time limit after which a creditor can no longer take court action to collect an ordinary debt, often counted from the last payment or the last written acknowledgment, but the length, the starting point and the effect differ widely by country and state. In some places a small payment or a written admission restarts the clock; in others it does not. A court judgment usually has different, often longer, rules. A debt past the limit may still exist and may still be chased by letter, and how long it stays on a credit file follows separate rules again. Debt buyers sometimes chase debts that are past the limit, hoping for a payment. Free debt advice services and legal aid can confirm the rules for the person's place.

Location: {{location}}
</context>

<task>
Debt:

<debt>
{{debt}}
</debt>

1. Give a short answer: whether a time limit could plausibly be relevant on the dates given, framed as "may", and that it must be confirmed locally.
2. Explain in plain words how such time limits usually work, the difference between the debt existing and being enforceable through court, and what typically restarts or pauses the clock. Mention the limit for {{location}} only if you are confident, and mark it to verify.
3. Lay out the dates that matter from the details given: last payment, last written acknowledgment, any judgment, and the gaps in the information.
4. List what not to do until it is checked: do not make a "good faith" payment, do not admit the debt in writing or on a recorded call, do not ignore court papers (a time limit is often a defence that has to be raised in court).
5. List what to verify and where: the exact limit and start point with a free debt advice service or legal aid, credit file entries, and whether the collector can show it owns the debt.
6. Draft a short, neutral letter asking the collector for proof of the debt, the date of the last payment and their right to collect, without admitting the debt.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state as fact that a debt is time-barred; the person must confirm locally.
- Do not invent limitation periods; if unsure of the local period, say so.
- If court papers or a judgment are mentioned, say to get free advice urgently and to respond by the deadline.
- Do not encourage lying about dates or payments.
</constraints>

<output_format>
## Short answer
## How time limits usually work
## Dates that matter here
Table: Event | Date | Source | Unknown?
## Do not do yet
## What to verify
## Draft letter
With placeholders.
</output_format>
