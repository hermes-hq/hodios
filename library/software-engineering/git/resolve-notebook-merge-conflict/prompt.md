---
schema: 1
id: resolve-notebook-merge-conflict
kind: prompt
title: Resolve a Jupyter notebook merge conflict
description: Resolves Jupyter notebook merge conflicts cell by cell with nbdime instead of editing raw JSON, then sets up output stripping and notebook-aware diffs so conflicts stop happening.
category: git
version: 1.0.0
status: incubating
stage: [build]
role: [data-scientist, ml-engineer, data-analyst]
stack: [git, jupyter]
requires: [repo-read, file-write, shell, git]
inputs: [repo]
output: [report, config]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [cell-level-merge, nbdime, output-stripping, merge-conflict]
pairs_with:
  prompts: [resolve-merge-conflict, reduce-recurring-merge-conflicts, set-up-git-hooks]
args:
  - name: context
    description: The conflicted notebooks, what each side changed if you know, and whether outputs matter (for example a report notebook whose plots are reviewed).
    type: text
output_contract:
  format: markdown
  sections: [Conflicts, Needs your decision, Check, Prevention]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A .ipynb file is JSON holding code, markdown, outputs, execution counts and metadata. Git conflict markers inside it make the notebook unopenable, and most conflicts come from noise, not real edits: execution counts, embedded images, kernel metadata and cell ids change every run. nbdime's merge tools understand cells: `nbdime merge` or `git mergetool --tool nbdime` after `nbdime config-git --enable` resolve source changes per cell and can drop output conflicts. The cause is fixed by stripping outputs and execution counts before commit with nbstripout or a pre-commit hook, leaving outputs out of git (or in a separate rendered export when people need to see them), and by moving reusable code out of notebooks into modules. Jupytext pairing, keeping a .py or .md copy as the reviewed source, is the other common approach.
</context>

<task>
Resolve the notebook conflicts in this repository.{{#context}} Context: {{context}}{{/context}}

1. Run `git status` and list the conflicted notebooks. Check whether nbdime is installed and git-integrated; if not, say what to install into the project's environment and ask before installing.
2. For each notebook, compare base, ours and theirs cell by cell (`nbdiff` between the stage versions extracted with `git show :1:path > base.ipynb` and likewise for 2 and 3, kept in a temporary folder outside the repository).
3. Classify differences: source edits to the same cell (real conflict), edits to different cells (combine), output, execution count and metadata differences (noise).
4. Merge with `nbmerge base.ipynb local.ipynb remote.ipynb` or the mergetool, keeping both sides' source edits where independent and dropping conflicting outputs. For same-cell source conflicts with different intent, keep both versions in adjacent cells marked clearly, and list them for the user.
5. Check the result is valid JSON and opens (`python -m json.tool` or `jupyter nbconvert --to notebook --stdout`), with no conflict markers. If the notebook can run in reasonable time and without external side effects, ask before running it top to bottom.
6. Stage the notebooks and stop; let the user continue the merge.
7. Propose prevention for this repo: output stripping (nbstripout or a pre-commit hook), `nbdime config-git --enable` for diffs, a `.gitattributes` entry, and when to use Jupytext pairing. Show the exact config but do not apply it unless asked.
</task>

<constraints>
- Never edit raw notebook JSON conflict markers by hand.
- Do not execute notebooks that write to databases, call paid APIs or take long without asking.
- Do not commit, continue the merge or push.
- Remove temporary files you created.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Conflicts
Table: notebook | cell | type (source, output, metadata) | resolution.
## Needs your decision
Same-cell source conflicts, or "None".
## Check
Validity check and any run results.
## Prevention
Config snippets for stripping and notebook-aware diffs.
</output_format>
