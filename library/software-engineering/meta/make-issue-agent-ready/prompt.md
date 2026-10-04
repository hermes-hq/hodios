---
schema: 1
id: make-issue-agent-ready
kind: prompt
title: Make an issue agent-ready
description: Rewrites a human-written ticket into an issue a coding agent can finish unattended, with goal, files, constraints, acceptance tests, out-of-scope list and stop rules, plus a readiness verdict.
category: meta
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, software-engineer, product-manager, engineering-manager]
stack: []
requires: [none]
inputs: [ticket, text]
output: [rewrite, questions, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [issue-writing, acceptance-criteria, async-agents, definition-of-done, ticket-hygiene]
pairs_with:
  prompts: [write-subagent-brief, write-agents-md, plan-parallel-agent-worktrees, benchmark-coding-agents-on-repo]
args:
  - name: issue
    description: The ticket as written today - title, description, comments, screenshots described in words, links.
    type: text
    required: true
  - name: repo_context
    description: What you know about where the change lives - relevant files or modules, test commands, conventions, related past pull requests.
    type: text
output_contract:
  format: markdown
  sections: [Readiness verdict, Agent-ready issue, Questions for the author, Why this should or should not go to an agent]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams increasingly assign tickets straight to coding agents that run without anyone watching and come back with a pull request. A ticket written for a teammate leans on shared context ("the usual way", "like we did for exports"), hides decisions nobody has made, and has no check that proves it is done. An unattended agent fills those gaps with guesses, and the pull request is wrong in ways that take longer to review than doing the work. Your job is to make the ticket self-sufficient, or to say plainly that it is not ready or not suited to an agent.
</context>

<task>
<issue>
{{issue}}
</issue>
{{#repo_context}}
<repo_context>
{{repo_context}}
</repo_context>
{{/repo_context}}

1. Judge readiness:
   - ready: the goal, behaviour and verification are clear;
   - needs answers: one or more decisions are open (list them);
   - not suited: needs product or design judgement, cross-team negotiation, production access, large unclear scope, or exploratory debugging without a reproduction.
2. Rewrite the issue with these parts:
   - Goal: one or two sentences on the outcome for users or the system.
   - Current and expected behaviour: concrete, with an example input and output, or steps to reproduce for a bug.
   - Where to look: files, modules or past pull requests from the context; never invented paths (write "[confirm path]" where unknown).
   - Constraints: conventions to follow, public interfaces and data that must not change, dependency rules, performance or security requirements.
   - Acceptance criteria: numbered, each observable, plus the exact commands that must pass (tests, type check, lint) and the new tests to add.
   - Out of scope: related improvements the agent must not make.
   - Stop and ask when: the specific situations where the agent should comment and wait instead of guessing (a needed change to a public API, a failing unrelated test, ambiguity in the criteria).
   - Pull request expectations: size, description contents, screenshots for UI.
3. List the questions for the ticket author that would turn "needs answers" into "ready", each answerable in one line.
4. Explain the verdict briefly, including whether the task should be split first.
</task>

<constraints>
- Keep the author's intent. Do not add requirements; put possible additions as questions.
- Never invent file paths, function names, commands or business rules; mark them as to be confirmed.
- Keep the rewritten issue under about 350 words; an agent reads long issues, but people must review them.
- If the issue contains secrets, credentials or customer personal data, leave them out of the rewrite and flag it.
</constraints>

<output_format>
## Readiness verdict
One line: ready, needs answers, or not suited, with the main reason.
## Agent-ready issue
The rewritten issue in Markdown, with the subheadings from step 2.
## Questions for the author
Numbered, or "None".
## Why this should or should not go to an agent
Two to four lines.
</output_format>
