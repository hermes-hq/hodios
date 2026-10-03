---
schema: 1
id: plan-change-communications
kind: prompt
title: Plan change communications
description: Plans the communications for an organisational change such as a new system, a reorg or a policy, by audience and phase, with key messages, channels, timing, managers' role and feedback loops.
category: business-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, operations-manager, executive, project-manager]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [change-management, communication-plan, adkar, stakeholder-map, rollout, manager-toolkit]
pairs_with:
  prompts: [write-internal-announcement, write-manager-talking-points, write-customer-change-notice]
args:
  - name: change
    description: What is changing, why, who decided, what stays the same, and the key dates, for example "moving all 600 staff from paper timesheets to a mobile app; payroll accuracy issues; go-live 3 March".
    type: text
    required: true
  - name: audiences
    description: The groups affected and how, for example "shift workers (new app daily), supervisors (approve in app), payroll team (new reports), works council".
    type: text
    required: true
  - name: go_live_date
    description: The date the change takes effect, or the phases and their dates.
    type: string
  - name: known_concerns
    description: Worries, rumours, resistance or past failures you already know about, for example "last system rollout failed in 2022" or "older staff without smartphones".
    type: text
output_contract:
  format: markdown
  sections: [Summary, Audience impact map, Core messages, Timeline, Manager toolkit, Feedback and measures, Risks and gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Change communication fails in predictable ways: one big announcement and silence afterwards, the same message for everyone regardless of how they are affected, managers hearing about it at the same time as their teams, no route for questions, and "communication" ending at go-live just when people need help. Change practitioners (Prosci's ADKAR model is a common reference) sequence communication to build awareness of why the change is happening, desire to take part, knowledge of how, ability in practice, and reinforcement afterwards. Their research consistently finds employees want to hear the business reasons from senior leaders and the personal impact from their direct manager, which makes a manager briefing and toolkit central. Messages need repeating several times through different channels before most people have absorbed them. Some changes also carry formal obligations first: in many countries, reorganisations, redundancies and new monitoring tools require consultation with employee representatives, such as a works council or union, before any announcement.
</context>

<task>
Plan the communications for this change.{{#go_live_date}} Go-live: {{go_live_date}}.{{/go_live_date}}

<change>
{{change}}
</change>

<audiences>
{{audiences}}
</audiences>
{{#known_concerns}}
<known_concerns>
{{known_concerns}}
</known_concerns>
{{/known_concerns}}

1. If the change or the reason for it is unclear, ask up to three questions and stop. A missing go-live date becomes a placeholder, and the timeline uses relative weeks (T-6 weeks).
2. Check for obligations that must come before any announcement: employee representative consultation (reorgs, job losses, monitoring tools, working-time changes), legal or HR review, customer or regulator notice. List what applies under Risks and gaps as "check with HR or legal", without stating the law for a specific country.
3. Audience impact map: for each audience, what changes for them day to day, the degree of impact (high, medium, low), what they will most likely worry about, what they need to know or be able to do, and who they should hear it from.
4. Core messages: one core message (why, what, when, in two sentences), three supporting messages, and what is not changing. Then one line per audience on "what this means for you".
5. Timeline across phases: before announcement (leaders and managers briefed first), announcement, preparation and training, go-live, and reinforcement (at least four to six weeks after go-live). For each communication: date or relative week, audience, message, channel, sender, and owner. Leaders explain why; managers explain what it means for the team; training covers how.
6. Manager toolkit: what managers get and when (briefing session, talking points, FAQ, where to escalate questions they cannot answer), and what they are asked to do.
7. Feedback and measures: the channels for questions and concerns (Q&A sessions, a shared mailbox, pulse questions), how the FAQ is updated and how often, and adoption or understanding measures with targets where the input allows.
8. Address each known concern explicitly in messages, timing or support.
</task>

<constraints>
- Use only facts from the input; never invent dates, numbers, decisions or names. Use `[need: …]`.
- Honest messages: no promise that nobody is affected unless the input says so, no spin on reasons, and say what is not yet decided.
- No announcement to affected staff before their managers are briefed, and no all-staff announcement before required consultation is complete.
- Plans proportionate to the change: a small policy tweak gets a short plan; a reorg gets the full treatment.
- Plain language; no change-management jargon in the messages themselves.
</constraints>

<output_format>
## Summary
Three to five sentences: the change, the approach and the critical dates.
## Audience impact map
Table: audience, what changes, impact level, likely concerns, need to know or do, messenger.
## Core messages
Core message, supporting messages, what is not changing, then a line per audience.
## Timeline
Table: when, audience, message, channel, sender, owner.
## Manager toolkit
Bullets with dates.
## Feedback and measures
Bullets.
## Risks and gaps
Bullets: obligations to check, risks with mitigations, and `[need: …]` items.
</output_format>
