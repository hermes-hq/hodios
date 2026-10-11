---
schema: 1
id: reduce-bus-factor
kind: prompt
title: Reduce a team's bus factor
description: Maps which systems and skills depend on one person, ranks them by risk, and plans cross-training, pairing, rotation and docs to spread the knowledge without stalling delivery.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead]
stack: []
requires: [none]
inputs: [text, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [bus-factor, knowledge-sharing, cross-training, key-person-risk]
pairs_with:
  prompts: [plan-team-capacity, write-ownership-handover-doc, pick-starter-tasks-for-new-engineer]
  personas: [engineering-manager]
args:
  - name: team_and_systems
    description: Team members and the systems, codebases, on-call duties and skills each one covers, including who is the only person who can do something.
    type: text
    required: true
  - name: capacity_for_this
    description: How much time the team can spend on knowledge spreading, for example "10% for a quarter".
    type: string
    default: about 10% of team time
output_contract:
  format: markdown
  sections: [Knowledge map, Risk ranking, Plan, Delivery impact, Measures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The bus factor is the number of people who would have to be unavailable before work on something stops. A factor of one is common and dangerous: a holiday, illness or resignation turns into an outage or a frozen roadmap. Documentation alone rarely fixes it, because the missing knowledge is how to judge and debug, not where the files are. What works is giving a second person real practice: pairing on actual changes, the expert reviewing instead of writing, rotating the second person into on-call for that system, and a recorded walkthrough of a deploy or incident. The expert often guards the area without meaning to, so the plan must make their role as teacher explicit and count it as work.
</context>

<task>
<team_and_systems>
{{team_and_systems}}
</team_and_systems>
Time available: {{capacity_for_this}}.

1. Build a knowledge map: each system or skill against each person, rated as can operate alone, can operate with help, or cannot.
2. Rank the single-person risks by impact if that person were away for a month (outage, blocked roadmap, compliance or security exposure) and by how often the knowledge is needed.
3. For the top risks, plan how to spread the knowledge: name the learner, the method (pairing on real tickets, swapping author and reviewer, shadow then reverse-shadow on-call, recorded walkthrough, runbook written by the learner) and the evidence that it worked, such as the learner doing a deploy or fixing an incident alone.
4. Fit the plan into the time available, sequenced so the riskiest gap closes first.
5. State the delivery impact honestly and how to protect the experts from becoming bottlenecks during the plan.
6. Define how to track progress: the knowledge map re-rated at set dates and a target of at least two capable people per critical system.
</task>

<constraints>
- Do not judge individuals' performance; this is about risk, not blame.
- Prefer practice on real work over documentation-only fixes, but include docs where they are the right tool.
- Do not assume anyone's skills beyond what is stated.
- Respect the stated time; if it is not enough for the top risks, say so.
</constraints>

<output_format>
## Knowledge map
Table: system or skill | each person's rating.
## Risk ranking
Table: risk | impact if away | frequency | rank.
## Plan
Table: risk | learner | method | done when | weeks.
## Delivery impact
Two to four bullets.
## Measures
Bullets.
</output_format>
