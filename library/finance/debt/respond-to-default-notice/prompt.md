---
schema: 1
id: respond-to-default-notice
kind: prompt
title: Respond to a default notice from a lender
description: Explains a default notice, final demand or acceleration letter - the deadline, what happens next and your options - and drafts a reply to the lender before the account defaults or goes to court.
category: debt
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [document, text]
output: [explanation, message, checklist]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [default-notice, final-demand, arrears-letter, remedy-deadline, lender-reply]
pairs_with:
  prompts: [negotiate-with-creditor, respond-to-debt-court-claim, compare-debt-relief-options, handle-mortgage-arrears]
args:
  - name: letter
    description: The notice or letter, pasted as text, with account numbers and personal details masked. Include the date you received it.
    type: text
    required: true
  - name: situation
    description: Why the payments were missed, whether you can catch up and how much you could pay each month, and any other debts or letters you have.
    type: text
  - name: country
    description: Country (and state or region), because default notices, notice periods and what lenders can do next are set by local law.
    type: string
output_contract:
  format: markdown
  sections: [What this letter means, Your deadline, What happens if nothing changes, Your options, Reply to the lender, Do this now]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone who has received a formal warning from a lender after missed payments: a default notice, a notice of intended default, a final demand, a notice of acceleration (the whole balance becoming due), or a letter warning of repossession or legal action. In many countries a lender must send a formal notice before it can end the agreement, demand the full balance, register a default or start court action, and the notice usually gives a period to bring the account up to date. That window is the best time to act: catching up the arrears or agreeing a payment plan before the deadline can stop the default, while after it the account may be closed, passed to a collector, reported as defaulted for years, or taken to court. Secured debts (mortgages, car finance) carry the extra risk of losing the home or car, and in some places car finance has protections once a share of it has been paid. People often ignore these letters out of fear, pay more than they can afford to stop the threat and then fall behind on rent or energy, or do not realise free debt advice services can talk to the lender for them.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Letter:

<letter>
{{letter}}
</letter>
{{#situation}}

Situation:

<situation>
{{situation}}
</situation>
{{/situation}}

1. Explain what kind of letter this is, in plain words, using only what it says: the lender, the debt type, the arrears amount, any total balance demanded, and whether the debt is secured. Flag anything missing or unclear that they should ask about. If it is actually court papers, a claim form or a summons, say so first and that court deadlines are strict.
2. Find the deadline: the date to act by, counted from the dates in the letter. If the letter does not make it clear, say so and tell them to ask the lender in writing and to act as if the earliest plausible date applies.
3. Explain what may happen if nothing changes, as described in the letter and as typically happens in their country, marked as to confirm: default registered, account closed, full balance demanded, collector, court action, repossession for secured debts.
4. Set out the options in order of how well they protect the person: catch up the arrears in full before the deadline (only if affordable without missing priority bills), ask for a payment arrangement or a short hold while they get advice, get free non-profit debt advice to deal with the lender, or for secured debts specific options to check. For each, the catch.
5. Draft a reply to the lender with placeholders: the reference, that they have received the notice, their situation briefly, the offer or request (arrangement or a hold on further action for a stated period while they get debt advice), a request for a breakdown of the arrears and charges, and a request for written confirmation. Recommend sending it in a way that leaves a record.
6. Do this now: a short dated checklist starting with the deadline.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent notice periods, legal rights or protections. Mention specific laws or rules only if you are confident they apply to the country given, and tell them to confirm.
- Never suggest ignoring the letter, hiding assets, or moving a secured car or goods out of reach.
- Do not tell them to pay more than they can afford to stop the threat; priority bills (housing, energy, council or local tax) come first.
- If the debt is not recognised or the amount looks wrong, include a request for evidence of the debt and how the amount was calculated before any payment offer.
- Point to free, non-profit debt advice, and do not recommend paid debt management or settlement firms.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## What this letter means
Short explanation.

## Your deadline
The date and how it was worked out.

## What happens if nothing changes
Bullets.

## Your options
Table: option | when it fits | catch.

## Reply to the lender
A ready-to-send letter with placeholders.

## Do this now
Dated checklist.
</output_format>
