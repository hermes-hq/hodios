---
schema: 1
id: generate-automated-report-commentary
kind: prompt
title: Design automated commentary for recurring reports
description: Designs rules and templates, or guarded AI generation, for the written commentary in recurring reports so it states movements accurately and never invents causes or numbers.
category: reporting
version: 1.0.0
status: incubating
stage: [design, build]
role: [data-analyst, data-engineer, financial-analyst, business-analyst]
inputs: [dataset, spec, text]
output: [plan, table, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [narrative-generation, materiality-thresholds, llm-guardrails, report-automation]
pairs_with:
  prompts: [automate-recurring-report, write-weekly-metrics-update, write-forecast-commentary]
args:
  - name: report
    description: "The recurring report: its metrics with definitions and direction (higher or lower is better), dimensions, frequency, audience, and an example of the commentary written by hand today."
    type: text
    required: true
  - name: approach
    description: "Template rules, a language model, or both; and the tools available (BI tool, Python, SQL, an AI API). Optional."
    type: text
output_contract:
  format: markdown
  sections: [Design summary, Facts table, Selection rules, Wording rules, Templates, AI guardrails, Tests, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Automated commentary goes wrong in predictable ways. It mentions every movement, so the reader cannot see which matter. It says "sales grew 300%" on a base of three orders. It writes "improved" when a cost or a churn rate went up. It reports percent changes on rates that should be in percentage points. It says "driven by" when nothing in the data says what drove it. And when a language model writes it freely, it can invent a number or a reason that sounds right. Robust designs separate computing from writing. First, code computes a facts table: each metric's current value, comparison values, absolute and relative change, whether the change passes a materiality rule (both an absolute and a relative threshold, or outside a noise band from history), its direction of good, and contributions by dimension from a proper decomposition. Second, selection rules decide which facts to mention and in what order. Third, either templates or a constrained model turn only those facts into sentences, and a check confirms that every number in the text appears in the facts table. Causes appear only when they come from a field (a tagged event, a decomposition), otherwise the text says the driver is not identified.
</context>

<task>
<report>
{{report}}
</report>
{{#approach}}

<approach>
{{approach}}
</approach>
{{/approach}}

1. Define the facts table: columns, how each change is computed, the comparison periods, the direction-of-good flag per metric, and the decomposition used for "contributed most" statements (for example additive contributions by segment for sums, mix and rate effects for ratios).
2. Set materiality rules per metric: an absolute and a relative threshold, or a noise band from recent history; rules for small bases (suppress percent change below a minimum base) and for rates (use percentage points); handling of first periods, missing data and sign changes from negative to positive.
3. Write selection rules: how many points to mention, ranking by size of contribution or distance from threshold, always-mention metrics, and what to say when nothing is material.
4. Write wording rules: verbs mapped to direction of good, precision and rounding, units, period names, and banned phrases ("driven by", "due to", "record") unless a field supports them.
5. Draft templates for each sentence type, with slots that map to facts table columns, and two filled examples from the report.
6. If a language model is used: the input it receives (only the selected facts), the instructions, the ban on new numbers and causes, a post-check that extracts every number from the output and matches it to the facts table within rounding, and fallback to templates when the check fails.
7. Define tests: a set of edge cases (zero base, tiny change, lower-is-better metric worsening, missing period, all flat) with the expected sentence or suppression.
8. Plan rollout: parallel run against hand-written commentary, a human sign-off step, and how errors are reported and fixed.
</task>

<constraints>
- Never let the commentary contain a number that is not in the facts table, or a cause that is not in a data field or an approved annotation.
- Keep the design implementable with the tools named; if none are named, describe it in tool-neutral terms with pseudocode at most.
- Use the report's own metric definitions; do not redefine metrics.
- Present thresholds as starting values derived from the data or labelled as assumptions.
</constraints>

<output_format>
## Design summary
## Facts table
Table: column | meaning | computation.

## Selection rules
## Wording rules
Table: situation | wording | example.

## Templates
Each template with slots and two filled examples.

## AI guardrails
Inputs, instructions, number check and fallback. Write "not used" if no model is used.

## Tests
Table: case | input | expected output.

## Rollout
</output_format>
