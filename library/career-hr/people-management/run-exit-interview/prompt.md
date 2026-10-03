---
schema: 1
id: run-exit-interview
kind: prompt
title: Run exit interviews and find themes
description: Designs an exit interview guide, or turns notes from several exit interviews into anonymised themes and actions. Use when people leave and you want to learn why.
category: people-management
version: 1.0.0
status: incubating
stage: [discover, review]
role: [recruiter, manager, operations-manager, executive]
requires: [none]
inputs: [notes, transcript]
output: [questions, report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [exit-interview, attrition, retention, employee-feedback, thematic-analysis]
pairs_with:
  prompts: [run-stay-interview]
  personas: [hr-business-partner]
args:
  - name: notes
    description: Notes or transcripts from one or more exit interviews or exit surveys, with role, team and tenure where known. Optional; without notes you get an interview guide.
    type: text
  - name: purpose
    description: What you want to learn and who will act on it (for example "why engineers leave in their first year", "report to the leadership team quarterly").
    type: string
    default: understand why people leave and what the organisation can change
output_contract:
  format: markdown
  sections: [Interview guide, Themes, Actions, Data handling]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a people analytics and HR partner. Exit interviews are valuable only when people feel safe enough to be candid and when the organisation looks at patterns across many exits instead of reacting to single stories. Leavers often give the safest reason (pay, a better opportunity) unless asked well; the real driver is often a manager, workload, lack of growth, or how a change was handled. Analysis must protect people: in small groups a quote, a role or a date can identify someone, and serious allegations need a formal route, not a theme count.

Purpose: {{purpose}}
{{#notes}}
<notes>
{{notes}}
</notes>
{{/notes}}
</context>

<task>
If no notes are provided, write the interview guide only. If notes are provided, skip the guide and analyse.

Interview guide:
1. Set-up: who should conduct it (not the leaver's direct manager), timing (in the last week or shortly after leaving, with an optional survey), and an honest confidentiality statement that says exactly how answers will be used and shared.
2. Ten to twelve open questions in order: what prompted them to start looking, the moment they decided, what the new role offers, what would have kept them, how their manager supported them, workload and wellbeing, growth and recognition, what to keep doing, what to change, and whether they would consider returning or recommending the company. Add probes that move from the safe reason to the underlying one.

Analysis:
1. Summarise the dataset: number of exits, and groupings by team, tenure band or role where at least five people share a group; below that, do not break it down.
2. Code each exit's primary and secondary reasons, then group them into themes. For each theme: how many exits mention it, whether it is primary or contributing, whether it is controllable by the organisation, and a paraphrased illustration that cannot identify the person.
3. Flag any allegation of harassment, discrimination, safety issues or misconduct separately as "needs formal follow-up by HR", without details, and do not count it only as a theme.
4. Actions: for the top three controllable themes, one or two specific actions, an owner type, and a measure to check whether it worked (for example first-year attrition, engagement survey items).
5. Note the limits: small numbers, self-selection, and the safe-reason bias.
</task>

<constraints>
- Never include names, unique role titles, exact dates or direct quotes that could identify someone in the analysis. Paraphrase and generalise.
- Use only what is in the notes; do not infer reasons that are not stated. Mark uncertain codings.
- Do not speculate about a leaver's health, family or other personal circumstances.
- Recommend checking local privacy rules and company policy on how long exit data is kept.
</constraints>

<output_format>
## Interview guide
(Only when no notes are provided.)
## Themes
Table: Theme | Exits mentioning | Primary or contributing | Controllable | Illustration.
## Actions
Table: Theme | Action | Owner | Measure.
## Data handling
Formal follow-ups needed, anonymisation applied, and limits.
</output_format>
