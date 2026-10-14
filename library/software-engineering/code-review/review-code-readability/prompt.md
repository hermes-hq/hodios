---
schema: 1
id: review-code-readability
kind: prompt
title: Review code for readability
description: Reviews code for how fast a newcomer can understand it - unclear names, long functions, hidden intent, deep nesting, misleading comments - with a concrete rewrite for each finding.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer]
requires: [none]
inputs: [diff, file]
output: [report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [readability, identifiers, maintainability, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [improve-naming, explain-code]
args:
  - name: code
    description: The diff or file to review, with its language and file path.
    type: text
    required: true
  - name: audience
    description: Who will maintain it, for example "rotating on-call engineers new to this service" or "the same two authors".
    type: text
output_contract:
  format: markdown
  sections: [Summary, Findings, Leave as is]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Readability review is useful when it is concrete and harmful when it is taste. The question is not "would I have written it this way" but "where will the next reader slow down or misunderstand". The real problems: names that describe type or mechanism instead of meaning (`data`, `list2`, `handle`, `flag`), or that lie (`getUser` that creates one); boolean parameters that make call sites unreadable (`send(msg, true, false)`); a function that does three things at three levels of abstraction; deep nesting where guard clauses would flatten it; magic numbers and strings whose meaning lives in someone's head; clever one-liners hiding a business rule; the same concept called three different names; comments that restate the code while the one surprising line has none. Each finding should come with the rewritten code, because "unclear" alone gives the author nothing to do. Readability changes must not change behaviour, and the codebase's own idioms win over generic advice.
</context>

<task>
<code>
{{code}}
</code>

{{#audience}}
<audience>
{{audience}}
</audience>
{{/audience}}

1. Read the code once as a newcomer and note each place you had to stop, reread or guess. Those places are the candidate findings.
2. For each, identify the cause: misleading or vague name, mixed abstraction levels, too many responsibilities, nesting, boolean or positional argument lists, magic values, inconsistent terms, missing explanation of a non-obvious why, dead or commented-out code.
3. Check the codebase's conventions (if you can read the repository) so rewrites use local idioms and naming.
4. For each finding, write the rewrite: the renamed identifiers, the extracted function with its name, the guard clause version, the named constant. Keep behaviour identical and say so.
5. Rank findings by how much reader time they cost, not by how easy they are to fix.
6. List what already reads well and should stay, so the author does not over-correct.
</task>

<constraints>
- Every finding includes the rewritten code; no "consider renaming".
- No behaviour changes in rewrites; if a readability fix would need one, flag it separately.
- Do not report formatting a formatter would handle, and do not impose a style that conflicts with the surrounding code.
- At most 8 findings.
</constraints>

<output_format>
## Summary
One or two sentences: how easy the code is to follow and the biggest obstacle.
## Findings
Numbered: cost to reader (high/medium/low), `path:line`, what slows the reader, rewrite (code block).
## Leave as is
Bullets: parts that read well.
</output_format>
