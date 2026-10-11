---
schema: 1
id: maintain-patched-fork-of-dependency
kind: prompt
title: Maintain a patched copy of a dependency
description: Sets up a patched third-party dependency (patch file, git fork with rebased patches, or vendored copy) so it stays easy to update, review and send upstream.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, tech-lead, maintainer]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [repo, text]
output: [plan, code, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [patch-package, vendoring, upstream-patches, dependency-fork, package-manager]
pairs_with:
  prompts: [sync-fork-with-upstream, configure-dependency-update-bot, audit-dependencies]
args:
  - name: dependency
    description: The package you need to change, its current version, the package manager (npm, pip, Cargo, Go modules, Maven, Composer and so on) and why you need the change.
    type: text
    required: true
  - name: change
    description: The fix or change itself, or a link-free description of it, and whether an upstream issue or pull request already exists.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Changes made, Regression test, Update routine, Upstream, Verified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Patching a library you depend on is common and usually goes wrong slowly: someone edits files in `node_modules` or site-packages, the change disappears on the next install, or a private fork is pinned and never updated again, so the team silently misses security releases. There are three workable shapes, and the right one depends on the size of the change and the package manager. A patch file applied at install time (`patch-package` or the built-in `pnpm patch` / `yarn patch` for JavaScript, `[patch]` sections in Cargo, `replace` directives in Go, Composer patches plugins) suits small fixes and keeps the diff visible in review. A git fork with the changes kept as a short stack of commits rebased onto each upstream release suits larger or longer-lived changes, and must be published under its own version or pinned by commit. Vendoring a full copy into the repository suits abandoned or tiny dependencies, at the cost of owning every future update. Whatever the shape, the patch needs an owner, a link to the upstream report, a test that fails without it, and a rule for when it is removed.
<dependency>
{{dependency}}
</dependency>
{{#change}}
<change>
{{change}}
</change>
{{/change}}
</context>

<task>
1. Read the repository first: the manifest and lockfile, any existing patches folder or forks, the CI install step and how dependency updates arrive (a bot, manual). Note the package manager's own patch support before reaching for a tool.
2. Recommend one shape (patch file, fork, vendored copy) for this case and say why, in two or three sentences, naming the deciding factors: size of the change, how often upstream releases, whether upstream is maintained, and licence obligations for redistribution.
3. Make the smallest change in that shape. For a patch file: generate it with the package manager's patch command or patch-package, commit it, and wire it into the install step so a clean install applies it. For a fork: create the fork branch from the exact upstream tag in use, put the change in as one or a few focused commits, tag or version it distinctly (for example `1.4.2-yourorg.1`), and pin the manifest to that tag or commit, never a moving branch. For vendoring: copy the exact upstream release, keep its licence file, and record the source version.
4. Add a regression test in this project that fails without the patch and passes with it.
5. Write a short note next to the patch (or in the manifest comment where supported): what it changes, why, the upstream issue or pull request, the owner, and the condition for removal.
6. Describe the update routine: how to rebase or regenerate the patch on a new upstream version, how the update bot will behave (patch files fail loudly when they no longer apply; forks need a manual bump), and a reminder to check upstream each time.
7. Offer an upstream contribution: draft the issue or pull request text for the original project. Do not open it without the user's confirmation.
8. Run a clean install and the test suite, and report what you verified.
</task>

<constraints>
- Never edit files inside installed dependency folders as the fix itself; those edits are lost on the next install.
- Never pin a fork to a branch name; pin to a tag or a commit.
- Keep upstream licence and copyright notices; flag licences that restrict redistribution or require publishing changes, and leave the decision to the user.
- Do not push forks, publish packages or open upstream pull requests without explicit confirmation.
- Do not invent package manager flags; if unsure, say which documentation page to check.
</constraints>

<output_format>
## Recommendation
The chosen shape and why.
## Changes made
Files added or changed, with the patch or fork details.
## Regression test
What it checks.
## Update routine
Numbered steps for the next upstream release.
## Upstream
Draft issue or pull request text.
## Verified
What you ran and the result, plus anything not verified.
</output_format>
