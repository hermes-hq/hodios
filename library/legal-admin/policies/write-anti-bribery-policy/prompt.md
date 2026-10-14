---
schema: 1
id: write-anti-bribery-policy
kind: prompt
title: Write an anti-bribery policy
description: Drafts an anti-bribery and corruption policy sized to a business's real exposure, with gifts and hospitality limits, third-party checks, facilitation payments, a register and red flags.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, executive, operations-manager, legal-professional]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [anti-bribery, anti-corruption, gifts-and-hospitality, third-party-due-diligence, facilitation-payments]
pairs_with:
  prompts: [write-conflict-of-interest-policy, write-whistleblowing-policy, set-up-gifts-and-hospitality-register]
  personas: [compliance-officer]
args:
  - name: business
    description: What the business does, size, the countries it sells in, buys from or operates in, and where it meets officials (licences, customs, inspections, public tenders, state-owned customers).
    type: text
    required: true
  - name: third_parties
    description: Agents, distributors, resellers, customs brokers, consultants or joint-venture partners who act for the business, and how they are paid. Optional.
    type: text
  - name: jurisdiction
    description: Where the company is incorporated and listed, and any law it has been told applies (for example "UK company with a US parent").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Risk assessment, Policy, Gifts and hospitality register, Third-party checks, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most bribery exposure for a small or mid-sized business does not come from staff handing over envelopes. It comes from third parties paid on commission or "success fees", customs and licensing touchpoints where a small payment speeds things up, lavish hospitality for a buyer at a state-owned customer, and donations or sponsorships requested by an official. Anti-bribery laws differ in reach and in defences: some reach conduct abroad by companies with a link to the country, some make a company liable for failing to prevent bribery by people acting for it unless it had adequate or reasonable procedures, and they disagree on small facilitation payments (allowed with conditions under some laws, banned under others). A credible policy is proportionate to a written risk assessment, names an owner, and is backed by a register, due diligence on intermediaries, contract clauses and training. A policy that bans all gifts outright is usually ignored; one with clear thresholds, approvals and a register is used.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Business:
<business>
{{business}}
</business>
{{#third_parties}}

Third parties:
<third_parties>
{{third_parties}}
</third_parties>
{{/third_parties}}

1. Risk assessment: list where bribery risk arises for this business (countries, officials met, sectors, intermediaries, tenders, donations), rate each, and say which controls each needs.
2. Draft the policy in plain language:
   - Commitment from leadership and scope (staff, directors, and anyone acting on the business's behalf).
   - What bribery is, with examples from this business's own risk points, offering and receiving, and that "everyone does it here" is not a defence.
   - Facilitation payments: a clear position (recommend prohibiting them and say why), with the one exception for payments under duress where safety is at risk and how to record and report those.
   - Gifts and hospitality: what is acceptable, value thresholds as [AMOUNT] placeholders with a suggested basis, approvals, never for officials without approval, never cash or cash equivalents, never during a tender.
   - Charitable donations, sponsorships and political contributions.
   - Third parties: due diligence before appointment, contract clauses, commission red flags, monitoring.
   - Books and records, raising concerns (link to the speak-up route), consequences, training and review.
3. Gifts and hospitality register: the columns to keep and two example rows.
4. Third-party checks: a proportionate due-diligence checklist by risk tier and a list of red flags (unusual commission, requests to pay to another country or a personal account, links to officials, refusal to sign clauses).
5. Points to confirm: which laws likely apply and their key differences, marked to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never draft wording that permits disguised payments, routes payments through intermediaries to avoid scrutiny, or helps conceal a past payment; if asked, decline and suggest speaking to a lawyer about disclosure.
- Do not state monetary thresholds as legal limits; they are internal policy choices shown as [AMOUNT] with the reasoning.
- Do not cite sections, penalties or defences as fact unless the user supplied them; describe them and mark "confirm for [jurisdiction]".
- Keep it proportionate: a 15-person domestic firm gets a short policy; a firm using agents in high-risk markets gets more due diligence.
{{> output/uncertainty}}
</constraints>

<output_format>
## Risk assessment
Table: risk point | example | rating | control.

## Policy
The full policy with headings.

## Gifts and hospitality register
Table with column headings and two example rows.

## Third-party checks
Checklist by risk tier, then red flags.

## Points to confirm
Numbered.
</output_format>
