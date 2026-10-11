---
schema: 1
id: choose-cross-platform-approach
kind: prompt
title: Choose a mobile platform approach
description: Chooses native, React Native, Flutter, Kotlin Multiplatform or a web app for a mobile product from team skills, UI needs, device APIs and long-term cost.
category: architecture
version: 1.0.0
status: incubating
stage: [design, plan]
role: [mobile-engineer, tech-lead, founder, engineering-manager]
requires: [none]
inputs: [text, spec]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cross-platform, native-apps, progressive-web-app, kotlin-multiplatform, team-skills, trade-offs]
pairs_with:
  personas: [mobile-engineer, software-architect]
  prompts: [structure-mobile-app-modules, compare-design-options]
args:
  - name: product
    description: What the app does, platforms needed, key screens, device features used (camera, Bluetooth, background location, payments, widgets), and offline needs.
    type: text
    required: true
  - name: team
    description: Team size and skills today, hiring plans, and any existing web or mobile code to reuse.
    type: text
  - name: constraints
    description: Deadline, budget, performance or accessibility requirements, and any platform rules that matter.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Requirements that decide it, Options compared, Risks of the chosen option, Validation spike, What would change the choice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The platform choice is mostly about team and requirements, not benchmarks. A web app or installable progressive web app is cheapest when the product is content and forms, but some device features, background work and app store presence are limited or uneven across platforms. React Native fits teams with strong React and TypeScript skills and lets them share logic with a web app; native modules are needed for heavy device work. Flutter gives consistent custom UI across platforms from one codebase, at the cost of a language and toolkit the web team may not know and UI that does not automatically follow platform conventions. Kotlin Multiplatform shares business logic while keeping native UI, which suits teams with Android skills and products where native look and platform features matter. Fully native apps on each platform cost the most people but give first access to new platform features and the best fit for demanding UI, background processing or deep integrations. The deciding requirements are usually a short list: specific device APIs, background behaviour, UI fidelity, offline sync, and who the team can hire. A short spike on the riskiest requirement beats a long comparison.
</context>

<task>
<product>
{{product}}
</product>
{{#team}}
Team: {{team}}
{{/team}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. Extract the requirements that discriminate between options (device APIs, background work, UI fidelity, offline, code sharing with web, performance-critical screens) and ignore those every option handles.
2. Compare a web app or progressive web app, React Native, Flutter, Kotlin Multiplatform and native per platform against those requirements and the team. Drop clearly unfit options early with the reason.
3. Recommend one, tied to the team's skills and hiring market as much as the technology.
4. List the risks of the chosen option and mitigations, such as native modules to write or platform conventions to follow.
5. Design a short validation spike that builds the riskiest screen or integration, with clear pass criteria.
6. State what would change the recommendation.
</task>

<constraints>
- Do not invent performance benchmarks or claim one framework is faster without evidence; say what to measure.
- Platform and app store rules change; flag them as things to verify rather than stating them as current facts.
- Do not ignore the team: a technically better option the team cannot staff is not the better option.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The approach and the main reason in at most five lines.
## Requirements that decide it
Bullets: the few requirements that actually discriminate between options.
## Options compared
Table: option, fit for UI, device APIs, team fit, hiring, long-term maintenance, main risk.
## Risks of the chosen option
Bullets with mitigations.
## Validation spike
A one- or two-week spike that would confirm the choice, with pass criteria.
## What would change the choice
Bullets.
</output_format>
