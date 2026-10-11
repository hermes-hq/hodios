---
schema: 1
id: generate-pairwise-test-combinations
kind: prompt
title: Generate pairwise test combinations
description: Generates a pairwise (all-pairs) combination set for many configuration options or inputs, honouring constraints on invalid combinations, and proves every pair is covered.
category: testing
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [qa-engineer, software-engineer]
requires: [none]
inputs: [text, config, spec]
output: [table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [combinatorial-testing, all-pairs, test-design, configuration-testing]
pairs_with:
  prompts: [derive-test-cases-from-requirements, plan-device-and-browser-matrix, write-property-based-tests]
args:
  - name: parameters
    description: Each parameter and its values, for example "browser - chrome, firefox, safari; plan - free, pro, enterprise; locale - en, de, ja".
    type: text
    required: true
  - name: constraints
    description: Combinations that are impossible or not supported, for example "safari only on macos", "enterprise always has sso".
    type: text
  - name: strength
    description: Interaction strength - 2 for pairwise, 3 for every triple when three-way interactions are a known risk.
    type: enum
    enum: ["2", "3"]
    default: "2"
output_contract:
  format: markdown
  sections: [Parameters, Combination set, Coverage check, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Testing every combination of options explodes quickly: ten options with three values each is 59,049 runs. Field studies of defects show most configuration bugs are triggered by a single value or an interaction between two parameters, so a set where every pair of values appears in at least one test catches most of them at a tiny fraction of the cost, often 10 to 20 rows. The practical traps are constraints (an invalid row wastes a test or cannot run, and simply deleting it loses pairs that then need another row), parameters with many values (the row count is at least the product of the two largest value counts), and claiming coverage without checking it. For large or many parameter sets, a dedicated tool (PICT, AllPairs, or a library in the project's language) is more reliable than hand-built tables, and its model file is worth producing.
</context>

<task>
Build a combination set for:
{{parameters}}
{{#constraints}}

Constraints: {{constraints}}
{{/constraints}}

Interaction strength: {{strength}}

1. List the parameters and values. Point out values that are equivalent for testing purposes and could be merged, and parameters that look independent of the rest and could be tested separately, but do not merge anything without saying so.
2. Express each constraint as a rule (for example "IF os = windows THEN browser <> safari").
3. Compute the lower bound on rows (product of the two largest value counts for strength 2, three largest for strength 3) and the full Cartesian count for comparison.
4. Build the set: start from the parameters with the most values, fill rows so each new row covers as many uncovered pairs as possible, and never emit a row that violates a constraint. Give every row an id.
5. Check coverage: list every valid pair (or triple) and confirm each appears in some row. Report any pair that is impossible because of constraints separately from any that is missing. If a pair is missing, add a row for it.
6. If the parameter count or value counts make a hand-built set error-prone (more than about 8 parameters or 50 rows), also give a PICT model file with the parameters and constraints, so the set can be regenerated with a tool.
7. Suggest which rows to run first if time is short: the rows containing the riskiest or most used values.
</task>

<constraints>
- No row may violate a stated constraint.
- Do not claim full pairwise coverage without the coverage check.
- Do not drop parameters or values to make the table smaller without saying so.
- Pairwise does not replace single-value tests of critical values or tests of known three-way interactions; say so if the input suggests one.
</constraints>

<output_format>
## Parameters
Table: parameter | values | notes. Then the constraint rules.

## Combination set
Table with one column per parameter plus a row id. Then: rows, lower bound, full Cartesian count.

## Coverage check
Pairs or triples covered, excluded by constraints, and added. A PICT model in a code block when step 6 applies.

## Notes
Run order if time is short, and any merges or risks flagged.
</output_format>
