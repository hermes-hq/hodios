---
schema: 1
id: write-team-agent-playbook
kind: prompt
title: Write a team coding agent playbook
description: Writes a team's practical guide to coding agents, covering which tasks to hand over, how to brief, review and disclosure rules, data rules and the pitfalls seen in this codebase.
category: meta
version: 1.0.0
status: incubating
stage: [plan, build]
role: [tech-lead, engineering-manager]
requires: [none]
inputs: [notes, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, team-guide, review-rules, engineering-practices]
pairs_with:
  prompts: [plan-coding-agent-rollout, assess-task-for-agent-delegation, write-agents-md, mine-review-comments-for-agent-rules]
args:
  - name: team_notes
    description: What the team has learned so far - tasks that went well and badly, prompts people reuse, review problems, incidents, tools in use, and any company policy on AI tools and data.
    type: text
    required: true
  - name: codebase
    description: Stack, size, test coverage and the risky areas of the codebase.
    type: text
output_contract:
  format: markdown
  sections: [Playbook, Gaps to decide]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A rollout plan gets agents switched on; a playbook is what a developer opens on a Tuesday when deciding whether to hand a task over. It works when it is short, specific to this codebase and grounded in what actually happened to the team. Generic advice ("review AI code carefully") changes nothing. What changes behaviour: a clear line between tasks that suit an agent (well specified, covered by tests, small blast radius) and tasks that do not (ambiguous product decisions, security-sensitive code, areas with no tests); a brief template; the rule that the person who opens the pull request owns every line, whoever wrote it; how large an agent diff may be before it is split; what data may never go into a prompt; and the codebase-specific traps agents keep falling into. The playbook must not invent company policy; where policy is unknown it leaves a decision for the lead.
</context>

<task>
Write the playbook from these notes.
<team_notes>
{{team_notes}}
</team_notes>
{{#codebase}}
<codebase>
{{codebase}}
</codebase>
{{/codebase}}

1. Extract from the notes what actually worked and failed, with the reason for each. Use these as the playbook's examples instead of generic ones.
2. Write "Good fits" and "Poor fits" lists tied to this codebase's areas and test coverage.
3. Write a brief template of six to eight lines (goal, files, constraints, done-check, what to report) and one filled example from the notes.
4. Write review rules: ownership, maximum diff size before splitting, what reviewers check first in agent pull requests (tests changed or weakened, scope creep, new dependencies, invented APIs), and how agent use is disclosed if the team or company requires it.
5. Write data rules: what must never go into prompts or agent sessions (secrets, customer data, anything the policy forbids), stated only as far as the notes support.
6. Write "Known pitfalls here": each recurring failure from the notes with the instruction-file rule or check that prevents it.
7. Write "When to stop and take over": the signs a session is not converging and what to do.
8. List gaps the lead must decide, where the notes are silent on policy.
</task>

<constraints>
- Keep the playbook under about two pages. Every line should be something a developer would act on.
- Do not invent policies, tools or incidents. Anything not in the notes goes under Gaps to decide.
- Use plain language; no hype about productivity.
</constraints>

<output_format>
## Playbook
The full document with the sections from steps 2 to 7 as subheadings.
## Gaps to decide
Numbered questions for the lead, each with a suggested default.
</output_format>
