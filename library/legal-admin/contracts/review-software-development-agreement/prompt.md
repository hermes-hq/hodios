---
schema: 1
id: review-software-development-agreement
kind: prompt
title: Review a software development agreement as the client
description: Reviews a contract with an agency or developer building custom software for you - scope, acceptance, change control, IP and source code, warranties, handover and exit.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, product-manager, engineering-manager, executive]
subject: [law]
requires: [none]
inputs: [document]
output: [report, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [software-development, agency-contract, source-code-ownership, acceptance-testing, change-control]
pairs_with:
  prompts: [review-saas-agreement, redline-contract, explain-contract-clause]
  workflows: [contract-review-track]
args:
  - name: agreement
    description: The development agreement, statement of work and any attached specification, with clause numbers.
    type: text
    required: true
  - name: project
    description: What is being built, budget, timeline, pricing model (fixed price, time and materials, retainer), and what you plan to do with the software (sell it, raise investment, run your business on it).
    type: text
    required: true
  - name: country
    description: Countries of both parties and the governing law. Rules on who owns copyright in commissioned work differ.
    type: string
output_contract:
  format: markdown
  sections: [In brief, Clause check, Ownership and code, Delivery and acceptance, Exit and handover, What to negotiate, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Custom software projects go wrong in predictable ways and the contract decides who carries the cost. In many countries the developer owns the copyright in code it writes unless there is a written assignment, so paying for software does not by itself mean owning it; investors and acquirers check this. Agencies often reuse their own libraries and frameworks ("background IP") and licence them to the client, which is fine if the licence is perpetual, transferable and covers future changes. Open-source components can carry licence obligations. Other recurring traps: a scope described too loosely to know when the job is done; acceptance by deemed sign-off after a few days; change requests priced at the agency's discretion; time-and-materials with no cap or estimate controls; warranties limited to a short bug-fix period; no obligation to hand over source code, credentials, documentation and deployment scripts; hosting or accounts in the agency's name; key staff swapped out; and termination that leaves the client with half-built software it cannot legally or practically take elsewhere.
{{#country}}

Countries and law: {{country}}
{{/country}}

<project>
{{project}}
</project>
</context>

<task>
<agreement>
{{agreement}}
</agreement>

1. In brief: pricing model, scope, timeline, who owns what, and the biggest risk for the client.
2. Clause check, quoting each clause: scope and specification, milestones, pricing and payment, change control, acceptance testing, warranties and defect fixing, IP ownership and assignment, background IP licence, open source, confidentiality and data, hosting and accounts, key personnel and subcontracting, liability and indemnities (including IP infringement), term, termination and handover, support after launch, non-solicitation, disputes.
3. Ownership and code: what the client will own, what it will only licence, whether an assignment is present and when it takes effect (often on full payment), open source handling, and whether the client could take the code to another developer.
4. Delivery and acceptance: how "done" is defined, test periods, deemed acceptance, what happens with bugs found after.
5. Exit and handover: what the client gets on termination at each stage, including source code, documentation, credentials and transition help.
6. What to negotiate: ranked asks with short wording where useful.
7. Questions for the agency, and when to involve a lawyer (investment plans, high budgets, regulated data).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where missing.
- Do not state who owns copyright under a particular law; say that it commonly depends on a written assignment and to confirm under the governing law.
- Do not invent technical facts about the project or the agency's code.
- Be fair to the developer: note where an ask shifts reasonable risk onto them and suggest a balanced version.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four bullets.

## Clause check
Table: topic | clause and short quote | rating (fine / check / negotiate) | why.

## Ownership and code
Bullets.

## Delivery and acceptance
Bullets.

## Exit and handover
Bullets.

## What to negotiate
Numbered: ask - why - suggested wording.

## Questions
Numbered.
</output_format>
