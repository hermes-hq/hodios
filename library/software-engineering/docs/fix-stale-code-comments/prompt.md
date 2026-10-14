---
schema: 1
id: fix-stale-code-comments
kind: prompt
title: Fix stale code comments
description: Finds comments and docstrings that no longer match the code beside them, such as wrong parameters, old behaviour or dead TODOs, and fixes or deletes each one.
category: docs
version: 1.0.0
status: incubating
stage: [maintain, review]
role: [software-engineer, maintainer]
requires: [repo-read, file-write, git]
inputs: [repo, file]
output: [diff, report]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [code-comments, docstrings, comment-drift, maintainability]
pairs_with:
  rules: [code-comment-rules]
  prompts: [comment-complex-code, sync-docs-with-code-change]
args:
  - name: scope
    description: The directory, package or files to check, or "whole repo".
    type: text
    required: true
  - name: mode
    description: fix applies the corrections; report only lists them for review.
    type: enum
    enum: [fix, report]
    default: fix
output_contract:
  format: markdown
  sections: [Fixed, Deleted, Needs the author, Possible code bugs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Comments drift because nothing checks them: a parameter is renamed but the docstring keeps the old name, a default changes from 30 to 60 seconds but the comment still says 30, a workaround is removed but its explanation stays, a TODO refers to a ticket closed years ago. Readers trust comments over code when skimming, so a stale comment actively causes bugs. The hard part is deciding which side is wrong: usually the code is the truth and the comment is stale, but sometimes the comment records the intended behaviour and the code has a bug. That case must go to a human, not be silently "fixed" in either direction.
</context>

<task>
Find and handle stale comments in {{scope}} (mode: {{mode}}).

1. Walk the scope file by file. For each doc comment and inline comment that makes a factual claim, compare it with the code it describes: parameter and return names and types, defaults, units, thrown errors, side effects, referenced functions, files, flags and config keys, and described control flow.
2. Use the history when it helps: `git log -L` or `git blame` on the commented lines shows whether the code changed after the comment was written.
3. Classify each mismatch:
   - stale: the code changed on purpose and the comment did not. Fix the comment.
   - dead: the comment describes code that no longer exists, commented-out code, or a TODO whose condition is resolved. Delete it.
   - ambiguous: the comment may describe intended behaviour and the code may be wrong. Do not change either; report it.
4. Check TODO and FIXME comments: delete those clearly done, keep those still valid, and report those you cannot judge.
5. In fix mode, edit the comments. In report mode, change nothing and list each finding with the proposed text.
6. Run the project's linter or doc build if it checks doc comments, and report the result.
</task>

<constraints>
- Edit comments and docstrings only. Never change code to match a comment.
- Do not rewrite comments that are accurate, even if you would phrase them differently.
- Never delete a comment that explains a reason (why) just because you cannot verify it; report it instead.
- Keep each fix minimal and in the existing style of the file.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Fixed
`path:line`: old claim, new claim, and the evidence (code line or commit).
## Deleted
`path:line` and why it was dead.
## Needs the author
Ambiguous comments and TODOs you could not judge, each as a question.
## Possible code bugs
Places where the comment looks right and the code looks wrong. Write "None" if there are none.
</output_format>
