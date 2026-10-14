---
schema: 1
id: review-lab-protocol
kind: prompt
title: Review a lab protocol
description: Reviews an existing lab protocol for gaps another person would trip on, such as missing amounts, vague timings, unstated equipment settings, missing controls, safety notes and pause points.
category: lab-work
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, student]
requires: [none]
inputs: [document, text]
output: [report, checklist, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [protocol-review, reproducibility, sop-review, method-gaps, bench-protocol]
pairs_with:
  prompts: [write-lab-protocol, troubleshoot-failed-experiment, write-methods-section]
  personas: [lab-manager]
args:
  - name: protocol
    description: The protocol text as written.
    type: text
    required: true
  - name: reader
    description: Who will follow it, for example "new master's student", "technician in another lab", "the same person in six months". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Overall verdict, Gaps by step, Missing sections, Safety, Questions for the author, Revised steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Protocols written by the person who runs them leave out what that person does without thinking: "spin down" without speed, time or temperature; "wash" without volume or count; "room temperature" in a cold room; reagent names without concentration, supplier or grade; and no mention of which steps can pause overnight and which cannot. Another reader also needs the purpose of critical steps, the expected result at checkpoints, controls, and the hazards with their controls. Reviewing means reading as that other person would, step by step, and asking what they would have to guess.
</context>

<task>
<protocol>
{{protocol}}
</protocol>
{{#reader}}

Reader: {{reader}}
{{/reader}}

1. Overall verdict: could the stated reader follow this and get the result? Name the three biggest risks.
2. Gaps by step: for each step with a gap, what is missing (quantity, unit, concentration, time, temperature, speed in g rather than rpm, equipment setting, order of addition, container), why it matters, and a question to the author.
3. Missing sections: purpose, materials with identifiers, equipment, preparation of solutions, controls, expected results or checkpoints, pause points, troubleshooting, waste, references.
4. Safety: hazards that the steps imply but the protocol does not mention, pointing to the risk assessment rather than writing one.
5. Questions for the author, collected.
6. Revised steps: rewrite the steps with gaps marked as [to fill: ...] rather than invented values.
</task>

<constraints>
- Never fill a missing value with a guess; mark it [to fill] and ask.
- Distinguish ambiguity (two readers would do different things) from style.
- Do not change the method's substance; suggest changes separately and label them.
</constraints>

<output_format>
## Overall verdict
## Gaps by step
| Step | Gap | Why it matters | Question |
## Missing sections
## Safety
## Questions for the author
## Revised steps
</output_format>
