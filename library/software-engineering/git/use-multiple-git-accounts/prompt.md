---
schema: 1
id: use-multiple-git-accounts
kind: prompt
title: Use multiple git accounts on one machine
description: Sets up work and personal hosting accounts on one machine with SSH host aliases or per-host credentials, per-folder commit identities and the right key for each remote.
category: git
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, consultant, student]
stack: [git]
requires: [shell, git]
inputs: [text]
output: [config, explanation]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [multiple-accounts, ssh-config, includeif, commit-identity]
pairs_with:
  prompts: [set-up-git-on-new-machine, fix-git-push-authentication, fix-commit-author-identity, set-up-commit-signing]
args:
  - name: accounts
    description: The accounts and where they live, for example "personal GitHub and work GitHub (company org, SSO), work repos under ~/work", plus your operating system and whether you use SSH or HTTPS.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Layout, SSH or credentials, Identities, Existing repositories, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Two accounts on the same host break in two separate ways that people mix up. Authentication: the host identifies you by the SSH key or token, and with two accounts on one host the SSH agent offers whichever key comes first, so pushes to work repositories authenticate as the personal account and fail, or worse, succeed with the wrong account where both have access. Identity: the name and email in commits come from git config, not from the key, so commits in work repositories carry the personal email unless configured. The robust setup handles both by folder. For SSH, `~/.ssh/config` defines a host alias per account (for example `github-work`) pointing at the real host with its own key and `IdentitiesOnly yes`, and work remotes use that alias; alternatively `core.sshCommand` set per folder selects the key without changing URLs. For HTTPS, credential helpers can store per-path credentials with `credential.useHttpPath`. Commit identity uses `includeIf "gitdir:~/work/"` to load a work config with the work email, and signing key if commits are signed.
</context>

<task>
<accounts>
{{accounts}}
</accounts>

1. Inspect what exists without changing it: `git config --global --list --show-origin`, `ls ~/.ssh` (names only, never key contents), `~/.ssh/config` if present, and the remotes of one repository per account. Ask where each account's repositories live on disk if not given.
2. Agree the layout: one folder per account (for example `~/work` and `~/personal`); explain that per-folder rules depend on it.
3. Authentication:
   - SSH: create a key per account only if one is missing (`ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_work -C "<label>"`), add the public key to the right account and authorise it for SSO if required, then add host aliases with `IdentitiesOnly yes`. Or set `core.sshCommand "ssh -i ~/.ssh/id_ed25519_work -o IdentitiesOnly=yes"` in the work folder's config to keep normal URLs.
   - HTTPS: per-account tokens through the credential manager with `credential.useHttpPath true` for that host, or per-folder `credential.username`.
4. Identity: a `~/.gitconfig-work` with `user.name`, `user.email` (and signing key if used), loaded by `[includeIf "gitdir:~/work/"]` in the global config. Note the trailing slash and case sensitivity on some systems.
5. Existing repositories: update work remotes to the alias with `git remote set-url` if aliases were chosen, and list commits already made with the wrong email (`git log --author=<personal email>`), pointing to the author-fix entry if they need correcting.
6. Check from inside one repository per account: `git config user.email` shows the right email, `ssh -T git@<alias>` greets the right account (or a fetch works over HTTPS), and a dry-run push succeeds.
</task>

<constraints>
- Never display or ask for private keys or tokens; refer to file names only.
- Do not overwrite an existing key or config section; show a diff of config changes and ask first.
- Do not invent hosting menu paths; describe them generally.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Layout
Folders and which account each belongs to.
## SSH or credentials
Config snippets and commands.
## Identities
Global config and per-folder config contents.
## Existing repositories
Remote changes and commits with the wrong identity, if any.
## Check
Results of the checks per account.
</output_format>
