---
schema: 1
id: comment-complex-code
kind: prompt
title: Comment complex code
description: Adds why-comments to tricky code, such as non-obvious logic, workarounds, invariants and ordering constraints, without restating what the code already says.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, maintainer]
requires: [repo-read, file-write]
inputs: [file, repo]
output: [diff, docs]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [code-comments, readability, maintainability]
pairs_with:
  rules: [code-comment-rules]
  prompts: [fix-stale-code-comments]
args:
  - name: target
    description: The file, function, class or code region to comment.
    type: text
    required: true
  - name: notes
    description: Background the code cannot tell you, such as the bug a workaround fixes, a ticket number or an external constraint.
    type: text
output_contract:
  format: markdown
  sections: [Comments added, Questions for the author, Code worth a second look]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Good comments carry what the code cannot: why this approach and not the obvious one, which invariant must hold, which ordering matters, which external bug or limit a workaround exists for, and what breaks if someone "simplifies" it. Comments that restate the code (`// increment i`) add noise and rot first. The reader who needs a comment is a future maintainer about to change the code under time pressure, so the most valuable comment sits right above the line they would wrongly change. A wrong comment is worse than none, so every claim must be backed by the code, its history, its tests or the author.
</context>

<task>
Add explanatory comments to {{target}}.
{{#notes}}
Background from the author: {{notes}}
{{/notes}}

1. Read the target code, its callers, its tests and, if available, `git log -p` and `git blame` for the lines that look odd. Commit messages and linked tickets often hold the reason for a workaround.
2. Find the places a careful reader would get stuck or wrongly "fix": non-obvious algorithms, magic numbers, deliberate ordering, defensive checks for cases that look impossible, concurrency and locking assumptions, performance tricks, workarounds for library or platform bugs, and behaviour kept for backward compatibility.
3. For each place, write a short comment that states the reason or the invariant, not the mechanics. Name the constraint concretely (the bug, the limit, the caller that depends on it). Link a ticket or upstream issue only if it appears in the code, history or notes.
4. Where a function's contract is non-obvious (preconditions, units, ownership, thread safety), add or extend its doc comment in the project's existing style.
5. Leave straightforward code alone. If a confusing block would be clearer with a better name or a small extraction, list it under "Code worth a second look" instead of changing it.
6. Re-read every new comment against the code it sits above and confirm it is true.
</task>

<constraints>
- Change comments only. No renaming, reformatting or logic changes.
- Never invent a reason. If you cannot find why something is done, do not guess in the code; ask under "Questions for the author", or leave a `TODO(author): why ...?` only if the project already uses that style.
- Do not restate what the code does line by line, and do not add banner comments, section dividers or comments on every function.
- Match the language's comment syntax and the file's existing tone and density.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Apply the edits. Then reply with:
## Comments added
`path:line` and the one-line gist of each comment.
## Questions for the author
Places where the reason could not be established, as questions.
## Code worth a second look
Blocks that would be clearer with a rename or extraction, or look like bugs. Write "None" if there are none.
</output_format>
