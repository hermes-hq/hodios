---
schema: 1
id: recover-from-broken-package-release
kind: prompt
title: Recover from a broken package release
description: Handles a broken version just published to a package registry by stopping new installs (yank, deprecate, retract or dist-tag), shipping a fixed release, telling users and preventing a repeat.
category: open-source
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [maintainer, software-engineer, devops-engineer]
requires: [repo-read]
inputs: [text, logs, diff]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [yank, deprecate, hotfix-release, incident-response, package-registry]
pairs_with:
  prompts: [coordinate-security-release, publish-package-from-ci, write-postmortem]
args:
  - name: incident
    description: The package, registry, the broken version and the previous good one, what is broken and for whom (install fails, runtime crash, wrong files shipped, secret leaked, accidental breaking change), when it was published and any reports so far.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Severity, Stop the spread, Fix release, Tell users, Prevent a repeat]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a bad version goes out, the instinct is to delete it, which most registries do not allow and which breaks users who already locked it. The registry-specific tools differ: npm allows unpublish only within a short window and under conditions, and otherwise `npm deprecate` with a message plus moving the `latest` dist-tag back; PyPI and RubyGems support yanking, which keeps exact pins working but hides the version from new resolutions; crates.io yanking prevents new lockfiles from choosing it; Go modules use a `retract` directive in a newer version; Maven Central releases cannot be changed at all. In almost every case the fastest fix is a new patch version: either a revert to the last good code or a real fix, released through the normal pipeline with the step that failed added as a check. A leaked secret in a package is a different emergency: rotate it first, because yanking does not remove the files from mirrors and caches. An accidental breaking change in a minor or patch release should be reverted in a new patch, with the change moved to the next major.

Incident:
<incident>
{{incident}}
</incident>
</context>

<task>
1. Severity: who is affected (new installs, anyone with a range that resolves to it, pinned users), how bad (fails to install, crashes, data or security risk), and whether it is getting worse. Ask one question if the registry or the affected audience is unclear.
2. Stop the spread: the registry-specific action that fits (deprecate, yank, retract, moving a dist-tag, or unpublish only if the registry allows it and nobody depends on it yet), with exact commands for the user to run and what each does and does not do. If a secret leaked, put rotation first.
3. Fix release: decide between reverting to the last good code and a forward fix, based on how quickly a fix can be verified. Give the version number to use and the checks to run before publishing, including installing the built artefact in a clean environment.
4. Tell users: a short issue or pinned notice and a release-note entry saying which version is broken, what to do (upgrade to the fixed version, or pin the last good one), and that the bad version was deprecated or yanked. Keep it factual and brief.
5. Prevent a repeat: the specific check that would have caught this (a tarball contents check, a clean-install smoke test, a semver check, a matrix job), and where to add it.
</task>

<constraints>
- Do not run registry commands; give them to the user, and mark any irreversible step clearly.
- Do not recommend reusing a broken version number; registries forbid it or caches will serve the old file.
- Do not blame a contributor in public messages.
- If you are unsure of a registry's current rules (for example unpublish windows), say so and tell the user to check the registry's documentation before acting.
</constraints>

<output_format>
Use the contract's section headings in order. Stop the spread as numbered steps with commands in fenced blocks. Tell users as fenced drafts. Prevent a repeat as at most three items.
</output_format>
