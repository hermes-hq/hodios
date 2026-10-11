---
schema: 1
id: publish-cli-to-homebrew
kind: prompt
title: Make a command-line tool installable with Homebrew
description: Makes a command-line tool installable with Homebrew via your own tap or homebrew-core, with a formula, a real test block, bottles where needed and an update path for new releases.
category: open-source
version: 1.0.0
status: incubating
stage: [ship]
role: [software-engineer, maintainer, devops-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [code, config, checklist]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [homebrew, homebrew-tap, cli-distribution, macos, package-publishing]
pairs_with:
  prompts: [publish-package-from-ci, write-installation-guide, sign-release-artifacts]
args:
  - name: tool
    description: The tool, its language and build system, how releases are made today (tags, GitHub releases, prebuilt binaries per platform), its licence, and roughly how many users it has.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Tap or homebrew-core, Formula, Test block, Release updates, Install instructions, Verified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
There are two routes into Homebrew. Your own tap (a repository named `homebrew-<something>`) is under your control, can install prebuilt binaries, and is ready the same day; users run `brew install owner/tap/tool`. homebrew-core makes `brew install tool` work for everyone, but it has acceptance rules: the project must be reasonably notable and maintained, have a stable tagged release, use an open-source licence, and build from source with Homebrew's own dependencies; prebuilt binaries and self-updating tools are generally not accepted, and core maintainers review every change. A formula's `test do` block must exercise real functionality, not just `--version`. Every formula needs a URL to a stable versioned archive and its sha256; a moving URL or a re-uploaded archive breaks installs with a checksum mismatch. Release tooling such as GoReleaser can generate and push a tap's formula or cask on each release, and homebrew-core has an automated bump process for listed formulae. Binaries downloaded outside Homebrew on macOS can be blocked by Gatekeeper unless signed and notarised.

{{> guardrails/investigate-before-answering}}

Tool:
<tool>
{{tool}}
</tool>
</context>

<task>
1. Read the build files, release config and existing release assets. Recommend a tap, homebrew-core, or a tap first then core later, against the core acceptance rules as you understand them, and tell the user to confirm them in Homebrew's current documentation.
2. Write the formula: `desc`, `homepage`, `url` to a versioned source archive (or per-platform binaries for a tap), `sha256` computed from the actual file, `license` as SPDX, `depends_on` build and runtime dependencies, an `install` method using Homebrew's helpers for the language, and shell completions and man pages if the tool can generate them.
3. Write a `test do` block that runs the tool on real input in a temporary directory and checks output.
4. Put the formula in a tap (for a local test, a scratch tap made with `brew tap-new`, since recent Homebrew versions refuse to install formulae from a bare file path), then run `brew install --build-from-source` on it, `brew test`, and `brew audit --strict --new` (with `--online` where possible), and fix what they report.
5. Release updates: how each new release updates the formula (release tooling pushing to the tap, a CI job opening a bump PR, or homebrew-core's bump process), and bottles for a tap if building is slow.
6. Install instructions for the README, including the tap command.
</task>

<constraints>
- Do not invent a sha256; compute it from the downloaded archive or leave [SHA256] with the command to produce it.
- Do not open a pull request to homebrew-core or push to a tap; prepare the files and commands for the user.
- Keep self-update features out of formula installs, or explain how the tool should disable them when installed by Homebrew.
- Do not claim the tool meets homebrew-core's notability rules; state what you checked and what the maintainers decide.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
Use the contract's section headings in order. The formula as a full Ruby file in a fenced block with its path in the tap. Release updates as numbered steps. Verified lists brew commands run and their results, or "not run" with the reason (for example, no macOS or Linuxbrew available).
</output_format>
