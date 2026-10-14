---
schema: 1
id: vectorize-numpy-code
kind: prompt
title: Vectorise Python loops with NumPy
description: Replaces Python loops over arrays with NumPy vectorised operations, broadcasting, ufuncs and memory-aware dtypes, verifying identical results within tolerance and measuring speed and memory.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [data-scientist, ml-engineer, software-engineer, researcher]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [numpy, vectorization, broadcasting, numerical-computing, dtypes]
pairs_with:
  prompts: [speed-up-python-code, speed-up-dataframe-code, parallelize-python-workload, write-microbenchmark]
args:
  - name: code
    description: The slow function or loop, as a path or pasted code, with typical array shapes and dtypes and how long it takes now.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Vectorised code, Equivalence check, Results, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A Python loop over array elements runs at Python speed; the same work as one NumPy expression runs in compiled code, often 10 to 100 times faster. Getting there safely takes more than deleting the loop. Broadcasting rules (shapes align from the right, size-1 dimensions stretch) let you combine arrays without copies, but a careless broadcast of two large vectors into a matrix (`a[:, None] - b[None, :]`) can allocate gigabytes; chunking or a different formulation avoids it. Conditional logic becomes `np.where`, boolean masks or `np.select`; cumulative logic becomes `cumsum`, `cumprod` or `np.maximum.accumulate`; group-by style work becomes `np.bincount`, `np.add.at` (not `a[idx] += 1`, which ignores repeated indices) or sorting with `np.unique(return_inverse=True)`. Loops with true sequential dependencies (each step depends on the previous result in a non-linear way) often cannot be vectorised; Numba is the usual answer there. Dtypes matter: `float32` halves memory and may change results, integer overflow wraps silently, and `object` arrays are no faster than lists. Floating-point results can differ in the last bits because operation order changes, so equivalence is checked with `np.allclose` and a stated tolerance, not `==`. Views versus copies matter for both speed and correctness, since in-place operations on views change the original.
</context>

<task>
Vectorise: {{code}}

1. Read the function, its callers, and the shapes and dtypes it receives. Write a benchmark with realistic shapes and record the baseline time and peak memory.
2. Save reference outputs from the original on several inputs, including edge cases: empty arrays, a single element, NaN and inf values, repeated indices, and the largest realistic size.
3. Identify the loop pattern: element-wise maths, conditionals, reductions, cumulative operations, pairwise computations, scatter or group-by, or a true sequential dependency.
4. Rewrite with the matching NumPy tools, keeping intermediate arrays within memory (chunk pairwise work if a full matrix would be too large), choosing dtypes deliberately and avoiding silent overflow.
5. Check equivalence against the saved outputs with `np.allclose` (state `rtol` and `atol`) or exact equality for integers, and run the existing tests.
6. Measure time and memory again. If part of the loop is truly sequential, leave it and say whether Numba would help.
</task>

<constraints>
- Do not change results beyond a stated floating-point tolerance, and never change integer results.
- Do not create intermediates that exceed available memory for the largest realistic input; say what size you checked.
- Do not add Numba, Cython or other dependencies without asking.
- Report only measured speed-ups.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Shapes, dtypes, time and peak memory.
## Vectorised code
The new function in a fenced block, with one line per step on the NumPy technique used.
## Equivalence check
Inputs checked, tolerance, and the real result.
## Results
Table: version, time, peak memory, speed-up.
## Caveats
Dtype, memory or sequential parts left as loops, or "None".
</output_format>
