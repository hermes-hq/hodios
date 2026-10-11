---
schema: 1
id: fix-git-in-ci-pipelines
kind: prompt
title: Fix git problems in CI pipelines
description: Fixes git failures inside CI jobs, such as shallow clones breaking describe and diffs, missing tags, detached HEAD, dubious ownership, LFS pointers and private submodule auth.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, devops-engineer]
stack: [git, github-actions, gitlab-ci]
requires: [repo-read, file-write]
inputs: [config, logs, text]
output: [config, diff, report]
risk: edits-files
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [shallow-clone, fetch-depth, detached-head, safe-directory, submodules]
pairs_with:
  prompts: [triage-failing-ci, explain-git-error, grant-ci-access-to-private-repos]
args:
  - name: failure
    description: The failing step's log output and what the step was trying to do, for example "git describe --tags fails with 'No names found'".
    type: text
    required: true
  - name: ci_provider
    description: The CI system, for example GitHub Actions, GitLab CI, Jenkins, CircleCI or Bitbucket Pipelines.
    type: string
output_contract:
  format: markdown
  sections: [Cause, Fix, Verification, Side effects]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
CI checkouts are not normal clones, and most "git works locally but not in CI" failures come from that. Many providers clone shallowly by default (GitHub's checkout action fetches one commit; GitLab uses a small `GIT_DEPTH`), so `git describe` finds no tags, `git diff origin/main...HEAD` has no merge base, changed-file detection sees everything or nothing, and version tools that count commits produce wrong numbers. Jobs usually run on a detached HEAD, so `git rev-parse --abbrev-ref HEAD` returns `HEAD`; on pull requests some providers check out a temporary merge commit, not the branch tip. Containers running as a different user than the checkout owner hit "detected dubious ownership" and need `safe.directory`. LFS files arrive as pointer text unless LFS is enabled in the checkout. Private submodules fail because the job token can only read the current repository. Jobs that commit need a configured identity, write permission and a guard against triggering themselves in a loop.

<failure>
{{failure}}
</failure>
{{#ci_provider}}
CI provider: {{ci_provider}}
{{/ci_provider}}
</context>

<task>
1. Read the pipeline configuration and the log. Find the exact failing command and the checkout step that preceded it (depth, refs fetched, tags, submodules, LFS, credentials, user). If the provider is not stated and cannot be told from the files, ask.
2. Name the cause in one sentence and the evidence for it from the log.
3. Choose the narrowest fix:
   - need history for a diff: fetch the base branch with enough depth, or deepen until a merge base exists, rather than always fetching everything;
   - need tags or full history for versioning: full fetch (`fetch-depth: 0` or `GIT_DEPTH: 0`) or an explicit tag fetch, and say what it costs on a large repo;
   - need the branch name: use the provider's environment variables for the branch and the pull request head, not `git rev-parse`;
   - dubious ownership: `git config --global --add safe.directory` for the workspace path only, or run the job as the checkout's user; never `*` without saying why;
   - LFS pointers: enable LFS in the checkout, ideally limited to the paths the job needs;
   - private submodules: point to the credential setup (see the paired entry) and relative URLs in `.gitmodules`;
   - jobs that commit: set `user.name` and `user.email`, grant only the write permission needed, and skip runs triggered by the bot's own commits.
4. Edit the configuration with the smallest change, keeping the file's style. Show the diff.
5. Say how to verify: which job to re-run and what output proves it is fixed (for example `git describe` printing a tag).
6. Note side effects: longer checkouts, cache changes, behaviour on forks and on tag builds.
</task>

<constraints>
- Do not paste or log tokens, and do not suggest disabling TLS verification or making a private repository public.
- Do not use unpinned third-party actions or images in the fix; keep the versions the project already uses or say which version you assumed.
- Do not change triggers, permissions or branches beyond what the fix needs.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Cause
One or two sentences, with the log line that shows it.
## Fix
The configuration diff in a fenced block and one line per change on why.
## Verification
What to re-run and what to look for.
## Side effects
Bullets, or "None".
</output_format>
