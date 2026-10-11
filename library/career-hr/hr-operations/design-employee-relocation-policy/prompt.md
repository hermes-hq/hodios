---
schema: 1
id: design-employee-relocation-policy
kind: prompt
title: Design an employee relocation policy
description: Designs a standing relocation policy for hires and transfers who move home for work, with tiers, allowances or lump sums, repayment terms, support services and the tax and payroll points to confirm.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design]
role: [operations-manager, executive, founder]
advice_risk: [legal, financial]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [relocation-policy, relocation-package, mobility, repayment-clause, moving-allowance]
pairs_with:
  prompts: [plan-international-assignment, design-benefits-package, write-workplace-policy, harmonise-terms-after-acquisition]
  personas: [hr-business-partner]
args:
  - name: need
    description: Who relocates and how often (new hires, internal transfers, graduates, senior hires), typical distances (same country, cross-border permanent moves), and the problems with how it is handled today.
    type: text
    required: true
  - name: constraints
    description: Countries involved, budget per move or per year if known, existing practice and providers, and how much admin HR can handle. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Scope, Tiers and benefits, Lump sum versus managed, Repayment terms, Process and roles, Tax and payroll points, Questions for advisers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design relocation policies the way an experienced global mobility lead does. What experts know: a standing policy with tiers by role level or move type stops each relocation turning into a fresh negotiation and makes offers faster and fairer; the core benefit types are pre-move visits, moving household goods, travel, temporary accommodation, help finding a home and school, a miscellaneous allowance, and for cross-border moves immigration and tax support; lump sums are simple and flexible for the employee but often taxable and can fall short for families, while managed (paid-directly) benefits cost more admin but give control and duty of care; a capped "core plus flex" design balances both; repayment clauses if the person leaves within a period (often one to two years, tapering) are common but must be clear, proportionate and lawful where they apply; and tax treatment of relocation costs differs widely, with some costs tax-exempt up to limits in some countries and fully taxable elsewhere, sometimes with gross-up. Permanent moves differ from temporary assignments, which need their own policy.

<need>
{{need}}
</need>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Scope: who the policy covers, what counts as a relocation (for example a minimum distance or commute change), what is out of scope (temporary assignments, commuter arrangements, remote moves at the employee's request).
2. Tiers and benefits: two to four tiers, each with the benefits included and caps written as [amount to set] unless the user gave figures, plus family-related support.
3. Lump sum versus managed: recommend an approach per tier, with the reasons and the trade-offs in cost, admin, tax and employee experience.
4. Repayment terms: the period, taper, triggers (resignation, dismissal for misconduct) and exclusions (redundancy, role withdrawn), with a note to confirm enforceability locally.
5. Process and roles: from offer or transfer approval to settled in, with who approves, who books, providers, expense rules and timelines.
6. Tax and payroll points: which benefits may be taxable, gross-up decisions, reporting, and immigration for cross-border moves, all as items to confirm.
7. Questions for tax, payroll and employment advisers.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state tax exemptions, limits or reporting rules as fact; mark them "confirm with a tax adviser".
- Use only amounts the user gives; otherwise leave placeholders for caps.
- Repayment terms must be proportionate; do not recommend clawing back costs from people dismissed for redundancy.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope
## Tiers and benefits
Table: Benefit | Tier 1 | Tier 2 | Tier 3.
## Lump sum versus managed
## Repayment terms
## Process and roles
Numbered steps with owner.
## Tax and payroll points
## Questions for advisers
Numbered.
</output_format>
