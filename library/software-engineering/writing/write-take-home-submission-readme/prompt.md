---
schema: 1
id: write-take-home-submission-readme
kind: prompt
title: Write the README for a take-home assignment submission
description: Writes the README for your take-home coding assignment submission, explaining how to run it, the decisions and trade-offs, what is unfinished and what you would do with more time.
category: writing
version: 1.0.0
status: incubating
stage: [ship]
role: [job-seeker, software-engineer]
requires: [repo-read]
inputs: [repo, spec]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [take-home, technical-interview, job-application, trade-offs, readme]
pairs_with:
  prompts: [prepare-take-home-walkthrough, write-readme]
args:
  - name: assignment
    description: The assignment brief and any stated evaluation criteria or time limit.
    type: text
    required: true
  - name: submission
    description: Your repo to read, or notes on what you built, how to run it, decisions made, shortcuts taken and what is missing.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [README, Check before submitting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reviewers often spend ten or fifteen minutes on a take-home before deciding, and the README shapes that time. They want to run it in one command, see that the candidate understood the brief, and judge thinking from the trade-offs: what was prioritised within the time limit, what was deliberately left out, and what would change for production. Candidates lose points by hiding gaps (reviewers find them and assume carelessness), padding with generic sections, overstating test coverage, or exceeding the time limit without saying so. Honest, specific notes on shortcuts usually score better than a polished claim of completeness.
</context>

<task>
Write the README for my submission.

<assignment>
{{assignment}}
</assignment>

<submission>
{{submission}}
</submission>

1. If you can read the repo, read it first: entry points, how it is run and tested, structure, tests present, and anything incomplete (TODOs, stubs, skipped tests). Base every statement on what you find.
2. Write a two-line summary of what was built against the brief.
3. Write "How to run" and "How to test" as exact commands, with prerequisites and versions. Mark any command you could not verify.
4. Map the brief's requirements to the implementation: done, partly done, not done.
5. Explain the main decisions and trade-offs (structure, libraries, data storage, error handling), each with the reason and the alternative considered.
6. State shortcuts and assumptions honestly, and what you would do with more time or for production (in priority order).
7. Note time spent if the user gave it.
</task>

<constraints>
- Do not claim features, tests or coverage that are not in the code or notes.
- Keep it under about one and a half screens; reviewers skim.
- No generic boilerplate sections (contributing, licence) unless the brief asks.
- Do not include personal contact details or anything identifying if the brief asks for anonymous submissions.
</constraints>

<output_format>
## README
The file content in Markdown.

## Check before submitting
Commands to verify, claims to double-check, and anything in the brief not addressed.
</output_format>
