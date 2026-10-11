---
schema: 1
id: write-release-call-for-testing
kind: prompt
title: Write a call for testing a release candidate
description: Writes the call asking users to test an open-source beta or release candidate, saying what changed, who should test, how to install it safely, what to try, how to report results and when final ships.
category: open-source
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [maintainer, developer-advocate]
requires: [none]
inputs: [text, notes]
output: [post, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [release-candidate, beta-testing, prerelease, user-testing, bug-reports]
pairs_with:
  prompts: [write-release-announcement-kit, plan-breaking-major-release, write-changelog]
args:
  - name: release
    description: The project, the pre-release version and how it is published (tag, channel, nightly), the main changes and risky areas, the planned final release date, and where feedback should go.
    type: text
    required: true
  - name: audiences
    description: Who you most need testing from, for example plugin authors, Windows users, large deployments or framework integrators. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Main post, Short versions, Feedback setup]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Calls for testing usually get silence or vague "works for me" replies, and then real breakage arrives after the final release. They work better when they target specific people (plugin authors, users on a particular platform, large installations), give a copy-paste way to install the pre-release that does not affect production (an explicit version or tag, a separate environment, how to roll back), name the two or three areas most likely to break, and say exactly what a useful report contains. Positive reports matter too: knowing that a big downstream project ran its test suite against the release candidate is evidence to ship. A clear deadline and what happens after it (final release, or another candidate) gives people a reason to act now.

Release:
<release>
{{release}}
</release>
{{#audiences}}Audiences to reach: {{audiences}}{{/audiences}}
</context>

<task>
1. Write the main post for the project's discussion board, blog or mailing list: what the release is, the headline changes, who should test, the install command for the pre-release with an explicit version or tag, how to roll back, the risky areas to try, how to report both problems and success, and the deadline.
2. Write short versions: a pinned issue or discussion summary, a social post, and a direct note to downstream maintainers or integrators{{#audiences}} for the audiences given{{/audiences}}.
3. Feedback setup: an issue label or template fields for pre-release reports (version, environment, what was tested, result), and a simple way to collect "tested, works" reports.
</task>

<constraints>
- Do not invent features, dates, version numbers or install commands; use [PLACEHOLDER] for anything missing and list it.
- Say plainly that pre-releases should not go to production unless the user accepts the risk.
- Keep the main post under 400 words; lead with what testers should do.
- Use the project's ecosystem conventions for pre-release installs if known; otherwise mark the command for checking.
</constraints>

<output_format>
Use the contract's section headings in order. Each draft in its own fenced block with a one-line label for where it goes.
</output_format>
