---
schema: 1
id: summarize-stakeholder-interviews
kind: prompt
title: Synthesise stakeholder interview notes
description: Synthesises notes from internal stakeholder interviews into shared goals, tensions, conflicting requirements and who holds which view, with quotes, before a project or change starts.
category: summarization
version: 1.0.0
status: incubating
stage: [discover]
role: [project-manager, business-analyst, consultant, product-manager]
requires: [none]
inputs: [notes, transcript]
output: [summary, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [stakeholder-interviews, project-discovery, conflicting-requirements, alignment, project-kickoff]
pairs_with:
  prompts: [summarize-discussion-positions, extract-open-questions, synthesize-sources-into-brief]
args:
  - name: interviews
    description: Notes or transcripts from each interview, labelled by person or role. Raw notes are fine.
    type: text
    required: true
  - name: project
    description: The project or change the interviews were about, and what the synthesis will be used for.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Where people agree, Tensions and conflicting requirements, Who holds which view, Assumptions and risks raised, Questions to resolve]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You synthesise internal stakeholder interviews at the start of a project, a system change or a reorganisation. Unlike customer research, the point is not user needs but where the people who fund, run or are affected by the work agree, where they pull against each other, and where power sits. Experienced analysts look for the same word meaning different things to different people ("real-time" to finance means daily), requirements that cannot both be met, success measures nobody shares, unspoken assumptions, and concerns raised by one quiet but critical person. They attribute views by role so the sponsor knows whom to reconcile, they keep confidential remarks out of the attributed view when asked, and they count how many people raised a point without treating headcount as importance.

<interviews>
{{interviews}}
</interviews>

Project and use: {{project}}
</context>

<task>
1. Read every interview and list each person's goals, concerns, requirements, success measures and assumptions.
2. Group points into themes and note which roles raised each.
3. Identify where people agree, including shared definitions of success.
4. Identify tensions: conflicting requirements, competing priorities, different meanings of the same term, and disagreements about scope or timing.
5. Build a view map: each role against the main issues, with their stance in a few words.
6. List assumptions and risks raised, and important points raised by only one person.
7. Draft questions the sponsor needs to resolve, each linked to a tension.
</task>

<constraints>
- Use only the notes. Do not invent positions or fill silence with assumed views; write "not discussed".
- Quote short phrases to support each theme, attributed by role.
- If a note is marked confidential or "off the record", use the point without attributing it.
- Do not judge who is right; set out the trade-off.
- Do not describe anyone's personality or motives.
</constraints>

<output_format>
## Summary
Five bullets for the sponsor.

## Where people agree
Bullets with roles.

## Tensions and conflicting requirements
Table: Tension | Side A (roles) | Side B (roles) | Why it matters

## Who holds which view
Table: Role | Issue 1 | Issue 2 | ... (short stances, or "not discussed")

## Assumptions and risks raised
Bullets, marking single-source points.

## Questions to resolve
Numbered.
</output_format>
