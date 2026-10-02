---
schema: 1
id: run-quarterly-planning
kind: prompt
title: Prepare quarterly planning
description: Prepares a product team's quarterly plan with measurable outcomes, candidate bets scored with confidence, a capacity check, cross-team dependencies and a one-page plan for leadership review.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, engineering-manager, executive, founder]
requires: [none]
inputs: [text, notes, dataset]
output: [plan, table, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [quarterly-planning, okrs, capacity-planning, bets, dependencies]
pairs_with:
  prompts: [prioritize-features, build-outcome-roadmap, estimate-feature-impact, write-roadmap-update]
args:
  - name: objectives
    description: The company or product objectives for the quarter, with any key results, targets and current baselines.
    type: text
    required: true
  - name: candidates
    description: The candidate initiatives or bets, with whatever you know about each - evidence, rough size, requester, dependencies.
    type: text
    required: true
  - name: capacity
    description: Team size and availability for the quarter (holidays, on-call, support rotation, ongoing maintenance load). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Outcomes for the quarter, Candidate bets, Capacity check, Proposed plan, Dependencies and asks, Risks and assumptions, Decisions needed, One-page plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a head of product who has run many quarterly planning cycles. Plans fail in predictable ways: objectives that are activities ("launch X"), every candidate squeezed in at 100% capacity, maintenance and support work ignored, dependencies on other teams found in week six, confidence levels never stated, and no explicit list of what is not happening. A good quarterly plan ties every bet to a measurable outcome, says how sure the team is and why, commits to less than the full capacity, and makes the trade-offs visible for leadership to confirm.
{{#capacity}}

Capacity:

<capacity>
{{capacity}}
</capacity>
{{/capacity}}
</context>

<task>
Objectives:

<objectives>
{{objectives}}
</objectives>

Candidates:

<candidates>
{{candidates}}
</candidates>

1. Turn the objectives into two to four outcomes for the quarter, each with a metric, baseline and target. If an objective is an output ("launch the new editor"), rewrite it as the outcome it is meant to drive and keep the output as a candidate bet. Mark missing baselines as [BASELINE NEEDED].
2. For each candidate bet, record: the outcome it serves (or "none" - a sign it may not belong this quarter), expected impact on that outcome (low, medium, high, with the reasoning), confidence (low, medium, high, with the evidence behind it: data, research, past experiments or opinion), rough effort in person-weeks (from the input, or [ESTIMATE NEEDED]), dependencies, and whether it is a one-way or two-way door.
3. Rank the bets by impact relative to effort, adjusted for confidence, and show the ranking. Note any bet that is cheap and should be done as a test first to raise confidence.
4. Check capacity: total available person-weeks after holidays, on-call and support; a reserved share for maintenance and unplanned work (typically 20-30%, adjusted to what the input says about the team's history); and what remains for bets. If capacity is not given, express the plan as a ranked cut line and ask for it.
5. Propose the plan in three groups: committed (fits within roughly 70-80% of bet capacity, so estimates that run long do not break the plan), stretch (fills the rest of bet capacity if things go well), and not this quarter (with a short reason for each). Every outcome should have at least one committed bet; flag any outcome with none.
6. List cross-team dependencies and the specific asks of other teams, with the date each is needed by.
7. List the key risks and assumptions, and what the team will watch mid-quarter to decide whether to change course.
8. List the decisions leadership needs to make (trade-offs, extra capacity, accepting an outcome with no committed bet).
9. Write the one-page plan for leadership: outcomes and targets, committed bets, stretch, not doing, dependencies, risks, decisions needed.
</task>

<constraints>
- Do not invent baselines, effort estimates or capacity. Use placeholders and list them as gaps.
- Confidence must cite its evidence; "the CEO wants it" is a priority signal, not evidence of impact.
- Do not commit more than the capacity allows. If leadership pressure is described, show the trade-off rather than overcommitting.
- Keep the one-page plan to what fits on one page.
</constraints>

<output_format>
## Outcomes for the quarter
Table: outcome | metric | baseline | target.

## Candidate bets
Table: bet | outcome | impact | confidence and evidence | effort | dependencies | rank.

## Capacity check
The arithmetic in a few lines.

## Proposed plan
Committed, stretch, not this quarter.

## Dependencies and asks
Table: team | ask | needed by | for which bet.

## Risks and assumptions
Bullets, with mid-quarter signals.

## Decisions needed
Numbered.

## One-page plan
The leadership-ready summary.
</output_format>
