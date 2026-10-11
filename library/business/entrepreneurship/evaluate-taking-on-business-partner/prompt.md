---
schema: 1
id: evaluate-taking-on-business-partner
kind: prompt
title: Evaluate taking on a business partner
description: Evaluates bringing a partner or investor into your running small business - what they bring, what share is fair, control, exit terms and alternatives that keep full ownership.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [review, plan]
role: [founder]
advice_risk: [legal, financial]
requires: [none]
inputs: [text]
output: [report, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [equity-partner, buy-in, partnership-terms, valuation, shareholder-agreement]
pairs_with:
  prompts: [outline-cofounder-agreement, decide-bootstrap-or-raise, evaluate-buying-a-business, reference-check-investor]
  personas: [small-business-advisor]
args:
  - name: business
    description: Your business - what it does, years trading, revenue and profit, assets, debts, your role and hours, and the current ownership.
    type: text
    required: true
  - name: proposal
    description: Who the prospective partner is (in general terms), what they offer (money, skills, time, customers, premises), what they ask for (share, title, salary, control), and why you are considering it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What you need and what they bring, Value of the contribution, Control and roles, Exit and dispute terms, Alternatives, Due diligence on the partner, Verdict and next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help owners of established small businesses decide whether to take in a partner. Owners often agree a share on a handshake based on how much money the partner brings, without valuing the business first, without agreeing who decides what, and without terms for what happens if the partner stops contributing, wants out, falls out with the owner, divorces or dies. A partner is a long-term relationship that is hard and costly to undo. Good evaluations start from what the business actually needs, value what each side contributes (cash, sweat, assets, customers) against a reasoned value of the business, set control and roles explicitly, and compare with alternatives such as a loan, hiring a manager, a profit share, or a joint venture on one project.

<business>
{{business}}
</business>

<proposal>
{{proposal}}
</proposal>
</context>

<task>
1. What you need and what they bring: the business's real gap (capital, skills, time, customers, succession) and whether the partner fills it. Separate one-off contributions (cash) from ongoing ones (work, relationships).
2. Value of the contribution: explain how small businesses are commonly valued (profit-based multiples, asset value, what a buyer would pay) and give a rough range only if the figures allow, marked as an estimate needing a professional valuation. Show what share the partner's cash would buy at that range, and how to value contributed work separately (for example vesting over time).
3. Control and roles: voting, who decides day to day, reserved decisions needing both, salaries versus profit share, and how work commitments are measured.
4. Exit and dispute terms to agree in writing: vesting or earn-in, what happens if the partner leaves early or stops working, buy-sell terms and how the price is set, death, illness or divorce, non-compete within reason, deadlock resolution.
5. Alternatives: a loan, a profit share or bonus, hiring, a joint venture or partnership on one project, a minority stake with limited rights. Compare with the proposal.
6. Due diligence on the partner: references, track record, credit and litigation checks where appropriate, how they handle disagreement, and a trial collaboration before signing.
7. Verdict and next steps: proceed on proposed terms, proceed with changes, try an alternative first, or decline.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state a valuation as fact. Show the method and the range only with the owner's figures, and recommend a professional valuation and an accountant.
- Recommend a lawyer to draft the shareholder or partnership agreement; do not present terms as legally sufficient.
- Do not invent the partner's background; ask what is unknown.
- Point out tax and personal liability questions (for example in general partnerships) as checks for the owner's country.
</constraints>

<output_format>
## What you need and what they bring
## Value of the contribution
## Control and roles
## Exit and dispute terms
Checklist.
## Alternatives
Table: Option | What you keep | What you give | Fit.
## Due diligence on the partner
## Verdict and next steps
</output_format>
