---
schema: 1
id: set-ground-rules-for-family-startup
kind: prompt
title: Set ground rules for a family business start
description: Drafts a family business charter for partners or relatives starting a business together - roles, pay, decision rights, money in and out, home and work boundaries, and what happens if someone leaves.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual]
requires: [none]
inputs: [text, notes]
output: [docs, questions, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [family-business, couples-in-business, family-charter, decision-rights, exit-terms, work-life-boundaries]
pairs_with:
  prompts: [outline-cofounder-agreement, find-cofounder, write-business-plan]
  personas: [small-business-advisor]
args:
  - name: people
    description: Who is involved and how they are related (for example "me and my wife; my brother as a silent investor"), what each brings (money, skills, time), their other jobs or caring duties.
    type: text
    required: true
  - name: business
    description: The business you are starting, its stage, how much money is going in and from whom, and whether you share a home or household finances.
    type: text
    required: true
  - name: worries
    description: Anything already causing tension or that you want settled (unequal hours, who has the final say, pay, a relative who wants a job, what happens if you split up).
    type: text
output_contract:
  format: markdown
  sections: [Conversations to have first, Family business charter, Decisions for a lawyer or accountant, Review routine]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help couples, siblings, parents and adult children, or other relatives who are starting a business together write down their ground rules before money and feelings get tangled. Family businesses rarely fail on the product; they strain on things nobody said out loud: one person working twice the hours for the same share, money lent by a parent with no terms ("was it a gift?"), decisions made at the dinner table, business talk taking over home life, a relative hired who cannot be managed, and no plan for divorce, illness, death or someone wanting out. A written charter, agreed while everyone is getting on, protects the relationships as much as the business. It is not a legal contract; the parts with legal or tax effect go to a lawyer and an accountant.
</context>

<task>
<people>
{{people}}
</people>

<business>
{{business}}
</business>
{{#worries}}

<worries>
{{worries}}
</worries>
{{/worries}}

1. Conversations to have first: five to eight questions each person answers separately before talking together (for example "how many hours a week do you expect to work in year one?", "what would make you want to stop?", "is the money you are putting in a loan, a gift or for a share?"), with notes on where their answers are most likely to differ.
2. Family business charter: a fill-in document with clear headings, prefilled where the inputs allow and [X] where they must agree:
   - Purpose and what success looks like for the family, not only the business.
   - Roles and titles: who owns which area, who reports to whom at work, regardless of family position.
   - Time: expected hours and how unequal effort is recognised.
   - Pay and drawings: when and how much each person is paid, and how it changes.
   - Money in: each contribution recorded as a loan (with repayment terms), investment for a share, or gift; personal guarantees.
   - Ownership: shares or split, and how they change.
   - Decision rights: what each person decides alone, what needs both or all, a spending limit, how deadlocks are broken (a time-out, a trusted outsider, a mediator).
   - Home and work: business-free times and places, a weekly business meeting instead of constant talk, holidays.
   - Hiring relatives: the same job description, pay and performance rules as anyone else.
   - Leaving and life events: someone wants to leave, a separation or divorce, long illness, death, a new partner joining - how shares are valued and bought out, notice, and keeping the relationship.
   - Disputes: steps from a direct conversation to mediation.
3. Decisions for a lawyer or accountant: which items need a formal agreement (shareholders or partnership agreement, loan agreements, wills and powers of attorney, prenuptial or separation implications, employment contracts for relatives, tax on drawings and family wages).
4. Review routine: when to revisit the charter (every six or 12 months, and at trigger events).
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not state legal or tax rules for their country; mark them as points for a lawyer or accountant and ask the country if it matters.
- Be even-handed between the people named; do not take sides in tensions described in the inputs.
- If the inputs mention control through threats, financial abuse or fear at home, step out of the template, respond with care, and point to local support services; do not draft terms that one person is pressured into.
- Do not invent people, amounts or shares; use [X].
</constraints>

<output_format>
## Conversations to have first
Numbered questions, then where answers may differ.

## Family business charter
The charter with the headings in step 2, each with two to five lines or fill-in fields.

## Decisions for a lawyer or accountant
Checklist with the professional for each.

## Review routine
Three bullets.
</output_format>
