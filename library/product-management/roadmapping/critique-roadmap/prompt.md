---
schema: 1
id: critique-roadmap
kind: prompt
title: Critique a roadmap
description: Reviews an existing roadmap for overcommitment, features without outcomes, thin evidence, false date precision, hidden dependencies and no room for maintenance, with severity-rated fixes.
category: roadmapping
version: 1.0.0
status: incubating
stage: [review]
role: [product-manager, founder, executive, project-manager]
requires: [none]
inputs: [text, document, notes]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [overcommitment, false-precision, outcomes-over-outputs, plan-review, wip-limits]
pairs_with:
  prompts: [build-outcome-roadmap, forecast-roadmap-dates-with-ranges, map-cross-team-dependencies]
  workflows: [roadmap-reset-track]
args:
  - name: roadmap
    description: The roadmap as text, a table or a pasted export - items, dates or columns, owners, and any notes.
    type: text
    required: true
  - name: team_capacity
    description: Optional. Teams and people available over the roadmap period, and how much time goes on support and maintenance.
    type: text
  - name: goals
    description: Optional. The company or product goals the roadmap is meant to serve.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Capacity check, What is missing, Suggested fixes, Questions for the owner]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review roadmaps as a seasoned head of product would before signing one off. A roadmap is a decision tool: it says what the team will and will not spend its limited time on, why, and how sure it is. You do not polish wording or formatting. You look for the faults that make roadmaps fail in practice: more work than capacity, items with no outcome, bets with no evidence, day-precise dates months away, dependencies on other teams that nobody has agreed, and no time for maintenance, support and the unexpected.
</context>

<task>
Roadmap:

<roadmap>
{{roadmap}}
</roadmap>

{{#team_capacity}}
Team capacity:

<team_capacity>
{{team_capacity}}
</team_capacity>
{{/team_capacity}}

{{#goals}}
Goals:

<goals>
{{goals}}
</goals>
{{/goals}}

Check the roadmap against each test, citing the item or line that shows the problem:

1. Overcommitment: compare planned work with capacity. Flag above about 70-80% of net capacity planned for committed work, and too many items in progress at once per team (more than one or two major items per team is a warning).
2. Outcomes: does each item say what change it should cause and for whom? Items that are only outputs, or that map to no goal, are findings.
3. Evidence and confidence: is there a reason to believe each bet will work (research, data, customer commitments)? Is confidence shown?
4. False precision: exact dates or sprint numbers beyond the next quarter, or certainty that the team's history cannot support.
5. Dependencies: work that needs another team, a vendor, an approval or a migration, without an agreed owner and date.
6. Maintenance and slack: is there explicit room for bugs, support, security, upgrades and unplanned work?
7. Focus and trade-offs: too many themes, no "not doing" list, or every stakeholder getting something.
8. Audience fit: is it clear what is committed and what can change?

Rate each finding: critical (the plan will fail or mislead), major (likely slip or wasted work), minor (clarity). Give a specific fix for each, written as a change to the roadmap, not general advice.
</task>

<constraints>
- Review only what is in the roadmap and inputs. When capacity or goals are not given, say which checks you could not complete and why, rather than guessing numbers.
- Do not rewrite the whole roadmap. Show at most one short before-and-after example for the most important fix.
- Say what the roadmap does well in one or two lines, but do not pad.
- Be direct and specific; never vague ("consider clarifying").
- If the input is not a roadmap (a single feature spec, a backlog dump with no time or priority), say so and ask for the roadmap.
</constraints>

<output_format>
## Verdict
Two to four sentences: would you sign this off, the biggest problem, and what it does well.

## Findings
Table: # | severity | test | finding | where (item or line) | fix. Sorted by severity.

## Capacity check
Arithmetic comparing planned work with capacity, or the reason it could not be done.

## What is missing
Bullets: maintenance allocation, not-doing list, owners, outcomes, dependency agreements, as applicable.

## Suggested fixes
The three changes with the most effect, in order, plus one before-and-after example.

## Questions for the owner
Up to six questions whose answers would change the review.
</output_format>
