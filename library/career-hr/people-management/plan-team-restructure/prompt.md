---
schema: 1
id: plan-team-restructure
kind: prompt
title: Plan a team restructure
description: Plans a team restructure with design options, the impact on each person, risks, a communication sequence and support for affected staff. Use before reorganising a team or changing reporting lines.
category: people-management
version: 1.0.0
status: incubating
stage: [plan, design]
role: [manager, engineering-manager, executive, operations-manager]
requires: [none]
inputs: [notes, text]
output: [plan, table, script]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [reorganisation, org-design, change-management, reporting-lines, team-topology]
pairs_with:
  prompts: [plan-layoff-conversation, write-team-charter, write-internal-announcement, write-headcount-request]
  personas: [hr-business-partner, leadership-coach]
args:
  - name: current_structure
    description: How the team is organised now - groups, reporting lines, roles and headcount (initials or roles rather than names if you prefer), what works and what does not.
    type: text
    required: true
  - name: goals
    description: What the restructure must achieve - faster delivery, clearer ownership, a new product area, lower cost, fewer layers, a merger of teams - and how you will know it worked.
    type: text
    required: true
  - name: constraints
    description: Limits such as budget, headcount (fixed, growing or shrinking), people who must stay in role, locations, timing, the country of employment, and whether any roles might be eliminated. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Problem statement, Design options, Recommended design, People impact, Risks, Communication sequence, Support for affected staff, Measures and review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise leaders on organisation design and change. Restructures are expensive. They cost months of reduced productivity, people leaving, and lost trust if handled badly. They succeed when the problem is diagnosed before boxes are drawn, when the design follows the work (customers, products, flows, decisions) rather than personalities, when people affected hear it first and personally before any broadcast, and when the leader is honest about what is decided and what is still open. They fail when the change is announced by a slide or a leak, when managers learn at the same time as their reports, or when a reorg is used to avoid a performance conversation.

<current_structure>
{{current_structure}}
</current_structure>

<goals>
{{goals}}
</goals>
{{#constraints}}
<constraints_input>
{{constraints}}
</constraints_input>
{{/constraints}}
</context>

<task>
1. Problem statement: restate the problems the current structure causes, with the evidence given (handoffs, unclear ownership, overloaded managers, duplicated work, slow decisions). Say whether a restructure is the right tool, or whether a lighter fix such as clarifying roles, changing processes or addressing a performance issue would solve it. If a lighter fix is enough, say so first.
2. Design options: two or three structures (for example, by product, customer, function or flow, or a hybrid). For each, sketch the groups and reporting lines, the spans of control, what it optimises, what it makes harder, and the cost of the transition. Score each option against the goals.
3. Recommended design: choose one, explain why, and describe the interfaces between groups (who owns what, how decisions cross boundaries).
4. People impact: a table of each role or person showing their current position, their new position, the type of change (none, new manager, new scope, new role, role at risk), and the conversation they need. Flag anyone whose role is eliminated or materially changed, and anyone whose change may look like a demotion.
5. Risks: key-person and attrition risk, loss of knowledge, customer impact, morale, timing against deadlines, and legal or process risk. Where roles are eliminated or changed significantly, consultation, selection and notice obligations may apply depending on the country and contract; say this must be planned with HR and employment counsel before any announcement.
6. Communication sequence: an hour-by-hour or day-by-day order: leadership alignment, HR and legal review, managers briefed, one-to-one conversations with the most affected people, the team announcement, the wider announcement, and the follow-up. Include talking points for the team announcement (why, what changes, what does not, what is still open, the timeline, where to ask questions) and the five hardest questions people will ask, with honest answers.
7. Support for affected staff: for changed roles, transition plans, new one-to-ones, and clarity on expectations. For roles at risk, process fairness, redeployment options, and support such as outplacement and references, following policy.
8. Measures and review: two to four indicators tied to the goals, with a review at 30, 60 and 90 days, and the conditions under which the design would be adjusted.
</task>

<constraints>
- Use only the facts given; mark assumptions and gaps as [X] and ask about them at the end.
- Design around work and outcomes, not around individuals; do not use a restructure to remove a specific person for performance reasons. If the input suggests that, say so and point to a fair performance process.
- Do not state legal requirements as fact. Flag where HR and employment counsel must be involved.
- Be candid about trade-offs; no option is free.
</constraints>

<output_format>
## Problem statement
## Design options
Table: Option | Structure | Optimises | Makes harder | Transition cost | Score against goals.
## Recommended design
## People impact
Table: Role or person | Now | After | Change type | Conversation needed.
## Risks
Table: Risk | Likelihood | Impact | Mitigation.
## Communication sequence
Table: When | Who | What | Channel. Then the talking points and hard questions.
## Support for affected staff
## Measures and review
</output_format>
