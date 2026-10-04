---
schema: 1
id: analyze-school-attendance-data
kind: prompt
title: Analyse school attendance data
description: Analyses school attendance data for patterns by group, day, term and reason, identifies pupils who may need support without labelling them, and suggests interventions to test.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, review]
role: [teacher, data-analyst]
subject: [education-sector]
requires: [none]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [school-attendance, persistent-absence, safeguarding, pupil-data, interventions]
pairs_with:
  prompts: [anonymize-dataset, explore-dataset, evaluate-program-outcomes, write-data-methodology-note]
  personas: [data-analyst]
args:
  - name: data
    description: Attendance records or a summary - one row per pupil or per session, with year group, attendance or absence counts, reason codes, dates, and any group fields you are allowed to use (for example disadvantage, special educational needs, language).
    type: text
    required: true
  - name: school_context
    description: Phase and size of the school, the attendance codes and definitions you use (for example your jurisdiction's persistent absence threshold), recent events (illness outbreaks, transport strikes, a new policy), and what you want to decide.
    type: text
  - name: privacy
    description: anonymised means pupils appear only as codes; identifiable means names or other identifying details are present and outputs must keep them to the minimum needed.
    type: enum
    enum: [anonymised, identifiable]
    default: anonymised
output_contract:
  format: markdown
  sections: [Data check, Headline picture, Patterns, Pupils who may need support, Interventions to test, Caveats and data protection]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Attendance data are easy to misread. A school-wide rate hides groups with much lower attendance; small groups produce dramatic percentages from two or three pupils; Monday and Friday patterns, term-time holidays and late marks tell different stories; and an absence rate is not a judgement of a family. The useful outputs are patterns that point to causes the school can act on (a year group, a day, a bus route, a reason code), a support list based on patterns rather than labels, and a few interventions tested in a way that shows whether they worked. Pupil data are personal data and some patterns are safeguarding signals, which belong with the school's designated safeguarding lead, not in an analysis report.
</context>

<task>
Analyse this attendance data. Privacy mode: {{privacy}}.

<data>
{{data}}
</data>
{{#school_context}}
<school_context>
{{school_context}}
</school_context>
{{/school_context}}

1. Data check: the period covered, the number of pupils and sessions, the codes present, missing or inconsistent records, and whether attendance is measured in sessions or days. Use the school's definitions; if a definition such as persistent absence is not given, ask for it or use a clearly labelled placeholder and say it must match the local official definition.
2. Headline picture: overall attendance rate, authorised and unauthorised absence, the share of pupils below the persistent absence threshold, and the trend by month or half-term, each with the counts behind it.
3. Patterns: by year group, by any group fields provided, by day of the week, by morning or afternoon session, by month or term, and by reason code. Show counts and rates side by side. Suppress or merge any group with fewer pupils than the school's small-number rule (or fewer than 5 if none is given) and say you did so.
4. Pupils who may need support: identify pupils by pattern (for example a falling trend over six weeks, repeated Monday absence, frequent lateness, a sudden drop after good attendance) rather than by group membership. Refer to them by code. Give the pattern for each, not a label or a guess at the cause.
5. Interventions to test: two to four interventions matched to the patterns found (for example a first-day call home, a breakfast club, a mentoring check-in, a transport fix), each with the pupils or group it targets, how to measure the effect (the comparison period or group), and when to review.
6. Caveats and data protection: what the data cannot show, possible artefacts (code changes, an outbreak, a strike), and data handling notes.
7. Before you answer, recompute the headline rates from the counts, confirm every rate has its count, and check that no small group or individual can be identified in the patterns section.
</task>

<constraints>
- Compute only from the data given; never invent figures or national comparisons. If the user wants a benchmark, say where official figures are published and to check the current release.
- Do not infer reasons for an individual pupil's absence, and do not use stigmatising language about pupils, families or groups.
- If a pattern could indicate a safeguarding concern (for example prolonged unexplained absence or a pupil missing from education), say it should be passed to the designated safeguarding lead under the school's policy, without speculating.
- In identifiable mode, use pupil codes in the output where possible and remind the user to handle the output under the school's data protection policy.
- If the data lack the fields needed for a step, say so and skip that step rather than guessing.
</constraints>

<output_format>
Markdown with the sections in the output contract. Rates as tables (Group | Pupils | Sessions possible | Attendance % | Persistent absence %). Support list as a table (Pupil code | Pattern | Suggested first step). Interventions as a table (Intervention | Target | Measure | Review date).
</output_format>
