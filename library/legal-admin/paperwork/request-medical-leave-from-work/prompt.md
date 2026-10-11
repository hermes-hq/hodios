---
schema: 1
id: request-medical-leave-from-work
kind: prompt
title: Request medical or family leave from work
description: Guides requesting medical or family leave, such as FMLA in the US, covering eligibility, notice, certification forms, pay sources and job protection to verify.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, message, plan]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [medical-leave, family-leave, fmla, sick-leave, job-protection, leave-request]
pairs_with:
  prompts: [plan-phased-return-after-sick-leave, object-to-contract-change-at-work, write-discrimination-complaint]
args:
  - name: reason
    description: Why you need leave in general terms (your own surgery or illness, a new child, caring for a seriously ill relative, mental health treatment), the expected start date and how long, and whether it is continuous or on and off.
    type: text
    required: true
  - name: job
    description: Employer size if known, how long you have worked there, hours per week, full or part time, and what your contract or handbook says about sick or family leave.
    type: text
    required: true
  - name: location
    description: Country and state, province or region where you work. Leave rights and pay schemes vary a lot.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Leave you may be entitled to, How you will be paid, Notice and paperwork, Request to your employer, Protecting your job, Questions to ask HR]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an employee request time off for their own health or to care for family. Leave rights usually come in layers that people confuse: job-protected leave (the right to come back to your job, sometimes unpaid, such as FMLA in the United States for eligible employees of covered employers), pay during leave (statutory sick pay, a state disability or paid family leave insurance scheme, or employer sick pay), and the employer's own policy, which can be more generous than the law. Eligibility often depends on employer size, length of service and hours worked in the last year. Leave can sometimes be taken intermittently or as reduced hours. Employees lose protection in predictable ways: not giving notice as soon as practicable, not returning the medical certification by the deadline, using vague wording that does not tell the employer the leave may be for a qualifying reason, or assuming their employer's HR will tell them every option. Employers are usually entitled to medical certification, not full medical records; the diagnosis itself often need not be disclosed to the manager. Disability rights to reasonable adjustments can apply alongside leave rights.

Location: {{location}}

<reason>
{{reason}}
</reason>

<job>
{{job}}
</job>
</context>

<task>
1. List the kinds of leave that may apply in {{location}} for this reason (job-protected leave, statutory sick or family leave, state insurance schemes, employer policy, disability adjustments), each with its usual eligibility test answered from the facts given or marked "[to confirm]". Mark legal rules "[to verify]".
2. Explain how pay may work during the leave: which sources might pay, whether they can be combined, waiting periods, and whether paid time off must or can be used first, as points to check.
3. Set out notice and paperwork: when to tell the employer, who to tell (manager and HR), the certification forms a doctor or provider usually completes, the usual deadline to return them, and which state or insurer claim forms may be separate.
4. Draft a short written leave request to the manager and HR: that leave is needed for a serious health condition or family reason (without unnecessary medical detail), dates or expected duration, whether intermittent, a request for the forms and a written reply about the type of leave and pay, and handover availability. Under 200 words.
5. Explain how to protect the job: keep copies of everything, confirm the leave designation in writing, what to do about benefits such as health insurance during leave, return-to-work and fitness-for-work steps, and signs of retaliation to note.
6. List questions to ask HR.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state eligibility thresholds, durations, pay rates or deadlines as fact; mark them "[to verify]" and name the type of official source to check.
- Do not advise sharing more medical detail than certification requires.
- If the person describes being refused leave, threatened or dismissed for asking, say to get advice from an employment lawyer, union or labour agency quickly because time limits can be short.
- If the leave is for the person's own mental health crisis and they mention being unsafe, point to urgent help before anything else.
{{> output/uncertainty}}
</constraints>

<output_format>
## Leave you may be entitled to
Table: Type | Usual test | Your situation | To verify.

## How you will be paid
Bullets.

## Notice and paperwork
Checklist with deadlines marked "[to verify]".

## Request to your employer
The draft.

## Protecting your job
Bullets.

## Questions to ask HR
Numbered list.
</output_format>
