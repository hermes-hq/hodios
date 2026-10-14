---
schema: 1
id: plan-digital-transformation-roadmap
kind: prompt
title: Plan a digital transformation roadmap
description: Plans a multi-year digital roadmap - current systems and pain points, target capabilities, sequenced initiatives, budget ranges, and the people and change risks.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, operations-manager, consultant, founder]
requires: [none]
inputs: [text, notes, document]
output: [plan, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [digital-transformation, systems-roadmap, technology-planning, change-management, capability-map]
pairs_with:
  prompts: [find-ai-use-cases-in-business, write-department-strategy, evaluate-build-vs-buy, prioritize-strategic-initiatives]
args:
  - name: business
    description: The business, its strategy or goals, current systems and spreadsheets by area, how data moves between them, pain points staff and customers feel, and IT team or suppliers.
    type: text
    required: true
  - name: limits
    description: Budget envelope, timeframe, appetite for change, contracts or systems that must stay, and regulatory requirements. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Current state, Target capabilities, Gap and options, Roadmap, Budget and resources, People and change, Risks, First 90 days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan digital transformation for established businesses. Programmes fail when they start with software selection instead of business outcomes, try to replace everything at once, underfund data migration and training, or treat staff adoption as an afterthought. A good roadmap starts from the strategy and the pain points, describes the capabilities the business needs (for example "customers can see order status without calling"), fixes foundations first (clean customer and product data, a core system of record, integrations), delivers visible wins early to build support, and sequences big changes so the business is never running too many cut-overs at once. Budgets should include the costs people forget: migration, integration, parallel running, training and productivity dip.
</context>

<task>
Plan the roadmap for:

<business>
{{business}}
</business>
{{#limits}}

<limits>
{{limits}}
</limits>
{{/limits}}

1. Current state: a map of systems by business area (sales, operations, finance, HR, customer service), how data moves (manual re-keying, spreadsheets, integrations), and the main pain points with their business impact.
2. Target capabilities: 6 to 10 capabilities the business needs, each tied to a strategic goal or pain point, stated in business terms.
3. Gap and options: for each capability, the gap and the options (configure what exists, buy a packaged system, integrate, build), with the trade-offs. Do not name vendors as recommendations.
4. Roadmap: phases over 2 to 3 years (foundations, core changes, optimisation), with initiatives, dependencies, and quick wins in the first phase. Keep the number of simultaneous major cut-overs to one where possible.
5. Budget and resources: order-of-magnitude ranges per phase where the material allows, including licences, implementation, data migration, integration, training, parallel running and internal time. Mark all ranges as assumptions to validate with quotes.
6. People and change: who is affected, champions, training, how to handle resistance and the productivity dip after go-live.
7. Risks: data quality, supplier lock-in, key-person dependency, scope creep, security, regulatory, with mitigations.
8. First 90 days: concrete steps (data clean-up, requirements, quick wins, governance set-up).
</task>

<constraints>
- Tie every initiative to a capability and a goal; drop any that are technology for its own sake.
- Do not invent system names, prices or vendor capabilities. Mark ranges as assumptions.
- Respect systems and contracts that must stay.
- Flag data protection and security requirements for review by a qualified person.
{{> output/uncertainty}}
</constraints>

<output_format>
## Current state
Table: Area | Systems | Data flow | Pain point and impact.

## Target capabilities
Numbered, each with goal link.

## Gap and options
Table: Capability | Gap | Options | Preferred and why.

## Roadmap
Table: Phase | Period | Initiatives | Dependencies | Quick wins.

## Budget and resources
Table: Phase | Cost range | What it covers | Internal time.

## People and change
Bullets.

## Risks
Table: Risk | Likelihood | Impact | Mitigation.

## First 90 days
Checklist.
</output_format>
