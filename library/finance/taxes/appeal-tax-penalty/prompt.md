---
schema: 1
id: appeal-tax-penalty
kind: prompt
title: Appeal a tax penalty
description: Checks whether a late-filing or late-payment penalty is correct and drafts a request to cancel or reduce it, using the reasonable-excuse grounds and evidence tax authorities accept.
category: taxes
version: 1.0.0
status: incubating
stage: [build]
role: [individual, founder]
requires: [none]
inputs: [text, document]
output: [message, checklist, explanation]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [tax-penalty, reasonable-excuse, appeal-letter, penalty-relief]
pairs_with:
  prompts: [explain-tax-notice, set-up-tax-debt-payment-plan, fix-tax-return-mistake]
  personas: [tax-educator]
args:
  - name: penalty
    description: What the penalty notice says - type of penalty, tax year, amount, the dates it gives, and the appeal deadline. Remove reference numbers.
    type: text
    required: true
  - name: reason
    description: What happened, with dates - why the return or payment was late, when the problem started and ended, when you filed or paid, and what evidence you have (medical letters, death certificate, system error screenshots, postal receipts).
    type: text
    required: true
  - name: country
    description: Country of the tax authority.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Is the penalty right, Grounds, Evidence, Draft appeal, Deadline and next steps, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone challenge a tax penalty honestly and effectively. First check whether the penalty is right at all: the return may have been filed on time, the dates may be wrong, the penalty may have been charged on the wrong year, or the amount may be miscalculated. If it is right, most authorities can cancel or reduce penalties for a reasonable excuse (sometimes called reasonable cause): an unexpected event outside the person's control that stopped them meeting the deadline despite taking care, such as serious illness or hospital stay, the death of a close relative, a fire, flood or disaster, failure of the authority's own systems, or a postal failure. Authorities generally also expect the person to have acted as soon as the problem ended. Grounds that usually do not succeed alone: not having the money, not knowing about the deadline, or relying on someone else to file. Some authorities have a first-time or good-compliance relief that does not need an excuse. Interest on late tax is usually not waived even when the penalty is, so paying the tax itself promptly limits costs. Appeals have short deadlines.

Country: {{country}}
</context>

<task>
The penalty:

<penalty>
{{penalty}}
</penalty>

What happened:

<reason>
{{reason}}
</reason>

1. Check whether the penalty is right: compare the dates and amounts with what the person says. List anything that suggests an error, which would be the first ground.
2. Assess the grounds: does the reason fit what the authority in {{country}} usually accepts as a reasonable excuse, or a first-time or good-history relief? Say how strong it looks and why, honestly, including weak points such as a long gap between the problem ending and filing.
3. List the evidence that supports the grounds, what to get if missing, and what not to send (excess personal medical detail beyond what is needed).
4. Draft the appeal: a factual letter or online message with the tax year, penalty, the grounds, a clear timeline with dates, when the problem ended and how quickly the person acted, the evidence enclosed, and what is requested (cancel or reduce). Use placeholders for reference numbers.
5. Deadline and next steps: the appeal deadline from the notice, paying the underlying tax now to limit interest, a payment plan if the tax cannot be paid, and what happens if the appeal is refused (review, tribunal or further appeal, marked "verify").
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent or exaggerate facts, dates or evidence. If the person asks to make up an excuse, decline and explain the risk of a false statement to a tax authority.
- Never invent penalty rules, reliefs or deadlines; mark country-specific points "verify".
- Be honest about weak grounds; suggest asking anyway if there is a genuine basis, and suggest a tax adviser or free tax help service for larger penalties.
- Do not use reference numbers or identity numbers; use placeholders.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is the penalty right
Bullets: what matches and what may be wrong.

## Grounds
Short assessment with strength (strong, possible, weak) and why.

## Evidence
Checklist: have, get, do not send.

## Draft appeal
The full letter or message with placeholders.

## Deadline and next steps
Numbered steps.

## Points to verify
Bullets with where to check each.
</output_format>
