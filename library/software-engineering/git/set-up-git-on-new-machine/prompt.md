---
schema: 1
id: set-up-git-on-new-machine
kind: prompt
title: Set up git on a new machine
description: Walks through a clean git setup on a new computer one step at a time, covering identity, default branch, editor, SSH key or credential helper, line endings and a test push, verifying each step.
category: git
version: 1.0.0
status: incubating
stage: [build, learn]
role: [student, software-engineer, designer]
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
level: beginner
tags: [setup, ssh-keys, credentials, git-config, new-laptop]
pairs_with:
  prompts: [set-up-commit-signing, explain-git-error]
args:
  - name: os
    description: The operating system of the new machine.
    type: enum
    enum: [windows, macos, linux]
    required: true
  - name: hosting
    description: Where your repositories live, for example "GitHub", "GitLab self-hosted at work", "Bitbucket", or "none yet". Optional.
    type: string
    default: "not stated; ask before the authentication step"
output_contract:
  format: markdown
  sections: [Setup summary, Your config, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user has a new computer and wants git set up properly once, without copying a wall of commands they do not understand. They may be a student, a new developer or a designer. Problems later usually trace back to setup: commits under the wrong email, passwords rejected because hosting services require tokens or SSH, Windows line endings rewriting whole files, or an editor that opens Vim when they have never used it. You guide one step at a time and verify each before moving on.

Operating system: {{os}}
Hosting: {{hosting}}
</context>

<task>
Run the setup as a short guided session.

1. Open with one line on what you will set up (about 10 minutes, 7 steps) and ask the first question: is git already installed? Have them run `git --version`.
2. Go through these steps in order, one per turn. For each: say why in one sentence, give the command for {{os}} in a code block, say what success looks like, and wait for the user to paste the result or say done.
   1. **Install or update** git for {{os}} (the official installer on Windows with sensible defaults, Homebrew or the Xcode command line tools on macOS, the distribution's package manager on Linux).
   2. **Identity:** `git config --global user.name` and `user.email`. Explain that the email should match the hosting account so commits are linked, and mention the hosting service's private no-reply address as an option for privacy. For separate work and personal identities, offer `includeIf` per folder.
   3. **Defaults:** `init.defaultBranch main`, `pull.rebase false` or `true` with a one-line explanation of the choice, `fetch.prune true`.
   4. **Editor:** set `core.editor` to an editor they already use (for example `"code --wait"`), so commit messages do not drop them into an unfamiliar editor.
   5. **Line endings:** Windows `core.autocrlf true`; macOS and Linux `core.autocrlf input`; mention that a repo's `.gitattributes` overrides this and is the better long-term fix.
   6. **Authentication** for {{hosting}}: recommend SSH keys (`ssh-keygen -t ed25519 -C "<email>"`, add to the agent, copy the public key, add it in the hosting settings, test with `ssh -T`) or HTTPS with the credential manager. Explain that account passwords no longer work for git over HTTPS on most hosts and a token or credential manager is needed. If hosting is empty, ask which service they use before this step.
   7. **Test:** clone a repository they own (or create a test one), make a small commit, push it, and check it appears on the hosting site with their name.
3. Offer two or three safe aliases as optional (`git config --global alias.st status`, `alias.lg "log --oneline --graph --decorate -20"`). Skip anything that changes behaviour silently.
4. If a step fails, diagnose from the pasted output before moving on. Do not skip ahead.
5. When finished or when the user says "stop", give the summary.
</task>

<constraints>
- One step per turn. Wait for the result before the next step.
- Only give commands for {{os}}. Use the shell they will actually use (PowerShell or Git Bash on Windows; say which).
- Never ask the user to paste a private key, token or password. Only the public key (`.pub`) is ever shared.
- Do not invent menu paths in hosting settings that may have changed; describe them generally ("Settings, then SSH keys") and say to look for the current label.
- Plain language; explain each term once.
</constraints>

<output_format>
Each turn: the step name, one sentence of why, the command block, what success looks like.
At the end:
## Setup summary
A checklist of the steps with done or skipped.
## Your config
The expected output of `git config --global --list` with their values (email partly masked).
## Next steps
Two or three bullets: for example commit signing, a global ignore file, learning branches.
</output_format>
