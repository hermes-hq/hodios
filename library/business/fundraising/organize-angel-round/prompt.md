---
schema: 1
id: organize-angel-round
kind: prompt
title: Organise an angel round with many small investors
description: Plans a party round from many angels - minimum cheque, allocation, one set of terms, rolling or single close, a pooled vehicle option and investor admin - so it stays fair and manageable.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive]
advice_risk: [legal, financial]
inputs: [notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [angel-investors, party-round, syndicate, allocation, investor-admin]
pairs_with:
  prompts: [choose-funding-instrument, build-investor-pipeline, plan-round-closing-checklist]
args:
  - name: round
    description: Target amount, instrument and terms if decided, how many angels you expect, cheque sizes, and anyone already committed.
    type: text
    required: true
  - name: country
    description: Where the company is incorporated and where the angels are. Rules on who may invest and how you may advertise a raise differ by country.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Round design, Allocation, Closing mechanics, Pooled vehicle option, Investor admin, Compliance points to check, Questions for your lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders run a round made of many angel cheques without a lead investor. These rounds are quick to start but easy to lose control of: twenty different side letters, a cap table with forty names that a future Series A investor dislikes, signatures chased for months, and investors who do not meet the legal criteria for the offer. The fixes are known: one set of terms for everyone, a sensible minimum cheque, a clear allocation rule when oversubscribed, a defined close process, sometimes a pooled vehicle that holds the angels as one line on the cap table, and a single admin process. Securities rules on who can invest and on public promotion of an investment vary widely by country and must be checked locally.
</context>

<task>
Plan this angel round.

<round>
{{round}}
</round>

Country: {{country}}

1. Round design: one instrument and one set of terms for all, the minimum cheque (with the trade-off between inclusiveness and admin load), the maximum number of investors you will accept, and the round's hard cap.
2. Allocation: a stated rule for oversubscription (for example priority to strategic angels, pro rata cuts, first come) and how to communicate it.
3. Closing mechanics: rolling closes versus a single close, with the trade-offs; a target timeline; how funds and signatures are collected; what happens to commitments that never fund.
4. Pooled vehicle option: what a nominee or special-purpose vehicle does, its costs and admin, when it is worth it, and that availability depends on the country.
5. Investor admin: a single data sheet per investor, the documents each signs, how updates will be sent, and who holds signing authority for future consents.
6. Compliance points to check: investor eligibility, rules on promoting the raise publicly, any tax relief schemes angels expect, filing requirements after issuing shares. Present these as questions to confirm locally, not as rules.
7. Questions for your lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state specific securities law thresholds, exemptions or tax relief conditions as fact; name the topic and tell the founder to confirm it for {{country}}.
- Do not recommend specific platforms, providers or law firms.
- Keep terms equal across angels; flag any requested side letters as a risk to discuss with the lawyer.
- Keep it practical and ordered so the founder can act on it this week.
</constraints>

<output_format>
## Round design
## Allocation
## Closing mechanics
## Pooled vehicle option
## Investor admin
Checklist.
## Compliance points to check
## Questions for your lawyer
</output_format>
