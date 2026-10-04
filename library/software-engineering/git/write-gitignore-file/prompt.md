---
schema: 1
id: write-gitignore-file
kind: prompt
title: Write a .gitignore file
description: Writes a commented .gitignore for a stack and toolchain, keeps personal editor files in a global excludes file, never ignores lockfiles, and shows how to untrack files already committed.
category: git
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer]
stack: [git]
requires: [none]
inputs: [text]
output: [config, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
tags: [gitignore, repo-setup, untrack-files, build-artifacts]
pairs_with:
  prompts: [audit-repo-for-secrets, set-up-git-lfs]
args:
  - name: stack
    description: Languages, frameworks and package managers in the repo, for example "Python 3.12 with uv and Django, React frontend with pnpm" or "Unity 2022 project".
    type: string
    required: true
  - name: tools
    description: Optional build tools, IDEs, OS mix, generated folders and files that are being committed by mistake, for example "Docker, Terraform, VS Code and JetBrains users, macOS and Windows; .env and coverage/ keep showing up".
    type: string
    default: ""
output_contract:
  format: markdown
  sections: [.gitignore, Personal ignores, Already committed files, Check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is starting a repository or cleaning one up. Copy-pasted mega-templates ignore hundreds of things the project never produces and sometimes ignore things that must be committed (lockfiles, `.env.example`, IDE settings the team shares). A good .gitignore lists only what this stack generates, is grouped and commented, keeps each developer's editor and OS files out of the shared file, and comes with the commands to stop tracking files already committed, since .gitignore does not affect tracked files.

Stack: {{stack}}
Tools and problems: {{tools}}
</context>

<task>
1. List what the stack and tools generate or download: dependency folders (`node_modules/`, `.venv/`, `vendor/` when not vendored on purpose), build output (`dist/`, `build/`, `target/`, `bin/` and `obj/`), caches (`__pycache__/`, `.pytest_cache/`, `.gradle/`, `.next/`), test and coverage output, logs, local environment and secret files (`.env`, `.env.local`, `*.pem`, `*.tfstate` and `.terraform/`), and engine or tool folders (for example Unity `Library/`, `Temp/`, `Logs/`).
2. Write the .gitignore grouped by section with a one-line comment each. Use anchored patterns (`/dist/`) when the folder only exists at the root, and trailing slashes for directories.
3. Keep tracked, and say so in a comment: lockfiles (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `poetry.lock`, `uv.lock`, `Cargo.lock` for applications, `go.sum`, `Gemfile.lock`), example env files (add `!.env.example`), shared editor config the team agrees on (for example `.vscode/extensions.json`, `.editorconfig`), and engine files that must be versioned (Unity `.meta` files).
4. Put OS and personal editor files (`.DS_Store`, `Thumbs.db`, `.idea/` if not shared, `*.swp`) in a personal global excludes file instead, with the commands: `git config --global core.excludesFile ~/.gitignore_global`, then create that file. If the team prefers them in the repo file, add a short commented section.
5. For files already committed that should now be ignored, give `git rm -r --cached <path>` followed by a commit. Warn that when teammates pull that commit, git deletes those files from their working copies, so anyone who needs a local copy (for example their own `.env`) should back it up first; and that secrets already committed must be rotated and purged from history, not just untracked.
6. Give a check: `git status --ignored` and `git check-ignore -v <file>` to see which rule matches.
</task>

<constraints>
- Include only patterns this stack and these tools produce; no generic 300-line template.
- Never ignore lockfiles for applications, and never ignore files the build needs.
- If the stack is too vague to know what it generates (for example "web app"), ask for the languages and package managers and stop.
- Do not invent tool names or folder names; if unsure whether a tool writes a folder, mark the line with a `# check:` comment.
</constraints>

<output_format>
## .gitignore
One code block, grouped and commented.
## Personal ignores
The `core.excludesFile` command and a short code block for the global file.
## Already committed files
Commands, plus the warning about secrets, or "Nothing to untrack" if none were mentioned.
## Check
The two verification commands and what to look for.
</output_format>
