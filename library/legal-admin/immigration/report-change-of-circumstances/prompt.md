---
schema: 1
id: report-change-of-circumstances
kind: prompt
title: Report a change of circumstances to immigration
description: Works out whether a change such as a new job, address, separation, birth or long trip must be reported to the immigration authority or sponsor, by when, and drafts the notification with its evidence.
category: immigration
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, parent, student, job-seeker]
subject: [law]
requires: [none]
inputs: [text, document]
output: [checklist, message, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [change-of-circumstances, reporting-duties, sponsor-notification, address-change, status-maintenance]
pairs_with:
  prompts: [understand-residence-permit-conditions, prepare-permit-renewal, write-immigration-status-enquiry]
args:
  - name: change
    description: What changed and when, for example "changed employer on 1 March", "moved city", "we separated", "baby born", "dropped to part-time study", "will be abroad 4 months".
    type: text
    required: true
  - name: permit
    description: The country, the permit or visa you hold, and its conditions or annotations (without ID numbers). Include whether an employer, university or family member sponsors you.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Urgent check, Who may need to know, Deadlines to confirm, Draft notification, Evidence to attach, Questions for an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Permit holders often have duties to report changes, sometimes within days or weeks, and their sponsors (employers, universities, family members) often have their own reporting duties too. Changes that commonly matter include a new employer or role, a salary drop, stopping or changing studies, a new address, a relationship ending, a birth, long absences, a new passport, and criminal charges. Some changes only need a notification; others mean the current permit no longer fits and a new application is needed before the change takes effect (for example starting with a new employer on an employer-tied permit). The usual mistake is acting first and asking later. Reporting late is usually better than not reporting, but the consequences depend on the country and route.

<change>
{{change}}
</change>

<permit>
{{permit}}
</permit>
</context>

<task>
1. Urgent check: if the change may already have broken a permit condition (for example working for a new employer without permission, or a study break that the sponsor must report), say so first and recommend contacting a regulated adviser or free legal service promptly, before notifying, so the notification is accurate.
2. Who may need to know: the immigration authority, the sponsor (employer, university, family sponsor), the local registration office, and other bodies, each with why, marked "typical, confirm".
3. Deadlines to confirm: any reporting window that commonly applies, never as fact, and the date of the change so the user can check it.
4. Draft notification: a short factual message or form-answer text with placeholders for reference numbers, stating what changed, when, and the evidence attached, without admissions beyond the facts and without speculation.
5. Evidence to attach: the documents that usually prove the change.
6. Questions for an adviser, including whether a new application is needed rather than a notification.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never suggest not reporting a change that may need reporting, or misdating it.
- Do not state reporting deadlines or consequences as fact; mark them to confirm.
- If the change involves domestic abuse, separation from an abusive sponsor or a safety risk, put safety first and mention that some systems have protections for people in that position, to confirm with an adviser.
- Keep identifiers out; use placeholders.
{{> output/uncertainty}}
</constraints>

<output_format>
## Urgent check
## Who may need to know
Table: Who | Why | How | Confirm.
## Deadlines to confirm
## Draft notification
## Evidence to attach
## Questions for an adviser
</output_format>
