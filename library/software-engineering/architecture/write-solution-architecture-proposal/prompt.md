---
schema: 1
id: write-solution-architecture-proposal
kind: prompt
title: Write a solution architecture proposal
description: Writes a client-facing solution architecture for a proposal or bid, with options, assumptions, components, integrations, risks, phasing and rough cost drivers.
category: architecture
version: 1.0.0
status: incubating
stage: [plan, design]
role: [architect, consultant, tech-lead, sales-rep]
requires: [none]
inputs: [document, spec, text]
output: [docs, diagram, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [solution-architecture, bids, client-proposal, assumptions, integration-design, presales]
pairs_with:
  personas: [software-architect]
  prompts: [write-design-doc, compare-design-options]
args:
  - name: client_need
    description: The client's problem and requirements as stated in the request for proposal, brief or meeting notes.
    type: text
    required: true
  - name: our_position
    description: What the proposing team offers, such as skills, preferred platforms, reusable assets, and any constraints on the bid such as fixed price or deadline.
    type: text
  - name: client_landscape
    description: Known client systems, cloud, security and compliance rules, and team that will operate the solution.
    type: text
output_contract:
  format: markdown
  sections: [Executive summary, Requirements understanding, Proposed architecture, Integrations and data, Options considered, Non-functional approach, Phasing, Assumptions and dependencies, Risks, Cost drivers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A solution architecture in a proposal has a different job from an internal design document: it must show the client their requirements were understood, give them confidence in a credible design, and protect the proposing team from scope it did not price. Evaluators score it against the request, so each requirement should be traceable to how it is met. The strongest proposals restate requirements in their own words (exposing misunderstandings early), recommend one option while showing alternatives were considered, keep the architecture at the level the client can evaluate, and spell out assumptions and client dependencies (access to systems, data quality, decision-makers' time, environments), because unstated assumptions become unpaid work. Integrations with the client's existing systems are where most delivery risk lives. Non-functional requirements (security, availability, data protection, support model) are often scored separately and are frequently under-answered. Overpromising on timelines or naming products the team has not validated against the client's constraints causes problems after signature.
</context>

<task>
<client_need>
{{client_need}}
</client_need>
{{#our_position}}
<our_position>
{{our_position}}
</our_position>
{{/our_position}}
{{#client_landscape}}
<client_landscape>
{{client_landscape}}
</client_landscape>
{{/client_landscape}}

1. Extract every requirement from the client's material and restate it, numbering them so each can be traced. Flag ambiguous ones as clarification questions.
2. Identify two or three solution options and recommend one, tied to the client's priorities and landscape.
3. Describe the proposed architecture: main components, hosting, data flow, and the parts reused versus built.
4. Detail integrations with the client's systems, each with method, data, owner and risk.
5. Address non-functional requirements explicitly, including security, data protection, availability, operations and handover.
6. Propose phasing with outcomes per phase, starting with the riskiest integration or assumption.
7. List assumptions and client dependencies, each phrased so it can be confirmed or priced.
8. List risks with mitigations and the cost drivers, without quoting unverified prices.
9. Write the executive summary last.
</task>

<constraints>
- Do not promise capabilities, certifications, product features or prices that have not been confirmed; mark them as to be confirmed.
- Do not name the client's internal systems or people beyond what was provided.
- Every requirement in the client's material must appear in the requirements table, even if the answer is "not in scope".
- Write for the client: no internal jargon or internal margin discussions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Executive summary
Half a page for the client sponsor: the problem, the proposed solution, why it fits, and phasing.
## Requirements understanding
Table: requirement, our interpretation, how the solution meets it, reference to the client's document.
## Proposed architecture
A Mermaid diagram plus one paragraph per main component.
## Integrations and data
Table: system, direction, method, data, owner, risk.
## Options considered
Table: option, pros, cons, why recommended or not.
## Non-functional approach
Security, availability, performance, compliance, operations and support.
## Phasing
Phases with outcomes, not dates the team cannot commit to.
## Assumptions and dependencies
Numbered, each one testable.
## Risks
Table: risk, impact, mitigation, owner.
## Cost drivers
What drives build and running cost, without quoting prices that have not been checked.
</output_format>
