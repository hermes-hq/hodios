---
schema: 1
id: map-user-flow
kind: prompt
title: Map a user flow with decisions and drop-off risks
description: Maps a user flow for a task in a product step by step, with entry points, decisions, error and empty states and exits, and marks the friction and drop-off risk at each step with a fix.
category: ui-design
version: 1.0.0
status: incubating
aliases: [design-user-flow]
stage: [design, review]
role: [designer, product-manager, frontend-engineer]
requires: [none]
inputs: [text, spec, image]
output: [diagram, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [user-flow, flowchart, friction, drop-off, error-states]
pairs_with:
  personas: [product-designer]
  prompts: [create-wireframe-spec, run-heuristic-evaluation, build-user-journey-map, analyze-conversion-funnel]
args:
  - name: task
    description: The user goal and product to map (for example "a new user invites a teammate in our project tool").
    type: text
    required: true
  - name: current_design
    description: Screens, a written description of the current flow, or analytics, if the flow already exists.
    type: text
output_contract:
  format: markdown
  sections: [Flow summary, Flow diagram, Steps, Friction and drop-off risks, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A user flow is the path through screens and decisions that one user takes to finish one task. It sits between a journey map, which covers feelings and channels across a whole relationship, and a wireframe, which details one screen. Flows that only show the happy path hide where people really leave: the error message with no way forward, the empty state with no first action, the sign-up wall in the middle of a task. This map covers every branch a real user can hit.
</context>

<task>
Map the flow for: {{task}}
{{#current_design}}Current design or data:
{{current_design}}
{{/current_design}}
1. Define the user, their goal, and what "done" looks like. List every entry point (direct link, notification, search, another feature, an invite email).
2. Lay out the happy path as numbered steps: the screen or state, what the user sees, what they do, and what the system does.
3. Add every branch: decisions the user makes, system checks (signed in? permission? plan limit? valid input?), error states and how to recover, empty states, loading and offline states, and exits (cancel, back, close, abandon).
4. Draw the flow as a Mermaid flowchart with decisions as diamonds and errors and exits clearly marked.
5. For each step, rate the drop-off risk (high, medium, low) and name the friction: extra steps, unclear choices, forced account creation, waiting, lost input, dead ends. If analytics were provided, use them instead of guessing and say so.
6. Propose the fix for the highest risks, and count the steps on the happy path before and after.
</task>

<constraints>
- Every error and empty state must lead somewhere: a recovery action, help, or a clear exit. Flag any dead end.
- Separate observed problems (from the design or data provided) from expected ones; label the latter as assumptions.
- Keep to one user goal per flow; note related flows instead of merging them.
- Do not design visual details; this is about steps and decisions.
</constraints>

<output_format>
## Flow summary
User, goal, success condition, entry points, and the happy path length in steps.
## Flow diagram
A Mermaid flowchart.
## Steps
Table: step, screen or state, user action, system response, branches.
## Friction and drop-off risks
Ranked list: step, risk level, friction, evidence or assumption, proposed fix.
## Open questions
Decisions the team must make, and data that would confirm the risks.
</output_format>
