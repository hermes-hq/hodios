---
schema: 1
id: write-c4-diagram
kind: prompt
title: Write C4 architecture diagrams
description: Produces C4 context, container and optionally component diagrams as Mermaid, PlantUML or Structurizr DSL from a codebase or description, with a legend and stated assumptions.
category: architecture
version: 1.0.0
status: incubating
stage: [design, learn]
role: [architect, software-engineer, tech-lead, technical-writer]
stack: []
requires: [repo-read]
inputs: [repo, text, document, config]
output: [diagram, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [c4-model, architecture-diagram, mermaid, plantuml, structurizr, diagrams-as-code]
pairs_with:
  personas: [software-architect, technical-writer]
  prompts: [explain-codebase, write-onboarding-guide, write-design-doc]
args:
  - name: system_description
    description: The system to diagram, as a description, or a pointer to the repo or folders to read (manifests, deploy config, service entry points).
    type: text
    required: true
  - name: levels
    description: How deep to go. context draws only the system context; container adds the container diagram; component adds one component diagram for the most important container.
    type: enum
    enum: [context, container, component]
    default: container
  - name: notation
    description: Diagram-as-code notation to output.
    type: enum
    enum: [mermaid, plantuml, structurizr]
    default: mermaid
output_contract:
  format: markdown
  sections: [Scope, Diagrams, Legend, Element catalogue, Assumptions and gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The C4 model describes software at four zoom levels: system context (the system, its users and the external systems it talks to), containers (separately deployable or runnable things such as web apps, APIs, workers, databases and queues), components (the major building blocks inside one container) and code. Most teams need only the first two. Diagrams go wrong in predictable ways: boxes with no technology or responsibility, unlabelled arrows, a library drawn as a container, a database shared by everything with no owner shown, and elements that exist only in someone's memory, not in the code. A useful C4 diagram is accurate, readable in a minute and states what it does not know.
</context>

<task>
Produce C4 diagrams down to the "{{levels}}" level, written in {{notation}}, for:

<system>
{{system_description}}
</system>

1. Gather the facts. If you were pointed at a repo, read what reveals the architecture: build manifests, Dockerfiles and compose files, deployment and infrastructure config, service entry points, environment variable names, HTTP and queue clients, and database migrations. Cite the file each element comes from. If you have only a description, use it and mark anything you inferred.
2. Identify the elements:
   - **People:** user roles and operators, by role not by name.
   - **Software systems:** the system in scope and every external system it calls or is called by, with direction.
   - **Containers** (for the container level and below): each runnable or deployable unit and each data store, with its technology and one-line responsibility. Libraries and modules are not containers.
   - **Components** (for the component level): the main building blocks of the single most important container, which you name and justify, or the one the user indicated.
3. Label every relationship with what flows and how, for example "Places orders [JSON over HTTPS]" or "Publishes OrderPlaced [Kafka]". Every arrow has a direction, a verb phrase and, at container level and below, a protocol.
4. Write the diagrams in {{notation}}:
   - mermaid: Mermaid C4 syntax (`C4Context`, `C4Container`, `C4Component`) with `Person`, `System`, `System_Ext`, `Container`, `ContainerDb`, `Component` and `Rel`. Mention that Mermaid's C4 support is still experimental in some renderers.
   - plantuml: the C4-PlantUML standard library (`!include <C4/C4_Context>`, `<C4/C4_Container>`, `<C4/C4_Component>`) with `SHOW_LEGEND()`.
   - structurizr: one Structurizr DSL `workspace` containing the model once and a view per level (`systemContext`, `container`, `component`) with `autoLayout`.
   One fenced block per diagram (one block in total for Structurizr), each with a title.
5. Keep each diagram readable: at most about 15 elements. If the system is bigger, group or split and say how.
6. Add a legend explaining shapes, colours, line styles and the meaning of external elements, unless the notation renders one (then say so).
</task>

<constraints>
- Do not invent services, data stores, external systems or protocols. Anything not found in the code or description is either left out or marked as assumed in the element catalogue.
- Use the C4 vocabulary correctly: a container is something that runs or stores data, not a Docker container by definition and not a code module.
- The output must render as written: check identifiers are unique, quotes are balanced and every relationship refers to a defined element.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Scope
The system in scope, the levels drawn, and for a component diagram which container and why. At most 4 lines.
## Diagrams
One fenced code block per diagram (or one Structurizr workspace), each preceded by its title.
## Legend
Bullets, or "Rendered by the notation".
## Element catalogue
Table: element, C4 type, technology, responsibility, source (file path or "description" or "assumed").
## Assumptions and gaps
Numbered. What you inferred or could not find, and what to check to confirm it.
</output_format>
