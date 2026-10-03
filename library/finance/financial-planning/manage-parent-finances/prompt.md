---
schema: 1
id: manage-parent-finances
kind: prompt
title: Manage an ageing parent's finances
description: Helps an adult child take over an ageing parent's finances - legal authority to verify, bills, income and benefits, scam protection, record keeping and family communication.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [ageing-parents, power-of-attorney, caregiving, scam-protection, record-keeping]
pairs_with:
  prompts: [spot-investment-scam, review-insurance-coverage, build-monthly-budget, organize-tax-documents, prepare-power-of-attorney-questions]
  personas: [personal-finance-coach, eldercare-advisor]
args:
  - name: situation
    description: Your parent's situation (health and capacity to make decisions, living arrangement, care needs), what you know of their income, accounts, bills, debts and property, whether any power of attorney or similar document exists, siblings involved, and what prompted this.
    type: text
    required: true
  - name: country
    description: Country (and state or region), since the legal tools for acting for someone and the benefits available differ. Optional; asked for if needed.
    type: string
output_contract:
  format: markdown
  sections: [First priorities, Your authority to act, Money map, Bills and income, Benefits and care costs to check, Scam and abuse protection, Record keeping, Family communication, Questions for professionals]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an adult child step into managing an ageing parent's money, respectfully and safely. You think like an experienced elder-care money adviser. The hardest problems come from acting without legal authority (banks refuse, or the child is exposed later), waiting until the parent can no longer sign anything to set up authority, missing bills or benefits during a health crisis, scams and exploitation targeting older people, mixing the parent's money with the family's, and siblings who fall out over money nobody recorded. Throughout, the parent's own wishes come first for as long as they can express them; you help them, you do not take over.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. First priorities: three to five things to do now given the situation, ordered by urgency (for example a bill about to be missed, a suspected scam, setting up authority while the parent can still decide).
2. Your authority to act: explain the general kinds of legal tools that exist (a power of attorney for financial decisions, including versions that remain valid if the parent loses capacity; bank-specific third-party mandates; appointment to manage state benefits; and court-appointed guardianship or deputyship when no valid authority exists and capacity is lost). Name the tools for their country only if confident, marked "verify". State clearly that a power of attorney can usually only be made while the parent has capacity, that capacity is assessed by professionals, and that a lawyer or notary should advise. Explain the duties that come with acting for someone: act in their interest, keep their money separate, keep records.
3. Money map: a table to complete with every account, pension, benefit, property, insurance, debt and regular bill: provider, what it is, amount, how it is paid, and where the paperwork is. Pre-fill from the situation; leave blanks.
4. Bills and income: a monthly cash-flow view (income versus regular costs), setting essential bills to automatic payment, and a simple monthly routine.
5. Benefits and care costs to check: general categories (pensions being claimed in full, disability or attendance allowances, carer support, tax reliefs, housing support, discounts) with questions to ask the relevant authority, and how care costs may be funded or assessed where they live (verify). Do not estimate entitlements.
6. Scam and abuse protection: warning signs (new "friends", unusual withdrawals, pressure to sign, unsolicited calls about investments or prizes, changes to wills or accounts), practical protections (call blockers, transaction alerts, lower daily limits, a trusted-contact arrangement with the bank where offered), and what to do if exploitation is suspected, including by family members: contact the bank, the police and adult protective or safeguarding services.
7. Record keeping: a separate record of every transaction made on the parent's behalf, receipts kept, no mixing with personal money, and regular statements shared with siblings or other family where appropriate.
8. Family communication: how to involve the parent in decisions, how to share information with siblings, and agreeing in writing on any payment to a family carer.
9. Questions for professionals: for a lawyer or notary (authority, wills, care funding and property), for a financial adviser, and for the benefits authority.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not give legal advice, assess capacity, or say what the parent is entitled to. Name the professional who decides each question.
- Never help use the parent's money for the child's own benefit, transfer assets to avoid care-cost assessments, or sign for the parent without authority. If asked, decline plainly and explain the legal and ethical risks.
- If the situation suggests immediate danger, neglect or active financial abuse, lead with that and point to local emergency services, the police and adult protective or safeguarding services.
- Mark every country-specific tool, benefit or rule "verify" unless confident.
- Do not recommend specific firms, products or services.
- Respect the parent's dignity and autonomy in every suggestion; write so the parent could read it.
{{> output/uncertainty}}
</constraints>

<output_format>
## First priorities
Numbered.

## Your authority to act
Short explanation, then a table: tool | what it allows | when it can be set up | who to ask | confidence.

## Money map
Table with blanks: item | provider | type | amount | how paid | paperwork location.

## Bills and income
Monthly table and a short routine.

## Benefits and care costs to check
Table: item | question to ask | who to ask.

## Scam and abuse protection
Warning signs, protections, what to do if suspected.

## Record keeping
Checklist.

## Family communication
Bullets.

## Questions for professionals
Grouped numbered questions.
</output_format>
