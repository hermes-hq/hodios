---
schema: 1
id: write-five-case-business-case
kind: prompt
title: Write a five-case business case
description: Writes a public-sector style business case in the five-case model, covering the strategic, economic, commercial, financial and management cases, sized to the investment and stage.
category: business-writing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [business-analyst, project-manager, manager, consultant]
requires: [none]
inputs: [document, notes, dataset, text]
output: [docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
subject: [public-sector]
tags: [five-case-model, public-investment, investment-appraisal, options-appraisal, outline-business-case]
pairs_with:
  prompts: [write-project-proposal, write-feasibility-study, write-briefing-note]
args:
  - name: proposal_material
    description: Everything you have, such as the problem and policy drivers, objectives, options considered, costs and benefits, procurement route, funding source, delivery plan, risks and stakeholders.
    type: text
    required: true
  - name: stage
    description: Which stage of business case.
    type: enum
    enum: [strategic-outline, outline, full]
    default: outline
  - name: organisation_guidance
    description: Your organisation's or funder's template, approval thresholds, discount rate, appraisal guidance or country. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Business case, Evidence and analysis gaps, Approval checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The five-case model is used across the UK public sector and has been adopted by other governments, health systems and funders. It asks five questions: is there a case for change that fits strategy (strategic), which option gives best public value (economic), can it be procured (commercial), is it affordable (financial), and can it be delivered (management). It is written in stages: a strategic outline case to agree the need and a long list, an outline case to choose a preferred option, and a full case after procurement. Assessors reject cases that start from a predetermined solution, appraise only one option against do-nothing, mix up economic value (all costs and benefits to society) with affordability (cash in the organisation's budget), double count benefits, ignore optimism bias, or have no named senior responsible owner. Discount rates and appraisal rules are set by each country's guidance and must not be guessed.
</context>

<task>
Write a {{stage}} business case.

<proposal_material>
{{proposal_material}}
</proposal_material>
{{#organisation_guidance}}
<organisation_guidance>
{{organisation_guidance}}
</organisation_guidance>
{{/organisation_guidance}}

1. If the material does not state the problem or objectives, ask up to three short questions and stop.
2. Follow the organisation's template if given. Size each case to the stage: a strategic outline case is mostly strategic with a long list; an outline case has the full economic appraisal of a short list; a full case adds the procurement result and final costs.
3. Executive summary: the need, the preferred option, cost, benefits, funding and the decision sought.
4. Strategic case: the case for change, current arrangements, SMART objectives, scope, constraints, dependencies and stakeholders, and fit with the stated strategies or policies.
5. Economic case: critical success factors; a long list of options across scope, solution, delivery, implementation and funding where the material allows; the short list (including business as usual or do minimum); costs and benefits of each with assumptions; risks and optimism bias noted; and the preferred option with the reasoning. Present net present values only if the material supplies the figures and the discount rate; otherwise lay out the inputs and mark the calculation `[NEEDED]`.
6. Commercial case: what is to be procured, the route, contract approach, risk allocation and timeline.
7. Financial case: capital and revenue costs by year, funding sources, affordability gap, and accounting points flagged for finance.
8. Management case: governance, senior responsible owner, project plan and milestones, risk management, benefits realisation, and post-implementation review.
9. Separately list evidence and analysis gaps and an approval checklist.
</task>

<constraints>
- Use only the material. Never invent costs, benefits, discount rates, policies or procurement rules; mark gaps `[NEEDED: …]`.
- Keep economic value and affordability distinct.
- Appraise options fairly; if the material only has one option, build the short list from the material and flag that options appraisal is thin.
- Do not state procurement law or appraisal rules for a country; refer to the organisation guidance or mark for confirmation.
</constraints>

<output_format>
## Business case
Executive summary; Strategic case; Economic case (options table: Option · Costs · Benefits · Risks · Fit with success factors; preferred option); Commercial case; Financial case (table by year); Management case.
## Evidence and analysis gaps
Each gap with which case it weakens.
## Approval checklist
Checks assessors will apply at this stage, marked done or not.
</output_format>
