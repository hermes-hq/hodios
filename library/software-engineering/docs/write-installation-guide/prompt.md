---
schema: 1
id: write-installation-guide
kind: prompt
title: Write a multi-platform installation guide
description: Writes the installation page for a library or command-line tool across operating systems and package managers, with prerequisites, verification steps and fixes for common install failures.
category: docs
version: 1.0.0
status: incubating
stage: [ship]
role: [technical-writer, maintainer, developer-advocate]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [docs]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [install-guide, package-managers, cross-platform, cli-tools]
pairs_with:
  prompts: [write-readme, write-cli-reference]
args:
  - name: project
    description: The library or tool, and how it is distributed (npm, PyPI, crates.io, Homebrew, apt, winget, Scoop, release binaries, container image, building from source).
    type: text
    required: true
  - name: platforms
    description: Operating systems to cover.
    type: string
    default: macOS, Linux and Windows
output_contract:
  format: markdown
  sections: [Guide written, Verified, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A README quick start covers the happy path on the author's machine. The installation page is for everyone else: Windows users, people without admin rights, corporate proxies, Apple Silicon versus Intel, musl versus glibc Linux, and users who must install offline or pin a version. Most install issues are predictable: the wrong runtime version, `pip install` into the system Python instead of a virtual environment or pipx, global npm installs needing sudo, a binary not on PATH, macOS Gatekeeper blocking an unsigned binary, missing native build tools for packages with compiled extensions, and old versions shadowing new ones. Users also need a one-line check that the install worked and a clean way to upgrade and uninstall.
</context>

<task>
Write the installation guide for:

<project>
{{project}}
</project>

Platforms: {{platforms}}.

1. Read the packaging files (package.json, pyproject.toml, Cargo.toml, release workflow, Homebrew formula, install scripts) to find every real distribution channel, the supported runtime versions and architectures, and any native dependencies.
2. Write "Prerequisites": runtime and version range, build tools if a compiled dependency needs them, and supported architectures.
3. For each platform, give the recommended method first, then alternatives, with exact commands. Prefer user-level installs (pipx, virtual environments, npm prefix or npx) over sudo.
4. Add "Install a specific version", "Upgrade" and "Uninstall".
5. Add "Verify the install": a version command or tiny import and the expected output.
6. Add installation from release binaries with checksum or signature verification if the project publishes them, and from source.
7. Add troubleshooting for the common failures above that apply, each with the symptom and the fix.
8. Run the install and verify commands that are safe in this environment (a virtual environment or temporary prefix, not the system) and record what you verified.
</task>

<constraints>
- Only document channels that actually exist; do not invent a Homebrew tap or winget id. Mark unconfirmed ones "to confirm".
- Do not recommend `sudo pip install`, piping a downloaded install script straight into a shell without showing how to download and inspect it first, or disabling security prompts.
- Ask before installing anything globally on this machine.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the guide. Then reply with:
## Guide written
Path and channels covered per platform.
## Verified
Commands you ran and their results. Write "Nothing run" if none.
## Questions for the owners
Channels, versions or architectures to confirm.
</output_format>
