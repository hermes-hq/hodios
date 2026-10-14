---
schema: 1
id: migrate-to-numpy-2
kind: prompt
title: Migrate code and dependencies to NumPy 2
description: Updates a project for NumPy 2, fixing removed aliases and functions, NEP 50 type promotion changes, scalar repr, copy semantics and dependants compiled against NumPy 1.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [data-scientist, ml-engineer, data-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [numpy, type-promotion, ruff, binary-compatibility]
pairs_with:
  prompts: [upgrade-major-dependency, upgrade-python-version, migrate-pandas-to-polars]
args:
  - name: notes
    description: "Current NumPy version, libraries that depend on it (pandas, SciPy, scikit-learn, PyTorch, OpenCV, in-house C or Cython extensions), whether this is an app or a published library, test coverage of numerical results."
    type: text
output_contract:
  format: markdown
  sections: [Dependencies, Code findings, Changes made, Numerical checks, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
NumPy 2 breaks in three different ways, and only one shows up as an error. First, removed names: aliases such as `np.float_`, `np.complex_`, `np.string_`, `np.unicode_`, `np.NaN`, `np.Inf`, and functions such as `np.product`, `np.alltrue`, `np.sometrue`, `np.round_`, `np.asfarray`, `np.find_common_type`, and many private `np.lib` paths; ruff's `NPY201` rule finds and fixes most of them. Second, silent numeric changes from NEP 50: Python scalars are now "weak", so `np.float32(3) + 3.0` stays `float32` instead of becoming `float64`, which can change precision and results, and a Python int that does not fit an array's integer dtype raises instead of upcasting. The default integer on Windows is now 64-bit. Scalars print as `np.float64(3.0)`, which breaks doctests, snapshots and any code that formats with `repr`. `np.array(x, copy=False)` now raises when a copy is needed; `np.asarray` is the replacement. Third, binary compatibility: extensions compiled against NumPy 1.x fail to import under NumPy 2, while packages built against NumPy 2 also run on 1.x. So every compiled dependant (pandas, SciPy, scikit-learn, Matplotlib, OpenCV, in-house Cython) must be on a release built for NumPy 2 before NumPy itself moves.
</context>

<task>
Migrate this project to NumPy 2.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the dependency files and lockfile, and list every package that depends on NumPy, marking which have compiled extensions. For each, find the first release that supports NumPy 2; list blockers and stop for a decision on any.
2. Scan the code: run ruff with the `NPY201` rule (or search for the removed names), and search for `copy=False`, `repr(` or f-strings formatting NumPy scalars, explicit float32 or small integer dtypes mixed with Python scalars, and doctests.
3. Before upgrading, record reference outputs for key numerical paths (model metrics, aggregates, exported files) on NumPy 1 so results can be compared after.
4. Upgrade the compiled dependants first, then NumPy, regenerating the lockfile. Rebuild in-house extensions against NumPy 2.
5. Apply the automatic fixes, then fix copy semantics, scalar formatting and dtype promotion by hand. Where promotion changed results, make the intended dtype explicit.
6. Run the tests and compare the reference outputs with a stated tolerance. Explain every difference outside tolerance before accepting it.
7. For a published library, decide whether to support both 1.x and 2.x and test both in CI.
</task>

<constraints>
- Do not pin `numpy<2` as the fix without listing the blocking package and a follow-up.
- Do not accept changed numerical results without explaining the cause.
- Do not replace removed aliases with types of a different width (for example `np.float_` is `np.float64`, not `float32`).
- Only cite removals and behaviour changes confirmed in the NumPy 2 migration guide or seen failing.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Dependencies
Table: package, compiled or not, version supporting NumPy 2, action.
## Code findings
Table: kind (removed name, copy, repr, promotion), count, locations, fix.
## Changes made
Dependency upgrades and code changes.
## Numerical checks
Reference outputs compared, tolerance, differences and their causes.
## Rollout
Order of environments, CI matrix, rollback.
</output_format>
