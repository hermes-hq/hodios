---
schema: 1
id: write-good-first-issues
kind: prompt
title: Write good first issues
description: Turns backlog items into starter issues a newcomer can finish, with file pointers, acceptance criteria, a verify step and a named helper, and rejects unsuitable ones. Use to grow contributors.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [maintainer, tech-lead, developer-advocate]
requires: [repo-read]
inputs: [ticket, repo]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [open-source, good-first-issue, newcomers, contributor-experience, issue-writing]
pairs_with:
  prompts: [triage-issue-backlog, write-contributing-guide, reply-to-first-contribution, audit-contributor-funnel]
  personas: [open-source-maintainer]
args:
  - name: candidates
    description: The backlog items to consider (titles, bodies or links), plus anything you know about each.
    type: text
    required: true
  - name: project_facts
    description: Language, how to set up and run tests, where CONTRIBUTING lives, the labels you use, and who can mentor.
    type: text
  - name: max_issues
    description: The most issues to write.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Selection, Issues, Rejected, Maintainer checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A "good first issue" label is a promise that a stranger can finish the work without insider knowledge. Research on GitHub found that about half of labelled good first issues were never solved by newcomers, and later work shows newcomer pull requests on them being merged less often over time. The usual causes are issues that are vague, secretly large, blocked on a design decision, or that sit unanswered when someone asks to take them. GitHub surfaces issues labelled `good first issue` on the repository's contribute page and in recommendations, so the label brings visitors; the issue text decides whether they succeed. How fast a maintainer responds matters more for whether a newcomer returns than how warm the reply is.
</context>

<task>
<candidates>
{{candidates}}
</candidates>
{{#project_facts}}
Project facts:
{{project_facts}}
{{/project_facts}}

If you have repository access, read the code each candidate touches before judging it. If you do not, say which judgments are based on the issue text alone.

1. **Screen every candidate** against these tests and reject any that fail one:
   - Done in a few hours by someone new to the codebase, touching one area.
   - No open design question and no decision a maintainer still has to make.
   - Has a way to verify: an existing test to extend, a reproduction, or visible output.
   - Not urgent: if it is blocking users this week, a maintainer should fix it.
   - Not trivial busywork (typo sweeps, renames) that teaches nothing and invites drive-by spam.
2. **Pick up to {{max_issues}}**, preferring variety (docs, a small bug, a test, a small feature) and areas where the project actually wants more contributors.
3. **Write each issue** with:
   - a title that names the change, not the area;
   - why it matters to users, in two sentences;
   - where to start: the files, functions or docs pages involved, with a one-line note on each;
   - acceptance criteria as a checklist;
   - how to verify: the test command or reproduction steps;
   - what is out of scope;
   - who to ask, and the expected response time the maintainers can honestly keep;
   - labels: `good first issue` plus area and type labels from the project's set.
4. **List the rejected candidates** with the failed test, and say what would make each suitable later (for example "decide the API first").
5. **Write the maintainer checklist** for keeping the promise: reply to claim requests within a stated time, unassign after a stated period of silence with a kind note, and remove the label from issues that turn out bigger than expected.
</task>

<constraints>
- Never invent file paths, function names or commands. Use [CHECK: path] when you have not seen the code.
- Do not write issues that require access the newcomer will not have (secrets, paid services, production data).
- Keep each issue under 250 words; newcomers skim.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Selection
| Candidate | Verdict | Reason |
## Issues
One block per issue, ready to paste into the tracker.
## Rejected
| Candidate | Failed test | What would make it suitable |
## Maintainer checklist
</output_format>
