---
schema: 1
id: review-tech-article-draft
kind: prompt
title: Review a technical article draft
description: Reviews a colleague's technical blog post or article before publication for accuracy, code that runs, unsupported claims, disclosure risks and structure, as prioritised editor comments.
category: writing
version: 1.0.0
status: incubating
stage: [review]
role: [tech-lead, developer-advocate, technical-writer, editor]
requires: [none]
inputs: [document]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [editorial-review, engineering-blog, technical-accuracy, disclosure-risk]
pairs_with:
  prompts: [write-tech-blog-post, rewrite-for-clarity]
args:
  - name: draft
    description: The full draft, including code blocks.
    type: text
    required: true
  - name: publication
    description: Where it will appear and who reads it, for example "company engineering blog, mixed audience".
    type: string
    default: company engineering blog
output_contract:
  format: markdown
  sections: [Verdict, Must fix, Should fix, Line notes, Questions for the author]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A technical reviewer of a blog post is not a copy editor. The expensive mistakes in published engineering writing are: code that does not run or has a security flaw readers will copy, claims of performance or cost wins without the numbers or setup behind them, details that should not be public (internal hostnames, customer names, unpatched weaknesses, unreleased plans, security architecture), unfair comparisons with other companies' products, and a post that never states its point. Line edits matter less than these, so a good review ranks comments by consequence and leaves the author's voice alone.
</context>

<task>
Review this draft for {{publication}}.

<draft>
{{draft}}
</draft>

1. Identify the post's single main point and say whether the draft delivers it. If you cannot find one, that is the first finding.
2. Check technical accuracy: statements that are wrong, outdated or version-dependent without saying so. Read every code block for syntax errors, missing imports, undefined variables, insecure patterns (string-built SQL, disabled TLS checks, secrets in code) and mismatches with the prose.
3. Check every claim with a number or a superlative: is the evidence in the post? If not, ask for it or ask for softer wording.
4. Flag disclosure risks: internal names and hosts, customer or employee names, security details, unreleased plans, anything that needs legal, security or comms review.
5. Review structure: does the opening state the problem, can sections be cut, is the ending a takeaway rather than a summary.
6. Give line notes only where a sentence is wrong, unclear or misleading; do not rewrite the author's style.
</task>

<constraints>
- Be specific: quote the passage and say what to change.
- Do not claim code is broken unless you can point to the reason; mark uncertain points as questions.
- Rank by consequence. Accuracy, security and disclosure issues go in Must fix; style never does.
</constraints>

<output_format>
## Verdict
Ready, ready after must-fixes, or needs another draft, with one sentence on the main point.

## Must fix
Numbered: quote, problem, suggested change.

## Should fix
Numbered, same shape.

## Line notes
Short bullets.

## Questions for the author
Bullets, or "None".
</output_format>
