---
schema: 1
id: derive-test-cases-from-requirements
kind: prompt
title: Derive test cases from requirements
description: Derives a test case list from requirements using equivalence partitions, boundary values, decision tables and state transitions, with each case traced to a rule.
category: testing
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [qa-engineer, software-engineer, business-analyst]
requires: [none]
inputs: [spec, ticket, text]
output: [table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [test-design, boundary-values, equivalence-partitioning, decision-tables, requirements]
pairs_with:
  prompts: [write-manual-test-cases, write-gherkin-scenarios, write-unit-tests]
  personas: [test-engineer]
args:
  - name: requirements
    description: The requirements, user story, acceptance criteria or business rules to test, as written.
    type: text
    required: true
  - name: depth
    description: How thorough to be - "core" for the highest-value cases only, "full" for complete technique coverage.
    type: enum
    enum: [core, full]
    default: core
output_contract:
  format: markdown
  sections: [Rules extracted, Techniques applied, Test cases, Ambiguities]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Test cases written by intuition cluster around the happy path and miss the edges where defects live. Black-box test design techniques make coverage systematic: equivalence partitioning picks one representative per class of input that should behave the same, boundary value analysis tests just below, on and just above each limit (where off-by-one errors and "less than" versus "less than or equal" mistakes hide), decision tables cover combinations of conditions in business rules, and state transition testing covers valid and invalid moves between states. The other half of the value is finding gaps: writing cases forces questions the requirement does not answer (what happens at exactly 18, is the limit inclusive, what if both discounts apply), and those questions are often worth more than the cases.
</context>

<task>
Derive test cases for:
{{requirements}}

Depth: {{depth}}

1. Extract every testable rule from the requirements as a numbered list (R1, R2, ...): inputs and their valid ranges or formats, conditions and outcomes, states and transitions, limits, defaults and error behaviour. Quote the wording a rule comes from when it is ambiguous.
2. For each input, list equivalence partitions: valid classes and invalid classes (wrong type, empty, missing, too long, out of range, wrong format).
3. For each numeric, date, length or count limit, list boundary values: just below, on and just above each edge. State the assumption about whether the limit is inclusive when the requirement does not say.
4. For rules that combine two or more conditions, build a decision table of condition combinations and expected outcomes; collapse combinations that cannot occur or have the same outcome, and say which.
5. For anything with a lifecycle (order status, account state, approval flow), list states and allowed transitions, then add cases for disallowed transitions.
6. Turn these into test cases. With depth "core", keep the cases that cover each partition once, each boundary and each decision table column, and drop redundant ones. With depth "full", include every combination worth running and mark lower-priority ones.
7. List ambiguities and gaps found while deriving cases, each with the cases blocked by it.
</task>

<constraints>
- Every test case traces to at least one rule id.
- Expected results come from the requirements. Where the requirements are silent, write "unspecified" and add an ambiguity rather than inventing behaviour.
- Use concrete input values, not "a valid value".
- Do not pad with cases that exercise the same partition twice.
{{> output/uncertainty}}
</constraints>

<output_format>
## Rules extracted
Numbered R1, R2, ... one line each.

## Techniques applied
Partitions, boundaries, decision tables and state transitions as compact lists or tables.

## Test cases
Table: id | rules | technique | input or precondition | expected result | priority.

## Ambiguities
Numbered questions, each naming the blocked case ids.
</output_format>
