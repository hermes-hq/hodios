---
schema: 1
id: plan-design-system-governance
kind: prompt
title: Plan design system governance
description: Plans how a design system is run, covering ownership, the contribution model, versioning, deprecation, adoption tracking and support. Use when setting up or fixing how a design system is run.
category: design-systems
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [designer, frontend-engineer, engineering-manager, manager]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [design-ops, contribution-model, semantic-versioning, deprecation, adoption-metrics]
pairs_with:
  prompts: [write-component-spec, define-design-tokens, audit-design-consistency]
  personas: [product-designer]
args:
  - name: org_context
    description: Company size, number of product teams, designers and engineers, platforms and tech stacks, how the system is funded and staffed, and the leadership's expectations.
    type: text
    required: true
  - name: current_state
    description: What exists today (libraries, docs, tokens, versions), how teams use it, and the problems - drift, detached components, slow requests, low trust, duplicate components. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Team model, Decision rights, Contribution process, Versioning and releases, Deprecation, Adoption and health metrics, Support, First 90 days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Design systems rarely fail on components; they fail on operations. The central team becomes a bottleneck, product teams fork or detach components to meet deadlines, breaking changes land without notice, nobody knows who may approve a new pattern, and adoption is reported as "lots of teams use it" with no data. Governance is the set of agreements about who decides, how changes get in, how they get out, and how the team knows whether the system is working, sized to the organisation rather than copied from a large company's blog post.
</context>

<task>
Plan the governance for this design system.

<org_context>
{{org_context}}
</org_context>
{{#current_state}}
<current_state>
{{current_state}}
</current_state>
{{/current_state}}

1. **Diagnosis.** Summarise the situation and the 3 to 5 problems governance must solve, linked to the evidence given. If the context is too thin to size the model (no team counts, no idea of who maintains the system), ask up to four questions and stop.
2. **Team model.** Recommend centralised (a dedicated team builds and owns everything), federated (designers and engineers from product teams contribute and decide together) or hybrid (a small core team owns the foundations and quality, product teams contribute), sized to the organisation. Give roles, rough capacity (people or percentage of time), and the trade-off of the choice.
3. **Decision rights.** A table of decisions (new foundation token, new component, change to an existing component, a one-off exception, removing something, accessibility standards) with who proposes, who decides, who must be consulted and the expected turnaround.
4. **Contribution process.** Stages from request to release: check whether something existing solves it, proposal with the problem and evidence of reuse (for example needed by at least two teams), design and engineering review, accessibility review, documentation, release. Define contribution types: fix, enhancement, new pattern, and what each needs. Say where local, product-specific components live and when they are promoted into the system. Include a template for a contribution proposal.
5. **Versioning and releases.** Semantic versioning for code packages and design libraries: what counts as a major (breaking API, visual changes that break layouts, renamed or removed tokens), minor and patch change; release cadence; changelog format written for consumers; migration guides and codemods for breaking changes; keeping design and code libraries in step.
6. **Deprecation.** The lifecycle (experimental, stable, deprecated, removed), how a deprecation is announced (changelog, warnings in code and design tools, docs banner), the minimum notice period, migration support, and what happens to teams that cannot migrate in time.
7. **Adoption and health metrics.** Metrics that can actually be collected: component coverage in code (share of UI using system components, from code scans), version lag per product, detached or overridden instances in design files, contribution volume and cycle time, open issues and time to first response, accessibility defects, and a periodic satisfaction survey. For each, how to measure it and a starting target. Warn against vanity metrics such as number of components.
8. **Support.** Channels (a request form, a chat channel, office hours, design and code reviews), response-time expectations, documentation ownership, onboarding for new designers and engineers, and a community of champions in product teams.
9. **First 90 days.** A phased plan with the first actions, owners by role and what will be reported to leadership.
</task>

<constraints>
- Size everything to the organisation described; a 3-team start-up does not need a review board.
- Do not invent current metrics or team facts; mark assumptions and starting targets as proposals to calibrate.
- Recommend tools only by type (component analytics, design-file usage reports, code scanners), not by vendor, unless the user named their tools.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections as `##` headings. Decision rights as a table:
| Decision | Proposes | Decides | Consulted | Turnaround |
Metrics as a table:
| Metric | How measured | Starting target | Review cadence |
The contribution proposal template in a code block.
</output_format>
