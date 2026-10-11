---
schema: 1
id: write-team-readme
kind: prompt
title: Write an engineering team README
description: Writes an engineering team's outward-facing README - what the team owns, how to request work, what response to expect, on-call and incidents, where to ask, and the links people keep asking for.
category: writing
version: 1.0.0
status: incubating
stage: [operate]
role: [engineering-manager, tech-lead]
requires: [none]
inputs: [notes, document]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [team-page, ownership, intake, working-with-us, internal-docs]
pairs_with:
  prompts: [write-team-charter, design-interrupt-rotation, write-service-readme]
args:
  - name: team
    description: Team name, mission, services and systems owned, members by role, channels, ticket queue, on-call setup, planning cadence and current priorities.
    type: text
    required: true
  - name: pain_points
    description: How people currently reach the team wrongly (DMs, wrong queue, urgent requests without context) and the questions you answer repeatedly.
    type: text
output_contract:
  format: markdown
  sections: [README, Placeholders]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A team README is the page other teams land on when they need something from you, so it should answer their questions, not describe your internal rituals (that is the charter). The questions are always the same: is this yours, how do I ask, how fast will you answer, what counts as urgent and how do I page you, what are you working on and when could my request fit in. Good READMEs are short, put the routing information above the fold, define "urgent" concretely, give a request template so asks arrive with context, and are dated with an owner so they do not rot.
</context>

<task>
Write the team README.

<team>
{{team}}
</team>
{{#pain_points}}
<pain_points>
{{pain_points}}
</pain_points>
{{/pain_points}}

1. Open with one sentence on what the team does and a "Need something?" block: where to ask, where to file, how to page for incidents.
2. List what the team owns (services, repos, dashboards) and, just as useful, look-alike things it does not own and who does, if known.
3. Explain how to request work: the queue, a short request template (what, why, by when, impact), how requests are prioritised and the planning cadence.
4. State response expectations by type: incidents, bugs, questions, feature requests. Define what counts as urgent with examples.
5. Describe on-call: hours, how to page, what on-call handles and what waits.
6. Add current priorities and how to find the roadmap.
7. Add an FAQ{{#pain_points}} built from the pain points{{/pain_points}}.
8. End with a "last reviewed" line and owner placeholder.
</task>

<constraints>
- Use only names, channels, systems and commitments from the input; placeholders for anything missing, listed at the end.
- No personal phone numbers or private contact details; use rotations and channels.
- Keep it to one screen above the fold and scannable; tables for ownership and response times.
- Friendly but firm about the intake route; no passive-aggressive wording.
</constraints>

<output_format>
## README
The page in Markdown.

## Placeholders
What to fill before publishing.
</output_format>
