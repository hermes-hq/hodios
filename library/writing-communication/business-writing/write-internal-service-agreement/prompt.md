---
schema: 1
id: write-internal-service-agreement
kind: prompt
title: Write an internal service agreement
description: Writes an internal service agreement between two teams covering the services, how to request them, response targets, both sides' responsibilities, escalation and review.
category: business-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, manager, project-manager]
requires: [none]
inputs: [notes, document]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [service-level-agreement, operating-level-agreement, shared-services, response-targets, team-agreements]
pairs_with:
  prompts: [write-service-level-terms-for-contract-clients, write-team-charter]
args:
  - name: teams
    description: The team providing the service and the team or teams receiving it, with rough sizes and working hours or time zones.
    type: string
    required: true
  - name: services
    description: What the provider team does for the other team, how requests come in today, typical volumes, and any targets already discussed.
    type: text
    required: true
  - name: problems
    description: What goes wrong today - missed requests, unclear priorities, incomplete requests, after-hours expectations - and what each side complains about.
    type: text
output_contract:
  format: markdown
  sections: [Agreement, Targets table, Open points]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers write internal service agreements (sometimes called internal SLAs or operating level agreements) between teams in the same organisation. These documents work when they settle the arguments teams actually have: what counts as a request, which channel is official, what "urgent" means, how fast someone acknowledges versus resolves, and what the requesting team must supply. They fail when targets are set without knowing the provider's capacity, when "response" and "resolution" are not defined, when every request is a priority, when the requesting team has no obligations, and when nobody owns the review. An internal agreement is a working arrangement, not a contract; penalties rarely work, but a monthly look at the numbers and a named escalation path do.

Teams: {{teams}}

<services>
{{services}}
</services>
{{#problems}}
<problems>
{{problems}}
</problems>
{{/problems}}
</context>

<task>
1. If you cannot tell which team provides which service, ask and stop.
2. Write the agreement with these sections:
   - Purpose and parties: one paragraph, plus named owners on each side as [placeholders].
   - Services in scope and out of scope: a list, with out-of-scope items stated plainly so they stop arriving.
   - How to request: the single official channel, the minimum information a request must contain, and what happens to requests sent another way.
   - Priority levels: two to four levels defined by business impact with an example each, and who may set the top level.
   - Targets: acknowledgement and resolution or delivery times per priority, measured in the provider's working hours, with what pauses the clock (waiting for the requester).
   - Responsibilities of the requesting team: complete requests, realistic lead times, a contact who answers questions, testing or sign-off duties.
   - Responsibilities of the provider team: status updates, telling the requester early when a target will be missed.
   - Escalation: who to go to, in what order, and when.
   - Reporting and review: what is measured, who reports it, how often, and when the agreement is reviewed.
3. Targets table: Priority | Definition | Acknowledge within | Resolve or deliver within | Measured how. If the user gave no numbers, propose starting values from the stated volumes and mark them [proposed - check against capacity].
4. Open points: decisions the two managers still need to make together, especially anything where the complaints from each side conflict.
</task>

<constraints>
- Do not invent volumes, staffing or tool names. Use [placeholders].
- No penalties or chargebacks unless the user asks for them.
- Keep it under two pages plus the table. Plain language that a new team member can follow.
- If the user's problems show the provider team is under-staffed for the requested targets, say so in Open points rather than writing targets that will be missed.
</constraints>

<output_format>
## Agreement
The full text under the section headings.
## Targets table
The table.
## Open points
Bullets.
</output_format>
