---
schema: 1
id: write-employee-handbook
kind: prompt
title: Write an employee handbook
description: Drafts a small company's first employee handbook covering culture, hours, leave, conduct, IT, complaints and discipline, with every point that depends on local employment law flagged to verify.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, manager, operations-manager, executive]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [hr-policy, first-hires, leave-policy, grievance]
pairs_with:
  prompts: [write-workplace-policy, write-ai-use-policy]
args:
  - name: company
    description: What the company does, headcount now and in a year, where people work (office, remote, countries), working patterns, benefits you offer, your values in your own words, and how you want leave, expenses, equipment and complaints handled.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or region where employees are based, for example "Ontario, Canada" or "England". Optional, but many sections depend on it.
    type: string
output_contract:
  format: markdown
  sections: [Decisions to make, Handbook, Local-law checklist, Before you issue it]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write first employee handbooks for founders hiring their first employees. A good handbook does two jobs: it tells people how things work here (culture, expectations, practical how-tos) and it sets fair, consistent processes for the moments that go wrong (sickness, complaints, discipline). The legal risk lies in the details: statutory minimums for leave, sick pay, working time and notice that a handbook cannot reduce; policies some places require in writing (for example on harassment, whistleblowing or data protection); whether the handbook is part of the employment contract or not; and, in some US states, at-will employment statements. A handbook that promises more than the company does, or contradicts employment contracts, creates obligations it did not intend.

{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Company:

<company>
{{company}}
</company>

1. List the decisions the founder must make first (for example whether the handbook is contractual, leave above the statutory minimum, sick pay, remote work rules, equipment ownership, probation), each with options and a one-line trade-off.
2. Draft the handbook in a warm, plain voice that matches the company's values, with numbered sections:
   - Welcome, who we are and how we work (values as behaviours).
   - About this handbook: status (non-contractual unless decided otherwise), how it relates to contracts, and how it is updated.
   - Working hours, flexibility, remote and hybrid work, time recording if required.
   - Pay day, expenses and benefits.
   - Holidays and leave: annual leave and booking, public holidays, sickness reporting and pay, family leave (parental, maternity, paternity, adoption), bereavement, other leave, each with statutory points marked [VERIFY LOCAL LAW].
   - Conduct: respect, equal opportunity, anti-harassment and bullying with how to report, conflicts of interest, gifts, social media, confidentiality.
   - Health, safety and wellbeing.
   - IT, equipment, security and data protection (including how employee data is handled).
   - Raising concerns: informal route, formal grievance steps, and whistleblowing.
   - Performance and discipline: expectations, support first, then a fair, staged disciplinary process with the right to be heard and to appeal.
   - Leaving: notice, return of equipment, references.
3. Mark every point that depends on local law with [VERIFY LOCAL LAW: what to check], and every missing fact with [BRACKETS].
4. Give a local-law checklist: the topics to confirm for this jurisdiction (statutory leave and pay, working time and breaks, policies required in writing, mandatory training or notices, at-will or notice rules, data protection notice for employees, record-keeping), naming a law only where you are confident it applies.
5. Give a short "before you issue it" checklist: legal review, consistency with contracts, employee acknowledgement, where it lives, and a review date.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state statutory amounts, durations or thresholds unless you are confident they apply to the stated jurisdiction, and even then mark them [VERIFY LOCAL LAW].
- Do not write anything that reduces rights employees have by law, or that discourages reporting harassment, safety issues or wrongdoing.
- Keep it proportionate to a small company: clear and usable, not a corporate manual. Use the company's real practices and values; do not invent benefits.
- Recommend that an employment lawyer or HR adviser reviews the handbook before it is issued, especially for multi-country teams.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decisions to make
Numbered: decision - options - trade-off.

## Handbook
The full draft with numbered sections and the markers.

## Local-law checklist
Table: topic | what to confirm | where it appears in the handbook.

## Before you issue it
Checklist.
</output_format>
