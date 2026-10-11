---
schema: 1
id: appeal-school-place-decision
kind: prompt
title: Appeal a school place decision
description: Prepares a parent's appeal against a refused school place or transfer, testing the admission decision against the published rules and writing the appeal statement with evidence and hearing notes.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [plan, build, ship]
role: [parent]
subject: [law, education-sector]
requires: [none]
inputs: [document, text]
output: [message, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [school-admissions, admission-appeal, school-place, parent-advocacy, appeal-hearing]
pairs_with:
  prompts: [write-public-records-request, appeal-benefits-decision]
args:
  - name: decision
    description: The refusal letter or notice - the school, the year group, the reason given, the oversubscription criterion you were placed under, the appeal deadline and how to appeal.
    type: text
    required: true
  - name: your_case
    description: Why this school matters for your child - distance, siblings, medical or special educational needs, faith, transport, the effect of the allocated school - and the evidence you hold. Also anything that may have gone wrong in how the application was handled.
    type: text
    required: true
  - name: country
    description: Country and region or school district. Admission and appeal rules differ widely. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Deadline and route, How the decision can be challenged, Appeal statement, Evidence to gather, Hearing notes, Other options]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a parent appeal a refused school place. In many systems an independent appeal panel asks two questions: whether the admission arrangements were lawful and applied correctly to this child (wrong distance measurement, a sibling or medical criterion ignored, an application lost), and, if not, whether the child's need to attend this particular school outweighs the harm to the school of admitting one more pupil. Class-size limits for the youngest years can narrow the grounds sharply in some places. Parents lose appeals when they argue about the allocated school in general terms, or present reasons many families share ("it's the best school", "it's close"); they win more often with specific, evidenced needs this school meets and others do not (a specialist unit, a medical consultant's letter, a documented childcare or transport problem), and with errors in how their application was handled. Elsewhere, decisions go to a district review, a ministry or an education ombudsman.

{{#country}}Country and region: {{country}}{{/country}}
</context>

<task>
Decision:

<decision>
{{decision}}
</decision>

Your case:

<case>
{{your_case}}
</case>

1. State the appeal deadline and route from the letter, as a calendar date where possible, marked "verify". Advise accepting the allocated place meanwhile (in many systems this does not harm the appeal) and joining the waiting list, as points to confirm.
2. Explain how the decision can be challenged here: errors in applying the published criteria (check the criterion, the distance and how it was measured, sibling and medical priority, late or lost application), and the child's individual case. Say which seem relevant from the facts and what to request (the published arrangements, the ranking or distance data, the school's capacity case) to test them.
3. Write the appeal statement: child's name and the school as [BRACKETS]; the grounds in order of strength; for each, the facts and the evidence enclosed; why this school specifically meets the child's needs; the effect of the allocated school; and a clear request.
4. Evidence to gather: letters from doctors, therapists or social workers on letterhead stating the need and why this school meets it, proof of address, sibling details, timetable or journey evidence, and any correspondence about the application.
5. Hearing notes: what usually happens, a two-minute opening summary, questions to ask the admissions authority about their case, and how to stay calm and focused on the child.
6. Other options if the appeal fails: waiting list position, other schools with places, a complaint about process to an ombudsman or regulator, all marked "verify".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent admission criteria, class-size rules, code or law names, deadlines or distances. Use what the letter and the parent supply and mark the rest "verify".
- Do not exaggerate or invent needs, medical conditions or addresses; misrepresenting an address can lead to a place being withdrawn. If the input suggests that, say so plainly.
- Do not predict the outcome.
- Keep the statement focused on this child; no criticism of other families or named staff.
- If the child has special educational needs or a disability plan, note that placement may follow a separate statutory route, and suggest a specialist parent advice service.
{{> output/uncertainty}}
</constraints>

<output_format>
## Deadline and route
Bullets with dates marked verify.

## How the decision can be challenged
Table: possible ground | does it seem to apply | what to request or check.

## Appeal statement
Complete statement with [BRACKETS].

## Evidence to gather
Checklist.

## Hearing notes
Opening summary, questions to ask, practical tips.

## Other options
Bullets.
</output_format>
