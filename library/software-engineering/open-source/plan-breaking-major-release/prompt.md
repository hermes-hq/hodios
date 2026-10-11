---
schema: 1
id: plan-breaking-major-release
kind: prompt
title: Plan a library's next major release
description: Plans a library's next major version, choosing which breaking changes earn their place, with deprecations first, a migration guide, codemods, prereleases, old-major support and the announcement.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [maintainer, tech-lead]
requires: [none]
inputs: [text, ticket]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [major-release, breaking-changes, deprecation, codemods, prerelease, upgrade-path]
pairs_with:
  prompts: [write-versioning-policy, write-migration-guide, write-release-announcement-kit]
  personas: [open-source-maintainer]
args:
  - name: project
    description: The library, its ecosystem, the current major and how widely it is used, who maintains it and how much time they have.
    type: text
    required: true
  - name: candidates
    description: The breaking changes being considered (API removals, renamed options, new defaults, dropped runtimes, a new architecture), with links or summaries of the issues behind them.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Change list, Deprecations first, Migration support, Release sequence, Old major support, Communication, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Major releases cost users far more than maintainers expect, and the cost is mostly in the number of separate things they must change, not the size of any one. Successful majors batch breaking changes so users migrate once, cut changes that do not pay for themselves, ship deprecation warnings in the last minor of the old major so users can fix call sites before upgrading, and make mechanical changes mechanical with a codemod or a compatibility layer. They release alphas or release candidates under a non-default tag, ask large downstream users to try them, and keep the old major on security fixes for a stated period. Majors that go badly drop runtime support and change behaviour silently (a new default with no warning), mix a rewrite with API changes so nothing can be bisected, or announce a long beta that never ends while the old major stops getting fixes. Ecosystem rules matter too: Go module paths change at v2, npm and PyPI pre-releases need explicit tags or version markers.

Project:
<project>
{{project}}
</project>
Candidate breaking changes:
<candidates>
{{candidates}}
</candidates>
</context>

<task>
1. Change list: for each candidate, estimate user impact (how many users, how hard to adapt, whether a codemod can do it) against the benefit, and mark include, defer, or make non-breaking (with how, such as an alias or an opt-in flag). Point out silent behaviour changes and recommend making them loud.
2. Deprecations first: which warnings to ship in a final minor of the current major, with the warning text pattern and how users can find all call sites.
3. Migration support: the outline of the migration guide, which changes a codemod should cover and which are judgement calls, and any temporary compatibility layer.
4. Release sequence: deprecation minor, alphas or betas, release candidate, final, with entry and exit criteria for each stage rather than dates alone, and how pre-releases are published so they do not reach default installs.
5. Old major support: what the old line gets and until when, sized to the maintainers' time.
6. Communication: when and where to announce, early notice to large dependents, and what goes in the final release notes.
7. Risks: ecosystem lag (plugins, frameworks pinned to the old major), a split community, and what to do if the release candidate shows a change is too costly.
</task>

<constraints>
- Do not invent usage figures or dependents; mark them as things to check.
- Prefer fewer breaking changes; argue against including a change whose main benefit is internal tidiness.
- Do not set a support window the stated maintainer time cannot keep.
- Follow the project's ecosystem release conventions and say where the user should verify a specific rule.
</constraints>

<output_format>
Use the contract's section headings in order. Change list as a table: Change | Users affected | Migration effort | Codemod? | Decision. Release sequence as a table: Stage | Contents | Exit criteria | Channel or tag.
</output_format>
