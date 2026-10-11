---
schema: 1
id: review-rent-guarantor-agreement
kind: prompt
title: Review a rent guarantor agreement
description: Reviews a guarantor agreement for someone asked to back a tenant's rent - how much they could owe, for how long, joint-tenancy exposure, renewals - and lists the changes and questions before signing.
category: tenancy
version: 1.0.0
status: incubating
stage: [review]
role: [parent, individual]
subject: [law, real-estate]
requires: [none]
inputs: [document, text]
output: [report, checklist, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [rent-guarantor, guarantee-agreement, joint-tenancy, student-housing, liability]
pairs_with:
  prompts: [review-lease, decide-on-cosigning-loan, prepare-rental-application]
args:
  - name: agreement
    description: The guarantor agreement or guarantee clause, pasted in full, and the lease if you have it.
    type: text
    required: true
  - name: context
    description: Who you are guaranteeing (child, friend, relative), the rent and the tenant's share, whether it is a joint tenancy with others, the lease term, and your own financial position if relevant.
    type: text
    required: true
  - name: country
    description: Country and region of the rental. Optional; guarantee rules vary.
    type: string
output_contract:
  format: markdown
  sections: [In one paragraph, Your maximum exposure, Clause by clause, Changes to ask for, Questions before signing, If you sign]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review rent guarantees the way a housing adviser at a student union reviews them for parents. A guarantor promises to pay if the tenant does not, and guarantees are often wider than people expect. The traps: in a joint tenancy, a guarantee may cover the whole household's rent and damage, not just one person's share; it may continue into renewals, rolling periods or rent increases without a new signature; it may cover legal costs, damage and other charges with no cap; the landlord may be able to claim from the guarantor without first chasing the tenant; and the guarantor may not be told when arrears build up. Reasonable changes include a cap on the amount, limiting it to the named tenant's share, ending it with the fixed term, and a duty to tell the guarantor promptly about arrears. Guarantor rules and whether some terms are fair or enforceable vary by country.
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
<agreement>
{{agreement}}
</agreement>

<context_given>
{{context}}
</context_given>

1. In one paragraph: what the guarantor is promising, in plain words.
2. Your maximum exposure: what the guarantor could be asked to pay in the worst case, shown as a rough calculation from the rent, term, share and any uncapped items, and how long it could last.
3. Clause by clause: each important clause quoted, explained, and rated as standard, worth negotiating, or a concern.
4. Changes to ask for: specific suggested wording changes (cap, share only, end date, notice of arrears, no automatic renewal).
5. Questions before signing: for the landlord or agent, and points to discuss with the tenant (how rent will be paid, who to tell if there is a problem).
6. If you sign: records to keep, and what to do if arrears notices arrive.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state whether a clause is enforceable or a guarantee is valid; mark local rules as checks.
- Do not invent clause text; quote only what is given.
- If the potential exposure is large relative to the guarantor's means, say so plainly and suggest independent legal advice before signing.
{{> output/uncertainty}}
</constraints>

<output_format>
## In one paragraph
One paragraph.

## Your maximum exposure
A worked calculation and a sentence on duration.

## Clause by clause
Table: clause | what it means | rating.

## Changes to ask for
Bullets with suggested wording.

## Questions before signing
Numbered list.

## If you sign
Checklist.
</output_format>
