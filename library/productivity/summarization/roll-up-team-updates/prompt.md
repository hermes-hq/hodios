---
schema: 1
id: roll-up-team-updates
kind: prompt
title: Roll up team updates for leadership
description: Combines several people's weekly or monthly updates into one roll-up for leadership, with themes, progress, risks, asks and a note of what was left out and why.
category: summarization
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, engineering-manager, project-manager, operations-manager]
requires: [none]
inputs: [notes, text]
output: [summary, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [weekly-update, roll-up, leadership-update, risks, asks]
pairs_with:
  prompts: [summarize-for-several-audiences, write-tldr-for-draft, summarize-email-thread]
args:
  - name: updates
    description: The individual updates as written, each with the person's name or team. Paste them all; do not pre-edit.
    type: text
    required: true
  - name: audience
    description: Who reads the roll-up and what they care about (for example "VP of operations, cares about delivery dates and hiring").
    type: text
    required: true
  - name: period
    description: The period covered, such as "week of 6 October" or "September".
    type: string
    required: false
output_contract:
  format: markdown
  sections: [Headline, Progress by theme, Risks and blockers, Asks for leadership, Left out, Questions for contributors]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a manager turn many individual updates into one roll-up a senior reader will actually read. A stapled-together list of everyone's bullets fails: leaders skim past activity ("had meetings with X") and miss the two things that need them. A good roll-up groups updates by outcome or theme rather than by person, leads with what changed, puts risks and asks where they cannot be missed, keeps numbers and dates exactly as reported, and is honest about slips. It also never turns "we might slip" into "on track" by averaging tones together, and it credits people by name where the reader would want to know who to talk to.

<updates>
{{updates}}
</updates>

Audience: {{audience}}
{{#period}}Period: {{period}}{{/period}}
</context>

<task>
1. Read every update. Tag each item as outcome, progress, activity, risk, blocker, ask, or noise.
2. Group outcomes and progress into three to six themes that make sense to this audience (projects, goals or customer outcomes), not one section per person.
3. Write a headline of two or three sentences: the most important change this period and the one thing leadership should act on, if any.
4. Under each theme, give the status in one line, then the supporting points with names, numbers and dates kept exactly as written.
5. Pull every risk, blocker and slip into one list with its likely impact, the owner and whether the team has a plan.
6. List the asks for leadership: decisions, approvals, help across teams, with a "by when" where the update gives one.
7. Say what you left out (routine activity, duplicates) so contributors can check nothing important was cut.
8. List questions to send back to contributors where updates are vague, conflict, or claim progress without evidence.
</task>

<constraints>
- Use only what the updates say. Do not invent status, dates, percentages or causes.
- When two updates conflict (one says shipped, one says blocked), show both and send a question; do not pick one.
- Keep the tone of each risk: do not soften "will miss" into "may be delayed", or inflate a minor issue.
- Keep the roll-up to what fits on one screen for the audience; detail beyond that goes in "Left out".
- Do not rank or judge individuals' performance.
</constraints>

<output_format>
## Headline
Two or three sentences.

## Progress by theme
A short heading per theme, a one-line status (on track, at risk, off track, done), then bullets with names.

## Risks and blockers
Table: Risk | Impact | Owner | Plan in place?

## Asks for leadership
Numbered: the ask, who asked, by when.

## Left out
Bullets of what was cut and why.

## Questions for contributors
Bullets addressed to named people.
</output_format>
