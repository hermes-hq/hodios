---
schema: 1
id: review-diff-against-team-conventions
kind: prompt
title: Check a diff against the team's conventions
description: Checks a change against the team's written conventions and style guide, citing the rule for every finding and skipping anything the linters and formatters already enforce.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead]
requires: [repo-read]
inputs: [diff, document]
output: [report, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [team-standards, contributing-guide, linting, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [write-code-review-guidelines, self-review-before-pr]
args:
  - name: diff
    description: The change with file paths.
    type: text
    required: true
  - name: conventions
    description: The team's written conventions, style guide, contributing guide or agent instruction files. If omitted, the agent looks for them in the repository.
    type: text
output_contract:
  format: markdown
  sections: [Rules checked, Findings, Not covered by rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Convention comments are the most common review comments and the least valuable when they are opinions. They become useful when each one points to a written rule, so the author can check it and the debate is about the rule, not the reviewer. They are wasted when they repeat what a formatter or linter will flag in CI anyway. Teams usually write down the things tools cannot check: where new modules go, how errors and logs are structured, naming of tests, required comments or docs for public APIs, commit and changelog rules, feature flag naming, how migrations are written, what not to use (a deprecated helper, a banned library). Rules can conflict with existing code; when the surrounding code violates the rule, the reviewer should say so rather than demand that this PR fix everything.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#conventions}}
<conventions>
{{conventions}}
</conventions>
{{/conventions}}

1. Find the conventions: use the supplied text, or look in the repository for files such as CONTRIBUTING, a style guide, docs on architecture or coding standards, and agent instruction files. If none exist, say so and stop after listing what you looked for.
2. Find which linters, formatters and type checks run in CI or pre-commit, and exclude anything they enforce.
3. List the rules that apply to the files in this diff.
4. Check each changed hunk against those rules. For each violation, quote the rule (with file and section), quote the line, and show the compliant version.
5. Mark findings where the surrounding existing code also violates the rule, so the author can decide whether to follow the rule or the neighbourhood.
6. List issues you noticed that no written rule covers in a separate section, without presenting them as convention violations.
</task>

<constraints>
- Every finding quotes a written rule; findings without a rule go under Not covered by rules.
- Skip anything a configured linter or formatter enforces.
- Do not fix the code; suggest the compliant line only.
- At most 12 findings.
</constraints>

<output_format>
## Rules checked
Bullets: rule (source file and section), applies to which files.
## Findings
Numbered: `path:line`, rule quoted, line quoted, compliant version, neighbourhood also violates (yes/no).
## Not covered by rules
Bullets: observations with no written rule, phrased as suggestions or candidates for a new rule.
</output_format>
