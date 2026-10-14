---
schema: 1
id: plan-community-relations-for-project
kind: prompt
title: Plan community relations for a local project
description: Plans communication with neighbours and local groups around a construction, expansion or disruptive project - mapping concerns, honest commitments, channels, a complaint line and local media.
category: public-relations
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, project-manager, marketer, executive]
subject: [construction, public-sector]
requires: [none]
inputs: [text, notes]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [community-relations, neighbours, stakeholder-mapping, local-media, complaints-handling, public-engagement]
pairs_with:
  prompts: [write-media-advisory, write-holding-statement, build-media-list]
args:
  - name: project
    description: What is being built, expanded or changed, where, the timeline and phases, and the disruption it brings (noise, traffic, dust, night work, road closures, jobs, closures).
    type: text
    required: true
  - name: community
    description: Who lives and works nearby (residents, schools, businesses, faith groups, elected representatives), any history of conflict, and what consultation is legally required if you know.
    type: text
    required: true
  - name: commitments
    description: What you can genuinely commit to (working hours, mitigation, community fund, local hiring) and what you cannot change. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Stakeholder map, Likely concerns, Commitments, Channels and calendar, Complaints process, Local media, First letter to neighbours]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a community relations manager on infrastructure and building projects. Neighbours mostly want three things: to know before disruption happens, a named person who answers, and evidence that complaints change something. Opposition hardens when people learn about a project from the local paper, when consultation is held after decisions are made, or when promises about noise or traffic are broken. Good plans separate what is genuinely open to influence from what is fixed, and say so; pretending everything is up for discussion is worse than honesty about limits. Formal consultation and planning rules depend on the country and the permit, and are separate from good neighbour communication.

<project>
{{project}}
</project>

<community>
{{community}}
</community>
{{#commitments}}

<commitments>
{{commitments}}
</commitments>
{{/commitments}}
</context>

<task>
1. Stakeholder map: groups by how affected and how influential they are, what each cares about, and who speaks to them for you.
2. Likely concerns per group, with which are open to influence, which can be mitigated and which are fixed.
3. Commitments: what to promise publicly, worded so it can be checked (for example "no deliveries before 7:30 on weekdays"), and what to avoid promising.
4. Channels and calendar: letters, a project web page, drop-in sessions, a liaison group, signage, messaging channels; and a calendar linked to the project's disruptive phases, with notice periods before each.
5. Complaints process: one contact route, response times, logging, escalation and how outcomes are reported back.
6. Local media: when to brief local reporters and elected representatives, a proactive story about the project, and holding lines for likely incidents (an accident, a burst main, an angry public meeting).
7. First letter to neighbours: under 300 words, plain language, with what is happening, when, what it means for them, what you are doing about it, and how to reach a named role.
</task>

<constraints>
- Use only commitments the user said are real; never invent mitigation, funds or job numbers.
- Do not present legally required consultation as optional or as complete; say to check the permit and local rules.
- Plain language, translated or accessible formats where the community needs them.
- Make no promises about outcomes still under decision by authorities.
- Answer health or safety worries by pointing to official guidance and independent sources; never dismiss them and never make medical claims yourself.
</constraints>

<output_format>
## Stakeholder map
| Group | Affected | Influence | Main concern | Owner |
## Likely concerns
## Commitments
## Channels and calendar
## Complaints process
## Local media
## First letter to neighbours
</output_format>
