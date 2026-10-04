---
schema: 1
id: extract-folder-into-new-repo
kind: prompt
title: Extract a folder into a new repository
description: Plans moving one directory such as a library or service into its own repository with its history, using git filter-repo, then rewires CI, package names, issues and references in the original repo.
category: git
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [maintainer, software-engineer, tech-lead]
stack: [git]
requires: [none]
inputs: [repo, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [filter-repo, monorepo-split, preserve-history, repo-migration]
pairs_with:
  prompts: [purge-file-from-git-history, write-codeowners-file]
args:
  - name: repo_layout
    description: The current repository layout (a tree of the top two or three levels), how the folder is built, tested, versioned and published, and what depends on it inside and outside the repo.
    type: text
    required: true
  - name: folder
    description: The path to extract, for example "packages/parser" or "services/billing". Mention any other paths whose history should come along (for example a shared test fixture folder).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Decisions first, Extract with history, Rewire the new repo, Update the original repo, Cutover checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A maintainer wants to move {{folder}} out of its current repository into a new one, keeping the commit history so blame and log still work. The git part is short with git filter-repo; the work that goes wrong is everything around it: files moved into the folder from elsewhere lose their earlier history, tags point at commits that no longer exist, CI and release config still assume the old paths, other code imports the folder by relative path, and open issues and PRs are left behind. The original repo also needs a clean removal and pointers to the new home.

<repo_layout>
{{repo_layout}}
</repo_layout>
</context>

<task>
1. **Decisions first.** List the decisions to make before running anything, with a recommendation each: whether to keep full history (default yes) or start fresh; which other paths to include (files that were moved into {{folder}}, shared configs); whether the new package keeps its name and version line; how internal consumers will depend on it (published package, git submodule, or a vendored copy); repository name, visibility and licence; who owns it (CODEOWNERS). If the layout does not show how the folder is built or who depends on it, list those as questions and continue with clearly marked assumptions.
2. **Extract with history.** Give the commands:
   - work in a fresh clone (`git clone --no-local <repo> extract-tmp`), never the working copy, because filter-repo rewrites everything;
   - `git filter-repo --path {{folder}}/ --path-rename {{folder}}/:` (plus extra `--path` entries for moved-in history, found with `git log --follow --name-status -- <file>`);
   - tag handling: filter-repo keeps only tags that point at kept commits; say whether to rename tags with `--tag-rename` (for example `parser-v1.2.0` to `v1.2.0`);
   - verify with `git log --oneline | wc -l`, `git log --follow` on one key file, and a build and test run;
   - create the new remote, push all branches you need and tags.
3. **Rewire the new repo.** CI workflows rewritten for the new root paths, release and publishing config, package manifest fields (repository URL, homepage), README, licence file, CODEOWNERS, branch protection, secrets the pipeline needs, issue templates.
4. **Update the original repo.** One PR that removes {{folder}}, switches consumers to the new dependency (published version or submodule) and updates CI, docs and CODEOWNERS; leave a short README or `MOVED.md` at the old path only if people are likely to look there.
5. **Issues and PRs.** Transfer open issues if the hosting service supports it, otherwise close with a link; ask authors of open PRs touching the folder to reopen against the new repo, or port them with `git format-patch --relative={{folder}}` in the old repo and `git am` in the new one.
6. **Cutover checklist** in order, with a freeze window: announce, freeze changes to the folder, extract, verify, publish, merge the removal PR, unfreeze.
</task>

<constraints>
- Use git filter-repo, not the deprecated `git filter-branch`; say it must be installed separately.
- Never run filter-repo in the only copy of the repository. Backups and a fresh clone are mandatory steps.
- Do not invent build commands, package names or CI providers; use those in the layout or mark placeholders.
- If the folder imports code from elsewhere in the repo, list those dependencies as a blocker to solve before extraction.
</constraints>

<output_format>
## Decisions first
Table: Decision | Recommendation | Why.
## Extract with history
Numbered steps with code blocks.
## Rewire the new repo
Checklist.
## Update the original repo
Checklist, including consumers, issues and PRs.
## Cutover checklist
Ordered checkboxes with who does each if roles are known.
</output_format>
