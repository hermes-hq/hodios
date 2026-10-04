---
schema: 1
id: write-construction-rfi
kind: prompt
title: Write a construction RFI
description: Writes a clear request for information on a construction project with one precise question, drawing and specification references, a proposed solution, the impact of a late answer and a due date.
category: operations
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager]
subject: [engineering, construction]
requires: [none]
inputs: [notes, document, image]
output: [docs, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [rfi, request-for-information, design-coordination, drawings, contractors]
pairs_with:
  prompts: [write-construction-change-order, plan-construction-lookahead]
args:
  - name: issue
    description: The problem found - what the drawings or specification say, what is on site, the conflict or missing information, and where (level, gridline, room).
    type: text
    required: true
  - name: references
    description: Drawing numbers with revisions, specification sections, previous RFIs, photos or markups that relate to the issue.
    type: text
    required: true
  - name: needed_by
    description: The date the answer is needed, and the work activity it holds up.
    type: string
    required: true
  - name: proposed_solution
    description: Optional. The solution the contractor or trade suggests, with any cost or time effect it would have.
    type: text
output_contract:
  format: markdown
  sections: [RFI, Checks before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write requests for information (RFIs) for contractors and trades. An RFI asks the designer or contract administrator to clarify or resolve a conflict in the contract documents. Designers answer good RFIs fast: one question per RFI, exact references with revisions, a description of the conflict that quotes what each document says, a question phrased so the answer can be decisive, a proposed solution they can simply approve, and a clear date tied to the work it holds up. Bad RFIs bundle several issues, ask vague questions ("please advise"), or try to obtain a change in scope without going through the change process.

<issue>
{{issue}}
</issue>

<references>
{{references}}
</references>

Answer needed by: {{needed_by}}
{{#proposed_solution}}
<proposed_solution>
{{proposed_solution}}
</proposed_solution>
{{/proposed_solution}}
</context>

<task>
1. If the issue does not say what conflicts with what, or where on the project, ask for that and stop.
2. If the issue contains more than one separate question, write one RFI for the most urgent and list the others as separate RFIs to raise.
3. Write a subject line of a few words that names the element and the location.
4. Describe the issue factually: what each referenced document says (quote the note or dimension where given), what was found on site, and why work cannot proceed as drawn.
5. Ask one precise question that can be answered decisively, for example "Confirm whether the beam bearing at gridline C/4 should be 150 mm as on S-201 rev B or 100 mm as on A-305 rev D."
6. Give the proposed solution, if supplied, or suggest one labelled as for the contractor to confirm, so the designer can reply "approved".
7. State the impact of a late answer in neutral terms: the activity held up and from when. If the answer may change cost or time, say the contractor will notify under the contract's change procedure, without making a claim in the RFI.
8. State the date needed and the reason.
9. List attachments (photos, markups) and the distribution.
10. Before writing the final version, check that the RFI has exactly one question, every reference has a revision where one was supplied, and the date is stated.
</task>

<constraints>
- Neutral, professional tone; no blame for the design team.
- Never invent drawing numbers, revisions, dimensions or specification clauses. Use `[ADD]` for missing references.
- If the issue is really a request to change the scope or specification rather than a clarification, say so in the checks and recommend the change process instead.
- Keep it short enough to read in a minute.
</constraints>

<output_format>
## RFI
A form: RFI number `[ADD]`, Project `[ADD]`, Date, To, From, Subject, References, Issue, Question, Proposed solution, Impact if not answered by the date, Answer needed by, Attachments, Distribution.
## Checks before sending
Bullets, including any further RFIs to raise separately.
</output_format>
