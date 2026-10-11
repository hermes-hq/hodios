---
schema: 1
id: run-event-storming
kind: prompt
title: Run an event storming session
description: Runs a text-based event storming session that turns a business process into domain events, commands, actors, policies, read models and hotspots.
category: architecture
version: 1.0.0
status: incubating
stage: [discover, design]
role: [architect, tech-lead, business-analyst, product-manager]
requires: [none]
inputs: [text, notes, transcript]
output: [table, diagram, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [event-storming, domain-events, domain-discovery, domain-driven-design, process-modeling, workshops]
pairs_with:
  personas: [software-architect]
  prompts: [find-service-boundaries, design-domain-aggregates]
args:
  - name: process
    description: The business process or area to explore, in plain words, from start to end as far as known.
    type: text
    required: true
  - name: participants
    description: Who knows this process (roles), and any notes or transcripts from them.
    type: text
  - name: goal
    description: What the session is for, such as finding service boundaries, understanding a legacy process, or planning a new feature.
    type: text
output_contract:
  format: markdown
  sections: [Timeline of events, "Commands, actors and policies", External systems, Hotspots, Candidate boundaries, Diagram, Next session]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Event storming is a workshop technique for exploring a business domain by listing what happens in it as domain events (things the business cares about, in past tense: "Order Placed", "Payment Failed"). It works because events are concrete and easy for non-technical experts to correct. The usual order is: chaotic exploration of events, enforcing a timeline, marking hotspots (disagreements, unknowns, pain), then adding commands (what causes an event), actors (who issues them), policies (automatic reactions: "whenever payment fails, notify customer"), external systems and the read models people need to decide. Language shifts along the timeline ("lead" becomes "customer" becomes "account") and pivotal events where the meaning changes are strong hints for bounded context boundaries. Novices write technical events ("Row Updated"), skip failure and exception paths, and resolve hotspots by guessing. A text version run with an AI cannot replace the room, but it can draft the timeline, surface gaps and prepare sharp questions for the real experts.
</context>

<task>
<process>
{{process}}
</process>
{{#participants}}
<participants>
{{participants}}
</participants>
{{/participants}}
{{#goal}}
Goal: {{goal}}
{{/goal}}

1. List every domain event you can identify, in past tense and business language, including failure, cancellation, timeout and exception events. Mark events you inferred rather than read.
2. Order them into a timeline and group into phases, noting pivotal events where the business meaning changes.
3. For each event, add the command that triggers it, the actor or system, any policy that reacts to it, and the information (read model) someone needs to issue the command.
4. List external systems involved.
5. Raise hotspots: contradictions, unclear rules, missing steps, manual workarounds and pain points. Phrase each as a question to a specific role.
6. Propose candidate boundaries from clusters of events and shifts in language, labelled as candidates for experts to test.
7. Draw the main flow as a Mermaid flowchart and suggest what the next real session should cover and who should attend.
</task>

<constraints>
- Use business language, not database or code operations, for events.
- Never fill a gap with an invented business rule; mark it as a hotspot.
- Boundaries are candidates, not decisions.
- Keep Mermaid syntax valid: quote labels with special characters.
{{> output/uncertainty}}
</constraints>

<output_format>
## Timeline of events
Numbered domain events in past tense, in time order, grouped into phases.
## Commands, actors and policies
Table: event, triggering command, actor or system, policy (whenever X then Y), read model needed.
## External systems
Bullets.
## Hotspots
Bullets of conflicts, unknowns and pain points, each phrased as a question for a named role.
## Candidate boundaries
Clusters of events and the language that changes between them.
## Diagram
A Mermaid flowchart of the main flow.
## Next session
What to explore or validate next and with whom.
</output_format>
