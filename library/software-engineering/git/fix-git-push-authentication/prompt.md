---
schema: 1
id: fix-git-push-authentication
kind: prompt
title: Fix git authentication failures
description: Diagnoses failing clone, pull or push authentication over HTTPS or SSH, covering expired tokens, stale credential helpers, SSO authorization, wrong SSH keys and the wrong remote URL.
category: git
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, student, data-scientist]
stack: [git]
requires: [shell, git]
inputs: [logs, text]
output: [explanation, report]
risk: runs-commands
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [authentication, ssh-keys, personal-access-token, credential-helper, permission-denied]
pairs_with:
  prompts: [use-multiple-git-accounts, set-up-git-on-new-machine, explain-git-error, grant-ci-access-to-private-repos]
args:
  - name: error
    description: The exact error output, the command you ran, your operating system, and the hosting service (GitHub, GitLab, Bitbucket, Azure DevOps or self-hosted).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Cause, Fix, Check, Avoid next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Authentication errors in git are confusing because the message rarely says the real cause, and hosts often answer "repository not found" instead of "forbidden" for private repositories so as not to reveal they exist. The first fork is the protocol: the remote URL (`git remote -v`) decides whether HTTPS or SSH is used, and many people debug the wrong one. Over HTTPS, account passwords are no longer accepted by the major hosts; a token or a credential manager is needed, and a stale or expired credential stored by the OS keychain or credential helper is silently reused until it is removed. Fine-grained or scoped tokens may lack access to that repository or the write scope. Organisations that enforce single sign-on require the token or SSH key to be authorised for that organisation separately. Over SSH, `ssh -T` against the host shows which account the key belongs to; the wrong key being offered first (often a key for another account) gives "permission denied" even though a valid key exists.
</context>

<task>
<error>
{{error}}
</error>

1. Read the error, then check the remote and protocol: `git remote -v`. Do not ask the user to paste tokens or private keys at any point.
2. HTTPS path:
   - which credential helper is used: `git config --show-origin --get-all credential.helper`;
   - whether a stale credential is stored, and how to remove it for this host on this OS (the OS keychain or credential manager entry, or `git credential reject` with protocol and host);
   - whether the token has access to this repository and the needed scope (read for clone, write for push), has not expired, and is authorised for the organisation's SSO if enforced.
3. SSH path:
   - `ssh -T git@<host>` to see which account answers, and `ssh -vT git@<host>` to see which key files are offered;
   - whether the agent has the key (`ssh-add -l`), whether `~/.ssh/config` routes the host to the intended key with `IdentitiesOnly yes`, and whether the public key is added to the right account and authorised for SSO;
   - for "host key verification failed", check the host's published fingerprint before accepting a new key.
4. Account and access: confirm the account has access to the repository at all, and that the repository path and owner are spelled correctly; "not found" may mean "no access".
5. Give the fix as numbered commands for this OS, one change at a time, re-running the failing command after each.
6. If both protocols are viable, mention switching the remote URL with `git remote set-url` as an option, not as the default.
</task>

<constraints>
- Never ask for or display tokens, passwords or private key contents; refer to them by name only.
- Do not suggest disabling TLS verification or `StrictHostKeyChecking`.
- Do not invent menu paths in hosting settings; describe them generally and say to look for the current label.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Cause
The most likely cause in one or two sentences, and how the evidence shows it.
## Fix
Numbered commands, each with what it changes.
## Check
The command that should now succeed and what success looks like.
## Avoid next time
One or two bullets, such as token expiry reminders or an SSH config entry.
</output_format>
