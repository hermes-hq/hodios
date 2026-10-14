---
schema: 1
id: plan-greenfield-first-iteration
kind: prompt
title: Plan the first iteration of a new project
description: Plans the first one to three weeks of a brand-new engineering project, from access and early decisions to a walking skeleton deployed to production, with exit criteria before feature work starts.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, software-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [text, spec, notes]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [iteration-zero, walking-skeleton, project-kickoff, delivery-pipeline]
pairs_with:
  prompts: [scaffold-new-service, write-definition-of-done, plan-project-milestones]
args:
  - name: project
    description: What the new project is, who it is for, the team size and the first real feature it must deliver.
    type: text
    required: true
  - name: constraints
    description: Fixed choices and limits, such as required cloud or platform, security or compliance reviews, existing company tooling, and the date of the first demo or release.
    type: text
  - name: duration
    description: Time available for the first iteration.
    type: string
    default: "2 weeks"
output_contract:
  format: markdown
  sections: [Goal of the iteration, Decisions to make now, Walking skeleton, Plan by day or week, Deliberately deferred, Exit criteria, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The first iteration of a new project decides how fast every later one goes. Teams lose it in two opposite ways. Some start writing features on a laptop and discover in month two that nothing deploys, nobody has production access, and the security review takes six weeks. Others spend a month polishing infrastructure, a perfect cluster and a design system, with no user-facing slice to show. The proven middle path is a walking skeleton: the thinnest end-to-end slice of the real first feature, built through every layer and deployed to a production-like environment by an automated pipeline, with logs and an alert. Lead times that are not engineering work (accounts, cloud permissions, domain names, data access, vendor contracts, legal or security sign-off) usually dominate week one and must be started on day one. Decisions that are expensive to reverse (data store, language, hosting model, tenancy, auth provider) deserve a short written record now; everything cheap to change should be deferred on purpose.
</context>

<task>
<project>
{{project}}
</project>
{{#constraints}}
<constraints_from_user>
{{constraints}}
</constraints_from_user>
{{/constraints}}
Time available: {{duration}}.

1. State the goal of the iteration in one sentence, naming the walking skeleton slice of the first real feature it ends with.
2. List the decisions to make now, split into hard to reverse (record each briefly with options and who decides) and cheap to change (pick a sensible default and move on).
3. List long-lead items to start on day one: access, accounts, environments, data, third-party contracts and any security, privacy or compliance review, each with an owner and the risk if it slips.
4. Define the walking skeleton: the user action it supports end to end, each layer it touches, the pipeline that builds, tests and deploys it, and the minimum observability (logs, one health check, one alert).
5. Lay out the plan by day for iterations up to two weeks, or by week if longer, with who does what so the team works in parallel, and a mid-point check.
6. List what is deliberately deferred and the trigger that would bring each item back.
7. Write exit criteria that must be true before feature work starts, and the questions still open.
</task>

<constraints>
- Fit the plan into {{duration}}. If the long-lead items cannot finish in time, say so and show what the team does while waiting rather than stretching the plan silently.
- Do not pick specific vendors, frameworks or cloud services unless the user named them or asked; state the requirement and the options.
- Do not invent company processes, approval times or tool names; mark them as things to confirm.
- Keep infrastructure to what the walking skeleton needs. Flag gold-plating such as multi-region, custom platforms or a full design system as deferred unless a stated requirement demands it.
- If the first feature is unclear, ask for it before planning; a skeleton needs a real slice.
</constraints>

<output_format>
## Goal of the iteration
One sentence.
## Decisions to make now
Table: decision, hard or cheap to reverse, options, default or owner.
## Walking skeleton
The user action, the layers, the pipeline and the observability, as bullets.
## Plan by day or week
Table: day or week, work items, owner role, done when. Include the long-lead items in the first row.
## Deliberately deferred
Table: item, why deferred, trigger to revisit.
## Exit criteria
Checklist.
## Open questions
Numbered.
</output_format>
