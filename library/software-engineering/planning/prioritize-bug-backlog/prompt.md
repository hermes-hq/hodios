---
schema: 1
id: prioritize-bug-backlog
kind: prompt
title: Prioritise a bug backlog
description: Ranks an open bug backlog by severity, frequency, users affected and fix cost, then picks what to fix this cycle, what to batch, what needs data and what to close.
category: planning
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [tech-lead, engineering-manager, qa-engineer, product-manager]
stack: []
requires: [none]
inputs: [ticket, dataset, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [bug-triage, defect-prioritization, bug-backlog, severity, quality]
pairs_with:
  prompts: [write-bug-severity-policy, prune-team-backlog, plan-stabilization-sprint]
args:
  - name: bugs
    description: The open bugs, as an export or list, with whatever you have per bug (title, severity, reports or occurrences, affected users or customers, age, area, any estimate).
    type: text
    required: true
  - name: capacity
    description: How much bug-fixing time is available this cycle, for example "about 8 engineer-days".
    type: string
  - name: context
    description: Product context that changes priority, for example key customers, upcoming launches, regulated features, SLAs.
    type: text
output_contract:
  format: markdown
  sections: [Fix now, This cycle, Batch by area, Needs information, Close, Patterns]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Bug backlogs are usually sorted by severity label alone, which is set once by whoever filed the bug and rarely updated. What actually matters is impact (how bad for the user, with data loss, security, money and legal issues at the top), reach (how many users or how often, ideally from error tracking or support counts rather than how loudly someone complained), cost to fix, and whether a cheap workaround exists. Old bugs that nobody has hit in a year are often already fixed or irrelevant; keeping them hides the important ones. Clusters of bugs in one area often point to one underlying cause worth fixing once.
</context>

<task>
<bugs>
{{bugs}}
</bugs>
{{#capacity}}Capacity this cycle: {{capacity}}{{/capacity}}
{{#context}}Context: {{context}}{{/context}}

1. Normalise the list: merge duplicates (say which), and note bugs missing the information needed to rank them.
2. Pull out anything that must be fixed now regardless of the plan: data loss or corruption, security or privacy exposure, wrong charges or money movements, legal or accessibility obligations, and anything breaking a core flow for many users. Recommend these go through the incident or hotfix path, not the backlog.
3. Score the rest: impact (1 to 4), reach (1 to 4, from the evidence given, saying what the evidence is), fix cost (S, M, L, unknown), and workaround (yes or no). Rank by impact times reach, then cheaper fixes first among equals.
4. Fill the cycle's capacity from the top of the ranking, leaving about 20% for new bugs that arrive during the cycle.
5. Batch: group bugs by component or root cause where one fix or one person's focused time clears several.
6. Needs information: bugs that cannot be ranked without reproduction steps, logs or counts, with the question for each.
7. Close: candidates to close (cannot reproduce after a set age, obsolete feature, duplicates, won't fix), with a reason to post on each.
8. Patterns: areas with many bugs, and whether that points to missing tests, a fragile module or a release process gap.
</task>

<constraints>
- Do not invent counts, users or estimates; where reach is unknown, say so and score it as unknown.
- Never close or deprioritise a possible security, data-loss or payment bug because it is old; ask to verify it instead.
- Recommendations to close are proposals for the team, not actions to take in the tracker.
{{> output/uncertainty}}
</constraints>

<output_format>
## Fix now
Table: Bug | Why it cannot wait | Path (hotfix, incident).
## This cycle
Table: Rank | Bug | Impact | Reach (evidence) | Cost | Workaround.
## Batch by area
## Needs information
Table: Bug | Question.
## Close
Table: Bug | Reason | Comment to post.
## Patterns
</output_format>
