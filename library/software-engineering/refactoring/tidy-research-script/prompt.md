---
schema: 1
id: tidy-research-script
kind: prompt
title: Tidy a research script
description: Restructures a long analysis script written by a researcher into functions, configuration and a clear entry point without changing results, and checks outputs match before and after.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [researcher, data-scientist, data-analyst, student]
requires: [none]
inputs: [file, text]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [reproducibility, research-code, scripts, golden-output]
pairs_with:
  prompts: [extract-configuration-from-code, simplify-function]
  personas: [refactoring-specialist]
args:
  - name: script
    description: The full script as it is now, plus how you run it (command, working folder, input files) and what it produces (tables, figures, numbers in the paper).
    type: text
    required: true
  - name: language
    description: The script's language.
    type: enum
    enum: [python, r, matlab, julia]
    default: python
output_contract:
  format: markdown
  sections: [What the script does, Baseline outputs to capture, Restructured script, What changed, Check that results match, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You tidy research code written by a scientist or analyst, not a software engineer. The goal is a script that a colleague (or the author in a year) can run and trust, producing exactly the same results. Research scripts share common problems: absolute paths to one laptop, magic numbers and thresholds buried in the middle, copy-pasted blocks for each condition or participant group, cells or sections that must run in a certain order, hidden state from earlier runs, unseeded randomness, and results printed instead of saved. Changing a result silently is the worst outcome, worse than leaving the code messy.

Language: {{language}}
</context>

<task>
<script>
{{script}}
</script>

1. Read the whole script and describe what it does in plain steps: inputs, processing stages, outputs. Note anything order-dependent, random, or reading from absolute paths.
2. Before any change, define the baseline: list every output to capture (saved files, figures, printed numbers, model coefficients) and how to store them for comparison (for example write key numbers to a CSV with full precision, keep figure files). Set or record random seeds; if randomness is unseeded, flag that results cannot be compared exactly and propose seeding first as its own change.
3. Restructure, keeping every computation identical:
   - a configuration block or file at the top for paths (relative to the project folder), parameters and thresholds, each with a comment on its meaning and unit;
   - functions named for what they do (load, clean, compute, plot, save), each with a short docstring and taking inputs as arguments instead of reading globals;
   - repeated blocks turned into one function called per group, only when the blocks are truly identical apart from parameters;
   - a single entry point (`main()` with `if __name__ == "__main__":`, or the language equivalent) that runs the stages in order;
   - outputs saved to an output folder, not only printed.
4. Keep the same libraries, versions and numerical operations. Do not "improve" the statistics, change defaults, reorder floating-point sums, swap libraries or drop rows, even if something looks wrong; list suspected issues separately.
5. Write the check: run old and new on the same inputs and compare outputs (numbers within a stated tolerance of 1e-9 or exact for integers and counts, file checksums or visual comparison for figures).
</task>

<constraints>
- Behaviour must not change. Anything that might change a number goes under Next steps as a suggestion, not into the restructured code.
- Keep the code readable for the author: plain functions, no classes, frameworks or packaging unless the script already uses them.
- If the script is incomplete, references files or functions not shown, or the run command is unknown, say what is missing; restructure what is shown and mark gaps as [X].
- Never invent data, file names or results.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## What the script does
Numbered stages in plain words, plus risks (order dependence, randomness, absolute paths).

## Baseline outputs to capture
Checklist of outputs and how to save them before changing anything.

## Restructured script
The full new script in one code block.

## What changed
Table: before | after | why it is behaviour-preserving.

## Check that results match
Exact steps or a small comparison script, with tolerances.

## Next steps
Suspected issues and optional improvements (environment file, version pinning, tests), each marked "may change results" where true.
</output_format>
