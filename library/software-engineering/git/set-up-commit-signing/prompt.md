---
schema: 1
id: set-up-commit-signing
kind: prompt
title: Set up commit signing
description: Sets up commit and tag signing with SSH or GPG keys step by step, with hosting-side verification, CI bot signing, and how a signature differs from a DCO sign-off. Use when signing is required.
category: git
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, maintainer]
stack: [git]
requires: [none]
inputs: [preferences]
output: [conversation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [commit-signing, ssh-keys, gpg, verified-commits, dco]
pairs_with:
  prompts: [set-up-git-on-new-machine, configure-branch-protection]
args:
  - name: os
    description: The operating system you commit from.
    type: enum
    enum: [windows, macos, linux]
    required: true
  - name: method
    description: ssh reuses the SSH key type you may already have and is simpler; gpg is needed for some projects and older tooling.
    type: enum
    enum: [ssh, gpg]
    default: ssh
output_contract:
  format: markdown
  sections: [Setup summary, Your signing config, Troubleshooting]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's project requires signed commits, or they want their commits marked as verified. People confuse three things: a cryptographic signature (proves the commit came from a key you control), the `Signed-off-by` trailer added by `git commit -s` (a Developer Certificate of Origin statement, no cryptography), and the author email (anyone can set it). Setups fail in predictable places: the signing key is not added to the hosting account as a signing key, the commit email does not match a verified email on the account, the GPG agent cannot prompt for a passphrase, or CI bots commit unsigned.

Operating system: {{os}}
Method: {{method}}
</context>

<task>
Guide the setup one step per turn, waiting for the user's result each time.

1. Open with one line on the plan (about 6 steps) and the difference between signing and sign-off in two sentences. Ask for `git --version` (SSH signing needs git 2.34 or later) and whether they already have a key of this type.
2. Steps for **ssh**:
   1. Create or reuse a key: `ssh-keygen -t ed25519 -C "<email>"`; a separate signing key is fine.
   2. Configure git: `git config --global gpg.format ssh`, `git config --global user.signingkey <path to .pub>`, `git config --global commit.gpgsign true`, `git config --global tag.gpgsign true`.
   3. Local verification: create `~/.config/git/allowed_signers` with `<email> <public key>` and set `gpg.ssh.allowedSignersFile`, so `git log --show-signature` works locally.
   4. Hosting: add the public key to the account as a **signing key** (it is a separate type from an authentication key on most services), and make sure the commit email is verified on the account.
3. Steps for **gpg**:
   1. Install GnuPG for {{os}} (Gpg4win on Windows, GnuPG via Homebrew plus a pinentry program on macOS, the package manager on Linux).
   2. `gpg --full-generate-key` (ed25519 or RSA 4096, an expiry date, the commit email as a UID), then `gpg --list-secret-keys --keyid-format=long` to get the key id.
   3. `git config --global user.signingkey <keyid>`, `commit.gpgsign true`, `tag.gpgsign true`, and `gpg.program` if git cannot find gpg on {{os}}.
   4. Export the public key with `gpg --armor --export <keyid>` and add it to the hosting account; back up the private key and a revocation certificate somewhere safe offline.
4. Test: make a commit, run `git log --show-signature -1`, push to a branch, and check the hosting site shows the commit as verified. Sign a tag with `git tag -s`.
5. Ask whether CI bots or automation commit to the repo. If yes, explain the options: the hosting service's own signed commits when changes are made through its API, or a dedicated bot key stored as a CI secret, never a person's key.
6. If the project requires a DCO, explain `git commit -s` adds the sign-off, that `format.signOff` only affects `format-patch` and not commits, and suggest an alias such as `git config --global alias.cs "commit -s"`. Signing and sign-off are independent; many projects need both.
7. If any step fails, diagnose from the pasted output before continuing.
</task>

<constraints>
- One step per turn; give only {{os}} commands and only the {{method}} path unless the user switches.
- Never ask the user to paste a private key, passphrase or full secret key listing. Public keys and key ids are fine.
- Do not invent hosting menu paths; name the setting ("SSH and GPG keys", "signing key") and say to look for the current label.
- Be precise about what verification proves and what it does not (it does not prove the code is safe).
</constraints>

<output_format>
Each turn: the step, one sentence of why, a command block, what success looks like.
At the end:
## Setup summary
A checklist of the steps, done or skipped.
## Your signing config
The expected `git config --global --get-regexp '^(gpg|user.signingkey|commit.gpgsign|tag.gpgsign)'` output with placeholders.
## Troubleshooting
Bullets for the three most likely failures for this method and {{os}}: unverified badge, email mismatch, agent or pinentry problems.
</output_format>
