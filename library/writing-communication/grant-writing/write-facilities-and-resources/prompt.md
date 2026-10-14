---
schema: 1
id: write-facilities-and-resources
kind: prompt
title: Write the facilities and resources section of a grant
description: Writes a grant's facilities, equipment and other resources section, showing what is already available to the project, who can use it and how it will be used for each aim or activity.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, manager, writer]
requires: [none]
inputs: [text, document]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [facilities, equipment, institutional-support, research-environment, feasibility]
pairs_with:
  prompts: [write-grant-key-personnel-section, build-grant-budget, write-capital-grant-application]
  personas: [grant-writer]
args:
  - name: resources
    description: What is available - labs, offices, venues, equipment with models and capacity, computing and data storage, core facilities, libraries, vehicles, partner resources - and the terms of access.
    type: text
    required: true
  - name: project
    description: The project's aims or activities, so each resource can be tied to its use.
    type: text
    required: true
  - name: funder_format
    description: The funder's instructions for this section (name, what to include, whether it may contain budget figures, limits). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Resource map, Section text, Budget consistency, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant writer who often drafts this section from institutional boilerplate. Reviewers use it to judge whether the environment can support the work: the right space and equipment exist, the team has access when needed, and nothing essential is missing or quietly budgeted elsewhere. Generic institutional descriptions ("a world-class university with excellent facilities") earn nothing; what scores is specific, project-relevant detail: what the resource is, its capacity, who controls access and on what terms, and which aim or activity it serves. Typical problems are listing equipment the project does not need, omitting something the methods clearly require, claiming access to a partner's facility without a letter or agreement, and asking the budget to pay for equipment the section says already exists. Some funders forbid budget figures or certain content in this section, so the funder's instructions decide.
</context>

<task>
Write the facilities and resources section.

<resources>
{{resources}}
</resources>

<project>
{{project}}
</project>
{{#funder_format}}
<funder_format>
{{funder_format}}
</funder_format>
{{/funder_format}}

1. Resource map: for each aim or activity, the resources it needs, whether each is available (with location and access terms) or missing.
2. Section text: organised under headings the funder uses, or by default: space (labs, offices, venues), major equipment, computing and data, other resources (core services, libraries, transport, community spaces), partner resources, and institutional support (time release, administrative support) if given. Each item states what it is, capacity or specification, access, and how the project uses it.
3. Budget consistency: items described here as available that also appear in the budget, and items the methods need that appear in neither; advise on how to resolve each.
4. Gaps: missing details such as specifications or access arrangements, and partner resources that need a confirmation letter, as [NEEDED: ...].
</task>

<constraints>
- Describe only resources in the input; never invent equipment, models, capacities or partner arrangements.
- Do not include costs unless the funder's instructions allow them; if unsure, leave them out and say so.
- Keep it specific to the project; cut generic institutional praise.
</constraints>

<output_format>
## Resource map
Table: Aim or activity | Resource | Available or missing | Access terms.
## Section text
## Budget consistency
## Gaps
</output_format>
