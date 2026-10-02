---
schema: 1
id: write-code-review-guidelines
kind: prompt
title: Write code review guidelines
description: Writes a team's code review guidelines covering what blocks a merge, comment labels, size limits, response times, author and reviewer duties and how to disagree. Use when setting review norms.
category: code-review
version: 1.0.1
status: incubating
stage: [plan, review]
role: [engineering-manager, tech-lead, maintainer]
requires: [none]
inputs: [text, notes]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [code-review-process, conventional-comments, team-norms, pull-request, engineering-culture]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-pull-request, self-review-before-pr, respond-to-review-comments, write-contributing-guide]
args:
  - name: team_context
    description: Team size and seniority mix, time zones, what you build, release cadence, and how review works today.
    type: text
    required: true
  - name: pain_points
    description: What goes wrong today, for example "PRs wait two days", "nitpick wars", "huge PRs rubber-stamped", "juniors afraid to comment".
    type: text
  - name: tooling
    description: Code host and tools, for example GitHub with CODEOWNERS and required checks, GitLab, Gerrit, linters and formatters in CI.
    type: string
output_contract:
  format: markdown
  sections: [Why we review, What blocks a merge, What does not, Comment labels, Size and scope, Response times, Author responsibilities, Reviewer responsibilities, Disagreements, Automation, Adoption notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.1, note: "Says where the pain-point table goes."}
  - {version: 1.0.0, note: "First version."}
---
<context>
Most review problems are agreement problems, not skill problems: nobody wrote down what is worth blocking a merge for, so reviewers block on taste, authors take nits personally, big PRs get rubber-stamped and small ones wait for days. Good guidelines are short, specific to the team, explicit about what is blocking and what is not, and enforce by automation whatever a machine can check. Research and industry practice point the same way: review speed and small changes matter more than exhaustive comments (Google's engineering practices, for example, set a one-business-day expectation for a first response).
</context>

<task>
Write code review guidelines for this team.

<team_context>
{{team_context}}
</team_context>

{{#pain_points}}
<pain_points>
{{pain_points}}
</pain_points>
{{/pain_points}}
{{#tooling}}
Tooling: {{tooling}}
{{/tooling}}

1. State the purpose of review in two or three lines: catching defects and risks, sharing knowledge and keeping the code base healthy, with the standard "approve once the change clearly improves the code base, even if it is not perfect".
2. Define what blocks a merge: correctness bugs with a triggering case, security and privacy issues, missing or broken tests for changed behaviour, breaking contracts or migrations without a rollout plan, violations of written team standards, and code nobody but the author can understand. Then what does not block: personal style preferences, alternative designs of similar quality, and anything a formatter or linter should catch.
3. Define comment labels the team will use, based on Conventional Comments (for example `issue (blocking):`, `suggestion:`, `nit (non-blocking):`, `question:`, `praise:`), with one example each, and the rule that unlabelled comments are treated as non-blocking.
4. Set size and scope expectations: a target size for a PR (for example under about 400 changed lines excluding generated code), one logical change per PR, refactors separate from behaviour changes, and stacked or split PRs for larger work.
5. Set response-time expectations that fit the time zones and cadence: first response, follow-up rounds, and what an author does when a review is late. Name the escalation path.
6. List author duties: self-review first, a description with why, how to test and the risky parts, small focused commits, green checks before requesting review, replying to every comment, and resolving threads only with the reviewer's agreement or a clear reply.
7. List reviewer duties: review the design and tests before details, give a reason and a concrete suggestion, ask rather than assume, label severity, approve with non-blocking comments when appropriate, and keep the tone about the code.
8. Explain how to disagree: discuss once in the thread, then move to a short call, then follow the written standard or the code owner's decision, record the outcome, and never block a merge on an unwritten preference.
9. Say what to automate with the tooling given: formatting, linting, type checks, tests, coverage of changed lines, required reviewers or CODEOWNERS, PR templates and size labels.
10. Address each listed pain point explicitly in the guideline that fixes it, and add adoption notes: how to roll the guidelines out and when to revisit them.
</task>

<constraints>
- Fit the guidelines to the team described. Do not prescribe processes the tooling cannot support or that conflict with the stated cadence.
- Keep the guidelines to about 900 words so people actually read them. Use the team's language, not management jargon.
- Mark any number you propose (sizes, hours) as a starting point the team should adjust.
- Do not cite a statistic or study you are not sure of; describe practices instead.
</constraints>

<output_format>
Markdown ready to paste into the repo or wiki, using the sections in this order:
## Why we review
## What blocks a merge
## What does not
## Comment labels
## Size and scope
## Response times
## Author responsibilities
## Reviewer responsibilities
## Disagreements
## Automation
## Adoption notes
Adoption notes contains the rollout steps, a table mapping each pain point given to the guideline that addresses it (omit the table if none were given), and the date to revisit the guidelines.
</output_format>
