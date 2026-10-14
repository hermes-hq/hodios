---
schema: 1
id: review-research-software-paper
kind: prompt
title: Review a research software paper and its code
description: Reviews a research software paper and its repository as a software-journal reviewer would, checking claims, installation, documentation, tests, licensing, community guidelines and research value.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, software-engineer, data-scientist]
requires: [none]
inputs: [document, repo, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [research-software, software-paper, software-review, reproducibility]
pairs_with:
  prompts: [assess-reproducibility, write-peer-review]
  personas: [peer-reviewer]
args:
  - name: paper
    description: The software paper text.
    type: text
    required: true
  - name: repository_material
    description: What you can see of the repository, such as the README, install instructions, licence, test setup, example output, and anything that failed when you tried it.
    type: text
    required: true
  - name: venue_checklist
    description: The venue's review checklist, pasted, so the review follows it.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Checklist, Functionality and claims, Documentation and usability, Tests and maintenance, Research value and positioning, Requested changes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Software papers are reviewed on the software as much as the text. Software-focused journals typically use a checklist: an open licence, a clear statement of need, installation that works from the instructions, example usage, API documentation, automated tests, community guidelines (how to contribute, report issues, get support), and references to related tools. Reviewers commonly skim the paper and never try to install the package, or demand features out of scope. The real questions are whether the software does what the paper claims, whether a new user in the target field can install and use it from the documentation, whether it is maintainable (tests, continuous integration, versioned releases), and whether it adds something over existing tools. A review should report exactly what the reviewer ran and what happened, so the authors can reproduce failures.
</context>

<task>
Review this software paper and repository.
<paper>
{{paper}}
</paper>
<repository_material>
{{repository_material}}
</repository_material>
{{#venue_checklist}}
<venue_checklist>
{{venue_checklist}}
</venue_checklist>
{{/venue_checklist}}

1. Summarise what the software does, for whom, and what the paper claims.
2. Fill the checklist (the venue's if given, otherwise licence, statement of need, installation, example usage, functionality, API documentation, tests, community guidelines, references to related software), marking each item as met, not met, or not checked from the material.
3. Check functionality against claims: which claimed features the repository material shows working, which failed, and which were not tried. Where I report a failure, describe it reproducibly.
4. Judge documentation and usability for the stated audience.
5. Judge tests and maintenance: test coverage of core functions, continuous integration, releases, and responsiveness to issues if visible.
6. Judge research value: the statement of need and comparison with existing tools named in the paper.
7. List requested changes, split into required for acceptance and suggestions.
8. If I need to try something to complete the review, give me the specific commands or steps to try, and wait for the output.
</task>

<constraints>
- Mark an item as checked only from material I provided; never claim installation or tests succeeded unless I reported it.
- Do not request features beyond the stated scope; suggestions may mention them as optional.
- Do not invent competing tools; ask the authors to compare with tools in their field if the comparison is missing.
- Requested changes are concrete and phrased as issues the authors could open in their tracker.
</constraints>

<output_format>
## Summary
## Checklist
A table: item | status | note.
## Functionality and claims
## Documentation and usability
## Tests and maintenance
## Research value and positioning
## Requested changes
Two numbered lists: required, suggested.
</output_format>
