---
schema: 1
id: set-programme-eligibility-criteria
kind: prompt
title: Set programme eligibility criteria
description: Designs fair eligibility and prioritisation rules for an oversubscribed nonprofit service, with referral routes, a waiting-list policy, exceptions and checks for unintended exclusion.
category: nonprofit
version: 1.0.0
status: incubating
stage: [design]
role: [manager, operations-manager]
requires: [none]
inputs: [text, dataset]
output: [plan, docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [nonprofit]
tags: [eligibility, waiting-list, service-design, equity, intake]
pairs_with:
  prompts: [build-theory-of-change, evaluate-program-outcomes]
  personas: [nonprofit-advisor]
args:
  - name: service
    description: What the service offers, to whom, its capacity (places, hours, budget), current demand and waiting times, how people come to it now, and what funders or contracts require.
    type: text
    required: true
  - name: concerns
    description: What prompted the review, for example long waits, staff deciding case by case, complaints of unfairness, a funder's target group, or people who need it most not reaching it. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Who the service is for, Eligibility rules, Prioritisation, Access routes, Waiting list, Exceptions and appeals, Equity check, Monitoring]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a nonprofit decide who gets a service when it cannot help everyone. Without written rules, staff ration case by case, which is exhausting, inconsistent and often unfair: people who are articulate, persistent or referred by a known professional get through first. Experienced service managers separate eligibility (who the service is for at all) from prioritisation (the order among eligible people), base both on the outcome the service is designed to achieve, keep criteria checkable without demanding documents people in crisis do not have, offer a route for people who do not fit, and check whether the rules quietly exclude groups such as people without internet, with limited English, with disabilities or without fixed addresses.

Service: {{service}}
{{#concerns}}Concerns: {{concerns}}{{/concerns}}
</context>

<task>
1. Who the service is for: one sentence linking the service to the outcome it achieves and the people it achieves it for, and who it is not designed for (with where to signpost them).
2. Eligibility rules: three to six clear criteria, each with why it exists, how it is checked (self-declaration where possible), and what evidence is acceptable if any.
3. Prioritisation: how to order eligible people, for example by risk, urgency, likely benefit, or time waiting, as a simple scoring or banding method that two staff would apply the same way. Test it on three example applicants.
4. Access routes: self-referral and professional referral, alternatives to online forms, language and accessibility support.
5. Waiting list: maximum length before the list is paused, contact with people while they wait, what they can use in the meantime, and how to remove people respectfully.
6. Exceptions and appeals: who can make an exception, how it is recorded, and how someone can ask for a decision to be reviewed.
7. Equity check: for each rule, who it might exclude unintentionally and how to mitigate; data to collect to find out.
8. Monitoring: what to report to the board and funders, including who was turned away and why.
</task>

<constraints>
- Criteria must be lawful and non-discriminatory. Equality and anti-discrimination law differs by country; flag criteria based on protected characteristics (for example age or sex) for checking, and allow targeted services only where the organisation's purpose and local law permit.
- Do not invent capacity, demand or funder requirements; mark them [to confirm].
- Keep personal data collection to what the decision needs.
- Never design rules that require people in crisis to prove eligibility before they can get urgent safety help; set out a route to emergency or safeguarding responses first.
</constraints>

<output_format>
## Who the service is for
## Eligibility rules
Table: Criterion | Why | How checked.
## Prioritisation
The method, then a table testing it on three example applicants.
## Access routes
## Waiting list
## Exceptions and appeals
## Equity check
Table: Rule | Who it might exclude | Mitigation.
## Monitoring
</output_format>
