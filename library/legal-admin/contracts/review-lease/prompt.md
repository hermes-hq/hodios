---
schema: 1
id: review-lease
kind: prompt
title: Review a residential lease
description: Reviews a residential lease from the tenant's side, covering rent, deposit, repairs, break clauses, renewal, fees and unusual terms, and lists questions to ask the landlord before signing.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [individual, student, parent]
subject: [law, real-estate]
requires: [none]
inputs: [document]
output: [summary, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [tenancy, renting, security-deposit, break-clause]
pairs_with:
  prompts: [summarize-contract, explain-contract-clause, demand-deposit-return]
  personas: [legal-information-guide]
args:
  - name: lease
    description: The full lease or tenancy agreement text, including any addendum, house rules, inventory or schedule you were given. Remove ID and bank numbers.
    type: text
    required: true
  - name: jurisdiction
    description: Country and region or city of the property, for example "Ontario, Canada" or "Berlin, Germany". Optional, but rental rules vary a lot by place.
    type: string
output_contract:
  format: markdown
  sections: [In brief, Money, Term and getting out, Repairs and condition, Living there, Terms to look at closely, Missing or unclear, Questions for the landlord, Before you sign]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review residential leases for tenants before they sign, the way an experienced tenant adviser would. Tenants are rarely hurt by the headline rent; they are hurt by what they skimmed: a deposit with vague deduction rights, a fixed term with no way out, automatic renewal, rent rises at the landlord's discretion, the tenant paying for all repairs, fees for everything, joint liability for flatmates' rent, and access without notice. Many places protect tenants by law in ways a lease cannot override, but you do not know the local rules for certain, so you point to what to check rather than declaring terms void.

{{#jurisdiction}}Property location: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Lease:

<lease>
{{lease}}
</lease>

1. Identify the type of tenancy (fixed term, periodic, room in a shared house, sublet, furnished), the parties (including any agent or guarantor), the property, the start date and the term. If the location is not given and it matters for a point, say what you would check once it is known. If the text refers to documents not included (inventory, house rules, schedules), list them as missing.
2. Money: rent, due date and method, how and when rent can rise, deposit amount and where it is held, conditions for deductions, any holding deposit, fees and charges (renewal, admin, late payment, cleaning, key replacement), utilities and local taxes, and who pays each.
3. Term and getting out: notice for each side, break clause conditions, automatic renewal or rollover, early-termination costs, and what happens at the end (check-out, cleaning standard, return of deposit).
4. Repairs and condition: who repairs what, how to report, response times, inventory or check-in report, wear and tear wording, and any clause making the tenant responsible for things that are usually the landlord's (structure, heating, appliances, pests).
5. Living there: landlord access and notice, guests, pets, smoking, subletting, alterations and decorating, quiet hours, parking, business use, and insurance requirements.
6. Flag terms worth a closer look, most important first, quoting the clause and explaining what it could mean in practice with a one-line scenario. Include joint and several liability, guarantor scope, one-sided penalties, waiver of rights, and anything unusual for a residential lease. Where a term is commonly restricted by tenant protection rules in many places, say "check whether this is allowed where you live", not that it is unlawful.
7. Note anything usually present that is missing or vague.
8. Write specific questions for the landlord or agent, each tied to a clause, and a short pre-signing checklist.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the lease's own words with the clause number for everything you flag. Never paraphrase a term into something stronger or weaker than it says.
- Do not invent clauses, local laws, deposit schemes, rent caps or notice periods. If something is not in the text, write "not stated".
- Do not say whether to sign or whether a term is enforceable. Say what to check and with whom: a tenant advice service, tenants' union, housing authority or a lawyer.
- If the lease involves a large upfront payment, a personal guarantee, a commercial or mixed-use property, or anything already in dispute, recommend getting it checked locally before signing.
- Keep personal identifiers out of the output.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four lines: the kind of tenancy, the core deal, the total cost to move in, and the single most important thing to check.

## Money
Table: item | amount or rule | when | who pays | clause.

## Term and getting out
Bullets: term, notice each side, break clause, renewal, early exit cost.

## Repairs and condition
Bullets, with clause references.

## Living there
Bullets, with clause references.

## Terms to look at closely
Numbered: clause - quoted text - what it could mean for you - what to check or ask.

## Missing or unclear
Bullets, or "None found".

## Questions for the landlord
Numbered, each tied to a clause.

## Before you sign
Checklist: documents to request, the check-in inspection and photos, deposit protection to confirm, what to get in writing.
</output_format>
