---
schema: 1
id: write-gift-acceptance-policy
kind: prompt
title: Write a gift acceptance policy
description: Drafts a nonprofit gift acceptance policy covering gifts to accept, refuse or refer, donor due diligence, conditions, in-kind and unusual gifts and who decides, plus a decision checklist.
category: nonprofit
version: 1.0.0
status: incubating
stage: [build]
role: [executive, operations-manager]
requires: [none]
inputs: [text, notes]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [nonprofit]
tags: [gift-acceptance, donor-due-diligence, ethical-fundraising, in-kind-gifts, governance]
pairs_with:
  prompts: [write-reserves-policy, plan-legacy-giving-programme]
  personas: [nonprofit-advisor]
args:
  - name: organisation
    description: Purpose, who the organisation serves, size, main income sources, country and legal form, and any values or exclusions already agreed (for example no gifts from tobacco or gambling companies).
    type: text
    required: true
  - name: situations
    description: Gifts that have caused or could cause difficulty, for example a donor under investigation, an offer of shares or property, a gift tied to naming rights, used goods nobody needs, or a gift with conditions on services. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Draft policy, Decision checklist, Worked cases, Questions for the board]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a nonprofit decide in advance which gifts it will take. Without a policy, the decision gets made under pressure when a large cheque arrives, often by the person who most wants it. Experienced fundraising directors know the hard cases: a gift whose source harms the people the organisation serves, a donor who wants to influence who gets services or who is hired, property or shares that cost more to hold than they are worth, in-kind donations that create disposal costs, and anonymous gifts that may hide a problem. They also know that refusing a gift is itself a decision with costs, so the test is whether accepting would damage the organisation's purpose or reputation more than the money helps, decided by people without a conflict and recorded.

Organisation: {{organisation}}
{{#situations}}Situations to cover: {{situations}}{{/situations}}
</context>

<task>
1. State three to five principles drawn from the organisation's purpose and values.
2. Draft the policy: scope; gifts accepted routinely; gifts that need referral and to whom (with thresholds); gifts declined; due diligence steps proportionate to size and risk (public information checks, source of funds questions for large or unusual gifts, sanctions and fraud red flags); conditions the organisation will and will not accept (naming, influence over services, staff or beneficiaries, publicity); in-kind gifts, property, shares and cryptocurrency (accept only if they can be valued, held and sold without disproportionate cost); anonymous gifts; returning a gift accepted in error; conflicts of interest in the decision; record-keeping; review date.
3. Write a one-page decision checklist a fundraiser can use when an unusual gift arrives.
4. Apply the policy to each situation the user gave, or to three typical cases if none, saying accept, accept with conditions, refer or decline, and why.
5. List decisions only the board can make, such as thresholds and named exclusions.
</task>

<constraints>
- Do not name real companies, people or sectors as unacceptable unless the user does; offer categories for the board to decide.
- Anti-money-laundering, sanctions, tax receipt and regulator rules differ by country. Say to check them with the regulator's guidance and an adviser, without stating specific legal thresholds as fact.
- Do not present due diligence as an investigation of private individuals; keep it proportionate and based on public or donor-supplied information.
- Keep the policy short enough for staff to use: aim for two pages plus the checklist.
</constraints>

<output_format>
## Principles
## Draft policy
Numbered clauses.
## Decision checklist
Yes/no questions with what to do on each answer.
## Worked cases
Table: Gift | Decision | Reason.
## Questions for the board
</output_format>
