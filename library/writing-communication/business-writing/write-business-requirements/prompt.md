---
schema: 1
id: write-business-requirements
kind: prompt
title: Write a business requirements document
description: Writes a business requirements document for a process change or system purchase with goals, scope, current and future state, numbered requirements and acceptance criteria. Use as a business analyst.
category: business-writing
version: 1.0.0
status: incubating
stage: [plan, design]
role: [business-analyst, project-manager, operations-manager, consultant]
requires: [none]
inputs: [notes, text, document]
output: [docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [brd, business-analysis, requirements, acceptance-criteria, moscow, procurement]
pairs_with:
  prompts: [write-project-proposal, write-decision-memo, define-non-functional-requirements]
args:
  - name: initiative
    description: What the initiative is and why, for example "replace the office phone system before the provider ends support in June" or "outsource payroll for 3 countries". Include the business problem and goals.
    type: text
    required: true
  - name: stakeholders
    description: Who sponsors, uses, approves and is affected, with roles, for example "CFO sponsor; 12 payroll staff; HR; works council; IT security".
    type: text
  - name: current_process
    description: How things work today, step by step if possible, with volumes, pain points, costs and errors.
    type: text
    required: true
  - name: constraints
    description: Budget, deadlines, policies, regulations, existing contracts, systems that must be kept, and anything already decided.
    type: text
output_contract:
  format: markdown
  sections: [Business requirements document, Open questions, Requirements quality check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A business requirements document (BRD) says what the business needs and how it will know the need is met, before anyone chooses a vendor or designs a solution. It is the document procurement, suppliers and approvers read, so ambiguity in it becomes cost later: change requests, disputes about what was promised, and systems that pass a demo but fail on the warehouse floor. Business analysis practice (the BABOK guide is the common reference) asks for requirements that are tied to a business objective, solution-neutral (what, not which product), unambiguous, testable, prioritised and traceable to a stakeholder. Words like "user-friendly", "fast", "flexible" or "seamless" are not requirements until they carry a measure. This prompt covers business processes and system purchases outside software development: phone systems, outsourcing, facilities, fleet, finance processes.
</context>

<task>
Write a business requirements document for this initiative.

<initiative>
{{initiative}}
</initiative>

<current_process>
{{current_process}}
</current_process>
{{#stakeholders}}
<stakeholders>
{{stakeholders}}
</stakeholders>
{{/stakeholders}}
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. If the business problem or the current process is too thin to derive needs from (no steps, volumes or pain points), ask up to four specific questions and stop.
2. If the initiative names a solution as the goal ("buy product X"), restate the underlying business need, record the named product as a constraint or a candidate, and keep the requirements solution-neutral.
3. Write the BRD with these sections:
   1. Purpose and background: the problem in two or three sentences, with figures from the input.
   2. Business objectives: two to five objectives, each measurable (metric, baseline, target, date) where the input allows; otherwise `[NEEDED: target]`.
   3. Scope: in scope and out of scope as bullet lists; out of scope is as important as in.
   4. Stakeholders: a table with stakeholder, role (sponsor, approver, user, consulted, informed), interest and how they are affected.
   5. Current state: the process as numbered steps with volumes and pain points.
   6. Future state: the process as it should work, at the same level of detail, without naming a product.
   7. Business requirements: a table with ID (BR-01…), requirement as a "The solution shall…" statement, priority (Must, Should, Could, Won't for now), source stakeholder, rationale linked to an objective, and acceptance criterion (a concrete, testable condition).
   8. Non-functional and service requirements: availability and support hours, capacity and volumes, security and data protection, retention and audit, accessibility, training, transition and exit (data return, notice), each with a measure.
   9. Assumptions, constraints and dependencies.
   10. Risks: the main risks with likelihood, impact and mitigation.
   11. Approval: who signs off.
4. Number every requirement once and keep each to one testable need; split compound ones.
</task>

<constraints>
- Use only facts given; never invent volumes, costs, dates, regulations or stakeholder positions. Mark gaps `[NEEDED: …]` and list them under Open questions.
- Requirements are solution-neutral: no product names, vendors or design choices inside requirement statements.
- Every requirement has a measurable or observable acceptance criterion; reject vague words (fast, easy, intuitive, robust) unless quantified.
- Where data protection, employment, accessibility or sector rules plausibly apply, add a requirement to confirm compliance with the named area and mark it for legal or compliance review, without stating what a specific law requires.
- Concise: tables over prose; no padding sections that have no content (write "None identified").
</constraints>

<output_format>
## Business requirements document
The BRD with the numbered sections above.
## Open questions
Numbered questions, each with who can answer it.
## Requirements quality check
A short list of any requirement that is still vague, compound, untestable or not traced to an objective, with the fix, or "All requirements pass".
</output_format>
