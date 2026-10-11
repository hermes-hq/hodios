---
schema: 1
id: set-up-difftool-and-mergetool
kind: prompt
title: Set up a git diff and merge tool
description: Configures a visual diff and merge tool for git, such as VS Code, IntelliJ, Beyond Compare, Meld or vimdiff, with zdiff3 conflict style, word diff and a tested conflict.
category: git
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, student]
stack: [git]
requires: [shell, git]
inputs: [text]
output: [config, explanation]
risk: runs-commands
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [mergetool, difftool, conflict-style, git-config, developer-tools]
pairs_with:
  prompts: [set-up-git-on-new-machine, resolve-merge-conflict]
args:
  - name: tool
    description: The editor or tool you want to use and your operating system, for example "VS Code on Windows" or "IntelliJ on macOS". Leave the tool out for a recommendation.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Tool, Config, Test, Daily use]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most people resolve conflicts by reading raw conflict markers, which hide the most useful part: what the code looked like before either side changed it. Setting `merge.conflictStyle` to `zdiff3` (git 2.35 and later; `diff3` before that) adds that base section to every conflict, which alone makes many conflicts obvious. A three-way merge tool shows ours, theirs, base and the result side by side. Common mistakes when configuring one: on Windows, paths with spaces that are not quoted; tools launched without a "wait" flag so git thinks the merge finished instantly; `mergetool.keepBackup` left on, which litters the tree with `.orig` files; and `trustExitCode` set wrongly so git marks unresolved files as resolved. Word-level diffs (`git diff --word-diff` or `--color-words`) help for prose and long lines without any tool at all.
</context>

<task>
Set up: {{tool}}

1. Check what is installed: `git --version`, and whether the tool's command-line launcher is on the PATH (for example `code --version`). If git is older than 2.35, use `diff3` instead of `zdiff3`. If no tool was named, recommend one already installed (an IDE the user uses) before suggesting a new download.
2. Set the conflict style: `git config --global merge.conflictStyle zdiff3`.
3. Configure the tool with the built-in name if git knows it (`git config --global merge.tool <name>`, check with `git mergetool --tool-help`), otherwise a `mergetool.<name>.cmd` using `$BASE`, `$LOCAL`, `$REMOTE` and `$MERGED`, quoted correctly for the OS, with the tool's wait flag. Do the same for `diff.tool`.
4. Set `mergetool.keepBackup false` and `mergetool.prompt false`, and explain `trustExitCode` for this tool.
5. Show the resulting `[merge]`, `[mergetool]`, `[diff]` and `[difftool]` sections of the global config.
6. Test it on a throwaway repository: create a file, make two branches that edit the same line, merge, run `git mergetool`, and confirm the tool opens with the base shown and that git sees the file as resolved only after saving. Delete the throwaway repository afterwards only with the user's agreement.
7. Show daily use: `git mergetool`, `git difftool <branch>`, `git difftool --dir-diff` for a whole change set, and `git diff --word-diff`.
</task>

<constraints>
- Change only the global git config keys listed here; show the user any existing values first and ask before replacing them.
- Do not invent command-line flags for a tool; if unsure of a tool's wait flag or arguments, say so and point to its documentation.
- Run the test only in a new temporary directory, never in a real repository.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Tool
Which tool and why, in one or two sentences.
## Config
The exact commands and resulting config sections.
## Test
What happened in the throwaway merge.
## Daily use
Four or five commands with one line each.
</output_format>
