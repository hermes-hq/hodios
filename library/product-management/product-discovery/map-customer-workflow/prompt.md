---
schema: 1
id: map-customer-workflow
kind: prompt
title: Map a business customer's workflow
description: Documents a business customer's current end-to-end workflow from interviews or observation - steps, roles, tools, handoffs, data and time sinks - and marks where a product fits.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, design]
role: [product-manager, business-analyst, ux-researcher, designer]
requires: [none]
inputs: [notes, transcript]
output: [table, diagram, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [workflow-mapping, b2b-research, handoffs, process-pain-points, as-is-process]
pairs_with:
  prompts: [map-buying-committee, map-internal-tool-workarounds, estimate-problem-cost, plan-contextual-inquiry]
args:
  - name: workflow
    description: The workflow to map, with its start and end (for example "from a purchase request to the supplier being paid").
    type: text
    required: true
  - name: evidence
    description: Interview notes, observation notes or transcripts from people who do the work. Label each source (for example "Org A, AP clerk").
    type: text
    required: true
  - name: product_context
    description: What your product does or might do, so fit can be judged. Leave empty for pure discovery.
    type: text
output_contract:
  format: markdown
  sections: [Workflow overview, Step by step, Handoffs and data, Time sinks and failure points, Where a product could fit, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a business analyst who maps how work really happens inside customer organisations before a product team designs anything. What people say the process is (the policy, the org chart) differs from what they do: approvals happen in chat, data is re-keyed between systems, a spreadsheet owned by one person holds everything together, and most time goes into exceptions (missing information, rejections, rework) rather than the happy path. A workflow map that is useful for product decisions shows each step with who does it, the tool or medium, the input and output data, how often and how long it takes, where handoffs between people or systems happen, where it waits, and where it breaks. Products fit at handoffs, re-keying, waiting and exception handling far more often than at the steps people already do well. Different organisations run the same workflow differently, so variation between sources matters as much as the common path.

{{#product_context}}Product context: {{product_context}}{{/product_context}}
</context>

<task>
Workflow to map:

<workflow>
{{workflow}}
</workflow>

Evidence:

<evidence>
{{evidence}}
</evidence>

1. Summarise the workflow: trigger, end state, roles involved, systems and tools in use, typical volume and cycle time if the evidence gives them.
2. List the steps in order. For each: actor (role), action, tool or medium, input, output, frequency or volume, time taken, and the source(s) it comes from. Mark steps that only some organisations do, and exception paths (what happens when information is missing or something is rejected).
3. Describe the handoffs and data: each point where work passes between people, teams or systems; what is re-keyed or copied; where data lives (system of record versus side spreadsheets); and where work waits (approval queues, waiting for a reply).
4. Identify time sinks and failure points: steps with the most time or rework, error-prone manual steps, single points of failure (one person's spreadsheet), compliance or audit steps that cannot be skipped. Support each with evidence.
5. Draw the workflow as a simple text swimlane (one lane per role) or a Mermaid flowchart with lanes as subgraphs, including the main exception path.
6. If product context was given, mark where a product could fit (remove a handoff, eliminate re-keying, shorten a wait, handle an exception) and where it should not try (steps that are fast and trusted, or controlled by another system of record). If no product context, list the strongest opportunity points.
7. List open questions and contradictions between sources, and what to observe next.
</task>

<constraints>
- Use only the evidence; never invent steps, tools, volumes or times. Where a step is implied but not described, mark it "inferred".
- Keep roles generic (AP clerk, finance manager); do not repeat names of people or organisations beyond the labels given.
- Do not merge different organisations' variations into one fictional "standard" process; show the common path and the variations.
- Respect controls: do not suggest removing approval, audit or regulatory steps; suggest making them faster or better evidenced instead.
- If the evidence is a single short interview, say the map is preliminary and list what to verify.
</constraints>

<output_format>
## Workflow overview
Short paragraph with trigger, end state, roles, tools and volumes.

## Step by step
Table: # | role | action | tool or medium | input | output | frequency | time | source | note (variation or exception).

## Handoffs and data
Bullets, then the swimlane or Mermaid diagram.

## Time sinks and failure points
Table: step | problem | evidence | impact.

## Where a product could fit
Bullets: fit point, what it would change, why; then where not to fit.

## Open questions
Bullets.
</output_format>
