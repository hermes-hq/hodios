---
schema: 1
id: size-backlog-items
kind: prompt
title: Size backlog items relatively
description: Sizes a batch of backlog items against reference stories with relative points or t-shirt sizes, flags items too big or too unclear to size, and lists the questions that would settle them.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, software-engineer, engineering-manager, product-manager]
stack: []
requires: [none]
inputs: [ticket, text]
output: [table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [story-points, relative-estimation, backlog-refinement, t-shirt-sizing]
pairs_with:
  prompts: [refine-backlog-ticket, break-down-epic, estimate-with-ranges]
args:
  - name: items
    description: The backlog items to size, each with its title and description or acceptance criteria.
    type: text
    required: true
  - name: reference_items
    description: Two or three finished items the team agrees on as anchors, with the size they were given and what they involved.
    type: text
  - name: scale
    description: The sizing scale to use.
    type: enum
    enum: [fibonacci-points, t-shirt]
    default: fibonacci-points
output_contract:
  format: markdown
  sections: [Anchors, Sizes, Too big to size, Too unclear to size, Questions for refinement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Relative sizing works because people compare two things far better than they guess hours. Its value comes from the conversation it starts: a large spread in sizes means people picture different work, and that difference is the real finding. Sizes measure effort, complexity and uncertainty together, are only meaningful against the team's own anchors, and must never be converted into hours or used to compare teams. Items that come out large or uncertain are a signal to split or spike, not a number to plan with. An AI cannot know a team's codebase, so its sizes are a starting point for discussion, not a verdict.
</context>

<task>
<items>
{{items}}
</items>
{{#reference_items}}
<reference_items>
{{reference_items}}
</reference_items>
{{/reference_items}}
Scale: {{scale}}.

1. Set the anchors: use the reference items if given; otherwise propose a small, medium and large anchor from the batch itself and say these must be confirmed by the team.
2. Size each item relative to the anchors on the chosen scale, with a one-line reason naming what drives the size (effort, complexity, uncertainty) and the closest anchor.
3. Flag items too big to finish within one iteration as too big (if the team gives no threshold, a common one is 13 points or more, or L and above, and say you used it), and suggest how to split each.
4. Flag items too unclear to size, with what is missing; recommend a spike where the unknown is technical.
5. Where a size could plausibly be one step up or down, say what assumption decides it, so the team can discuss that point.
6. List the questions to bring to refinement, ordered by how many items they affect.
</task>

<constraints>
- Do not convert points to hours or days.
- Present sizes as a proposal for the team to challenge, not final numbers.
- Do not assume a codebase detail that is not in the input; state it as an assumption.
- Do not size an item that has no description; put it in "too unclear".
</constraints>

<output_format>
## Anchors
The anchors and their sizes.
## Sizes
Table: item | size | drivers | closest anchor | assumption that could change it.
## Too big to size
Table: item | why | suggested split.
## Too unclear to size
Table: item | what is missing | spike or question.
## Questions for refinement
Numbered list.
</output_format>
