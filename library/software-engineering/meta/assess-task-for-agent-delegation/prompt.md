---
schema: 1
id: assess-task-for-agent-delegation
kind: prompt
title: Decide how to delegate a task to an agent
description: Judges whether a coding task should run unattended on an agent, be done with an agent in a supervised session, or be done by hand, from verifiability, blast radius, ambiguity and context needs.
category: meta
version: 1.0.0
status: incubating
stage: [plan]
role: [software-engineer, tech-lead, engineering-manager]
requires: [none]
inputs: [ticket, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [coding-agents, delegation, triage]
pairs_with:
  prompts: [make-issue-agent-ready, write-subagent-brief, plan-parallel-agent-worktrees]
args:
  - name: task
    description: The task or ticket text.
    type: text
    required: true
  - name: context
    description: What you know about the code involved, such as test coverage, how many modules it crosses, deadline, and who will review.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Factors, How to run it, Keep human, Prerequisites]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Coding agents do well when success can be checked automatically, the change is local, the codebase has patterns to copy and the request is unambiguous. They do badly on open design questions, changes that cross many modules with weak tests, work that needs knowledge nobody wrote down, production access, and security-sensitive code where a plausible mistake is costly. Delegation only pays when reviewing the result costs less than doing the work. A task that fails the check as a whole often passes once split: the human makes the design decision, the agent does the mechanical part.
</context>

<task>
Assess this task:
<task_text>
{{task}}
</task_text>
{{#context}}
<context_notes>
{{context}}
</context_notes>
{{/context}}

1. Rate each factor low, medium or high, with the evidence from the task or context (or "unknown"):
   - Verifiability: is there an automatic check that proves it works?
   - Locality: how many files and modules, and are interfaces changing?
   - Ambiguity: are there decisions left open?
   - Tacit knowledge: does it depend on unwritten history, customers or other teams?
   - Blast radius: data, money, security, public APIs or production effects if wrong.
   - Review cost: how long would a careful review of the likely diff take compared with doing it?
2. Decide: unattended (agent works alone and opens a pull request), supervised (agent works in a session with plan approval and checkpoints), split (name the human part and the agent part), or by hand.
3. Say how to run it in that mode: what the agent gets, the check that defines done, where a human approves.
4. List what stays human regardless (decisions, approvals, sensitive steps).
5. List prerequisites that would move the task to a more autonomous mode, such as a failing test that reproduces the bug or a decision recorded in the ticket.
</task>

<constraints>
- Unknown factors count against autonomy; do not assume tests exist.
- Do not recommend unattended mode for anything touching authentication, payments, data deletion or production infrastructure without a human approval step.
- Keep it short: this is a triage call, not a plan.
</constraints>

<output_format>
## Verdict
Unattended, supervised, split or by hand, with the deciding factor.
## Factors
Table: factor, rating, evidence.
## How to run it
Three to six bullets.
## Keep human
Bullets.
## Prerequisites
What would raise autonomy, or "None".
</output_format>
