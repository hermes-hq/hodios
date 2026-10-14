---
schema: 1
id: claim-scam-reimbursement-from-bank
kind: prompt
title: Claim scam reimbursement from your bank
description: Drafts a claim to your bank or payment provider for money lost to a scam or an unauthorised payment, with the timeline, the reimbursement rules to check and the complaint escalation route.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [operate, ship]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [message, checklist, plan]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [scam-victim, bank-transfer-fraud, unauthorised-payment, reimbursement, financial-complaint]
pairs_with:
  prompts: [dispute-card-charge, respond-to-identity-theft, complain-to-ombudsman, protect-relative-from-scams]
args:
  - name: what_happened
    description: How it happened, in order - the contact (call, text, website, fake invoice), what you were told, each payment with date, amount, method and recipient, when you realised, and what you told the bank.
    type: text
    required: true
  - name: bank_reply
    description: What the bank or payment provider has said so far, if anything - a refusal, a partial refund, a request for information. Optional.
    type: text
  - name: country
    description: Country. Reimbursement rules for scams and unauthorised payments differ widely. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Do now, Which situation this is, Claim letter, Evidence pack, If the bank refuses, Watch for recovery scams]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a scam victim ask their bank or payment provider to reimburse them. Banks and regulators often treat two situations differently. An unauthorised payment (someone else made it, or the customer's card or login was used without consent) commonly carries a strong right to a refund unless the customer acted fraudulently or with gross negligence. An authorised push payment scam (the customer was tricked into sending the money themselves) depends far more on local rules: some countries have mandatory or voluntary reimbursement schemes with limits and deadlines, others leave it to the bank's discretion and complaint processes. Banks also have duties in many places to spot unusual payments and warn customers, and a complaint can examine whether they did. The outcome often turns on the details: how the scam worked, what warnings were shown, whether the payments were out of character, and how quickly the customer reported it. Victims are often targeted again by "recovery" scammers.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
What happened:

<events>
{{what_happened}}
</events>
{{#bank_reply}}

The bank's reply so far:
<bank_reply>
{{bank_reply}}
</bank_reply>
{{/bank_reply}}

1. Do now: if not yet done, call the bank's fraud line using the number on the card or official app, ask them to try to recall the payments from the receiving bank, change passwords and secure devices, report to the police or national fraud reporting service and get a reference, and stop any further payments to the scammer. Keep it short.
2. Which situation this is: say whether each payment looks unauthorised or authorised-but-deceived, from the facts, and what that means for the claim in general terms. Name local reimbursement schemes or rules only as possibilities to verify.
3. Draft the claim letter or in-app complaint: account and reference as [BRACKETS]; a dated timeline of the scam and each payment; when and how it was reported; why the person believed it was genuine (the tactics used, spoofed numbers, cloned websites); whether any warnings were shown and what they said; why the payments were out of character for the account; the amount claimed; a request for the bank's reasoning in writing if it refuses; and a request for a final response so the complaint can be escalated.
4. Evidence pack: messages, call logs, screenshots, emails, bank statements, police reference, and notes of every call with the bank.
5. If the bank refuses: the formal complaint stage, then the financial ombudsman or regulator route, with time limits marked "verify". If the person paid by card, mention the chargeback route.
6. Watch for recovery scams: anyone promising to get the money back for a fee, posing as police, a regulator or a lawyer, is very likely another scam.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not promise reimbursement or name a scheme as applying without marking it "verify". Do not invent scheme names, limits or deadlines.
- Do not blame the person. Scams are designed by professionals to fool careful people. Keep the letter factual and free of self-blame such as "I was stupid".
- Do not invent warnings, dates or amounts; use [BRACKETS].
- Never suggest contacting the scammer, paying anyone to recover funds, or giving remote access to devices.
- If the person is in distress or in financial hardship as a result, point to free debt or victim support services, and if they mention thoughts of self-harm, urge them to contact a crisis line or emergency services now.
{{> output/uncertainty}}
</constraints>

<output_format>
## Do now
Numbered steps, up to 6.

## Which situation this is
Bullets per payment.

## Claim letter
Complete letter with [BRACKETS].

## Evidence pack
Checklist.

## If the bank refuses
Ordered steps, marked verify.

## Watch for recovery scams
Two or three lines.
</output_format>
