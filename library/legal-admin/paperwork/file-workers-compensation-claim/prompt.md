---
schema: 1
id: file-workers-compensation-claim
kind: prompt
title: File a workers' compensation claim
description: Guides a workplace injury or work-related illness claim - reporting it, medical records, claim forms, deadlines, wage loss and what to do if the employer or insurer disputes it.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, plan, message]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [workers-compensation, workplace-injury, injury-claim, occupational-illness, claim-denial]
pairs_with:
  prompts: [write-personal-injury-claim-letter, request-medical-leave-from-work, find-free-legal-help]
args:
  - name: injury
    description: What happened, the date and time, where at work, what you were doing, the injury or illness, any witnesses, and whether you got medical treatment and where.
    type: text
    required: true
  - name: reporting
    description: Who you have told so far and when, whether an accident report was made, what your employer said, and any time off work so far.
    type: text
    required: true
  - name: location
    description: Country and state, province or region. Workers' compensation schemes and deadlines are set locally.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Do these now, Report to your employer, Medical care and records, The claim, Money while you are off, If the claim is disputed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a worker claim for an injury or illness caused by work. Many countries have a no-fault workers' compensation or employment injury scheme run through employer insurance or a state body: the worker usually does not need to prove the employer was negligent, but must report the injury to the employer and file a claim within set deadlines, sometimes very short for the first report. Elsewhere, compensation runs through state injury benefits plus a negligence claim against the employer. Claims are most often denied or delayed for avoidable reasons: late reporting, no written record of the report, medical notes that do not say the injury happened at work, gaps in treatment, inconsistent descriptions of how it happened, or a pre-existing condition the insurer blames. Gradual injuries (repetitive strain, back problems, hearing loss, occupational disease) are often claimable but need the link to work documented. Some schemes require using an approved doctor; some bar suing the employer if a claim is made. Retaliation for claiming is unlawful in many places.

Location: {{location}}

<injury>
{{injury}}
</injury>

<reporting>
{{reporting}}
</reporting>
</context>

<task>
1. Put first anything urgent: getting medical care if not yet done, and reporting to the employer in writing if not yet done, with the reporting deadline marked "[to verify]".
2. Draft a short written injury report to the employer: date, time, place, what the worker was doing, how the injury happened, body parts affected, witnesses, treatment received, and a request that it be recorded and a claim form provided. Use only facts given, consistent wording, no speculation on fault.
3. Explain medical care and records: tell every clinician the injury happened at work, ask that the notes say so, keep appointments, keep receipts and mileage, whether an approved or employer-chosen doctor may be required, marked "[to verify]".
4. Explain the claim: which body or insurer usually handles it in {{location}}, the forms, the deadline to file, what the employer must do, and what to keep copies of. Mark all of it "[to verify]".
5. Explain money while off: wage replacement and its usual waiting period, sick pay interaction, medical costs, and that figures must be checked.
6. Explain disputes: get the denial reasons in writing, the appeal or hearing route and its deadline, the value of a workers' compensation lawyer or union rep (many work on contingency or free initial consults), and what retaliation looks like and how to record it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state deadlines, benefit rates or which body handles claims as fact; mark them "[to verify]" and name the type of official source.
- Never exaggerate the injury, invent witnesses or hide a prior condition; insurers check records and inconsistency is the main reason claims fail.
- If the injury is serious, or the employer refuses to report it, pressures the worker not to claim or threatens their job, recommend a workers' compensation lawyer or union promptly.
- If symptoms are getting worse (head injury, numbness, chest pain), say to seek urgent medical care first.
{{> output/uncertainty}}
</constraints>

<output_format>
## Do these now
Numbered list.

## Report to your employer
The draft report.

## Medical care and records
Checklist.

## The claim
Numbered steps with deadlines marked "[to verify]".

## Money while you are off
Bullets.

## If the claim is disputed
Numbered steps.
</output_format>
