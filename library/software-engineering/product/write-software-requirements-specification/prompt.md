---
schema: 1
id: write-software-requirements-specification
kind: prompt
title: Write a software requirements specification
description: Writes a software requirements specification along ISO/IEC/IEEE 29148 lines, with scope, context, numbered testable functional and non-functional requirements, interfaces and verification.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [business-analyst, architect, product-manager, tech-lead]
stack: []
requires: [none]
inputs: [notes, spec, document]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [srs, iso-29148, testable-requirements, requirements]
pairs_with:
  prompts: [define-non-functional-requirements, write-requirements-traceability-matrix, write-use-case-specification]
args:
  - name: source_material
    description: Notes, business requirements, workshop outputs, contracts or existing documents describing what the software must do.
    type: text
    required: true
  - name: context
    description: Who will read and sign off the SRS (client, regulator, supplier), the organisation's template or numbering scheme, and the system's environment.
    type: text
output_contract:
  format: markdown
  sections: [Introduction, Overall description, Functional requirements, External interfaces, Non-functional requirements, Verification, Open issues]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An SRS is still the contract document for outsourced builds, tenders, public sector projects and regulated software, and a weak one becomes the source of change requests and disputes. The classic defects are well documented in requirements engineering practice (ISO/IEC/IEEE 29148 lists the characteristics a good requirement needs: necessary, unambiguous, complete, singular, feasible, verifiable, correct and conforming): requirements that bundle several needs in one sentence; vague words like "fast", "user-friendly", "flexible" and "etc."; design decisions written as requirements; "should" and "must" used interchangeably; non-functional requirements with no numbers; missing interfaces to other systems; and requirements nobody can test. A strong SRS gives each requirement a unique id, one "shall" statement, a rationale and source, a priority, and a verification method (test, inspection, analysis or demonstration), and keeps assumptions, constraints and open issues visible rather than buried.
</context>

<task>
<source>
{{source_material}}
</source>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Write the introduction: purpose, scope (in and out), definitions and abbreviations, references, and document conventions (keywords: "shall" for mandatory, "should" for desirable, "may" for optional).
2. Write the overall description: product context and boundaries, user classes and their characteristics, operating environment, design and implementation constraints, assumptions and dependencies.
3. Write functional requirements grouped by feature or capability, each with an id (FR-AREA-NN), a single "shall" statement, rationale, source (which input it came from), priority, and acceptance condition.
4. Write external interfaces: user interface requirements at the level of behaviour, hardware, software and communication interfaces with other systems, data formats and protocols.
5. Write non-functional requirements with measurable criteria: performance, capacity, availability, security, privacy, usability and accessibility, maintainability, portability, compliance, each with an id and number or verifiable condition.
6. Write a verification section: for each requirement the method (test, inspection, analysis, demonstration).
7. List open issues: ambiguities, conflicts and missing information found in the sources, assumptions made, and to-be-determined values, each with an id and owner role.
8. Run a quality check on your own requirements and fix any that are compound, vague or untestable before finishing.
</task>

<constraints>
- One requirement per id; split any sentence that contains "and" joining two separate needs.
- Never use unmeasurable words (fast, easy, user-friendly, robust, etc.) without a number or verifiable condition.
- Do not invent requirements, numbers or regulations; mark gaps as TBD in open issues and cite the source of each requirement.
- Describe what the system shall do, not how it is built, unless a design constraint is given in the sources.
- Do not claim formal conformance to any standard; say the document follows its structure and characteristics.
</constraints>

<output_format>
## Introduction
Subsections: purpose, scope, definitions, references, conventions.
## Overall description
Subsections as listed in step 2.
## Functional requirements
Per area, table: id, requirement, rationale, source, priority, acceptance condition.
## External interfaces
Table: id, interface, requirement.
## Non-functional requirements
Table: id, category, requirement, measure.
## Verification
Table: requirement id, method.
## Open issues
Table: id, issue, type (ambiguity, conflict, TBD, assumption), owner role.
</output_format>
