---
schema: 1
id: prioritize-review-queue
kind: prompt
title: Prioritise my code review queue
description: Orders a reviewer's pile of open pull requests by what is blocked, risk, age and size, sets a realistic plan for the day, and drafts the short notes for PRs that must wait or go to someone else.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead, maintainer]
requires: [none]
inputs: [text, notes]
output: [plan, table, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [review-queue, triage, review-turnaround, pull-request, reviewer-workload]
pairs_with:
  personas: [code-reviewer]
  prompts: [walk-through-pull-request, review-pull-request, write-code-review-guidelines]
args:
  - name: queue
    description: The open pull requests waiting for you, one per line, with whatever you know, for example title, author, size in lines, age, labels, whether someone is blocked, CI status, and if you were requested directly or via a team.
    type: text
    required: true
  - name: time_available
    description: How much review time you have today, for example "90 minutes between meetings".
    type: string
    required: true
  - name: team_norms
    description: Your team's review expectations, for example "first response within one working day", "two approvals for payments code".
    type: text
output_contract:
  format: markdown
  sections: [Today's plan, Queue ranked, Hand off or defer, Notes to send, Pattern to raise]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A long review queue usually gets worked oldest first or easiest first, and neither is right. What matters is the cost of waiting: a PR blocking a release or a teammate's next task costs more per hour than a large refactor nobody is waiting on. Small PRs are worth clearing quickly because a fast first response keeps authors moving; huge PRs deserve a scheduled block or a request to split, not ten distracted minutes. Some PRs need a different reviewer (domain owner, security) and the best move is to say so early. Red CI, drafts and PRs with unresolved earlier comments can wait for the author. Communicating "I will get to this tomorrow morning" is part of reviewing.
</context>

<task>
<queue>
{{queue}}
</queue>

Time available: {{time_available}}.

{{#team_norms}}
<team_norms>
{{team_norms}}
</team_norms>
{{/team_norms}}

1. For each PR, note: who or what is blocked by it, risk area (payments, auth, data migrations, public API), size, age against the team's response norm, CI state, and whether it is waiting on you or on the author.
2. Rank the queue: blocking and time-critical first, then quick first responses on small PRs, then risky PRs that need focus, then the rest. Waiting-on-author and red-CI PRs go to the bottom with a nudge.
3. Fit a plan to the available time with rough minutes per PR (scale with size and risk, and say these are estimates), and stop where the time runs out.
4. Mark PRs to hand off (another reviewer is better placed) or defer, and PRs to ask the author to split before reviewing.
5. Draft one-line, friendly notes for each PR that will wait, needs a different reviewer, or needs splitting.
6. If the queue shows a pattern (one person reviewing everything, many huge PRs, many stale PRs), name it in one or two sentences with a suggestion to raise with the team.
</task>

<constraints>
- Do not invent facts about PRs; when blocked status or risk is unknown, mark it unknown and rank conservatively.
- Keep the plan within the time available; do not plan more review than fits.
- Notes are short, specific about when, and never blame the author.
</constraints>

<output_format>
## Today's plan
Numbered: PR, action (full review, first pass, quick approve check), estimated minutes. Total at the end.
## Queue ranked
Table: rank, PR, blocked, risk, size, age, waiting on, reason.
## Hand off or defer
Bullets with who or when.
## Notes to send
One line per PR.
## Pattern to raise
One or two sentences, or "none".
</output_format>
