---
schema: 1
id: answer-farm-audit-findings
kind: prompt
title: Answer farm audit findings
description: Writes corrective action responses to farm audit or inspection findings with root cause, fix, evidence and date for each, in a form an auditor accepts and without admitting more than the finding says.
category: farming
version: 1.0.0
status: incubating
stage: [review, operate]
role: [founder, individual, operations-manager]
subject: [agriculture]
requires: [none]
inputs: [document, notes, text]
output: [table, message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [corrective-action, non-conformance, root-cause, audit-response, farm-inspection]
pairs_with:
  prompts: [prepare-farm-assurance-audit, plan-livestock-record-keeping]
args:
  - name: findings
    description: The findings exactly as written in the audit or inspection report, with their reference numbers, grades and the deadline for responses.
    type: text
    required: true
  - name: actions_taken
    description: Optional. What you have already done or plan to do for each finding, and what evidence you have (photos, invoices, training certificates, new record sheets).
    type: text
output_contract:
  format: markdown
  sections: [Summary, Responses, Evidence to gather, Findings to query, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a farmer answer audit or inspection findings so they are closed first time. Responses get rejected when they only promise to "be more careful", when they fix the one example the auditor saw but not the system that let it happen, when there is no evidence, or when the date is vague. They cause trouble when the farmer, trying to be helpful, admits to more than the finding says or argues in an angry tone. A good response for each finding restates it exactly, gives the root cause as a system gap rather than blaming a person, separates the immediate correction from the action that stops it happening again, names the evidence that proves it, and gives an owner and a date.
</context>

<task>
<findings>
{{findings}}
</findings>

{{#actions_taken}}
<actions_taken>
{{actions_taken}}
</actions_taken>
{{/actions_taken}}

1. For each finding, quote the reference and the finding exactly, with its grade.
2. Root cause: ask "why" until you reach a system cause (no procedure, no reminder, wrong place, no training, unclear responsibility). Use the farmer's information; where the cause is not known, write a draft marked `[CONFIRM]`.
3. Correction: what was done to fix the instance found, with the date.
4. Corrective action: the change that prevents recurrence (a record sheet, a calendar reminder, a lock, a training session, a check by a named person), proportionate to the grade.
5. Evidence: the specific item that proves it (dated photo, invoice, signed training record, completed sheet for the last weeks), and how it will be sent.
6. Owner and completion date, inside the response deadline if one was given.
7. Keep each response within the finding's scope: do not volunteer other problems or admit causes not established.
8. If a finding looks wrong (the record existed, the standard was misread), draft a short, polite query with the evidence, and say to check the scheme's appeal or query process and its deadline.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never draft responses that claim actions not taken or evidence that does not exist, and never suggest creating or backdating records. If an action is planned, say "will" with a date.
- Factual, calm and brief: no apology essays, no blame on staff by name, no argument in the responses themselves.
- Animal health and welfare findings should involve the farm's vet where the corrective action is clinical; say so.
- For enforcement findings from a government inspector (not a scheme), say that legal advice may be wise before replying.
- If the findings text is missing, ask for it and stop.
</constraints>

<output_format>
## Summary
Two to four lines: number of findings by grade, response deadline, what still needs doing.

## Responses
One block per finding, ready to paste into the scheme's form:
**Ref [no.] - [grade]**: finding quoted.
- Root cause:
- Correction (done):
- Corrective action (to prevent recurrence):
- Evidence:
- Owner and date:

## Evidence to gather
Checklist of every evidence item with who gets it and by when.

## Findings to query
Draft query text for any disputed finding, or "None".

## Questions
Every `[CONFIRM]` item.
</output_format>
