---
schema: 1
id: plan-international-remote-hire
kind: prompt
title: Plan hiring someone in another country
description: Compares the ways to hire a remote worker in another country - contractor, employer of record or own entity - with costs, risks, payroll and compliance questions, and a plan to make the hire.
category: hiring
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, recruiter, operations-manager, manager]
advice_risk: [legal]
requires: [none]
inputs: [notes, text]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [international-hiring, employer-of-record, remote-work, cross-border-employment, worker-classification]
pairs_with:
  prompts: [plan-first-hire, check-contractor-tax-status, write-offer-letter, plan-international-assignment]
  personas: [recruiter]
args:
  - name: hire
    description: The role, the candidate's country (and city if relevant), expected length of the engagement, hours, and the pay agreed or budgeted.
    type: text
    required: true
  - name: company
    description: Where your company is registered, where your other staff are, whether you have entities or an employer of record already, and how many people you may hire in that country. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Options compared, Recommendation, Real cost, Compliance questions, Making the hire, Questions for advisers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise small and growing companies on hiring across borders. When the right candidate lives in another country, there are three common routes: engage them as an independent contractor, employ them through an employer of record (EOR) that is the legal employer in their country, or set up your own entity there and employ them directly. Many companies default to "contractor" because it is quick, but if the person works like an employee (set hours, ongoing work, integrated into the team, one client), the worker's country may treat them as an employee, with back taxes, social contributions, benefits and penalties. An EOR is usually faster and safer for one to a few people but costs a monthly fee; an entity makes sense with more people or long-term plans. Hiring abroad can also create a taxable presence for the company in that country, and the candidate's right to work there, local employment terms (notice, leave, mandatory benefits, a written contract in the local language), data transfer and IP ownership all need checking.

<hire>
{{hire}}
</hire>
{{#company}}
<company>
{{company}}
</company>
{{/company}}
</context>

<task>
1. Options compared: for contractor, EOR and own entity, set out speed to start, typical cost structure, who carries legal and payroll duties, misclassification and taxable presence risk, benefits and terms the worker gets, IP and confidentiality, and when each tends to fit.
2. Recommendation: which option fits this hire and why, based on how the work is actually done, its length and the company's plans; say what would change the answer.
3. Real cost: a cost table for the recommended option and one alternative with pay, employer social contributions, mandatory benefits, EOR or contractor platform fees, equipment, and currency handling, using labelled assumptions or [X] where data is missing.
4. Compliance questions: the points to check for this country (worker status tests, employment contract and local terms, notice and termination rules, mandatory benefits, working time and leave, payroll and tax registration, permanent establishment risk, data protection and transfer, IP assignment, right to work if relevant).
5. Making the hire: steps and a rough timeline from choosing the route to day one, including the offer, contract, onboarding and equipment.
6. Questions for advisers: specific questions to put to an EOR provider, a local employment lawyer and the company's accountant.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state country-specific tax rates, contribution percentages, benefits or legal tests as fact; give them as assumptions to verify.
- Do not help structure an employment relationship as contracting to avoid obligations where the work looks like employment; explain the risk instead.
- Do not name or rank specific EOR providers; describe what to compare.
- Use only the figures supplied.
</constraints>

<output_format>
## Options compared
Table: Factor | Contractor | Employer of record | Own entity.
## Recommendation
## Real cost
Table: Item | Monthly | Annual | Assumption to verify.
## Compliance questions
## Making the hire
## Questions for advisers
</output_format>
