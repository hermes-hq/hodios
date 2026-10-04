---
schema: 1
id: write-architecture-overview
kind: prompt
title: Write an architecture overview document
description: Writes an architecture overview of an existing system from its code and notes, covering context, components, boundaries, key decisions and trade-offs, with diagrams and short decision records.
category: architecture
version: 1.0.0
status: incubating
aliases: [doc-architecture]
stage: [maintain, learn]
role: [architect, tech-lead, technical-writer, software-engineer]
stack: []
requires: [repo-read]
inputs: [repo, document, notes]
output: [docs, diagram, adr]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [architecture-docs, trade-offs, system-boundaries, diagrams-as-code]
pairs_with:
  personas: [software-architect, technical-writer]
  prompts: [write-c4-diagram, write-adr, explain-codebase, write-onboarding-guide]
args:
  - name: system
    description: The repository or system to document, plus any existing notes, ADRs or diagrams.
    type: text
    required: true
  - name: audience
    description: Who will read it.
    type: enum
    enum: [new-engineers, whole-team, reviewers-and-auditors]
    default: whole-team
output_contract:
  format: markdown
  sections: [Overview document, Sources, Gaps to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An architecture overview explains how a system is shaped and why, so readers can change it without breaking its assumptions. It is not a design proposal for something new, a single decision record, or a diagram alone: it ties the diagrams, the boundaries and the main decisions together in one place. It is only useful if it matches the code, so every claim comes from the repository or from notes the team supplied, and unknowns are marked rather than filled in.
</context>

<task>
Write an architecture overview of {{system}} for the audience: {{audience}}.
1. Read the code, configuration, deployment files and any existing documents. Identify the system's purpose, users and external dependencies, the deployable units, the main components inside them, the data stores and who owns each, and how a typical request and a typical background job flow through.
2. Find the key decisions visible in the system (for example the choice of datastore, synchronous versus event-driven integration, multi-tenancy model, the framework) and the trade-offs each implies. Look for existing ADRs first.
3. Write the document with these sections:
   - Purpose and context: what the system does, for whom, and the systems around it;
   - Context diagram and container diagram, in Mermaid;
   - Components: responsibility, owned data and main interfaces of each;
   - Key flows: one request and one asynchronous flow, step by step;
   - Boundaries and rules: dependency directions, what may call what, data ownership;
   - Quality attributes: how the design addresses availability, performance, security and operability, as far as the code shows;
   - Key decisions: a short decision record for each major choice (context, decision, consequences), linking existing ADRs;
   - Risks and known limitations.
4. List the sources you used for each section, and the gaps the team must confirm.
</task>

<constraints>
- Describe only what the code, configuration or supplied notes support. Mark anything inferred as "inferred" and anything unknown as "to confirm".
- Do not invent the reasons behind a decision; when the reason is not recorded, state the observable trade-off and ask.
- Keep it short enough to read in 20 minutes; link to detail instead of copying it.
- Match the depth to the audience: more orientation for new engineers, more boundaries and controls for reviewers and auditors.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Overview document
The full document in markdown with the sections above and Mermaid diagrams.
## Sources
For each section, the files or notes it is based on.
## Gaps to confirm
Questions for the team, each tied to the section it affects.
</output_format>
