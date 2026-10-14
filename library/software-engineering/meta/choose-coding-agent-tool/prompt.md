---
schema: 1
id: choose-coding-agent-tool
kind: prompt
title: Choose a coding agent for a team
description: Shortlists coding agent tools for an engineering team by working style, data handling, admin controls, model options, cost model and fit with the codebase, then designs a fair two-week trial.
category: meta
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [engineering-manager, tech-lead]
requires: [none]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, tool-selection, vendor-evaluation]
pairs_with:
  prompts: [benchmark-coding-agents-on-repo, plan-coding-agent-rollout, audit-agent-permissions]
args:
  - name: team
    description: Team size, editors and operating systems, languages and repository size, how work is tracked, and how people want to work with agents (in the editor, in the terminal, as background tasks on tickets).
    type: text
    required: true
  - name: requirements
    description: Hard requirements such as data residency, no training on your code, self-hosted or approved model providers, single sign-on, audit logs, budget per seat.
    type: text
  - name: candidates
    description: Tools already on the shortlist, if any.
    type: text
output_contract:
  format: markdown
  sections: [Requirements, Criteria, Shortlist, Trial plan, Questions for vendors]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Coding agent tools fall into rough shapes: editor-integrated assistants, terminal agents, and cloud agents that take a ticket and return a pull request. Many teams end up with more than one. The decision usually turns less on raw model quality, which changes monthly, than on things that change slowly: where code and prompts are sent and retained, admin controls (single sign-on, policy settings, audit logs, permission defaults), whether the tool reads the team's instruction files and supports their editors and operating systems, the cost model (per seat, per usage, or both, and how overages work), and how it behaves on the team's own repository. Feature lists and prices change quickly and vendor claims need checking, so the shortlist must be verified against current documentation and a trial on real tasks.
</context>

<task>
Help choose a coding agent tool for this team.
<team>
{{team}}
</team>
{{#requirements}}
Hard requirements:
<requirements>
{{requirements}}
</requirements>
{{/requirements}}
{{#candidates}}
Current shortlist:
<candidates>
{{candidates}}
</candidates>
{{/candidates}}

1. Separate hard requirements (pass or fail) from preferences (weighted). If data handling or security requirements are missing, ask about them before shortlisting.
2. Define weighted criteria for preferences: working style fit, editor and OS support, instruction file and customisation support, permission and sandbox controls, model choice, cost predictability, and performance on this codebase.
3. Shortlist two to four tools or tool shapes. For each, say what is known from the user's input and what must be confirmed in current vendor documentation; do not state prices, certifications or retention terms as fact.
4. Design a two-week trial: five to ten real tasks from the backlog of different kinds (bug fix, feature, refactor, test writing, unfamiliar module), the same tasks for each tool, who runs them, and what to record (merged or not, review rounds, time, cost, incidents, developer notes).
5. Write the questions to send each vendor about data use, retention, training, admin controls and pricing details.
</task>

<constraints>
- Never present a vendor's price, feature, compliance status or data policy as fact unless the user supplied it; mark it "confirm with the vendor".
- Do not recommend a single winner before the trial; recommend what to trial.
- Hard requirements eliminate; they are not traded against convenience.
{{> output/uncertainty}}
</constraints>

<output_format>
## Requirements
Two lists: hard requirements and weighted preferences.
## Criteria
Table: criterion, weight, how it will be judged.
## Shortlist
Table: tool or shape, why it is on the list, known facts, to confirm.
## Trial plan
Tasks, schedule, roles and the scoring sheet.
## Questions for vendors
Numbered list.
</output_format>
