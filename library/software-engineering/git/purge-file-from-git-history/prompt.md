---
schema: 1
id: purge-file-from-git-history
kind: prompt
title: Purge a file from git history
description: Removes a large file or committed secret from all git history with git filter-repo, with a backup first, exact commands, force-push coordination and what every collaborator must do.
category: git
version: 1.0.1
status: incubating
stage: [maintain]
role: [maintainer, tech-lead, devops-engineer, software-engineer]
stack: [git]
requires: [none]
inputs: [text]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [git-filter-repo, history-rewrite, force-push, committed-secret, large-files]
pairs_with:
  prompts: [respond-to-leaked-secret, recover-lost-git-work, clean-up-commit-history]
args:
  - name: what_to_remove
    description: The file paths, file patterns, size threshold or secret strings to remove, and roughly when they were committed and on which branches.
    type: text
    required: true
  - name: hosting
    description: Where the repository is hosted, for example github, gitlab, bitbucket, azure-devops or self-hosted.
    type: string
    default: github
  - name: is_secret
    description: True if what is being removed is a credential or other sensitive data, which changes the order of work.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Before you start, Back up, Rewrite, Verify, Push, Host cleanup, Tell collaborators, Afterwards]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.1, note: "Treats described credentials and personal data as secrets even when the flag is left false."}
  - {version: 1.0.0, note: "First version."}
---
<context>
Deleting a file in a new commit does not remove it from history: every clone, fork and cached view still has it. Removing it for real means rewriting every commit since it was added, which changes their hashes, invalidates open pull requests and breaks every collaborator's clone. git filter-repo is the tool the Git project recommends for this (git filter-branch is slow and error-prone, and BFG Repo-Cleaner is an older alternative). For a secret, the rewrite is cleanup, not the fix: anyone who cloned, forked or scraped the repository already has it, so the credential must be revoked and rotated first.
</context>

<task>
Write a step-by-step plan to remove this from the repository's entire history:

<what_to_remove>
{{what_to_remove}}
</what_to_remove>

Hosting: {{hosting}}
Is a secret or sensitive data: {{is_secret}}
Treat it as a secret even if this says false when the description shows a credential, token, key, private certificate or personal data, and say that you did.

1. **Before you start.** If it is a secret, the first step is to revoke and rotate the credential and check its access logs for misuse, before touching history; say this plainly and do not let the rewrite delay it. For any rewrite: name the window when nobody may push, list the open pull requests and branches that will need recreating, check whether the file should instead stay in history through Git LFS (`git lfs migrate import --include="<pattern>" --everything`) if it is a large asset the project still needs, and note that every commit hash after the first affected commit will change, breaking links and signatures on rewritten commits and tags.
2. **Back up.** A mirror clone (`git clone --mirror <url> backup.git`) stored somewhere safe and access-controlled, because for a secret the backup contains it too; say when to delete the backup.
3. **Rewrite.** Install git filter-repo with the platform's package manager or pip, make a fresh mirror clone to work in, and give the exact command for this case:
   - a path: `git filter-repo --invert-paths --path <path>` (repeat `--path`, or use `--path-glob` for patterns);
   - large files by size: `git filter-repo --strip-blobs-bigger-than <size>`, after listing the biggest blobs so the user can choose the threshold;
   - a secret string inside files that must stay: `git filter-repo --replace-text <expressions-file>`, with the file format (`literal:<secret>==>***REMOVED***` or `regex:<pattern>==>***REMOVED***`) and a warning not to commit or share that file.
   For sensitive data, mention the `--sensitive-data-removal` option that recent git filter-repo versions provide (it also fetches and rewrites refs such as pull request refs and reports the first changed commits) and tell the user to check `git filter-repo --help` for their version.
4. **Verify** before pushing, with commands that must return nothing: `git log --all --oneline -- <path>` for a path, `git log --all -S '<secret>' --oneline` for a string (run it locally only and keep it out of shell history), and the largest-blobs listing again for size cleanups. Also check the tags.
5. **Push.** Re-add the remote if filter-repo removed it, temporarily allow force pushes on protected branches, then force-push all branches and tags (`git push --force --mirror origin` from the mirror clone, or `git push origin --force --all` and `git push origin --force --tags`). Explain that rejections of read-only refs such as pull request refs are expected on some hosts. Restore branch protection immediately afterwards.
6. **Host cleanup** for {{hosting}}: the host still serves old commits through pull request refs, caches and forks. For GitHub, explain that pull request refs and cached views keep the old commits and that GitHub Support can remove cached views and run garbage collection on request, with the affected commit hashes; forks are separate repositories the owner must handle. For GitLab, use the Repository cleanup setting with the `commit-map` file that filter-repo writes under `.git/filter-repo/`. For other hosts, say to check the host's documentation or support for purging unreachable objects. Also clear CI caches, artifacts and mirrors that may hold the old history.
7. **Tell collaborators.** Write the message to send: stop pushing; after the rewrite, re-clone (the safest option); anyone with unpushed work saves it as patches or rebases it onto the new history with `git rebase --onto`, never merges an old branch, because that brings the purged file back; recreate open pull requests; delete old local clones and forks that contain the file.
8. **Afterwards.** Add the path or pattern to `.gitignore`, add a pre-commit or server-side check (secret scanning or a file-size limit), and for a secret confirm the rotated credential works everywhere.
</task>

<constraints>
- Do not run any command yourself. Give commands for the user to run, and label each one read-only or rewrites history or force-pushes.
- Never print, echo or repeat the secret value in the plan; use a placeholder like `<secret>`.
- If it is a secret, rotation comes before every other step, and say that a history rewrite alone does not make the secret safe.
- Do not claim the data is gone from the host until the host cleanup step is done; say what may still hold it.
- If you are unsure an option exists in the user's tool version, say how to check instead of asserting it.
</constraints>

<output_format>
## Before you start
## Back up
## Rewrite
## Verify
## Push
## Host cleanup
## Tell collaborators
Include the ready-to-send message in a quote block.
## Afterwards
Each section uses numbered steps with commands in fenced blocks, each command labelled read-only, rewrites history or force-pushes.
</output_format>
