---
schema: 1
id: build-consulting-recommendations-deck
kind: prompt
title: Build a findings and recommendations deck
description: Builds the final findings and recommendations deck for a consulting engagement or internal review, with the answer up front, findings tied to evidence, prioritised recommendations and a roadmap.
category: presentations
version: 1.0.0
status: incubating
stage: [review, plan]
role: [consultant, business-analyst, operations-manager, manager]
requires: [none]
inputs: [notes, document, dataset]
output: [outline, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [client-deliverable, findings, recommendations, implementation-roadmap, pyramid-principle]
pairs_with:
  prompts: [build-reading-deck, write-executive-summary-slide, build-decision-request-deck, drill-presentation-qa]
  personas: [presentation-designer]
args:
  - name: scope
    description: The question the engagement or review was asked to answer, the client or sponsor, scope and what is out of scope.
    type: text
    required: true
  - name: findings
    description: Your findings and evidence, such as interview themes, data analysis, benchmarks you have sources for, process observations and the recommendations you are considering.
    type: text
    required: true
  - name: audience
    description: Who receives it, whether it is presented live or read, and how long you have, for example "COO and her direct reports, 60 minutes, then circulated".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The answer, Findings and evidence, Recommendations, Roadmap, Slide plan, Sensitive points and how to handle them, Gaps in the evidence]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help consultants, internal strategy teams and auditors present the final deliverable of a review: an operating model review, process diagnostic, organisational assessment or market study. Experienced consultants follow a few rules. Lead with the answer to the question you were asked, then support it (pyramid principle). Each finding is a conclusion backed by evidence, with the source and its strength stated. Recommendations follow from findings, are specific enough to act on, are prioritised by impact and effort, and come with owners, timing and the first step. Weak final decks list thirty observations with equal weight, mix findings with recommendations, make recommendations that are really aspirations ("improve communication"), ignore cost and capacity to implement, and surprise senior people in the room with criticism of their area. The usual practice is to pre-wire: share sensitive findings one-to-one with the affected leaders before the meeting.

Scope and question: {{scope}}

<findings>
{{findings}}
</findings>

Audience and format: {{audience}}
</context>

<task>
1. Write the answer to the engagement question in two or three sentences. If the findings do not answer the question as scoped, say so and state what they do answer.
2. Group the findings into three to six themes. For each, write a conclusion-style title, the evidence (source, sample, data point), and its strength (strong, moderate, indicative). Drop or appendix findings that do not bear on the question.
3. Derive recommendations from the findings. Each one: what to do, which finding it addresses, expected impact, effort or cost (only as given, otherwise [estimate needed]), risk, suggested owner type, and first step. Prioritise using impact against effort, and name quick wins separately from structural changes.
4. Lay out a roadmap: phases (for example first 90 days, 3 to 12 months, beyond), with dependencies and decisions needed.
5. Plan the slides: title, executive summary with the answer, context and approach in one slide, one section per theme with findings, recommendations with the prioritisation chart, roadmap, decisions requested and next steps, appendix with method and detail. Fit the time, leaving discussion time.
6. Identify sensitive findings that criticise specific teams or leaders, and suggest how to pre-wire them and phrase them factually without blame.
7. List gaps in the evidence that a sceptical executive would challenge.
</task>

<constraints>
- Use only the evidence provided. Do not invent benchmarks, industry statistics, savings figures, quotes or sources; mark them [source needed] or [estimate needed].
- Keep findings and recommendations separate; every recommendation traces to at least one finding.
- Recommendations must be actionable (verb, object, owner type, timing), not slogans.
- Anonymise interview quotes and avoid details that identify individuals.
- Stay within the agreed scope; list out-of-scope issues as observations only.
</constraints>

<output_format>
## The answer
Two or three sentences.

## Findings and evidence
For each theme: title, evidence, strength.

## Recommendations
Table: # | Recommendation | Finding | Impact | Effort or cost | Risk | Owner | First step | Priority.

## Roadmap
Table: Phase | Actions | Dependencies | Decisions needed.

## Slide plan
Table: # | Slide title (assertion) | Content | Minutes.

## Sensitive points and how to handle them
Bullets: finding, who is affected, pre-wire approach, neutral wording.

## Gaps in the evidence
Bullets.
</output_format>
