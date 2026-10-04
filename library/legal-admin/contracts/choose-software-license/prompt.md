---
schema: 1
id: choose-software-license
kind: prompt
title: Choose a software licence
description: Compares open-source and proprietary licences for a project - permissions, conditions, patent terms and compatibility with its dependencies - and recommends one that fits its use.
category: contracts
version: 1.0.0
status: incubating
aliases: [legal-software-license]
stage: [plan, ship]
role: [maintainer, founder, software-engineer, legal-professional]
subject: [law]
requires: [none]
inputs: [text, repo]
output: [table, report]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source-licensing, copyleft, license-compatibility, patents]
pairs_with:
  prompts: [audit-dependency-licenses, evaluate-open-source-strategy, write-contributing-guide]
  personas: [open-source-maintainer]
args:
  - name: project
    description: What the software is (library, SaaS, desktop or mobile app, internal tool), who it is for, how it is distributed or hosted, the goals for reuse (maximum adoption, keeping improvements open, commercial protection), and its dependencies' licences if known.
    type: text
    required: true
  - name: candidates
    description: Licences you are already considering, or a licence you want reviewed, if any.
    type: text
output_contract:
  format: markdown
  sections: [Goals and constraints, Licence comparison, Compatibility, Recommendation, What to verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A licence decides who can use, change and redistribute the software and on what conditions. The choice follows from goals: permissive licences such as MIT, BSD or Apache-2.0 maximise adoption; weak copyleft such as MPL-2.0 or LGPL keeps changes to the licensed files open; strong copyleft such as GPL-3.0 keeps derivative works open when distributed, and AGPL-3.0 extends that to software offered over a network; source-available licences restrict commercial use and are not open source. Dependencies' licences limit what the project can choose, and changing a licence later can require every contributor's agreement.
{{#candidates}}
Candidates or licence to review: {{candidates}}
{{/candidates}}
</context>

<task>
Project:
<project>
{{project}}
</project>

1. Restate the goals and constraints: distribution model (distributed binaries, a hosted service, a library linked by others), what reuse the owner wants to allow or prevent, and whether a company or many contributors hold copyright.
2. Compare three to five candidate licences on: permissions (commercial use, modification, distribution, private use), conditions (notice, source disclosure, same licence, state changes, network use), limitations (liability, warranty, trademark), explicit patent grant and termination, and how widely companies accept it.
3. Check compatibility: with the known dependency licences, with the way the software is distributed or hosted, and with common licences users will combine it with. Flag any dependency that blocks a candidate.
4. Recommend one licence with the reasoning tied to the goals, the second choice and when it would be better, and what changing later would involve (contributor agreements, relicensing).
5. List practical steps: the LICENSE file, file headers or SPDX identifiers, notices for bundled third-party code, and whether a contributor licence agreement or DCO fits.
6. If a specific licence was given for review, explain what it allows and requires in plain words and where it is unusual.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Describe licences accurately and only from well-known terms; if unsure about a clause, say so and mark it for verification against the licence text.
- Do not call a source-available or custom licence open source.
- Do not suggest ignoring or working around a dependency's licence conditions.
- Recommend a lawyer for proprietary licensing, relicensing, dual licensing, patent concerns or disputes.
{{> output/uncertainty}}
</constraints>

<output_format>
## Goals and constraints
Bullets.
## Licence comparison
A table: licence, permissions, conditions, patent terms, adoption notes.
## Compatibility
Dependency and distribution checks, with blockers.
## Recommendation
The licence, the second choice and the reasoning.
## What to verify
Practical steps and points for legal review.
</output_format>
