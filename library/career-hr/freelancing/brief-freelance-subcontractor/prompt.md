---
schema: 1
id: brief-freelance-subcontractor
kind: prompt
title: Brief a freelance subcontractor
description: Prepares a freelancer to bring in another freelancer on a client job - client permission, margin check, a written brief, rights and confidentiality flow-down, and quality checkpoints.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [consultant, designer, writer, software-engineer]
requires: [none]
inputs: [text, spec]
output: [docs, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [subcontracting, outsourcing, margin, ip-flow-down, quality-control]
pairs_with:
  prompts: [write-statement-of-work, review-freelance-contract, draft-simple-agreement]
args:
  - name: job
    description: The client job, the part you want to hand over, deadline, what the client pays you for that part, and what your client contract says about subcontracting, confidentiality and IP (pasted or summarised).
    type: text
    required: true
  - name: subcontractor
    description: Who you have in mind (skills, past work together, their rate or quote, where they are based). Use a role rather than a name if you prefer.
    type: text
output_contract:
  format: markdown
  sections: [Can you subcontract this, Money check, Brief, Terms to agree, Quality checkpoints]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer bring in another freelancer on part of a client job. What goes wrong: the client contract forbids subcontracting or needs consent, and nobody checked; the freelancer promised the client full IP but never got the rights from the subcontractor, so they cannot pass them on; confidential client material goes to someone with no confidentiality duty; the margin disappears once review time is counted; and the brief was a two-line message, so the work comes back wrong a day before the deadline. The freelancer stays responsible to the client for the subcontractor's work, so the setup needs a written brief, matching terms, and early checkpoints.
</context>

<task>
<job>
{{job}}
</job>
{{#subcontractor}}

<subcontractor>
{{subcontractor}}
</subcontractor>
{{/subcontractor}}

1. Can you subcontract this: from the client terms, whether subcontracting is allowed, needs consent, or is not mentioned; whether the client should be told regardless; what confidentiality and IP terms must flow down. If the client terms were not given, list what to look for.
2. Money check: client fee for the part, subcontractor cost, your review and management hours valued at your rate, and the resulting margin. Use only the given figures; show the arithmetic. Flag if the margin is negative or too thin to cover rework.
3. Write the brief for the subcontractor: goal and audience, exact deliverables with formats, acceptance criteria, inputs and access provided, style or technical constraints, deadline with an early checkpoint, how to ask questions, and what not to do (contacting the client directly, reusing material).
4. Terms to agree in writing with the subcontractor: scope and fee, payment timing (ideally not later than you are paid, unless agreed), assignment or licence of rights matching what you promised the client, confidentiality, no direct solicitation of the client if appropriate, and what happens if the work is late or unusable. Say that these should go in a written agreement and that significant jobs warrant review by a lawyer.
5. Quality checkpoints: two or three dated checks, what you will review at each, and a fallback if it goes wrong.
</task>

<constraints>
{{> guardrails/scope-discipline}}
- Do not assume subcontracting is allowed; if the client terms are silent or unclear, recommend asking the client.
- Do not draft final legal clauses; list terms to agree and point to a written agreement and legal review where stakes are high.
- Do not invent rates, deadlines or contract wording.
{{> output/uncertainty}}
</constraints>

<output_format>
## Can you subcontract this
Verdict line, then bullets.

## Money check
Calculation table and a verdict.

## Brief
Ready to send, with headed sections.

## Terms to agree
Checklist.

## Quality checkpoints
Table: date | what you check | fallback.
</output_format>
