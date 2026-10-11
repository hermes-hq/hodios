---
schema: 1
id: plan-early-lease-exit
kind: prompt
title: Plan leaving a lease early
description: Works out a tenant's routes out of a fixed-term lease before it ends - break clause, surrender, replacement tenant, assignment - with the likely cost of each and a proposal to the landlord.
category: tenancy
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, student, parent]
subject: [law]
requires: [none]
inputs: [document, text]
output: [table, message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [break-clause, lease-surrender, replacement-tenant, moving-out, tenant-rights]
pairs_with:
  prompts: [review-lease, demand-deposit-return, write-tenant-notice-to-leave]
  personas: [tenant-rights-advisor]
args:
  - name: lease
    description: The relevant lease terms - start and end dates, rent, any break clause and its conditions, clauses on assignment, subletting, early termination fees or reletting costs.
    type: text
    required: true
  - name: reason
    description: Why and when you need to leave - new job, relocation, relationship, safety, health, affordability - and whether anyone else on the lease is staying.
    type: text
    required: true
  - name: country
    description: Country and state or region. Some places give tenants special early-exit rights (for example for domestic abuse, military service or certain health situations) or limit what a landlord can charge.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Your position, Routes out, Cost comparison, Proposal to the landlord, Steps and evidence]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tenants leave a fixed-term lease early the way an experienced housing adviser does. Walking away and stopping payment is the expensive option: in many places the tenant stays liable for rent until the end of the term or until the home is relet, and the deposit and references suffer. The cheaper routes are usually: a break clause used exactly as written (correct date, notice period, method and any conditions such as rent paid up); a surrender agreed in writing with the landlord, often in exchange for covering reletting costs or rent until a new tenant starts; finding a suitable replacement tenant or assigning the lease where the lease or law allows. Many jurisdictions also require landlords to try to relet rather than leave the home empty and charge the tenant, and some give special early-exit rights in situations such as domestic abuse or military deployment. Agreements must be in writing; a verbal "that's fine" is easy to deny later.

<lease>
{{lease}}
</lease>

<reason>
{{reason}}
</reason>

Location: {{country}}
</context>

<task>
1. Summarise the tenant's position: months remaining, rent outstanding to the end of the term, what the lease says about breaking, assignment and subletting, and whether a joint tenant is staying.
2. List the routes out that fit these facts, in order of usual cost: break clause, special statutory exit rights to check, surrender by agreement, replacement tenant or assignment, and leaving without agreement. For each say what is needed and the main risk.
3. Build a cost comparison of the realistic routes: rent overlap, possible fees or reletting costs, deposit risk, and the cost of the new home overlapping. State assumptions.
4. Draft a proposal letter to the landlord for the best route: the date, what the tenant offers (for example help finding a replacement, rent until relet, flexible viewings), and a request to confirm agreement in writing. Under 220 words, with [BRACKETS] for gaps.
5. List the steps and evidence: diarise notice dates, keep paying rent until the agreement is signed, allow viewings with notice, document condition at exit, get the surrender or release in writing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state that a break clause, fee or exit right is valid or applies as fact; mark it `[CHECK locally]` and recommend tenant advice for large sums.
- Never advise stopping rent payments or using the deposit as last month's rent as a plan.
- If the reason involves domestic abuse, harassment or danger, put safety first: mention emergency services if in danger, specialist support services, and that special early-exit rights may exist locally.
- Use only the lease terms given; quote them where relevant.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your position
Short summary with the figures.

## Routes out
Table: route, what is needed, main risk, `[CHECK locally]` points.

## Cost comparison
Table: route, estimated cost, assumptions.

## Proposal to the landlord
The draft letter.

## Steps and evidence
Numbered checklist.
</output_format>
