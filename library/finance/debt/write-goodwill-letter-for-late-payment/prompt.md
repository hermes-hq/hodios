---
schema: 1
id: write-goodwill-letter-for-late-payment
kind: prompt
title: Write a goodwill letter for a late payment
description: Writes a goodwill letter asking a lender to remove or amend an accurate late payment on your credit file, with the reason, your record since and a specific request, plus honest odds.
category: debt
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [text]
output: [message, explanation, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [credit-file, late-payment-marker, goodwill-adjustment, mortgage-ready]
pairs_with:
  prompts: [dispute-credit-report-error, read-credit-report, improve-credit-score]
  personas: [personal-finance-coach]
args:
  - name: late_payment
    description: The account and lender (no full account numbers), the month or months shown as late and how late, why it happened, how quickly you paid, and your payment record before and since.
    type: text
    required: true
  - name: goal
    description: Why it matters now, for example a mortgage application, a rental check or a job that runs credit checks. Optional.
    type: string
  - name: country
    description: Country of the credit file, because reporting rules and what lenders can change differ.
    type: string
output_contract:
  format: markdown
  sections: [Is this the right route, Letter, Where and how to send it, If they say no]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people ask a lender, as a courtesy, to remove or soften an accurate late payment on their credit file. This is different from a dispute: a dispute is for information that is wrong, while a goodwill request admits the payment was late and asks for discretion. Lenders are not obliged to agree, and many have policies of reporting accurately and refusing; others agree occasionally, especially for a single late payment with an otherwise clean record, a clear one-off cause (hospital stay, bereavement, a bank or autopay error, a move), quick repayment once noticed, and a long-standing relationship. Letters work better when they are short, own the mistake without excuses, explain the one-off cause, show the record since, name the exact entry and the change requested (remove the late marker, or report it as paid on time), and are addressed to a team that can decide (often customer relations, a credit reporting team or a complaints or executive office) rather than front-line chat. Some lenders, when they cannot remove an accurate marker, may agree to add a note, or the person can add their own explanatory note to the file where the country allows it. Paying a credit-repair company for this is unnecessary.

<late_payment>
{{late_payment}}
</late_payment>
{{#goal}}

Why now: {{goal}}
{{/goal}}
{{#country}}

Country: {{country}}
{{/country}}
</context>

<task>
1. Is this the right route: confirm the payment was genuinely late. If anything suggests the record is wrong (paid on time, lender error, identity theft), say a dispute is the right route instead. Give honest odds in words (unlikely, possible, reasonable chance) with the reasons, based on how many late payments, how late, the cause and the record since.
2. Write the letter: a subject line naming the account (last four digits as a placeholder) and "goodwill request"; one or two sentences on the relationship; the late payment named by month; the cause in one or two plain sentences without exaggeration; what was done to fix it and prevent repeats (autopay, alerts); the record since; the specific request; why it matters now if relevant; thanks. Keep it under about 250 words.
3. Explain where and how to send it: which team to address, sending by post or secure message with a copy kept, a follow-up after a few weeks, and checking the credit report after any agreement.
4. Plan for a no: politely asking once more with a different team or after more on-time months, adding a notice of correction or explanatory statement where the country allows it, and how the impact of a single late payment usually fades with time.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not exaggerate or invent a hardship, medical event or bereavement; use only the cause the person gives.
- Do not frame an accurate late payment as an error or threaten complaints to pressure the lender.
- Do not promise removal or state how a specific lender will respond.
- Do not state country-specific rules on how long markers stay or what lenders may change as fact; mark them "check for your country".
</constraints>

<output_format>
## Is this the right route
## Letter
Complete letter with [BRACKETS] for personal details.
## Where and how to send it
## If they say no
</output_format>
