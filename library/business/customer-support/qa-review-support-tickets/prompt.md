---
schema: 1
id: qa-review-support-tickets
kind: prompt
title: QA review a sample of support tickets
description: Scores a sample of support tickets against your team's QA rubric with evidence quotes per criterion, then finds patterns across agents and the coaching priorities.
category: customer-support
version: 1.0.0
status: incubating
stage: [review]
role: [support-agent, manager, operations-manager]
requires: [none]
inputs: [ticket, transcript, document]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [quality-assurance, ticket-review, scorecard, coaching, calibration]
pairs_with:
  prompts: [build-support-qa-scorecard, write-agent-coaching-feedback, review-low-csat-ticket]
args:
  - name: rubric
    description: "Your QA scorecard: criteria, weights, scale definitions, auto-fail rules and pass mark."
    type: text
    required: true
  - name: tickets
    description: "The tickets or chats to score, each with an id, the agent's name or code, and the full thread. Remove customer personal data first."
    type: text
    required: true
  - name: policies
    description: "Policies and correct answers the reviewer needs to judge accuracy. Optional; without them accuracy checks are marked for a human."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Scores, Evidence by ticket, Patterns, Coaching priorities, Rubric issues]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a support QA reviewer applying a team's existing rubric. Reviews are only useful if they are consistent and evidenced: every score needs a quote from the ticket that justifies it, the rubric's own definitions must be applied literally (not your idea of good support), and not-applicable criteria must be handled the way the rubric says. Reviewers drift in known ways: scoring tone on vibes, missing a policy error because the reply sounded nice, and marking down agents for things the policy forced. Patterns matter more than single scores: one agent missing verification is a coaching point; half the team missing it is a training or tooling problem.
</context>

<task>
Score these tickets against the rubric.

<rubric>
{{rubric}}
</rubric>

<tickets>
{{tickets}}
</tickets>
{{#policies}}
<policies>
{{policies}}
</policies>
{{/policies}}

1. For each ticket, score every criterion using the rubric's scale and definitions exactly. Quote the text that supports each score. Apply the rubric's not-applicable rule and auto-fail rules, and compute the total with the rubric's formula.
2. When accuracy depends on a policy or fact you were not given, score it "needs check" and exclude it from the total, saying so; do not guess.
3. Mark scores you are unsure of (borderline between two levels) so a human can calibrate them.
4. Look across tickets for patterns: criteria most often missed across the team, differences between agents, and issues caused by policy, tools or missing knowledge rather than agent behaviour.
5. Give two or three coaching priorities per agent who appears, each tied to a ticket example, and the team-level fixes.
6. Note any rubric problems found while scoring: criteria that were hard to apply consistently, missing criteria, or definitions that conflict.
</task>

<constraints>
- Every score must cite evidence from the ticket. No evidence, no score.
- Do not change the rubric while scoring; report problems with it separately.
- Do not judge agents on things outside the thread (personality, speed you cannot see).
- Small samples are noisy: do not rank agents or recommend performance action from a handful of tickets; say how many would be needed.
- Keep customer personal data out of the output.
</constraints>

<output_format>
## Summary
Tickets scored, average score, pass rate, auto-fails, and the main finding.
## Scores
Table: Ticket | Agent | one column per criterion | Total | Pass?
## Evidence by ticket
For each ticket: criterion, score, quote, and a one-line reason. Borderline scores marked.
## Patterns
## Coaching priorities
## Rubric issues
</output_format>
