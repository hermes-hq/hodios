---
schema: 1
id: evaluate-foundation-membership
kind: prompt
title: Evaluate joining a foundation or fiscal host
description: Weighs whether an open-source project should join a foundation, use a fiscal host or stay independent, by the problems it needs solved, what each option requires and what the project gives up.
category: open-source
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [maintainer, founder, engineering-manager]
requires: [none]
inputs: [text]
output: [report, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [foundations, fiscal-hosting, vendor-neutrality, trademark-holding, project-governance]
pairs_with:
  prompts: [choose-oss-funding-model, write-project-governance]
  personas: [open-source-maintainer]
args:
  - name: project
    description: The project, its users and corporate adopters, who maintains it and their employers, who holds the repository, name, domain and any trademark, money received or expected, and current governance.
    type: text
    required: true
  - name: goals
    description: What you hope a foundation solves, for example neutral ground for competing companies, somewhere to hold money, legal protection, trademark ownership, credibility with enterprises, or events. Optional.
    type: text
  - name: candidates
    description: Foundations or fiscal hosts you are considering, with anything you know about their requirements. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the project needs, Options, Fit, Recommendation, What joining involves, Questions to ask]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Projects join foundations for different reasons, and the options solve different problems. A fiscal host or fiscal sponsor holds and spends money for the project and handles invoices and taxes, without taking over governance or code. A full foundation can also hold the trademark and other assets, provide a vendor-neutral home that lets competing companies invest, offer legal support and events, but usually requires a governance model, an IP transfer or licence, sometimes an incubation process, and in some cases paid corporate membership. Each foundation has its own scope, technical focus and acceptance process. The cost is real: process, reporting, loss of a single owner's control, and time spent on applications. Many small projects need only a fiscal host and a written governance document.

Project:
<project>
{{project}}
</project>
{{#goals}}Goals: {{goals}}{{/goals}}
{{#candidates}}Candidates: {{candidates}}{{/candidates}}
</context>

<task>
1. State the problems the project needs solved, in order of importance, from its situation{{#goals}} and the goals given{{/goals}}. Separate problems a foundation solves from problems it does not (lack of maintainers, low adoption).
2. Lay out the options: stay independent with written governance, a fiscal host, a full foundation, or a company-held home, with what each typically provides and requires.
3. Fit: score each option, and each named candidate{{#candidates}} from the list given{{/candidates}}, against the project's needs. For named foundations, describe their scope and requirements only as far as you are confident, and mark anything to confirm.
4. Recommend an option with the reason and what would change the recommendation (for example a second large corporate adopter, a trademark dispute, or significant money).
5. Describe what joining involves in practice: governance changes, asset transfers (repository, name, domain, trademark), licence or contributor agreement requirements, reporting, costs, and timeline, all marked as typical and to be confirmed with the organisation.
6. List the questions to ask the foundation or host before applying, and points where the project should get legal advice (trademark and IP transfer agreements).
</task>

<constraints>
- Do not invent a foundation's fees, acceptance criteria, membership tiers or processes; describe the general pattern and say to confirm on the organisation's current pages or with its staff.
- Do not recommend a foundation as a fix for problems it does not solve, such as maintainer burnout or lack of users.
- Name the loss of control plainly when recommending a foundation.
</constraints>

<output_format>
Use the contract's section headings in order. Fit as a table: Option | Needs met | Requirements | Cost and control trade-off | Fit (low, medium, high). Questions to ask as a numbered list.
</output_format>
