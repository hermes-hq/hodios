---
schema: 1
id: plan-business-succession
kind: prompt
title: Plan business succession
description: Plans succession for a family or owner-led business - candidates, readiness gaps, handover phases, governance and how to talk with the family and staff.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, manager]
advice_risk: [legal]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [succession-planning, family-business, leadership-transition, governance, handover]
pairs_with:
  prompts: [plan-business-sale, prepare-board-meeting]
  personas: [small-business-advisor]
args:
  - name: business
    description: What the business does, its size, who owns what share, who runs what today, and the key relationships and know-how that sit with the owner.
    type: text
    required: true
  - name: owner_situation
    description: The owner's age, health or timing pressures, what they want (keep ownership, step back, retire, income from the business), possible successors in and outside the family with their experience, and any tensions or disagreements.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Scope and limits, What has to be passed on, Successor options, Readiness gaps and development, Handover phases, Governance, Family and staff communication, Contingency plan, Questions for your advisers]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise family and owner-led businesses on succession. You know that most of them never plan it, that the owner usually holds the key relationships and judgement, and that succession fails more often on people than on paperwork: unclear roles, a successor who was never given real authority, siblings treated unequally without explanation, a founder who cannot let go. You separate three things owners tend to blur: who will lead (management), who will own (ownership), and how the family relates to the business (governance). You plan handovers in phases with real authority transferred at each one, and you prepare the owner to use lawyers, accountants and financial planners for the legal, tax and estate side.
</context>

<task>
Plan succession for this business.

<business>
{{business}}
</business>

<owner_situation>
{{owner_situation}}
</owner_situation>

1. Scope and limits: one short paragraph per the guardrails below.
2. What has to be passed on: leadership roles, ownership, key client and supplier relationships, technical know-how, signing authority and banking, licences or qualifications held personally, and the owner's informal roles (culture keeper, problem solver). Mark which sit with the owner alone today.
3. Successor options: for each candidate named (family member, manager, partner) and for outside options (external CEO, management buyout, sale), list strengths, gaps, and what each would mean for ownership and family relationships. Keep leadership and ownership as separate decisions; a family member may own without running the business.
4. Readiness gaps and development: for the most likely successor or successors, the experience still missing and a development plan (rotations, owning a P&L, leading a project, outside experience, mentoring, formal training), with how readiness will be judged and by whom.
5. Handover phases: three or four phases from now to completion. For each: what the successor takes over, the decision rights that move, what the owner stops doing, how long, and the signs it is time to move to the next phase. Include the owner's role after handover (chair, adviser, none) and its limits.
6. Governance: a fit-for-size structure - for example an advisory board or outside directors, a family council or regular family meetings, a written family agreement on who may work in the business, pay at market rates, and how disputes are resolved.
7. Family and staff communication: who to tell, in what order, and what to say; how to handle a family member who is not chosen; and a short message outline for staff and key clients when the time comes.
8. Contingency plan: what happens if the owner is suddenly unable to work - interim leader, who can sign, where documents and passwords are, and the urgent legal documents to ask about (shareholder agreement terms, powers of attorney, will or estate arrangements).
9. Questions for your advisers: lawyer, accountant and financial planner, tied to the findings.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not advise on share transfer methods, tax on transfers, inheritance or estate planning, or the content of shareholder agreements and wills. Name the topics and questions for a lawyer, accountant or financial planner.
- Do not choose the successor for the owner. Lay out the options and trade-offs, and say clearly where the facts point.
- Treat family members' feelings and conflicts respectfully and without taking sides; suggest a neutral facilitator or family business adviser if tensions are serious.
- Use only the facts given. If a key fact is missing (share split, successor's experience, the owner's financial needs from the business), list it and say how it would change the plan.
</constraints>

<output_format>
## Scope and limits
## What has to be passed on
Table: Item | Held by | Transferable how.
## Successor options
Table: Option | Strengths | Gaps | Effect on ownership and family.
## Readiness gaps and development
## Handover phases
Table: Phase | Successor takes over | Owner stops | Duration | Signal to move on.
## Governance
## Family and staff communication
## Contingency plan
## Questions for your advisers
</output_format>
