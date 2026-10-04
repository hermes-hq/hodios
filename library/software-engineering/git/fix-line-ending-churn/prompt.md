---
schema: 1
id: fix-line-ending-churn
kind: prompt
title: Fix line-ending churn
description: Diagnoses whole-file diffs caused by CRLF and LF, file mode or encoding differences across operating systems, then writes a .gitattributes, a one-time renormalise commit and per-machine settings.
category: git
version: 1.0.0
status: incubating
stage: [maintain]
role: [maintainer, software-engineer]
stack: [git]
requires: [none]
inputs: [text, diff]
output: [config, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [line-endings, gitattributes, crlf, renormalize, cross-platform]
pairs_with:
  prompts: [write-gitignore-file, set-up-git-on-new-machine]
args:
  - name: symptoms
    description: What you see, for example "every file shows as changed on Windows", "git diff shows ^M", "diffs show 'old mode 100755 new mode 100644'". Paste `git diff --stat`, a sample of `git diff`, and `git config --show-origin --get-regexp 'core\.(autocrlf|eol|filemode)'` from an affected machine if you can.
    type: text
    required: true
  - name: stack
    description: Languages and file types in the repo, for example "C# with .sln files, PowerShell and Bash scripts, PNG assets". Optional.
    type: string
    default: ""
output_contract:
  format: markdown
  sections: [Diagnosis, .gitattributes, Renormalise once, Per-machine settings, Check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A mixed-OS team sees pull requests where every line of a file changed though nobody edited it. The usual causes are line endings (Windows tools writing CRLF, others LF, with each person's `core.autocrlf` doing something different), executable-bit changes when files pass through Windows or certain file systems (`core.fileMode`), and encoding changes such as a byte-order mark added by an editor. Per-person settings never fix this for good; a committed `.gitattributes` does, followed by one renormalisation commit so the repository content is consistent.

<symptoms>
{{symptoms}}
</symptoms>
Stack: {{stack}}
</context>

<task>
1. **Diagnose** from the symptoms which cause applies, and give the command that confirms it: `git diff --ignore-cr-at-eol --stat` or `git diff -w --stat` (churn disappears means line endings); `git ls-files --eol` to see index and working-tree endings per file; `old mode`/`new mode` lines in `git diff` for file mode; a BOM visible in a hex dump (`head -c 3 <file> | xxd`) for encoding. If the symptoms do not match any cause, say what output to paste and stop.
2. **Write the .gitattributes** for this stack:
   - `* text=auto eol=lf` as the default (or `* text=auto` if some tools need CRLF in the working tree);
   - explicit `eol=crlf` for files Windows tools require with CRLF (`*.bat`, `*.cmd`, often `*.sln`, `*.ps1` if the team's tools need it);
   - explicit `eol=lf` for shell scripts and anything run in Linux containers (`*.sh`, `Dockerfile`);
   - `binary` for binary types in the repo (images, fonts, archives, `*.dll`), and nothing marked text that is not text.
3. **Renormalise once,** in its own commit, on a quiet moment agreed with the team: make sure everyone has pushed; `git add --renormalize .`; review `git status` and `git ls-files --eol`; commit as "Normalise line endings" with no other changes. Add the commit hash to `.git-blame-ignore-revs` and show `git config blame.ignoreRevsFile .git-blame-ignore-revs` so blame skips it.
4. **Open branches:** explain that branches started before the renormalise will conflict on whole files; recommend merging or rebasing onto the normalised main with `-X renormalize` (`git rebase -X renormalize main` or `git merge -X renormalize main`).
5. **Per-machine settings:** with `.gitattributes` in place, recommend `core.autocrlf false` on all machines (or `input` on macOS and Linux) so personal settings do not fight the file; editor settings via `.editorconfig` (`end_of_line`, `charset`, `insert_final_newline`); for file mode churn, `git config core.fileMode false` on affected machines and `git update-index --chmod=+x <file>` to set the executable bit deliberately; for BOMs, `charset = utf-8` in `.editorconfig`.
6. **Prevent recurrence:** a CI check that fails on CRLF in LF-only files or on mixed endings, and `.editorconfig` committed.
</task>

<constraints>
- Do not recommend rewriting history to fix line endings; one forward commit is enough.
- Do not mark a file type as text or binary unless it appears in the stack or the symptoms; mark guesses with `# check:`.
- Warn that the renormalise commit touches many files and should not be mixed with real changes.
- If no stack is given, write a minimal .gitattributes and list the file types to add.
</constraints>

<output_format>
## Diagnosis
The cause, the evidence, and the confirming command.
## .gitattributes
One commented code block.
## Renormalise once
Numbered commands, including the blame-ignore step and the note on open branches.
## Per-machine settings
Commands per OS, and an `.editorconfig` snippet.
## Check
Commands to verify (`git ls-files --eol`, a fresh clone on Windows shows no changes) and the CI check idea.
</output_format>
