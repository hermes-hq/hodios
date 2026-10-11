---
schema: 1
id: prepare-permit-renewal
kind: prompt
title: Prepare a residence permit renewal
description: Plans renewing a residence permit or visa from inside the country, with the application window, what changed since the last grant, evidence of continued eligibility and gap-in-status risks.
category: immigration
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker, student, parent]
subject: [law]
requires: [none]
inputs: [text, document]
output: [plan, checklist, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [permit-renewal, visa-extension, continuous-status, application-window, change-of-employer]
pairs_with:
  prompts: [understand-residence-permit-conditions, report-change-of-circumstances, write-immigration-status-enquiry, prepare-for-immigration-appointment]
args:
  - name: permit
    description: The permit or visa you hold, the country, its expiry date, and the conditions on it (paste the annotations if you can, without ID numbers).
    type: text
    required: true
  - name: changes
    description: What has changed since it was granted, for example new employer or role, salary change, new address, new child, separation, time abroad, a new course, unemployment, benefits claimed, police matters. Write "nothing" if nothing changed.
    type: text
    required: true
  - name: goal
    description: Whether you want the same permit again, a different type, or to move to permanent residence if eligible. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Key dates, What changed and why it matters, Evidence checklist, Timeline, Status while you wait, Risk points, Questions for an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Renewals are where people lose status by accident. The commonest problems: applying too late (some systems give continued permission only if the application is made before expiry, others require it within a window, and appointment waiting lists can exceed the time left), assuming nothing changed when a new employer, a role or salary change, a separation or long absences change eligibility or need a new kind of permit, not having reported changes during the permit, and travelling while the renewal is pending when that can abandon the application or block re-entry. A renewal is assessed on the facts at the time of the new application, so the evidence must show continuing eligibility now, not two years ago.

<permit>
{{permit}}
</permit>

<changes>
{{changes}}
</changes>
{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. Key dates: expiry, the earliest and latest typical application dates for this kind of permit (marked to confirm on the official source), and whether appointment waits make an earlier start wise. If the permit expires within six weeks or has expired, say first to contact the authority and a regulated adviser or free legal service now.
2. What changed and why it matters: for each change, whether it may affect eligibility, require a different permit type, or need reporting first, marked to confirm. If the goal is a different permit or permanent residence, say what usually differs and that eligibility must be confirmed.
3. Evidence checklist: documents that commonly show continuing eligibility for this permit type now (employment, income, study enrolment, relationship, address, insurance, tax and social security records, time abroad), each to confirm.
4. Timeline: backwards from expiry, with lead times for documents and appointments.
5. Status while you wait: what commonly happens to the right to live, work and travel while a timely application is pending, marked to confirm, with a clear warning not to travel or change employer before confirming.
6. Risk points: gaps in status, unreported changes, absences, benefits, criminal matters, each with why it matters.
7. Questions for an adviser or the authority.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state application windows, fees, processing times or continued-permission rules as fact; mark them to confirm.
- Never predict whether the renewal will be granted.
- Never suggest hiding a change, an absence or a record.
- Keep personal identifiers out.
{{> output/uncertainty}}
</constraints>

<output_format>
## Key dates
Table: Date | What | Confirm on official source.
## What changed and why it matters
## Evidence checklist
Table: Document | Shows | Status.
## Timeline
## Status while you wait
## Risk points
## Questions for an adviser
</output_format>
