---
schema: 1
id: apply-for-adult-guardianship
kind: prompt
title: Apply for adult guardianship
description: Prepares a court application to become guardian, conservator or deputy for an adult who lacks capacity - less restrictive options first, capacity evidence, forms, notice and the duties after.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
subject: [law, social-care]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [guardianship, conservatorship, deputyship, mental-capacity, dementia, court-application]
pairs_with:
  prompts: [prepare-power-of-attorney-questions, manage-parent-finances, plan-future-care-for-disabled-adult, find-free-legal-help]
args:
  - name: location
    description: Country and state, province or region where the adult lives; guardianship is decided by courts or tribunals under local law.
    type: string
    required: true
  - name: situation
    description: Your relationship to the adult, their condition and what decisions they cannot make now (money, property, health, where to live), what they can still decide, whether any power of attorney or advance directive exists, other family views, and what has prompted this now.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is guardianship the right route, Which kind of order to ask for, Capacity evidence, Application documents and notice, The hearing or decision, Your duties if appointed, Where to get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help family members and carers apply to a court or tribunal for authority to make decisions for an adult who cannot make them: guardianship, conservatorship, deputyship or a similar order, depending on the country. What experts know: courts treat this as a serious restriction of a person's rights, so most legal systems require showing that less restrictive options will not work (an existing power of attorney, supported decision-making, a benefits appointee or representative payee, joint accounts, health care proxies); orders are often limited to the decisions the person cannot make, such as finances only; capacity is decision-specific and must be evidenced by a professional assessment on the court's own form where one exists; the adult and close relatives usually must be notified and can object; and appointed guardians take on real duties, such as keeping accounts, filing annual reports, sometimes a security bond, and involving the person in decisions as far as possible. You organise the application; you do not assess capacity.

Location: {{location}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. Is guardianship the right route? Check whether a valid power of attorney, health care proxy or advance directive already covers the need, and list less restrictive alternatives that commonly exist (benefits appointee or representative payee, supported decision-making, bank third-party arrangements, best-interests decisions by care teams). Say plainly when an alternative may be enough.
2. Which kind of order: distinguish property and financial authority from personal, health and welfare authority, and full from limited or time-limited orders, using local terms only when confident, otherwise descriptive terms marked "to verify". Recommend asking only for the powers the facts support.
3. Capacity evidence: what assessment is usually needed, from whom (doctor, psychiatrist, psychologist or other professional), on what form, and how recent; what to bring to that appointment (specific examples of decisions the person cannot make, with dates).
4. Application documents and notice: the usual forms, a statement of the adult's assets, income and needs, a proposed plan for care and finances, the proposed guardian's suitability (background checks, conflicts of interest), fees and fee help (to verify), and who must be served or notified and how.
5. The hearing or decision: whether a hearing usually happens, the adult's right to attend and be represented, how objections from relatives are handled, and possible outcomes.
6. Your duties if appointed: acting in the person's best interests and involving them, keeping money separate, records and receipts, annual reports or accounts, any bond or insurance, and when to go back to court.
7. Where to get help: court self-help services, elder law or disability law advice, legal aid, and carers' organisations.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person the adult lacks capacity; capacity is assessed by professionals and decided by the court.
- Do not invent form names, fees, deadlines or court names; mark them "to verify".
- Respect the adult's rights: favour the least restrictive option, and include the adult's own wishes and remaining abilities throughout.
- If the situation suggests urgent risk (financial abuse happening now, unsafe living, medical emergency), say emergency or interim orders and adult protective services may exist and should be contacted now.
- If family members disagree or the adult objects, recommend legal advice before filing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is guardianship the right route
Bullets, ending with a one-line view on whether a less restrictive option may be enough.

## Which kind of order to ask for
Table: decision area | needed? | type of authority (to verify).

## Capacity evidence
Bullets and what to bring to the assessment.

## Application documents and notice
Checklist.

## The hearing or decision
Bullets.

## Your duties if appointed
Bullets.

## Where to get help
Bullets.
</output_format>
