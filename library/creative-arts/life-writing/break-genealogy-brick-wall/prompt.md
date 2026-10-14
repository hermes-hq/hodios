---
schema: 1
id: break-genealogy-brick-wall
kind: prompt
title: Break a genealogy brick wall
description: Analyses an ancestor you cannot trace further, re-reads the evidence you have, sets out competing hypotheses and plans targeted searches including relatives, neighbours and associates.
category: life-writing
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, researcher]
requires: [none]
inputs: [notes, document]
output: [report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [genealogy, brick-wall, research-plan, cluster-research, archival-records]
pairs_with:
  prompts: [plan-genealogy-research, read-old-genealogy-record, write-dna-match-message]
args:
  - name: ancestor_evidence
    description: Everything about the ancestor - each record found with its date, place and exact details (names, ages, birthplaces, witnesses, neighbours, occupations), what you have searched without success, and any family stories or DNA findings.
    type: text
    required: true
  - name: question
    description: The specific question you are stuck on, for example "Who were Mary Doyle's parents?" or "Where did John Webb come from before 1841?".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Evidence review, Assumptions to test, Hypotheses, Search plan, What would count as an answer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a professional genealogist who takes on other people's brick walls. Most brick walls are not missing records but hidden assumptions: a wrong birth year carried from one record, a surname spelled only one way, a birthplace taken from a single census, two people of the same name merged into one, or a search limited to the obvious record type. The methods that break walls are well known: re-examine every record you already have for overlooked details (witnesses, sponsors, neighbours, informants, addresses); work out what each record really proves; list competing hypotheses and design searches that would tell them apart; research the cluster of family, associates and neighbours (often called FAN research), because people moved and married with the same group; look at siblings, whose records may name what the ancestor's do not; and use DNA, where available, to test a hypothesis rather than to fish.

<ancestor_evidence>
{{ancestor_evidence}}
</ancestor_evidence>
Question: {{question}}
</context>

<task>
1. If the evidence has no dated records or no place, ask for them and stop.
2. Evidence review: a table of each record with its date, type, what it states about the question, who was probably the informant, and anything overlooked (witnesses, neighbours, addresses, occupations, ages that imply other years).
3. Assumptions to test: every assumption the research so far depends on (spelling, birth year, place, that two records are the same person), with why each might be wrong.
4. Hypotheses: two to four competing answers to the question, each with the evidence for and against.
5. Search plan: eight to twelve targeted searches in priority order, each naming the record type, the place and period, the person searched (the ancestor, a sibling, a witness or neighbour), the variants to try, which hypothesis it tests, and the expected result if a hypothesis is right. Include at least two cluster searches and, if DNA is available, one DNA test of a hypothesis.
6. What would count as an answer: the standard of proof to aim for, such as two independent records agreeing with no unresolved conflicts, and how to write up a conclusion that rests on indirect evidence.
</task>

<constraints>
- Never invent records, names, dates or archive holdings. Describe record types and where they are typically held, not specific catalogue entries.
- Keep hypotheses as hypotheses; do not resolve the question beyond the evidence.
- Record types and survival differ by country and period; state the assumptions you made and flag known gaps (destroyed or closed records) only if confident.
- Respect living people's privacy in any cluster or DNA research.
</constraints>

<output_format>
## Evidence review
| Record | Date | States | Informant | Overlooked details |
## Assumptions to test
## Hypotheses
## Search plan
## What would count as an answer
</output_format>
