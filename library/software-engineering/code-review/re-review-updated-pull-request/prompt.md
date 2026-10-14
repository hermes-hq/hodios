---
schema: 1
id: re-review-updated-pull-request
kind: prompt
title: Re-review a pull request after new pushes
description: Re-reviews a pull request after the author pushed fixes, checking each earlier comment was truly addressed and reviewing only what changed since the last review.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead]
requires: [git]
inputs: [diff, message]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [pull-request, follow-up-review, review-comments]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-pull-request, respond-to-review-comments, summarize-pull-request-discussion]
args:
  - name: earlier_comments
    description: The comments from the previous review round, with the author's replies.
    type: text
    required: true
  - name: new_changes
    description: The diff since the last reviewed commit (an interdiff or the commit range), or the pull request and the last reviewed commit so the agent can compute it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Earlier comments, New findings, Still open]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Second-round reviews fail in two opposite ways: the reviewer re-reads the whole pull request and raises new nits on code they already approved, which feels like moving goalposts; or they skim, see "Done" replies, and approve without checking. The useful second round reads only the interdiff (what changed since the last reviewed commit, which after a rebase or force-push must be computed against the old head, not the base), and checks each earlier comment against it. "Addressed" has levels: fixed as suggested, fixed differently but correctly, fixed in one place but not the others, replied with a good reason not to change, replied without a change, or silently ignored. Fixes also introduce new bugs, often in the hurried lines added to satisfy the comment. New comments on unchanged code are fair only for real defects missed the first time, and should say so.
</context>

<task>
<earlier_comments>
{{earlier_comments}}
</earlier_comments>

<new_changes>
{{new_changes}}
</new_changes>

1. Establish the interdiff: the changes since the last reviewed commit. If the branch was rebased or force-pushed, compare the old and new heads rather than the base; if you cannot compute it, say so and ask for it.
2. For each earlier comment, find the related change and classify: fixed, fixed differently (and correctly), partly fixed (other occurrences remain), declined with a reason, unanswered, or made worse. Quote the evidence line.
3. For declined comments, judge whether the reason holds; if it does, say so and drop the comment.
4. Review the new lines for defects, focusing on code written to satisfy comments.
5. Only raise issues in code that did not change if they are real defects missed in the first round, and label them that way. Do not add new style nits.
6. Decide whether the pull request is ready: approve, approve with remaining nits, or request changes, listing exactly what still blocks.
</task>

<constraints>
- Every earlier comment gets a status with evidence; none skipped.
- Do not reopen points the reviewer and author already settled in replies.
- New findings in unchanged code must be defects and must be marked as missed earlier.
- At most 6 new findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the blocking items count.
## Earlier comments
Table: comment (short), status, evidence (`path:line`), note.
## New findings
Numbered: severity, `path:line`, in new code or missed earlier, problem, fix.
## Still open
Checklist of what must change before merging.
</output_format>
