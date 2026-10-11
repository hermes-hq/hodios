---
schema: 1
id: triage-stale-pull-requests
kind: prompt
title: Triage stale pull requests
description: Sorts a backlog of open pull requests into merge, finish ourselves, request changes, supersede or close with thanks, drafts every reply, and sets a policy so the pile does not return.
category: open-source
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [maintainer, tech-lead]
requires: [none]
inputs: [text, repo]
output: [table, message, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pull-request, backlog-triage, contributor-experience, review-queue]
pairs_with:
  prompts: [triage-issue-backlog, reply-to-first-contribution, respond-to-review-comments]
  personas: [open-source-maintainer]
args:
  - name: pull_requests
    description: The open pull requests, one per item, with title, author and whether they are a first-timer, age, last activity and by whom, CI status, merge conflicts, size, and the description or your notes.
    type: text
    required: true
  - name: project_context
    description: Scope and roadmap, what the maintainers will and will not accept, and how many review hours exist per week. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Decisions, Replies, This week, Policy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A stale pull request costs more than a stale issue: someone already did the work, and every week of silence makes it less likely they will come back. Maintainers usually have five honest options for each one: merge it (perhaps with a small fix-up), finish it themselves with credit to the author, ask for specific changes with a deadline, close it as superseded by other work, or close it because it does not fit the project, with thanks and a reason. Silent closure by a bot loses contributors; a clear "no, and here is why" keeps most of them. The order matters too: small, nearly-ready pull requests from returning contributors give the most value per review hour.

Pull requests:
<pull_requests>
{{pull_requests}}
</pull_requests>
{{#project_context}}Project context: {{project_context}}{{/project_context}}
</context>

<task>
1. Summarise the backlog: how many, how old, and the main reasons they are stuck (waiting on review, waiting on author, needs design decision, CI broken on main, out of scope).
2. Decide each pull request: merge, maintainer finishes, request changes, superseded, close as out of scope, or needs a design decision first. Give the reason in one line and an effort estimate for the maintainer (small, medium, large).
3. Draft a reply for each one. Requests for changes list the exact changes and a deadline after which a maintainer may finish or close it. Closures thank the author, give the real reason, and say what would make a future contribution welcome. When a maintainer finishes the work, the reply says how the author will be credited (for example a Co-authored-by trailer).
4. Order this week's work by value per review hour, fitting the hours available if given.
5. Propose a short policy to stop the pile-up: a first-response target, when a pull request counts as stale, what happens then, labels to use, and a note in the contributing guide asking people to open an issue before large changes.
</task>

<constraints>
- Never recommend taking a contributor's work without credit, or closing a pull request without a reason the author can read.
- Do not invent CI results, conflicts or code details; if the input does not say, mark the decision as provisional and say what to check.
- Be honest about scope: a kind "no" is better than leaving a pull request open with no plan.
- If an automatic stale bot is proposed, recommend a long window, a warning comment first, and exempting pull requests waiting on maintainers.
</constraints>

<output_format>
## Summary
Three to five bullets.
## Decisions
A table: PR | Decision | Reason | Maintainer effort.
## Replies
One fenced block per pull request, labelled with its title.
## This week
Numbered list.
## Policy
Bullets, ready to paste into the contributing guide.
</output_format>
