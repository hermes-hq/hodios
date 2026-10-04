---
schema: 1
id: plan-teen-summer-venture
kind: prompt
title: Plan a teen summer business
description: Plans a teenager's summer business such as lawn care, car washing, pet sitting or crafts - parent agreement, safety rules, pricing, a simple flyer, cash records and age rules to check.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [student, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [teen-business, summer-job, young-entrepreneurs, safety-rules, pricing-basics, flyer]
pairs_with:
  prompts: [test-local-service-demand, play-corner-shop-first-year]
args:
  - name: idea
    description: The business idea (for example "mowing lawns", "washing cars on our street", "pet sitting", "selling bracelets").
    type: string
    required: true
  - name: age
    description: The teenager's age in years.
    type: number
    required: true
  - name: details
    description: Where you live (town and country), how many weeks and hours a week, equipment the family already has, money to start, and what the money is for. Rough notes are fine.
    type: text
output_contract:
  format: markdown
  sections: [Your business on one page, Agree with your parent or carer, Safety rules, Prices, Getting customers, Money records, Things to check for your age, Week-by-week plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a teenager plan a summer business, written so the teenager can read it themselves and a parent or carer can check it. The best teen ventures are simple services or products for people the family already knows or nearby streets, with very little money spent at the start. What usually goes wrong: going into strangers' homes or meeting strangers without an adult knowing, pricing so low that it is not worth the time, spending all the earnings on supplies, forgetting customers' names and who has paid, and missing rules about age, hours or dangerous equipment (for example petrol mowers or strimmers). The tone is encouraging and direct, never patronising.

Idea: {{idea}}
Age: {{age}}
</context>

<task>
{{#details}}
<details>
{{details}}
</details>
{{/details}}

1. Your business on one page: name idea, what you offer, who for, where (a short radius), when, and the goal for the money.
2. Agree with your parent or carer: a short written agreement - which streets or homes, hours, which jobs need an adult present, how customers contact you (through a parent's phone or email for younger teens), what happens to the money, and checking in before and after each job.
3. Safety rules: specific to this idea - for example no work inside a stranger's home without an adult knowing the address, meet new customers with a parent first, the equipment allowed at this age and protective gear, heat and sun, dogs you do not know, never sharing home address or school publicly, and what to do if anyone makes you uncomfortable.
4. Prices: work out cost of supplies per job, time per job, and a price that pays a fair hourly amount; suggest a simple price list with a package (for example weekly mow for the summer). Explain why not to underprice.
5. Getting customers: start with neighbours, family friends and relatives; a simple flyer (headline, three bullets, price, parent's contact) that the teen can hand out with an adult; asking happy customers to tell a friend.
6. Money records: a simple notebook or sheet - date, customer, job, paid or not, cash in, spent on supplies - and a saving rule (for example put a set share aside before spending).
7. Things to check for your age: work hours and job rules for young people, whether a permit or parent permission is needed, equipment age limits, and whether earnings need to be reported - each as a question to check with a parent and an official local source, since rules differ by country and state.
8. Week-by-week plan for the summer.
</task>

<constraints>
- Write to the teenager in second person, plain and friendly; one short note for the parent at the end of the agreement section.
- Never state labour, tax or permit rules as facts; list them as checks with an adult.
- Do not suggest anything unsafe for the age given (power tools, ladders, chemicals, roads, travelling alone to strangers) without adult supervision.
- Do not ask for personal details beyond what the plan needs; never put the teen's own phone number or address on a public flyer.
- If the age or idea is missing, ask for it before planning.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Your business on one page
Five short lines.
## Agree with your parent or carer
Checklist, then one note for the parent.
## Safety rules
Numbered rules.
## Prices
The working, then a price list table: Service | Price.
## Getting customers
Bullets, then the flyer text.
## Money records
A table template and the saving rule.
## Things to check for your age
Checklist.
## Week-by-week plan
Table: Week | Goal | To do.
</output_format>
