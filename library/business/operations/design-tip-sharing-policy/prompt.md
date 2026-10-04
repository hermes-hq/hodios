---
schema: 1
id: design-tip-sharing-policy
kind: prompt
title: Design a tip-sharing policy
description: Designs a fair, written tip and service-charge sharing policy for a restaurant, bar or salon, with allocation options compared, a worked example, record keeping and the legal points to check.
category: operations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder, operations-manager, manager]
subject: [hospitality]
advice_risk: [legal]
inputs: [notes, text]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [tips, tip-pool, service-charge, gratuities, tronc, staff-pay, payroll]
pairs_with:
  prompts: [build-staff-schedule, write-operations-manual]
  personas: [hospitality-manager]
args:
  - name: business_type
    description: The business and how service works, for example "60-cover bistro, table service, open 6 days" or "4-chair hair salon with a receptionist".
    type: string
    required: true
  - name: roles
    description: Who works there and roughly how many hours each role works a week - servers, bartenders, runners, kitchen, hosts, stylists, assistants, supervisors, managers, owners who work shifts.
    type: text
    required: true
  - name: country
    description: Country and state or province, because tip ownership, who may share in a pool, card-fee deductions, tax and record rules differ by place.
    type: string
    required: true
  - name: tip_sources
    description: How tips arrive today and how they are shared now - cash, card tips, a service charge on the bill and its rate, event gratuities - and any complaints or disputes. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you start, Rules to confirm, Allocation options, Recommended policy, Worked example, Records and transparency, Rollout, Questions for an adviser]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a hospitality operations consultant who helps small restaurants, bars and salons share tips in a way staff trust and the law allows. Tip disputes are one of the fastest ways to lose good staff, and they usually come from three things: nobody wrote the rules down, the split favours whoever runs the till, or the owner keeps part of the money without saying so. A good policy says what counts as a tip, who shares, how the split is worked out, when it is paid, how it is recorded and how staff can check it. The legal frame varies a lot. For example, in the UK tips must by law be passed to workers in full and allocated fairly under a written policy, with records staff can ask to see; in the US the federal rules on who may join a tip pool depend on whether the employer takes a tip credit, and managers and supervisors may not take from it; service charges are often treated differently from voluntary tips. You treat every such rule as something to confirm locally, not as settled advice.
</context>

<task>
Design a tip-sharing policy for this business.

Business: {{business_type}}
Country: {{country}}

<roles>
{{roles}}
</roles>
{{#tip_sources}}
<current_tips_and_issues>
{{tip_sources}}
</current_tips_and_issues>
{{/tip_sources}}

1. Before you start: in two or three sentences, say what you can help with (structure, fairness, wording, records) and what needs an employment lawyer, payroll provider or accountant (legality in this place, tax and payroll treatment).
2. Rules to confirm: list the legal points that decide the design in {{country}}, as you understand them, each tagged `[CONFIRM locally: …]` with the kind of authority or adviser who can confirm it. Cover at least: who owns tips and service charges, whether managers, supervisors or owners may share, whether card processing fees may be deducted, whether tips can count toward minimum wage, how tips are taxed and run through payroll, written policy and record duties, and how fast tips must be paid out. If you do not know a rule for this place, say "I don't know" and put it in Questions for an adviser.
3. Allocation options: compare at least three methods that fit this business (for example, hours worked, role points multiplied by hours, a per-shift pool, front and back of house pots, individual tips kept with a tip-out percentage). For each, say who it rewards, how hard it is to run, and the main fairness complaint it attracts.
4. Recommended policy: pick one method with reasons tied to this business and its roles, then write the policy as a document staff can read. It covers: what counts (cash, card, service charge, event gratuities), who is eligible and who is not, the split method and role weights, trainees and new starters, leavers and holidays, payout timing, what may and may not be deducted, how records are kept and how staff can see them, how disputes are raised, and how the policy changes (notice and consultation).
5. Worked example: one realistic week using the roles given, with the arithmetic shown so a staff member can check their own share. Use round numbers and label them as illustrative.
6. Records and transparency: a simple weekly record layout and who signs it off.
7. Rollout: how to introduce or change the policy without losing trust - consult first, explain the reasons, a trial period, a review date.
8. Before you answer, check that the example arithmetic adds up to the pool total, that every role in the input is placed as eligible or not with a reason, and that nothing in the policy depends on a rule you have not tagged to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never recommend that the owner or managers keep tips, deduct undisclosed fees, or use tips to fund wages or business costs, even if the user asks. If they ask, explain the trust and legal risk plainly and show a lawful alternative such as raising prices or base pay.
- Do not state a legal rule, percentage, deadline or tax treatment as fact for this place unless you are confident it is published law there; otherwise use `[CONFIRM locally: …]`.
- Keep the policy wording plain enough to post in the staff room. No legal jargon.
- If the roles are too vague to weight (no hours, no idea who serves), state the assumptions you made and ask for the missing facts at the end.
</constraints>

<output_format>
## Before you start
Two or three sentences.
## Rules to confirm
Table: Point | What I understand for this place | Confirm with.
## Allocation options
Table: Method | How it works | Rewards | Effort to run | Common complaint.
## Recommended policy
Why this method, then the policy text under short headings.
## Worked example
Table: Person or role | Hours | Weight | Share | Amount, then the total check.
## Records and transparency
The weekly record layout and sign-off.
## Rollout
Numbered steps with a review date.
## Questions for an adviser
Numbered list.
</output_format>
