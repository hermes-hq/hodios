---
schema: 1
id: fix-cross-platform-filename-issues
kind: prompt
title: Fix cross-platform filename issues in a repo
description: Finds and fixes files that differ only by case, names Windows cannot check out, overlong paths, broken symlinks and mode churn, so the repo works on macOS, Windows and Linux.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, devops-engineer]
stack: [git]
requires: [repo-read, file-write, shell, git]
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
tags: [case-sensitivity, windows-paths, symlinks, cross-platform, file-mode]
pairs_with:
  prompts: [fix-line-ending-churn, explain-git-error, set-up-git-hooks]
args:
  - name: symptom
    description: What goes wrong and on which systems, for example "on my Mac git status always shows Button.tsx modified" or "Windows clone fails with 'invalid path'".
    type: text
    required: true
  - name: platforms
    description: The operating systems the team and CI use, for example "macOS laptops, Windows for two designers, Linux CI".
    type: string
output_contract:
  format: markdown
  sections: [Diagnosis, Fixes made, Prevention, Needs your decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Git stores paths as exact byte strings, but the file systems it checks out to do not agree. Linux is case-sensitive. macOS (APFS by default) and Windows (NTFS) are case-insensitive but case-preserving, so two tracked files that differ only by case (`Readme.md` and `README.md`) collapse into one on checkout and show as permanently modified. An import written as `./button` for a file named `Button.tsx` works on a Mac and fails on Linux CI. Windows also rejects reserved names (`CON`, `PRN`, `AUX`, `NUL`, `COM1` to `COM9`, `LPT1` to `LPT9`, with any extension), the characters `< > : " | ? *` and backslash, and names ending in a dot or space, and by default refuses paths longer than 260 characters unless long paths are enabled in both Windows and git (`core.longpaths`). Symlinks are only created on Windows when `core.symlinks` is true and the user has the right privilege; otherwise they appear as small text files holding the target path. macOS can also store accented names in decomposed Unicode, which shows as a different path to Linux users. Executable-bit changes (`100644` to `100755`) create churn when `core.fileMode` differs between machines.

<symptom>
{{symptom}}
</symptom>
{{#platforms}}
Platforms in use: {{platforms}}
{{/platforms}}
</context>

<task>
1. Read `git status`, `git config --show-origin --get-regexp 'core\.(ignorecase|symlinks|longpaths|filemode|precomposeunicode|protectntfs)'` and the symptom. Tell the user which problem class you are looking at before changing anything.
2. Scan the whole tree, not just the reported file:
   - case collisions: `git ls-files | sort -f | uniq -di`;
   - Windows-invalid names: reserved base names, forbidden characters, trailing dot or space;
   - paths over 200 characters (warn) and over 260 (fail);
   - symlinks: `git ls-files -s | grep '^120000'`, and whether their targets exist and are relative;
   - decomposed Unicode names, and mode-only changes in `git diff --summary`.
3. For case collisions, compare the two blobs. If identical, keep one; if different, ask which is correct or whether both are needed under different names. Do the rename with `git mv` (two steps through a temporary name if the file system ignores case-only renames), then search the code for imports, requires and links that use the old spelling and fix them.
4. For invalid names and long paths, propose new names, rename with `git mv`, and update every reference you can find. Suggest shortening deep generated folders rather than relying on long-path settings alone.
5. For symlinks, recommend replacing them with a real file, a build step or a config path when Windows users are involved; otherwise document the `core.symlinks` setting and the Windows privilege needed.
6. For mode churn, decide the intended executable bit per file, set it with `git update-index --chmod`, and explain `core.fileMode` for the affected machines.
7. Run the build and the tests nearest to the renamed files. Then add prevention: a CI or pre-commit check that fails on case collisions, Windows-invalid names and overlong paths.
</task>

<constraints>
- Never rewrite history to fix this. Fix the current tree with normal commits.
- Do not run `git reset --hard`, `git checkout -- .`, `git clean` or delete files without asking; a collapsed case collision means one working-tree file may hold changes the user wants.
- Do not commit or push; stage the changes and list them.
- Do not change global git settings on the user's machine; show the command and say what it affects.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Diagnosis
Each problem found: path, class (case collision, invalid name, long path, symlink, Unicode, mode), and which platforms it breaks.
## Fixes made
Renames and edits, with the references you updated and the build and test results.
## Prevention
The check you added or propose, and any per-machine settings with the exact command.
## Needs your decision
Collisions with different contents and anything else you did not change. Write "None" if empty.
</output_format>
