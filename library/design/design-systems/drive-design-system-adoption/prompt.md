---
schema: 1
id: drive-design-system-adoption
kind: prompt
title: Plan how to drive design system adoption
description: Plans how to raise design system adoption across product teams, diagnosing barriers per team and choosing champions, migration help, tooling, incentives and per-team targets.
category: design-systems
version: 1.0.0
status: incubating
stage: [operate, plan]
role: [designer, engineering-manager, frontend-engineer]
requires: [none]
inputs: [text, dataset, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [adoption, change-management, champions-program, migration-support, stakeholder-buy-in]
pairs_with:
  prompts: [measure-design-system-adoption, plan-design-system-governance, build-design-system-business-case, plan-design-system-roadmap]
  personas: [design-systems-lead]
args:
  - name: system
    description: What the design system offers today (components, tokens, platforms, docs) and its team size.
    type: text
    required: true
  - name: teams
    description: The product teams, their stacks, how much they use the system now (numbers if you have them), and what they say about it.
    type: text
    required: true
  - name: goal
    description: Optional. The adoption goal and deadline, and who is asking for it.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Diagnosis by team, Barriers, Interventions, Team plans, Targets, Communication, Risks, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Low adoption is usually a product problem, not a communication problem. Teams skip the system for specific reasons: a component they need is missing or too rigid, the package is several majors behind their app and upgrading is expensive, the system feels slower than writing their own, they do not trust it to respond to bugs, or they have legacy code nobody will fund to migrate. Mandates without help produce wrappers around local components and detached design instances that look like adoption in the numbers. Approaches that work in practice: diagnose per team, fix the top missing or blocking components first, make the right thing the easy thing (starter templates, editor autocomplete for tokens, lint rules that warn on hard-coded values, codemods), embed help (pairing, migration sprints run with a team, champions in each product team with real time and recognition), and tie adoption to things leadership already wants, such as accessibility compliance or faster delivery, rather than adoption for its own sake. New screens adopting first and legacy screens migrating when touched is cheaper than big-bang rewrites. Targets should be per team, from a measured baseline.
</context>

<task>
Plan how to increase adoption of this design system.

<system>
{{system}}
</system>

<teams>
{{teams}}
</teams>
{{#goal}}

<goal>
{{goal}}
</goal>
{{/goal}}

1. **Diagnosis by team.** A table with each team, current adoption (from data given, or "unknown"), stack and version lag, and the most likely barriers with the evidence for each. Where evidence is missing, say what to ask or measure.
2. **Barriers.** The three to five barriers that matter most across teams, ranked by how many teams they block and how fixable they are.
3. **Interventions.** For each barrier, the interventions that address it, from this list or better ones: fix or add components, docs and examples, tooling (templates, lint rules, editor support, codemods), embedded migration help, champions programme, office hours, leadership alignment. Give the effort for the system team and for product teams.
4. **Team plans.** A short plan per team or team group: what they adopt first (new work, high-traffic screens, shared shell), what help they get and when.
5. **Targets.** Per-team targets from the baseline over two to four quarters, with the metric each uses, and the leading indicators to watch monthly.
6. **Communication.** What to tell product teams and leadership, when, and how wins are shared.
7. **Risks.** Gaming (wrapping local components), burnout of the system team, mandates without capacity, and what to do about each.
</task>

<constraints>
- Do not invent adoption numbers or team feedback; mark assumptions.
- Do not recommend mandates or merge blocking without the support and phase-in that make them achievable.
- Size the plan to the system team's capacity; if the goal is not reachable with it, say so and what would change that.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Diagnosis and targets as tables. End with Open questions.
</output_format>
