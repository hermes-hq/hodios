---
schema: 1
id: write-biosketch-personal-statement
kind: prompt
title: Write a biosketch personal statement and contributions
description: Writes the personal statement and contributions to science in a research biosketch, showing why this person fits this project's role, using only real outputs and checking the current format.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher]
requires: [none]
inputs: [resume, text, document]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [biosketch, personal-statement, research-funding, academic-cv, track-record]
pairs_with:
  prompts: [write-grant-key-personnel-section, write-fellowship-application, write-specific-aims-page]
  personas: [grant-writer]
args:
  - name: researcher
    description: The person's CV or summary - positions, training, key publications and other outputs, grants, datasets, software, career breaks if they wish to mention them, and their main research contributions.
    type: text
    required: true
  - name: project
    description: The project and this person's role in it (PI, co-investigator, key personnel), with the aims they contribute to.
    type: text
    required: true
  - name: format
    description: The funder and the current biosketch format with its sections and limits, pasted from the funder's current instructions. Formats change, so paste what applies to this call. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Format to confirm, Personal statement, Contributions, Fit check, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a research development officer who edits biosketches. A biosketch's narrative parts are read by reviewers judging the investigator criterion: is this person, at this stage, well placed to do their part of this project? A strong personal statement is specific to the application (not a reused bio), names the role, links the person's training and track record to the project's aims, cites a few of their most relevant outputs, and addresses any obvious question such as a change of field or a career gap if the person chooses to. Contributions to science, where the format asks for them, describe a handful of distinct contributions as short narratives: the problem, the person's specific role, the finding, and its influence, with supporting outputs. Funders update biosketch formats, limits and allowed content; formats differ between funders and even schemes, so the current instructions decide.
</context>

<task>
Write the narrative parts of the biosketch.

<researcher>
{{researcher}}
</researcher>

<project>
{{project}}
</project>
{{#format}}
<format>
{{format}}
</format>
{{/format}}

1. Format to confirm: list the sections and limits given in the format input. If no format is given, say which items to check in the funder's current instructions (sections, page or character limits, number of outputs allowed, required system or template) and do not state limits from memory.
2. Personal statement: written for this project and role, in the first person unless the format says otherwise. Open with the role and why this person is suited, connect two or three strands of their experience to specific aims, cite up to four of their most relevant outputs from the input, and mention ongoing support only if relevant and listed.
3. Contributions: up to the allowed number of distinct contributions (default four if not stated), each with the question or problem, the person's own role (say plainly if they led, co-led or contributed), the main finding and its influence, and supporting outputs from the input.
4. Fit check: aims or skills of their role that the statement does not yet support, and suggestions (collaborator, training, preliminary work).
5. Gaps: missing details such as dates or output details, as [NEEDED: ...].
</task>

<constraints>
- Use only outputs, positions and grants in the input; never invent publications, citations, metrics, awards or roles.
- Do not exaggerate the person's role in team work; distinguish leading from contributing.
- Do not state page limits, section names or allowed content from memory; follow the format given or tell the user what to check.
- Mention personal circumstances such as career breaks only if the user asked for them to be included.
</constraints>

<output_format>
## Format to confirm
## Personal statement
## Contributions
Numbered, each with its supporting outputs.
## Fit check
## Gaps
</output_format>
