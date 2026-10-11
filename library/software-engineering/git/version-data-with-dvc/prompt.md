---
schema: 1
id: version-data-with-dvc
kind: prompt
title: Version datasets and models with DVC
description: Sets up DVC in a git repository to version datasets and model files in remote storage, with pipeline stages, CI access and a clean way to reproduce any past result.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [data-scientist, ml-engineer, data-engineer]
stack: [git, python]
requires: [repo-read, file-write, shell, git]
inputs: [repo, text]
output: [config, code, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [dvc, data-versioning, reproducibility, model-artifacts, remote-storage]
pairs_with:
  prompts: [set-up-git-lfs, write-gitignore-file, speed-up-large-repo]
args:
  - name: project
    description: What the project does, the data and model files (sizes, formats, how often they change), where storage is available (S3, GCS, Azure, SSH, a shared drive) and who needs access, including CI.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Findings, Layout, Setup, Pipeline, CI, Team workflow, Verified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Data and model files do not belong in git: they bloat every clone and git cannot diff them meaningfully. DVC keeps the files in remote storage and commits small `.dvc` pointer files (or a `dvc.lock` for pipeline outputs) holding content hashes, so a git commit pins exactly which data and model went with which code. Compared with Git LFS, DVC adds pipelines (`dvc.yaml` stages with declared dependencies, parameters and outputs, re-run only when inputs change), metrics and experiment comparison, and works with ordinary cloud buckets. Common mistakes: running `dvc add` on a folder that is also tracked by git, forgetting to `dvc push` so colleagues get pointer files with no data behind them, storing cloud credentials in `.dvc/config` (which is committed) instead of `.dvc/config.local` or environment variables, adding files one by one instead of whole directories, and keeping raw data that is mutable in place, which breaks reproducibility. CI needs read access to the remote and a cache to avoid pulling gigabytes per run.

<project>
{{project}}
</project>
</context>

<task>
1. Inspect the repository read-only: current data and model files and their sizes, whether any are committed to git or LFS, existing scripts for preparing data and training, and how CI runs.
2. Propose the layout: which directories DVC tracks (raw data, processed data, models), which stay in git (code, small configs, params), and whether raw data is treated as immutable with new versions added rather than edited.
3. Initialise DVC and configure the remote, with credentials kept out of committed config (`.dvc/config.local`, environment variables or the cloud's own credential chain). Show the commands and the resulting committed config.
4. Track the data: `dvc add` on directories, commit the `.dvc` files and updated `.gitignore`. If large files are already committed to git, untrack them from git first and explain whether old history should be cleaned (a separate, confirmed step).
5. If the project has preparation or training steps, turn them into `dvc.yaml` stages with `deps`, `params` and `outs`, so `dvc repro` rebuilds only what changed, and add a metrics file if the project produces metrics.
6. Set up CI: read-only remote credentials from the CI secret store, `dvc pull` of only what the job needs, caching, and optionally `dvc repro` with a check that `dvc.lock` is up to date.
7. Write the daily workflow for the team: after changing data run `dvc add` or `dvc repro`, then `git commit`, then `dvc push` and `git push`; to go back to an old result, `git checkout <commit>` then `dvc checkout`.
8. Run what you can (init, add, status) and report what you verified; leave `dvc push` to the remote for the user to confirm.
</task>

<constraints>
- Never commit credentials; check that `.dvc/config` contains no secrets before committing.
- Do not rewrite git history or delete data files without explicit confirmation.
- Do not push to the remote storage without confirmation.
- State command flags you are unsure of as things to check in the DVC documentation.
</constraints>

<output_format>
## Findings
Current state of data and models.
## Layout
What DVC tracks and what git tracks.
## Setup
Commands run and files created.
## Pipeline
`dvc.yaml` stages, if any.
## CI
Steps and credentials handling.
## Team workflow
The daily commands in order.
## Verified
What was run and what remains for the user.
</output_format>
