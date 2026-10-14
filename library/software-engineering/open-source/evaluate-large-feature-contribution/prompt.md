---
schema: 1
id: evaluate-large-feature-contribution
kind: prompt
title: Evaluate a large feature contribution
description: Helps maintainers decide on a large unsolicited feature pull request by weighing user value against maintenance cost, choosing accept, reshape, plugin or decline, and drafting the reply.
category: open-source
version: 1.0.0
status: incubating
stage: [review]
role: [maintainer]
requires: [none]
inputs: [text, diff]
output: [report, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [pull-request, project-scope, maintenance-cost, feature-requests, saying-no]
pairs_with:
  prompts: [reply-to-first-contribution, triage-stale-pull-requests, design-plugin-extension-system, draft-maintainer-issue-replies]
  personas: [open-source-maintainer]
args:
  - name: contribution
    description: What the pull request adds, its size, the code areas it touches, new dependencies, tests and docs included, and the contributor's description. A diff summary is enough; the full diff is optional.
    type: text
    required: true
  - name: project
    description: The project's stated scope or goals, maintainer capacity, and any earlier discussion of this feature.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What it adds, Value to users, Cost to maintainers, Options, Recommendation, Reply draft]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A large feature pull request arriving without warning is a gift and a liability. Merging it means the maintainers own it forever: its bugs, its support questions, its interactions with every future change, and its dependencies' security advisories, usually after the contributor has moved on. The useful questions are how many users need it, whether it fits the project's scope, what it costs to maintain (code size, new dependencies, platform-specific paths, test burden, public API surface that cannot be removed without a major version), and whether the contributor will stay. Good outcomes besides yes and no: reshape it smaller, merge it as experimental behind a flag, add an extension point so it can live as a separate package, or decline with thanks and a pointer to where it can live. A delay of months is the worst answer.
</context>

<task>
Evaluate this contribution.

<contribution>
{{contribution}}
</contribution>

<project>
{{project}}
</project>

1. Summarise what it adds and where it touches the codebase, including new public API, dependencies and configuration.
2. Value to users: who needs it, evidence of demand from the input (issues, votes, earlier requests), and whether it fits the stated scope. Mark guesses.
3. Cost to maintainers: maintenance burden areas (code size, test matrix, dependency risk, platform-specific code, documentation, support questions), public API that would be hard to remove, and the bus factor if the contributor leaves. Give an overall rating of low, medium or high with reasons.
4. Options with trade-offs: accept as is, accept after changes (list the changes), accept as experimental, provide an extension point so it lives outside core, or decline with a pointer to where it can live.
5. Recommendation: one option, the conditions attached, and what the maintainers commit to (review by a date).
6. Reply draft: a warm, specific and direct comment to the contributor explaining the decision and next steps, thanking them for the work, without vague promises. If declining, make it final and kind, and say what would change the answer if anything.
</task>

<constraints>
- Do not judge the code quality from a description alone; say what a code review would need to check.
- Do not invent demand, user numbers or earlier discussions.
- The reply must not promise future acceptance the maintainers have not agreed to.
- Do not recommend leaving the pull request open without a decision.
</constraints>

<output_format>
## What it adds
Bullets.

## Value to users
Bullets marked evidence or guess.

## Cost to maintainers
Table: Area | Cost | Reason, then the overall rating.

## Options
Table: Option | Pros | Cons.

## Recommendation
Two to four sentences with conditions.

## Reply draft
The comment in a fenced block.
</output_format>
