---
schema: 1
id: compare-visa-routes
kind: prompt
title: Compare visa routes
description: Compares the visa or permit routes that may fit a person's goal for one country, showing what each route usually requires, where they look strong or weak, and what to confirm with an adviser.
category: immigration
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, job-seeker, student, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [visa-routes, eligibility-factors, work-permit, family-route, study-route]
pairs_with:
  prompts: [prepare-visa-application, ask-employer-for-visa-sponsorship, vet-immigration-adviser]
  personas: [legal-information-guide]
args:
  - name: goal
    description: What you want to do and for how long, for example "work as a nurse for 3 years then settle", "join my partner", "study a master's and stay to work".
    type: text
    required: true
  - name: country
    description: The destination country, and where you live now.
    type: string
    required: true
  - name: profile
    description: Nationality (and any second nationality), age band, qualifications, occupation and experience, language test results, job offer or sponsor, family ties in the country, funds, and any past refusals, overstays or convictions. Share only what you are comfortable sharing.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What decides the route, Candidate routes, Route by route, Your strengths and gaps, Long-term path, Official sources, Questions for an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most people start with the route they have heard of instead of the route that fits. Immigration systems usually offer several doors for the same goal (a sponsored work visa, a points-based or talent route, a job-seeker visa, a study route that leads to post-study work, a family route, an ancestry or regional scheme, free-movement rights from a second nationality), and they differ in what they require, whether they tie the person to one employer, whether family can come, whether they lead to permanent residence, and how a refusal on one affects the others. Experts check the facts that open or close doors first: nationality (including a second citizenship or a parent's), the occupation and whether it is on a shortage or eligible list, salary against thresholds, qualifications and their recognition, language level, a sponsor, family ties, funds, and immigration history. Rules, lists and thresholds change often, so every specific must be checked on the official source.

Goal: {{goal}}
Destination and current residence: {{country}}

<profile>
{{profile}}
</profile>
</context>

<task>
1. What decides the route: list the facts from the profile that matter most for this country and goal, and ask for any decisive fact that is missing (put the questions first under "Need from you") while continuing with gaps marked [X].
2. Candidate routes: name the two to five routes that commonly exist for this goal in this country, in general terms and with their usual official names where you are confident, marking any you are unsure still exists as "check it still exists".
3. Route by route: for each, the usual core requirements, whether it ties the person to a sponsor, whether family can usually join, whether it typically leads to permanent residence, typical cost and processing as "to confirm", and how the profile looks against each requirement (meets, unclear, gap), without deciding eligibility.
4. Your strengths and gaps: what in the profile helps across routes and what is a common reason for refusal, including any past refusal or overstay, which must be declared.
5. Long-term path: if the goal includes staying, how each route commonly connects to settlement or citizenship, marked to confirm.
6. Official sources: the kind of official sites to check (national immigration authority, embassy or consulate, official occupation lists), with a warning about agents who sell "guaranteed" visas and paid job offers.
7. Questions for a regulated immigration adviser or lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never say a person is eligible or will succeed; say how the profile looks against the usual criteria and what to confirm.
- Never state thresholds, fees, quotas, occupation lists or processing times as current fact.
- Never suggest misrepresenting facts, hiding a refusal or record, sham marriages, bought job offers or entering on one visa to do what another visa is for. Decline and explain the risk of refusal and bans.
- Recommend a regulated adviser for past refusals, overstays, criminal records, asylum or protection needs, and any decision that is hard to reverse.
- Keep personal identifiers out of the output.
{{> output/uncertainty}}
</constraints>

<output_format>
Start with "Need from you" only if decisive facts are missing.

## What decides the route
## Candidate routes
## Route by route
Table: Route | Core requirements | Tied to sponsor? | Family? | Leads to settlement? | Your profile against it.
## Your strengths and gaps
## Long-term path
## Official sources
## Questions for an adviser
Numbered.
</output_format>
