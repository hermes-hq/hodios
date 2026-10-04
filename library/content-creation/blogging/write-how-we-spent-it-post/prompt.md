---
schema: 1
id: write-how-we-spent-it-post
kind: prompt
title: Write a how-we-spent-it post
description: Writes a plain-numbers transparency post for a nonprofit, club, school fund or crowdfunded project showing where the money went, what it achieved, what cost more and what is left.
category: blogging
version: 1.0.0
status: incubating
stage: [build, verify]
role: [writer, founder, manager]
subject: [nonprofit]
requires: [none]
inputs: [dataset, notes, text]
output: [article, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [financial-transparency, donor-trust, impact-reporting, accountability, community-funds]
pairs_with:
  prompts: [write-crowdfunding-backer-update]
args:
  - name: figures
    description: Money in (donations, grants, fees, in-kind gifts) and money out by item or category, from your own records or accounts, plus what was planned and any money left. Say whether the figures are checked or independently examined.
    type: text
    required: true
  - name: project
    description: The project or fund, its goal and dates, for example "2025 playground fund, Hill Street Primary PTA".
    type: string
    required: true
  - name: audience
    description: Who reads it - donors, members or the general public.
    type: enum
    enum: [donors, members, public]
    default: donors
  - name: outcomes
    description: Optional. What the money achieved, with numbers you can stand behind, and photos or quotes you have permission to use.
    type: text
output_contract:
  format: markdown
  sections: [Post, Figures table, Reconciliation check, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help community organisations report honestly on money people gave them. Trust grows when donors can see the totals add up, what the money bought, what went over budget and why, and what happens to anything left. Posts lose trust when they bury costs in vague categories, hide overheads or claim "100% goes to the cause" when it does not, round figures until they stop reconciling, or credit the money with outcomes it cannot prove.

Project: {{project}}. Readers: {{audience}}.
</context>

<task>
<figures>
{{figures}}
</figures>
{{#outcomes}}
<outcomes>
{{outcomes}}
</outcomes>
{{/outcomes}}

1. Reconcile first: money in minus money out equals money left. Show the arithmetic. If it does not balance, stop the post and list the gap under Questions instead of smoothing it.
2. Group spending into 4-7 categories a reader understands (equipment, venue, staff time, transport, fees, admin), keeping in-kind gifts separate from cash. Give each category an amount and a share of the total, with percentages that add to 100 after rounding.
3. Compare with the plan where one is given: what cost more or less and why, in one line each.
4. Write the post:
   - Opening: the total raised, from how many people or funders if known, and the headline result, in two sentences.
   - Where the money went: the table in words, simplest first.
   - What it achieved: only outcomes from the notes, with numbers; separate what happened from what you hope will follow.
   - What cost more than planned and what you would do differently.
   - Overheads and fees: named plainly with what they pay for.
   - What is left and what happens to it (next project, reserve, refund), and any money restricted by donors or funders.
   - Thanks, and where to ask questions or see full accounts.
5. Tone for {{audience}}: donors get thanks and specifics; members get decisions and next steps; the public gets context about the organisation.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given. Never invent amounts, numbers of donors, outcomes or quotes; mark gaps as [X].
- Keep figures exact; round only in the prose and show exact amounts in the table.
- Label the figures' status honestly: "from our own records", "approved by the committee" or "independently examined", as the notes say.
- Do not give tax, charity-law or grant-compliance advice; if restricted funds, Gift Aid or similar schemes, grant conditions or a deficit are involved, suggest the treasurer or an accountant checks before publishing.
- No spin words ("every penny", "100%") unless the figures prove them.
- If the figures are missing, ask for money in, money out by item and what is left, and stop.
</constraints>

<output_format>
## Post
Title and post, 400-700 words.

## Figures table
Table: category | amount | share of spending | planned (if given) | note.

## Reconciliation check
Money in, money out, money left, with the arithmetic and whether it balances.

## Questions
Gaps, mismatches and items for the treasurer.
</output_format>
