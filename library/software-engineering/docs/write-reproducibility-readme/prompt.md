---
schema: 1
id: write-reproducibility-readme
kind: prompt
title: Write a reproducibility README
description: Writes the README for a research or machine learning repo that lets others reproduce its results, with environment, data access, exact commands, compute needs, seeds and expected outputs.
category: docs
version: 1.0.0
status: incubating
stage: [ship, maintain]
role: [researcher, ml-engineer, data-scientist]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [docs]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [reproducibility, research-code, ml-experiments, paper-code, random-seeds]
pairs_with:
  prompts: [write-dataset-documentation, convert-notebook-to-pipeline]
args:
  - name: results
    description: The results to reproduce (paper tables or figures, metrics) and anything known about how they were produced.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [README written, Reproduction map, Verified, Reproducibility gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most research code fails to reproduce for boring reasons: unpinned dependencies, a CUDA or framework version that changed numerics, data that must be requested or downloaded from somewhere not written down, preprocessing done once in a notebook that is not in the repo, hard-coded local paths, missing seeds, a checkpoint that only exists on the author's disk, and no statement of how long or on what hardware a run takes. Readers need a map from each table or figure to the exact command that produces it, the expected number with its tolerance (results vary across seeds and hardware), and a cheaper path such as evaluating released checkpoints when full training needs weeks of GPU time. Honest notes on known differences are part of good reproducibility, not a weakness.
</context>

<task>
Write the reproducibility README for this repository.

Results to reproduce:
<results>
{{results}}
</results>

1. Read the code, config files, scripts, notebooks, dependency files and any existing README. Find the entry points for data preparation, training, evaluation and plotting, and every seed and path setting.
2. Write "Environment": OS, Python and framework versions, GPU and driver or CUDA version if relevant, and the exact install steps from the pinned dependency files (or a container). If dependencies are unpinned, say so and record the versions you can see.
3. Write "Data": source, licence or access terms, how to obtain it, expected directory layout, checksums if available, and preprocessing commands.
4. Write a reproduction table: each result (table, figure, metric) with the command, config, seed(s), expected value and tolerance, approximate runtime and hardware.
5. Write "Quick check": the cheapest meaningful run (evaluate a released checkpoint, a small subset) and its expected output.
6. Write "Known differences": nondeterminism, hardware effects, changes since publication.
7. Add citation and licence sections if the repo has that information.
8. Run the quick check if it is feasible here and record the result.
</task>

<constraints>
- Do not invent expected numbers, runtimes or download links. Use the results given, the repo's logs or configs, or mark "to confirm".
- Do not change experiment code or configs; report problems such as hard-coded paths as gaps.
- Respect data licences and access terms; do not suggest redistributing restricted data.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the README. Then reply with:
## README written
Path and sections.
## Reproduction map
Each result with its command and expected value, as in the README.
## Verified
What you ran and the outcome. Write "Nothing run" if nothing.
## Reproducibility gaps
Unpinned dependencies, missing data steps, hard-coded paths, missing seeds or checkpoints. Write "None" if there are none.
</output_format>
