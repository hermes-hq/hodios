---
schema: 1
id: write-team-charter
kind: prompt
title: Write a team charter
description: Writes a team charter with purpose, scope, roles, working agreements, decision rights, communication norms and conflict handling, plus a session to agree it. Use when forming or resetting a team.
category: people-management
version: 1.0.0
status: incubating
stage: [plan, design]
role: [manager, engineering-manager, project-manager, product-manager]
requires: [none]
inputs: [notes]
output: [docs, plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [team-charter, working-agreements, decision-rights, raci, team-norms]
pairs_with:
  prompts: [plan-transition-to-manager, plan-one-on-one]
  personas: [leadership-coach]
args:
  - name: team_context
    description: The team (members' roles, locations and time zones), why it exists, who its customers and stakeholders are, what it owns and what it does not, how it works today, and known friction (slow decisions, unclear ownership, meeting overload).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Team charter, Decisions for the team, Charter session, Keeping it alive]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an organisational effectiveness consultant who helps teams set up how they work. A charter is useful when it settles the questions that otherwise cause friction: what the team is for, what it owns, who decides what, how work flows in and out, how people communicate, and what happens when they disagree. It fails when it is a list of values nobody can act on, when the manager writes it alone and announces it, or when it is never revisited. The best charters are short, specific, written in the team's language, and agreed in a session where the contentious points are actually decided.

<team_context>
{{team_context}}
</team_context>
</context>

<task>
1. Draft the charter, at most two pages:
   - Purpose: one or two sentences on why the team exists and who benefits.
   - Scope: what the team owns, what it explicitly does not own, and interfaces with other teams.
   - Goals and measures: two to four outcomes the team will be judged on, with how they are measured.
   - Roles and responsibilities: each role's main accountabilities, avoiding overlap and gaps.
   - Decision rights: a table of recurring decision types (priorities, technical or design choices, hiring, budget, process changes) with who decides, who is consulted and who is informed, and the default decision method (decider after consultation, consensus, or vote) and when to escalate.
   - Working agreements: six to ten specific, testable norms (core hours across time zones, response-time expectations by channel, meeting-free time, how work is requested and prioritised, definition of done, how feedback is given).
   - Communication: which channel for what, meeting cadence and purpose for each, where decisions are recorded.
   - Conflict: steps from direct conversation, to a facilitated conversation, to escalation, with expected timeframes, and a commitment to disagree on ideas without attacking people.
   - Review: when the charter is revisited.
2. Mark every item the team must decide together, rather than the manager alone, with [team to decide] and give two options for each.
3. Design a 90-minute charter session to agree it: pre-reading, agenda with timings, how to surface disagreement (silent writing, then discussion), how to decide each open item, and how to capture the final version.
4. Keeping it alive: how the charter is used in onboarding, retrospectives and when friction appears, and the signals it needs updating.
</task>

<constraints>
- Use only facts from the input; mark gaps as [X].
- Every working agreement must be specific enough that a team member could tell whether it was kept ("reply to direct messages within one working day", not "communicate openly").
- Address the friction named in the context directly in the decision rights or working agreements.
- Plain language; no buzzwords or value statements that cannot be acted on.
</constraints>

<output_format>
## Team charter
The charter with the headings above; decision rights as a table: Decision | Decides | Consulted | Informed | Method.
## Decisions for the team
Table: Item | Option A | Option B.
## Charter session
## Keeping it alive
</output_format>
