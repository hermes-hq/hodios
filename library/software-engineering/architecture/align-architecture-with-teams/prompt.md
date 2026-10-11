---
schema: 1
id: align-architecture-with-teams
kind: prompt
title: Align architecture with team ownership
description: Matches system boundaries to team ownership using Conway's law and team topologies, finding split ownership and cognitive overload, and proposes changes to either.
category: architecture
version: 1.0.0
status: incubating
stage: [plan, design]
role: [engineering-manager, architect, tech-lead, executive]
requires: [none]
inputs: [text, notes, repo]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [conways-law, team-topologies, code-ownership, cognitive-load, org-design, service-ownership]
pairs_with:
  personas: [software-architect, staff-engineer]
  prompts: [find-service-boundaries, design-internal-developer-platform]
args:
  - name: teams
    description: The teams, their size, what they work on, and how they interact today.
    type: text
    required: true
  - name: systems
    description: The main services, apps, modules or repositories and who changes them.
    type: text
    required: true
  - name: problems
    description: Symptoms such as slow cross-team changes, unclear ownership, incidents nobody owns, or teams waiting on each other.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Ownership map, Mismatches, Options, Recommended changes, How to tell it worked]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Systems end up mirroring the communication structure of the organisation that builds them (Conway's law). When boundaries and teams do not line up, every change needs coordination: a feature touches three teams' code, nobody owns the shared module, and incidents bounce between teams. There are two levers: change the architecture to match the teams, or change the teams to match the desired architecture (the "inverse Conway manoeuvre"). The team topologies vocabulary helps: stream-aligned teams own a slice of the product end to end; platform teams provide self-service internal products; enabling teams help others adopt skills; complicated-subsystem teams own deep specialist components. Interaction modes (collaboration, X-as-a-service, facilitating) should be explicit and usually temporary when collaborative. A team's cognitive load is finite; one team owning too many unrelated systems is a structural problem, not a performance problem. Evidence comes from change data: which teams change which code, how often pull requests span teams, and where on-call pages land.
</context>

<task>
<teams>
{{teams}}
</teams>

<systems>
{{systems}}
</systems>
{{#problems}}
Problems: {{problems}}
{{/problems}}

1. If repository history or code owner files are available, use them to see which teams actually change which code, and say what you checked. Otherwise work from the description and label it as reported, not measured.
2. Build the ownership map: owner per system, other frequent changers, and on-call owner.
3. Find mismatches: systems with no owner or several owners, features that routinely need several teams, teams owning too many unrelated systems, and platform work done ad hoc by product teams.
4. For each mismatch, list options: move a boundary in the code, move ownership, merge or split a team, or define an explicit interaction mode (a service with an API and support expectations).
5. Recommend changes, smallest and most reversible first, with an owner for each.
6. Define how to tell it worked using measures available to the organisation.
</task>

<constraints>
- Do not judge individuals; this is about structure.
- Reorganisations are disruptive; prefer ownership and interface changes before moving people, and say so when proposing a team change.
- Do not present ownership data as measured unless it came from repository history or code owners.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The main mismatch and the recommended direction in at most five lines.
## Ownership map
Table: system or module, owning team, other teams that change it often, notes.
## Mismatches
Bullets: shared ownership, orphaned systems, overloaded teams, change paths crossing many teams.
## Options
Table: change the architecture, change the teams, or change the interaction mode, with cost and effect.
## Recommended changes
Numbered, smallest first, with owners.
## How to tell it worked
Two to four measures, such as cross-team pull requests or lead time.
</output_format>
