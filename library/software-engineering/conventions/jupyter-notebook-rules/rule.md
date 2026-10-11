---
schema: 1
id: jupyter-notebook-rules
kind: rule
title: Jupyter notebook rules
description: Standing rules for Jupyter notebooks covering top-to-bottom runs, a parameters cell, no hidden state, relative paths, logic moved to modules, pinned environments and clean commits.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [data-scientist, data-analyst, ml-engineer, researcher]
stack: [jupyter]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: beginner
tags: [notebook-hygiene, reproducibility, hidden-state, nbstripout, parameters-cell]
applies_to: ["**/*.ipynb"]
pairs_with:
  rules: [python-style-rules, pandas-rules]
  prompts: [convert-notebook-to-pipeline, resolve-notebook-merge-conflict]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change a Jupyter notebook in this project:

**Runs top to bottom**
- The notebook must produce the same results after "Restart kernel and run all". Never rely on cells run out of order, deleted cells whose variables still live in the kernel, or values typed in once and lost.
- Do not reuse a variable name for a different meaning further down (`df` for raw data, then filtered data, then a summary). Use distinct names so re-running a cell does not apply a step twice.
- Cells that mutate data in place (`df.drop(..., inplace=True)`, appending to a list) must be safe to run twice, or be rewritten so they are.

**Structure**
- First cell: a title and one short paragraph on the question the notebook answers and the data it uses.
- Then imports, then a single parameters cell (tagged `parameters` for papermill if the project uses it) with paths, dates, thresholds and seeds. No magic numbers lower down.
- Use Markdown headings for sections and a short note after each important result saying what it shows. End with conclusions and caveats.

**Code**
- Move functions longer than a few lines, and anything used by more than one notebook, into a module in the repository and import it. Use `%load_ext autoreload` and `%autoreload 2` while developing if the project does.
- Keep cells short and focused on one step. Do not leave dead cells, commented-out experiments or debugging prints in a shared notebook.
- Seed random number generators from the parameters cell.

**Data and paths**
- Use paths relative to the project root or from config, never absolute paths on your machine (`/Users/name/Downloads/...`).
- Never put credentials, tokens or connection strings in cells or outputs. Read them from environment variables or the project's secret mechanism, and do not print them.
- Do not commit raw data or large outputs to the repository; point to where the data lives.
- Check for personal data in outputs before sharing; displayed tables are saved in the file.

**Environment**
- The notebook runs in the project's pinned environment (`requirements.txt`, `pyproject.toml`, `environment.yml`). Install packages there, not with ad hoc `!pip install` cells.
- Record versions of key libraries if results depend on them.

**Outputs and version control**
- Clear outputs before committing (nbstripout or the project's pre-commit hook) unless the notebook is a published report that must keep them; follow the project's rule.
- Keep charts readable: titles, labelled axes with units, and a sentence on what each shows.
- For notebooks that run on a schedule or feed decisions, propose turning them into a script or pipeline step.

**Before you finish**
- Restart the kernel and run all cells, confirm no errors and the results you report, then clear or keep outputs per the project rule. Say that you did it.
