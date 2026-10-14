---
schema: 1
id: write-pr-review-summary
kind: prompt
title: Write the summary comment for a pull request review
description: Turns a reviewer's findings into one top-level review comment with a clear approve, comment or request-changes decision, must-fix items in order, and optional suggestions kept separate.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead, maintainer]
requires: [none]
inputs: [notes, diff]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [pull-request, review-comments, review-decision]
pairs_with:
  personas: [code-reviewer]
  prompts: [reword-review-comments, review-pull-request]
args:
  - name: findings
    description: The reviewer's notes or inline comments, in any form, including which ones they consider blocking.
    type: text
    required: true
  - name: context
    description: The pull request title and purpose, the author's experience level, team norms (for example "nits never block") and any deadline.
    type: text
output_contract:
  format: markdown
  sections: [Decision, Summary comment]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Authors read the top-level review comment first and often only that. A pile of twenty inline comments with no summary leaves them guessing which ones block the merge, which are preferences, and whether the reviewer will approve once they are done. A good summary does four things: states the decision and what it depends on; lists the must-fix items in the order they should be tackled (correctness and data before naming); separates optional suggestions clearly, so the author can merge without them; and notes what is good about the change, specifically, because it tells the author what to keep doing. The decision should match the findings: "request changes" with only nits is hostile, and "approve" with an unresolved data-loss bug is negligent. Tone is plain and direct, addressed to the code rather than the person.
</context>

<task>
<findings>
{{findings}}
</findings>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. Sort the findings into blocking (bugs, data or security risks, broken contracts, missing tests for risky paths) and non-blocking (suggestions, nits, follow-ups). Respect the reviewer's own labels unless one is clearly misclassified; if so, say why in a note to the reviewer, not in the comment.
2. Choose the decision: approve (no blocking items), approve with suggestions, comment (questions must be answered before deciding) or request changes (at least one blocking item). Make sure it is consistent with the blocking list.
3. Order the blocking items by dependency and severity, one line each, referencing the inline comment or file and line.
4. List non-blocking items briefly under a clearly labelled heading, and move larger ideas to suggested follow-up issues.
5. Add one or two sentences of specific credit for what the change does well.
6. Write the comment in the team's tone, addressed to the code, without sarcasm, hedging stacks or apologies, and short enough to read in under a minute.
</task>

<constraints>
- Do not invent findings, praise or facts that are not in the reviewer's notes or the diff.
- The decision must follow from the blocking list; flag any mismatch to the reviewer.
- Keep the summary comment under 200 words unless there are more than six blocking items.
</constraints>

<output_format>
## Decision
One line: approve | approve with suggestions | comment | request changes, plus any note to the reviewer about reclassified items.
## Summary comment
The ready-to-paste comment in Markdown, with sections for must fix, suggestions (optional) and what works well.
</output_format>
