---
schema: 1
id: write-referee-incident-report
kind: prompt
title: Write a referee incident report
description: Writes a match official's report on a sending-off, misconduct, abandonment or injury for the league, in neutral factual language with times, exact words, the law applied and witnesses.
category: sports
version: 1.0.0
status: incubating
stage: [operate]
role: [individual]
requires: [none]
inputs: [notes]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [refereeing, officiating, misconduct-report, sending-off, match-official, disciplinary]
pairs_with:
  prompts: [prepare-to-referee, handle-sideline-abuse, explain-referee-decision]
args:
  - name: sport
    description: Sport, competition and level, for example "county league football, adult", "U16 club rugby", "amateur ice hockey".
    type: string
    required: true
  - name: notes
    description: Your notes from the match - time of each incident, what you saw, from where, what was said word for word, your decision, and anyone else involved by team, shirt number or role.
    type: text
    required: true
  - name: report_format
    description: The headings or form your league uses, if you have them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Match details, Incident report, Points to check, Before you submit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help amateur referees, umpires and officials write incident reports. A disciplinary panel only has the report, so it must stand on its own: what the official saw, from where, and the decision taken, in time order, in the past tense and first person. Panels discount reports that use opinion words ("violent", "disgraceful"), guess at intent, or describe things the official did not see. Exact words matter in abusive or discriminatory language cases and are written out in full, however offensive. Most bodies set deadlines (often 48 hours) and their own forms; the report should follow the body's headings where given.

Sport: {{sport}}

Notes:
{{notes}}
{{#report_format}}

Required format:
{{report_format}}
{{/report_format}}
</context>

<task>
1. Match details: competition, teams, date and venue placeholders, the official's role, and kick-off or start time as far as the notes give them; mark anything missing as a placeholder to fill.
2. Incident report: for each incident, in time order, write the time, the official's position and distance, what happened as observed facts, exact words where language is involved, the decision taken and the law or rule applied (named generally, for the official to confirm against the current law book), and how the player or person responded.
3. Separate what the official saw from what was reported by assistants, players or others, and name who reported it.
4. Points to check: anything vague, contradictory or missing in the notes that a panel would ask about, such as distance, angle, identity of the player or whether play was stopped.
5. Before you submit: the deadline to check, attachments such as team sheets, keeping a copy, and not discussing the incident publicly.
</task>

<constraints>
- Report only what is in the notes; never add details, times or words that are not there, and leave clear placeholders instead.
- Use neutral, factual language; no opinions about character or guesses about intent unless the official observed something that shows it.
- Name players by team and shirt number or role unless the user gives names for the report.
- Laws differ by sport, competition and country; name the law in general terms and ask the official to confirm the exact reference.
- Write exact abusive words as given; do not soften or censor them in the report itself.
</constraints>

<output_format>
## Match details
## Incident report
One block per incident: Time | Position | What I saw | Words used | Decision | Law applied | Response.
## Points to check
## Before you submit
</output_format>
