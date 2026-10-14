---
schema: 1
id: harmonise-terms-after-acquisition
kind: prompt
title: Harmonise employee terms after an acquisition
description: Plans how to align pay, benefits, leave and policies for staff joining through an acquisition or merger - a side-by-side gap map, what can change and how, cost, consultation and staff communication.
category: hr-operations
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, executive, founder]
advice_risk: [legal]
requires: [none]
inputs: [document, text]
output: [table, plan, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [mergers-and-acquisitions, terms-and-conditions, integration, employee-transfer, benefits-alignment]
pairs_with:
  prompts: [design-benefits-package, design-salary-bands, write-workplace-policy, write-employee-handbook]
  personas: [hr-business-partner]
args:
  - name: terms
    description: A side-by-side summary of the two groups' main terms - pay structure, bonus, pension or retirement plan, health cover, leave, notice, hours, sick pay, overtime, key policies - and headcount in each.
    type: text
    required: true
  - name: deal
    description: How the staff are joining (share purchase, asset or business transfer, merger), the countries involved, any unions or collective agreements, the integration timeline and the budget for harmonisation.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Gap map, Approach by term, Cost, Consultation and timeline, Communication, Questions for an employment lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan the harmonisation of employment terms after an acquisition the way an experienced HR integration lead does. Key points experts know: in many jurisdictions, employees who transfer with a business keep their existing contractual terms, and changing them because of the transfer can be restricted or unlawful for a period, so "just move everyone to our terms" is often not an option. Improvements are usually easier than reductions; reductions may need consent, consultation, or a genuine reason unrelated to the transfer. Running two sets of terms indefinitely creates pay equity problems, admin cost and resentment. Benefits such as pensions and insurance have their own rules and provider contracts. Staff notice what is lost far more than what is gained, so sequencing and honesty matter.

<terms>
{{terms}}
</terms>

<deal>
{{deal}}
</deal>
</context>

<task>
1. Assumptions: the transfer mechanism and countries, and which rules on changing transferred terms may apply, as points to confirm with a lawyer. Ask if the mechanism is unclear.
2. Gap map: each term side by side, which group is better off, whether the term is contractual or policy, and how many people are affected.
3. Approach by term: one of keep both for now, level up, align new joiners only, offer an optional switch with a clear comparison, or seek agreed change after consultation. Say why, and which ones carry legal risk.
4. Cost: the cost of each levelling-up decision from the user's numbers, with the working, against the budget. Mark gaps.
5. Consultation and timeline: who must be informed or consulted (unions, employee representatives), the sequence, and dependencies such as payroll, benefit provider renewals and system migration.
6. Communication: key messages for the acquired staff and the existing staff, what to say about what is not changing yet, and a Q&A outline.
7. Questions for an employment lawyer and a benefits or pensions adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never assume terms can be changed because of the acquisition; mark every reduction as needing legal advice.
- Do not invent the content of contracts, collective agreements or benefit plans; work only from what is supplied.
- Show the working for every cost.
- Do not recommend tactics that pressure staff to accept worse terms.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
## Gap map
Table: Term | Group A | Group B | Better for | Contractual? | People affected.
## Approach by term
Table: Term | Approach | Reason | Legal risk.
## Cost
## Consultation and timeline
## Communication
## Questions for an employment lawyer
Numbered, then questions for a benefits adviser.
</output_format>
