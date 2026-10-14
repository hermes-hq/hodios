---
schema: 1
id: manage-dotfiles-with-git
kind: prompt
title: Manage dotfiles with git
description: Puts personal shell, editor and tool configuration under git using a bare repository, GNU Stow or chezmoi, with per-machine differences, secrets kept out and a one-command setup on a new machine.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, devops-engineer, individual]
stack: [git, bash]
requires: [repo-read, file-write, shell, git]
inputs: [file, text]
output: [plan, config, script]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [dotfiles, bare-repository, gnu-stow, chezmoi, shell-config]
pairs_with:
  prompts: [set-up-git-on-new-machine, write-gitignore-file, audit-agent-permissions]
args:
  - name: setup
    description: Your operating systems and machines (for example a macOS laptop and a Linux server), the configs you want to keep (shell, editor, git, terminal, tools), and whether any differ per machine.
    type: text
    required: true
  - name: approach
    description: A preferred approach if you have one (bare repo, Stow, chezmoi, yadm), or "recommend one".
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Inventory and risks, Structure, Setup on this machine, Bootstrap script, Secret guard, Routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Dotfiles repositories go wrong in three ways. Secrets leak: tokens in `.npmrc`, `.netrc`, cloud CLI configs, shell history or an `export API_KEY=` line end up in a public repository. Machines differ: a work laptop needs a different git email, proxy or PATH than a home machine or a server, and copying one file everywhere breaks something. And the setup is not reproducible, so a new machine still takes a day. The common approaches each solve this differently: a bare repository with its work tree set to the home directory (no extra tools, but every untracked file in home shows up unless `status.showUntrackedFiles` is set to `no`); GNU Stow, which symlinks from a `~/dotfiles` folder per package; and managers such as chezmoi or yadm that add templates per machine and encrypted secrets. Per-machine differences are best handled with include files (`[include]` in git config, `source ~/.zshrc.local` in shells) that are not committed, or with templates. Secrets belong in a password manager or the OS keychain and are pulled at runtime, never committed even to a private repo.

<setup>
{{setup}}
</setup>
{{#approach}}
<approach>
{{approach}}
</approach>
{{/approach}}
</context>

<task>
1. Recommend one approach for this setup and say why, briefly, comparing it with the other two on simplicity, per-machine differences and secret handling.
2. Inventory the files to track from the user's list, and read them (with permission) to flag anything that looks like a secret, a host-specific path or a machine-specific value. Never print secret values; refer to them by file and line.
3. Design the structure: which files are shared, which become templates or local include files that stay uncommitted, and a `.gitignore` that blocks known secret files.
4. Give the setup commands for the chosen approach on the current machine, backing up any existing file before replacing it with a link or checkout.
5. Write a bootstrap script for a new machine: clone, link or apply, install the tools the configs expect (listed, with the package manager per OS), and create the local include files from examples. The script must be safe to run twice and must not overwrite existing files without backing them up.
6. Add a pre-commit check or a simple scan step that blocks commits containing likely secrets.
7. Explain the daily routine: edit, commit, push, and pull on other machines.
</task>

<constraints>
- Never commit secrets, even to a private repository; move them to a password manager, keychain or uncommitted local file.
- Never overwrite or delete existing config files without backing them up first, and ask before changing files in the home directory.
- Do not assume the repository is private; write as if it might be public.
</constraints>

<output_format>
## Recommendation
Approach and why.
## Inventory and risks
Files, with secrets and machine-specific values flagged.
## Structure
Shared, templated and local files.
## Setup on this machine
Commands.
## Bootstrap script
The script.
## Secret guard
The check.
## Routine
Daily steps.
</output_format>
