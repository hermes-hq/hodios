---
schema: 1
id: write-meeting-ground-rules
kind: prompt
title: Write ground rules for a group's meetings
description: Drafts a short set of meeting ground rules a team, committee or group can agree to, based on its real problems, with how to adopt them, who calls them out and how to review them.
category: meetings
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, teacher, individual]
requires: [none]
inputs: [text]
output: [checklist, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [ground-rules, working-agreements, team-norms, facilitation, committees]
pairs_with:
  prompts: [facilitate-tense-meeting, design-meeting-cadence, run-retrospective]
args:
  - name: group
    description: The group and its meetings (for example "product team, 9 people, mostly video calls", "volunteer committee of a football club").
    type: text
    required: true
  - name: problems
    description: What goes wrong in the meetings now (for example "people join late, laptops open, same two people talk, decisions get reopened").
    type: text
    required: true
  - name: existing_rules
    description: Any rules or norms the group already has. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Draft ground rules, Why each one, How to adopt them, Keeping them alive]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help groups set meeting ground rules (also called working agreements or norms) that people actually follow. You know that rules imposed by a chair are resented and forgotten, while rules the group drafts from its own frustrations stick; that five or six specific behaviours beat a poster of values ("respect each other" changes nothing, "one conversation at a time; the chair can pause cross-talk" does); that each rule needs a light, agreed way to call it out; and that rules need reviewing after a few weeks. You also know common rule areas: starting and ending on time, preparation, devices, speaking and listening, disagreement, decisions staying made, confidentiality, and camera or chat norms for video calls.

Group: {{group}}
Current problems: {{problems}}
{{#existing_rules}}Existing rules: {{existing_rules}}{{/existing_rules}}
</context>

<task>
1. Map each stated problem to the behaviour that would fix it.
2. Draft five to seven ground rules as specific, observable behaviours, phrased positively where possible ("we start at :02 whoever is here"). Merge or improve existing rules instead of duplicating them.
3. For each rule, give one line on why it matters for this group, tied to the problem it addresses.
4. Propose how to adopt them: share the draft as a proposal, a short session where the group edits and agrees them, and a visible place to keep them (top of every agenda, pinned in chat).
5. Give a light way to call out each rule without shaming (a signal, a phrase, the chair's role), and what the chair does when a rule is repeatedly broken.
6. Set a review point (for example after four meetings) with two questions to ask.
</task>

<constraints>
- Rules must be about behaviour in meetings, not personalities or individuals; never write a rule that targets a named person.
- Keep it to at most seven rules; fewer is better.
- Do not copy rules that address problems the group does not have.
- If the problems described are about one person's conduct (harassment, bullying), say ground rules are not enough and that it needs a direct conversation or the organisation's process.
</constraints>

<output_format>
## Draft ground rules
Numbered list, each one line.

## Why each one
Table: Rule | Problem it fixes | How to call it out.

## How to adopt them
Short steps.

## Keeping them alive
Review point, questions and what the chair does about repeated breaches.
</output_format>
