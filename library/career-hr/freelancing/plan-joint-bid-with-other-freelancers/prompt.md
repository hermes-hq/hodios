---
schema: 1
id: plan-joint-bid-with-other-freelancers
kind: prompt
title: Plan a joint bid with other freelancers
description: Plans teaming up with other freelancers to bid for a project too big for one, deciding lead or joint contracting, roles, money split, liability, client contact and what happens if someone drops out.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, consultant, designer, writer]
requires: [none]
inputs: [text, spec, preferences]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [teaming-agreement, collaboration, joint-proposal, revenue-split, prime-contractor]
pairs_with:
  prompts: [write-freelance-proposal, write-statement-of-work, brief-freelance-subcontractor]
  personas: [freelance-business-advisor]
args:
  - name: opportunity
    description: The project or tender, the client, the budget if known, the deadline for the bid and what the client asked for.
    type: text
    required: true
  - name: partners
    description: Who is teaming up (roles, not names needed), what each brings, how well you know each other, and who found the lead.
    type: text
    required: true
  - name: context
    description: Your country or countries of work, whether anyone has a company or insurance, and any worries already on the table. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Structure options, Roles and decisions, Money, Risk and liability, Client-facing plan, Teaming agreement checklist, Questions for a lawyer or accountant]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Freelancers team up to win work none of them could win alone: a site that needs design, development and copy, or a tender that asks for a team. These collaborations usually fail on things nobody wrote down before the bid: who signs the contract and therefore carries the liability and the late-paying client; whether one person is the prime contractor paying the others or the client contracts each one; how money is split when one partner's part grows and another's shrinks; who speaks to the client and who decides when partners disagree; what happens if someone falls ill or drops out mid-project; and who owns the shared work and may show it in a portfolio. A joint bid that settles these first reads as more credible to the client too, because it presents one point of contact and one plan.

<opportunity>
{{opportunity}}
</opportunity>
<partners>
{{partners}}
</partners>
{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}
</context>

<task>
1. Fit check: is teaming the right move, or would a single freelancer with a subcontractor be simpler? Note any warning signs in the opportunity or partners.
2. Compare structure options: one prime contractor with subcontractors, each partner contracting the client directly, or a temporary joint arrangement. For each, who carries the client contract, payment risk, insurance and admin.
3. Roles and decisions: client lead, project lead, who does what, how decisions and disagreements are settled, and a working rhythm.
4. Money: how to price the bid as one figure, how to split it (by scoped work, by day rate, with a fee for the lead's coordination and risk), payment flow and timing between partners, and what happens to the split if scope changes.
5. Risk and liability: late or non-payment by the client, a partner dropping out, quality disputes, overlap with partners' other clients, and insurance.
6. Client-facing plan: how the team is presented in the proposal, one contact point, and how partner roles are explained.
7. Teaming agreement checklist: the points to put in writing before the bid goes out, including ownership of work, portfolio use, confidentiality, non-solicitation of the client, and exit.
8. Questions for a lawyer or accountant in the relevant countries.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state legal, tax or employment-status rules as fact; mark them as points to confirm locally, especially across countries.
- Do not draft a binding contract; produce the checklist of terms to agree and have reviewed.
- Do not invent budget figures or rates; work with the numbers given and mark any example numbers as examples.
- Treat all partners fairly; if one asks for a structure that shifts all risk onto others, name it plainly.
</constraints>

<output_format>
## Fit check
## Structure options
Table: Option | Who signs | Payment risk | Admin | Best when.
## Roles and decisions
## Money
## Risk and liability
Table: Risk | Plan.
## Client-facing plan
## Teaming agreement checklist
Checkboxes.
## Questions for a lawyer or accountant
Numbered.
</output_format>
