---
schema: 1
id: write-ai-reviewer-instructions
kind: prompt
title: Write instructions for an AI code reviewer
description: Writes the instruction file for an AI pull request reviewer in a repository, saying what to flag, what to ignore, severity levels and comment style, so its reviews are signal rather than noise.
category: meta
version: 1.0.0
status: incubating
stage: [build, review]
role: [tech-lead, software-engineer, maintainer]
requires: [repo-read]
inputs: [text, repo]
output: [docs, prompt]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, ai-code-review, review-noise]
pairs_with:
  prompts: [write-agents-md, mine-review-comments-for-agent-rules, review-ai-generated-code]
  personas: [code-reviewer]
args:
  - name: repo_context
    description: Stack, the kinds of bugs that have actually hurt you, team conventions not enforced by tools, and what linters, formatters and CI already check.
    type: text
    required: true
  - name: noise_examples
    description: Comments the AI reviewer made that were unhelpful or wrong, and any it made that were valuable.
    type: text
output_contract:
  format: markdown
  sections: [Focus, Instruction file, Trial, Tuning]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An AI reviewer left on defaults comments on style a formatter already fixes, suggests "consider adding error handling" with no failing case, restates the diff as a summary nobody reads, praises the code, and repeats the same comment on every push. Within weeks the team stops reading it, including the one comment that would have caught a real bug. Useful reviewer instructions are specific to the repository: the classes of bug that have actually caused incidents, the invariants a reviewer must check (money as integer cents, migrations backward compatible, every query scoped to a tenant), an explicit list of things to ignore because tools handle them, a severity scale with a threshold below which it stays silent, and a requirement that every comment names the line and the concrete failure.
</context>

<task>
Write reviewer instructions for this repository.
<repo_context>
{{repo_context}}
</repo_context>
{{#noise_examples}}
<noise_examples>
{{noise_examples}}
</noise_examples>
{{/noise_examples}}

1. Pick the focus: three to eight repository-specific checks drawn from past incidents and unwritten invariants, each with what a violation looks like. If you can read the repository, find example files showing the correct pattern.
2. Write the ignore list: everything formatters, linters, type checkers and CI already enforce, naming preferences, and speculative suggestions without a failing scenario. Turn each noise example into an explicit ignore or rule.
3. Define severity: blocking (bug, security, data loss, broken invariant), should fix (likely bug or missing test for changed behaviour), and nothing below that by default. Set a maximum number of comments per review.
4. Define the comment format: file and line, what goes wrong and under which input, the suggested fix. No praise, no summary of the diff unless asked, no repeating a comment already resolved or answered.
5. Write the instruction file in the reviewer tool's location if known, marking keys you are unsure of "check against the tool's documentation".
6. Plan a trial: replay the reviewer on five recent merged pull requests, including one that caused a bug, and count useful, noise and missed comments.
</task>

<constraints>
- Do not invent past incidents or invariants; use only what the context gives or the repository shows, and ask for more if the context is thin.
- Keep the instruction file under about 60 lines; long reviewer instructions get applied unevenly.
- The reviewer comments; it never approves, merges or pushes changes.
{{> output/uncertainty}}
</constraints>

<output_format>
## Focus
Table: check, what a violation looks like, example of the correct pattern.
## Instruction file
Path, then one fenced block.
## Trial
Pull requests to replay and the scoring sheet.
## Tuning
How to adjust after the trial: which counts trigger which change.
</output_format>
