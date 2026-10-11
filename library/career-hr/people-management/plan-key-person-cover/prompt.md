---
schema: 1
id: plan-key-person-cover
kind: prompt
title: Plan cover for key people on your team
description: Finds single points of failure on any team - process knowledge, client relationships, access, approvals or licences only one person holds - and plans backups before an absence exposes them.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [notes, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [key-person-risk, cross-training, bus-factor, succession-planning, knowledge-transfer, team-resilience]
pairs_with:
  prompts: [build-team-skills-matrix, delegate-task, respond-to-resignation, reduce-bus-factor]
  personas: [leadership-coach]
args:
  - name: team
    description: Your team members (role codes or initials), what each one does, things only one person knows or can do (systems, clients, processes, licences, passwords or approvals), upcoming absences, and how much time the team has for cross-training.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Single points of failure, Risk ranking, Cover plan, Talking to the key people, Quick wins this month, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an operations-minded leadership coach. Most teams have work that only one person can do, and nobody notices until that person is ill, on leave or resigns. The concentration can be knowledge (how the month-end process really works), relationships (the client who only talks to one person), access (the only admin account, the only signed-off approver), or a skill or licence. The fix is not to make anyone replaceable or to extract everything into documents in one push, which people experience as a threat. It is planned redundancy: named backups, paired working, short documentation of the critical paths, shared access with proper controls, and rotating who does the work. Key people often hold on because being needed feels like security, so the conversation matters as much as the plan.

<team>
{{team}}
</team>
</context>

<task>
1. Single points of failure: list each thing only one person can do, sorted into knowledge, relationship, access and approvals, and skill or licence.
2. Risk ranking: rate each by impact if that person were unavailable for two weeks without warning, and by likelihood (upcoming leave, resignation risk, single-person workload). Rank them.
3. Cover plan: for the top risks, a named backup (role or initials), the method (pairing, shadowing then reverse shadowing, a short runbook of the critical steps, introductions to the client, shared or delegated access with proper controls), effort, and a target date when the backup has done it once unaided.
4. Talking to the key people: how to frame it as resilience and as freeing them for growth or a proper holiday, not as preparing to replace them; how to recognise their expertise; and how to handle reluctance.
5. Quick wins this month: three to five actions that cut the most risk fastest.
6. Review: how to check cover works (a planned "can the backup do it?" test), and how often to update the plan.
</task>

<constraints>
- Do not suggest sharing passwords or bypassing access controls; recommend proper delegated access or a controlled break-glass process owned by the right team.
- Keep the plan within the cross-training time stated; say what has to wait.
- Use role codes or initials; mark unknowns as [X].
- Do not imply anyone is at risk of being let go.
</constraints>

<output_format>
## Single points of failure
## Risk ranking
Table: Item | Holder | Type | Impact | Likelihood | Rank.
## Cover plan
Table: Item | Backup | Method | Effort | Done when.
## Talking to the key people
## Quick wins this month
## Review
</output_format>
