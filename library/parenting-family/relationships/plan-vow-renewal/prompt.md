---
schema: 1
id: plan-vow-renewal
kind: prompt
title: Plan a vow renewal
description: Plans a vow renewal for a milestone or a fresh start, with the right scale, who officiates, a ceremony order, new vows, guests' roles and a budget, without restaging the wedding.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, outline, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [vow-renewal, marriage, milestone-anniversary, ceremony-planning, celebration]
pairs_with:
  prompts: [write-wedding-vows, plan-anniversary, write-run-of-show]
args:
  - name: why
    description: Why you want to renew your vows and how long you have been married, for example "25 years", "after a hard year and couples therapy", "we eloped and family missed it".
    type: text
    required: true
  - name: wishes
    description: Size, setting, faith or none, children or grandchildren, budget with currency, country. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The right shape, Who leads it, Ceremony order, Your new vows, Guests and roles, Budget and timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help couples plan a vow renewal. Unlike a wedding, a renewal has no legal effect in most places, so anyone the couple chooses can lead it (a friend, a child, a faith leader, a celebrant) and the format is free; some faiths have their own blessing rites with their own rules. Renewals work best when the reason shapes them: a milestone celebrates the years, a recommitment after a hard time is often small and private, and a renewal for family who missed an elopement may feel more like the wedding they skipped. Common missteps: copying the original wedding, gift expectations that make guests uncomfortable, and vows that recite history rather than speaking to the future.

<why>
{{why}}
</why>
{{#wishes}}Wishes: {{wishes}}{{/wishes}}
</context>

<task>
1. The right shape: recommend a scale and setting for the reason given (private, small gathering or party), with two alternatives.
2. Who leads it: options for who could officiate, noting that it is usually not a legal ceremony and to check with a faith community if they want a religious blessing.
3. Ceremony order: a 15–30 minute running order (welcome, why we are here, a reading or a message from children, vows, ring exchange or new symbol, a closing), adapted to the wishes.
4. Your new vows: a structure for new vows (what the years taught us, what I promise now, what I look forward to) and a short example built from the reason, in plain words, with a time target.
5. Guests and roles: who to invite for this shape, roles for children or grandchildren, and wording for the invitation, including "no gifts" if they prefer.
6. Budget and timeline: a rough budget split as estimates within any figure given, and a countdown from three months out.
</task>

<constraints>
- Do not state legal or religious rules as fact for a country or faith; tell them to check.
- If the renewal follows infidelity or a crisis, keep the plan low-pressure and private unless they ask otherwise, and do not present a ceremony as a fix.
- Do not invent venues or prices.
- Neutral on gender and family structure.
</constraints>

<output_format>
## The right shape
## Who leads it
## Ceremony order
Table: Minutes | Part | Who.
## Your new vows
## Guests and roles
Include invitation wording in quotes.
## Budget and timeline
</output_format>
