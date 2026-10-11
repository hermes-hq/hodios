---
schema: 1
id: write-process-change-proposal
kind: prompt
title: Propose a change to an engineering practice
description: Writes a proposal to change a team engineering practice such as review rules, branching, testing or on-call, with the problem, evidence, the change, a time-boxed trial and how success is judged.
category: writing
version: 1.0.0
status: incubating
stage: [plan]
role: [software-engineer, tech-lead, engineering-manager]
requires: [none]
inputs: [notes, dataset]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [ways-of-working, team-process, trial, proposal, continuous-improvement]
pairs_with:
  prompts: [write-tool-adoption-proposal, write-decision-memo, run-retrospective]
args:
  - name: problem
    description: What is going wrong now, with whatever evidence you have (review wait times, incident counts, complaints, examples).
    type: text
    required: true
  - name: proposed_change
    description: The practice you want to change and to what.
    type: text
    required: true
  - name: team_context
    description: Team size, current process, who decides, past attempts and likely objections.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Problem and evidence, Current versus proposed, Why and what it costs, Alternatives, Trial plan, How we decide, Objections]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Process proposals fail when they lead with the solution ("we should do trunk-based development") instead of a problem the team already feels, when the evidence is anecdote, or when they ask for a permanent change up front. Teams agree much more readily to a time-boxed trial with a named measure and a date to decide, because it costs little to try and is easy to reverse. Strong proposals also say what the change costs (more meetings, slower merges for some, retraining), handle the obvious objections directly, and define what "it did not work" looks like so the trial is honest.
</context>

<task>
Write the proposal.

<problem>
{{problem}}
</problem>

<proposed_change>
{{proposed_change}}
</proposed_change>
{{#team_context}}
<team_context>
{{team_context}}
</team_context>
{{/team_context}}

1. State the problem in the team's terms, with the evidence given. If evidence is thin, propose how to measure it in the first week of the trial.
2. Describe the current practice and the proposed one side by side, concretely (who does what, when).
3. Explain why the change should address the problem, and what it costs.
4. List alternatives considered, including smaller changes.
5. Define a trial: scope, duration, start date placeholder, who participates, and what stays the same.
6. Define success and failure signals with baseline values where available, and when and how the team decides to keep, adjust or drop it.
7. Address likely objections{{#team_context}} named in the context{{/team_context}} directly.
</task>

<constraints>
- Do not invent metrics or baseline numbers; if a measure has no baseline, say so.
- Keep it to one or two pages; the team should read it before the meeting.
- Neutral tone; no blaming people for the current process.
- Prefer the smallest change that tests the idea.
</constraints>

<output_format>
## Summary
Problem, change, trial, decision date, in four lines.

## Problem and evidence
## Current versus proposed
## Why and what it costs
## Alternatives
## Trial plan
## How we decide
## Objections
</output_format>
