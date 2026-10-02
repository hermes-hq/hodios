---
schema: 1
id: write-changelog
kind: prompt
title: Write a changelog entry
description: Turns the commits and pull requests in a release range into a user-facing changelog entry in Keep a Changelog format, with breaking changes first. Use when cutting a release.
category: docs
version: 1.0.0
status: experimental
stage: [ship]
role: [maintainer, software-engineer]
requires: [repo-read, git]
inputs: [repo, diff, text]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [changelog, release-notes, semver]
pairs_with:
  personas: [technical-writer]
  prompts: [write-migration-guide]
args:
  - name: range
    description: The commit range or list of changes, for example v1.4.0..HEAD, or pasted commit and PR titles.
    type: text
    required: true
  - name: version
    description: The version being released. Leave empty for an Unreleased section.
    type: string
  - name: audience
    description: users describes outcomes people notice; developers also keeps internal changes that matter to integrators.
    type: enum
    enum: [users, developers]
    default: users
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A changelog is for people deciding whether to upgrade and what will change for them. Commit messages are written for maintainers, so pasting them in produces a list of refactors, CI tweaks and jargon that hides the two changes that matter. Each line should describe an outcome the reader will notice.
</context>

<task>
Write the changelog entry for {{range}}{{#version}}, released as version {{version}}{{/version}}, for {{audience}}.

1. Collect every change in the range: `git log` for the range, and the merged pull request titles and descriptions where available. Read the PR body or the diff when a title is unclear.
2. If a `CHANGELOG.md` exists, read its last entries and match their headings, wording, link style and date format.
3. Drop changes with no effect on the audience: refactors, tests, CI, formatting, dependency bumps without user impact. Keep security fixes and dependency updates that change behaviour or fix a vulnerability.
4. Merge commits that belong to the same change into one line.
5. Sort the remaining lines into the Keep a Changelog groups, in their standard order: Added, Changed, Deprecated, Removed, Fixed, Security. Put each breaking change at the top of its group with a `**Breaking:**` prefix and what users must do, and if there are any, open the entry with one line saying the release is breaking.
6. Write each line as one sentence about the outcome: "Uploads larger than 2 GB no longer fail", not "Fix chunk overflow in uploader". Add the PR or issue reference only if it appears in the source.
</task>

<constraints>
- Never invent a change, a version number, a release date or an issue reference. Use today's date only when a version is given and no date is supplied, and say that you did.
- No internal names (classes, files, functions) unless the audience is developers and the name is part of the public API.
- If you are unsure whether a change is user-visible, keep it and list it under "Check" in your reply.
- Do not edit `CHANGELOG.md` unless asked; output the entry.
</constraints>

<output_format>
The entry as Markdown: `## [version] - YYYY-MM-DD` (or `## [Unreleased]`), then `### Group` headings with bullet lines. Omit empty groups.
Then a short section `Left out` listing the commits you dropped, grouped by reason, so the maintainer can check nothing important was hidden.
Then `Check`, listing lines you were unsure about, or "None".
</output_format>
