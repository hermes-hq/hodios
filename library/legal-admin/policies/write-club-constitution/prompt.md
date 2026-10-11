---
schema: 1
id: write-club-constitution
kind: prompt
title: Write a constitution for a club or association
description: Drafts a constitution or bylaws for a club, society, residents' group or small nonprofit - purpose, membership, committee, meetings and voting, money, amendments and dissolution.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [individual, founder]
subject: [law, nonprofit]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [constitution, bylaws, community-groups, governance, membership-rules, unincorporated-association]
pairs_with:
  prompts: [start-amateur-sports-club, run-residents-association-agm, write-agm-notice, write-safeguarding-policy]
args:
  - name: club
    description: What the group does and why, who can join, membership fees and classes (adult, junior, honorary), how many people run it, whether it has money, property, staff or a venue lease, and how decisions are made now.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or province.
    type: string
    required: true
  - name: goals
    description: What the constitution is for - opening a bank account, applying for grants, affiliating to a governing body, registering as a charity or nonprofit, or incorporating. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Key choices, Constitution, Adoption steps, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft the governing document for a voluntary group. Banks, grant funders, governing bodies and venue owners usually ask for one, and it is what settles disputes about who can vote, who controls the money, and what happens when the group winds up. The essentials: name; objects or purposes (written carefully, because they limit what the group can do and decide whether it can register as a charity or get tax relief); powers; membership (who can join, classes, applications, fees, resignation, and removal of a member only after giving them a chance to be heard); the committee or board (officers, how elected, terms, filling vacancies, co-opting, conflicts of interest, and removal); general meetings (an annual meeting, special meetings that members can call, notice, quorum, voting, proxies or online attendance, and minutes); finance (bank account, at least two signatories or approvers, financial year, accounts presented to members, independent examination or audit if required); amendments (a special majority at a general meeting); dissolution (paying debts and passing any remaining assets to a similar body, not sharing them among members where the group is a nonprofit or charity); and safeguarding if children or vulnerable adults take part. A crucial point often missed: in many countries an unincorporated association has no separate legal personality, so committee members can be personally liable for contracts, leases and debts; groups with staff, premises, significant money or risky activities should consider an incorporated form. Charity regulators and sports or community governing bodies often publish model constitutions that funders prefer or require.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Club:
<club>
{{club}}
</club>
{{#goals}}

Goals:
<goals>
{{goals}}
</goals>
{{/goals}}

1. Key choices: legal form (stay unincorporated or incorporate, with the liability trade-off), objects wording for any charity or nonprofit goal, membership classes and voting rights, committee size and terms, quorum levels, and online meetings, each with a recommendation.
2. Constitution: numbered clauses covering name, objects, powers, membership, fees, resignation and removal, committee and officers, committee meetings, general meetings, voting, finance, property and liability, conflicts of interest, safeguarding (if relevant), amendments, dissolution, and adoption. Use [BRACKETS] for numbers and names not supplied.
3. Adoption steps: how to adopt it at a founding or general meeting, what to record in the minutes, and what to do next (bank, funder, governing body, registration).
4. Points to confirm, including whether a regulator's or governing body's model document should be used instead.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state charity registration thresholds, incorporation rules or tax treatment as fact unless confident; mark "confirm for {{jurisdiction}}".
- Do not draft clauses that let a small group remove members or change the rules without notice and a vote.
- If the group plans to employ staff, lease premises, run high-risk activities or hold significant funds, say clearly that incorporation and insurance advice should be considered before signing contracts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Key choices
Table: choice | recommendation | why.

## Constitution
Numbered clauses with headings.

## Adoption steps
Numbered list.

## Points to confirm
Numbered list.
</output_format>
