---
schema: 1
id: sync-notes-vault-with-git
kind: prompt
title: Sync a notes vault across devices with git
description: Sets up git sync for a Markdown notes vault such as Obsidian across computers and phones, with automatic commits, conflict handling, ignore rules and a private remote.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [individual, writer, researcher, software-engineer]
stack: [git, obsidian]
requires: [none]
inputs: [text]
output: [plan, config, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [notes-sync, markdown-vault, auto-commit, mobile-git, personal-knowledge]
pairs_with:
  prompts: [set-up-obsidian-vault, write-gitignore-file, set-up-git-on-new-machine]
args:
  - name: setup
    description: The notes app, the devices (Windows, macOS, Linux, Android, iOS), vault size including attachments, whether you already use git, and whether you edit on several devices at the same time.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is git right for you, Remote and access, Ignore rules, Automation per device, Conflicts, Attachments, Routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Git works well for a Markdown vault: every change is versioned, the remote is private and free, and nothing depends on a sync vendor. It works badly when set up like a code project. Notes need automatic commit, pull and push on a timer and on app open and close, or people forget and create conflicts. Pull should happen before editing on each device, and conflicts are usually avoided by never editing the same note on two devices without syncing in between. App workspace and cache files (for Obsidian, files such as `workspace.json` under `.obsidian/` change constantly) must be ignored or they conflict on every sync, while the settings and plugin lists can be shared. Attachments (images, PDFs) grow the repository forever; large vaults may need LFS or a separate folder synced another way. Mobile is the hard part: iOS cannot run git in the background, so community git plugins or dedicated git apps work with limits, and some people use git on desktop only and another sync on mobile; mixing two sync methods on the same folder causes duplicate and conflicted files. The repository must be private, and notes may contain personal data worth encrypting.

<setup>
{{setup}}
</setup>
</context>

<task>
1. Say whether git is a good fit for this setup, honestly, compared with the app's own sync or a cloud folder, considering devices (especially iOS), vault size and the user's comfort with git.
2. Plan the remote: a private repository on a host the user chooses, authentication per device (SSH key or a fine-grained token limited to that one repository), and never a public repository.
3. Write the `.gitignore` for the app's volatile files and OS junk, and decide which app settings to share across devices.
4. Set up automation per device type: the app's git plugin or a scheduled script on desktop (pull on open, commit and push every few minutes and on close), and the realistic options and limits on Android and iOS, stating that plugin and app names and features should be checked for current versions.
5. Explain conflicts in plain words: why they happen, how to avoid them (sync before switching devices), and how to resolve a conflicted note step by step without losing either version.
6. Handle attachments: estimate growth, and suggest LFS, an attachments size limit, or a separate sync for media if the vault is large.
7. Give a short daily routine and a recovery tip (how to get back an old version of a note from history).
</task>

<constraints>
- Never recommend a public repository for personal notes; mention optional encryption for sensitive notes.
- Do not combine git with another sync service on the same folder; say why if the user plans to.
- State plugin and mobile app capabilities as things to check, not fact, since they change often.
- Keep commands copyable and explain each for a non-developer.
</constraints>

<output_format>
## Is git right for you
Short verdict and alternatives.
## Remote and access
Steps.
## Ignore rules
The `.gitignore` content.
## Automation per device
Desktop, Android and iOS.
## Conflicts
Avoid and resolve.
## Attachments
Advice for size.
## Routine
Daily steps and recovery.
</output_format>
