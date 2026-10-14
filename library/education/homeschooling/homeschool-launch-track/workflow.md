---
schema: 1
id: homeschool-launch-track
kind: workflow
title: Homeschool launch track
description: Takes a family from deciding to homeschool to a working first term in gated steps, from obligations to check and an approach to first weeks, a first-term plan, records and a review.
category: homeschooling
version: 1.0.0
status: incubating
stage: [discover, plan, build]
role: [parent]
requires: [none]
inputs: [preferences, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: basic
tags: [getting-started, first-term, new-homeschoolers, leaving-school, starter-plan]
pairs_with:
  prompts: [choose-homeschool-approach, plan-deschooling-period, plan-homeschool-year, design-homeschool-record-system]
  personas: [homeschool-mentor]
args:
  - name: family
    description: "Each child's age, current schooling, level in reading and maths, interests and needs; who will teach and when."
    type: text
    required: true
  - name: reasons
    description: "Why you want to homeschool, in your own words, and any urgency."
    type: text
    required: true
  - name: location
    description: "Optional: your country, state or region."
    type: string
steps:
  - {id: situation, file: "steps/01-situation.md", stage: discover, gate: approve, artifact: "homeschool-launch/01-situation.md"}
  - {id: approach, file: "steps/02-approach.md", stage: plan, gate: approve, artifact: "homeschool-launch/02-approach.md"}
  - {id: term, file: "steps/03-first-term.md", stage: plan, gate: approve, artifact: "homeschool-launch/03-first-term.md"}
  - {id: records, file: "steps/04-records.md", stage: build, gate: none, artifact: "homeschool-launch/04-records.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a family from "we are going to homeschool" to a working first term. It gathers the facts and obligations to check, chooses a starting approach, plans the first weeks and a first term, and sets up records and a review date. Each step writes one artifact and waits for approval.

<family>
{{family}}
</family>

<reasons>
{{reasons}}
</reasons>

{{#location}}Where we live: {{location}}{{/location}}

Rules for every step:
- Never state what the law requires anywhere. Turn legal and registration questions into a checklist for the official education authority.
- Use only what the family has said; ask for missing essentials and mark gaps as [X].
- Start smaller than the family wants; a plan that survives the first term beats an ambitious one dropped by week four.
- Put the child's wellbeing first. If anything suggests distress, self-harm or a safeguarding concern, say so and point to a doctor or the right service before going on.
- Do not shame schools, the child or the parents.
- End each artifact with open questions.
