---
schema: 1
id: request-special-education-assessment
kind: prompt
title: Request a special education assessment
description: Writes a parent's formal request for a special educational needs evaluation or needs assessment, with the concerns, evidence, consent and the statutory timelines to check and track.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [parent]
subject: [law, education-sector]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [special-educational-needs, iep-evaluation, ehc-needs-assessment, learning-support, parent-advocacy, school-request]
pairs_with:
  prompts: [prepare-for-iep-meeting, complain-to-school-about-bullying, appeal-school-place-decision]
args:
  - name: location
    description: Country and state or region, and the school type; who you send the request to and the legal timelines depend on it.
    type: string
    required: true
  - name: child
    description: Your child's age and year, the difficulties you see at home and school (learning, attention, speech, behaviour, social, sensory, physical), how long, any diagnosis or private reports, the support the school has tried, and how your child is doing now.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Who to send it to, Request letter, Evidence to attach, Timelines to track, If the request is refused]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents formally request an assessment of their child's special educational needs. In many systems a written request from a parent triggers legal duties and timelines that a conversation does not: in the US, a written request for an evaluation under special education law starts a process with consent and evaluation timelines; in England, parents can request an education, health and care needs assessment directly from the local authority, which must decide within a set period whether to assess; other countries have their own routes. What parent advocates know: the request must be in writing, dated and sent to the right body (the school district or local authority, not just the class teacher); it should name every area of suspected need, not just the obvious one, because the assessment usually covers only what is asked; it should describe the impact on learning and daily life with concrete examples and attached evidence (school reports, work samples, private assessments, medical letters); and parents should keep a copy with proof of the date, because the deadlines run from receipt. A child does not usually need a diagnosis or to be failing academically to be assessed. You draft; the authority decides.

Location: {{location}}
</context>

<task>
Child:

<child>
{{child}}
</child>

1. Who to send it to: the body that usually receives requests in {{location}} (school district special education office, local authority SEN team, school principal or special education coordinator, or similar), marked "to verify", and the method that gives proof of the date.
2. Draft the request letter: parent and child details as [BRACKETS], a clear sentence that this is a formal written request for an evaluation or needs assessment, every area of suspected need with concrete examples from home and school, support already tried and its effect, the impact on learning, attendance, wellbeing and social life, a statement that the parent consents to the assessment (or asks for the consent form), a request for written acknowledgement and the timeline, and a request that all assessment reports be shared before any meeting.
3. Evidence to attach: school reports and test results, work samples, emails with the school, private or medical reports, attendance records, and a short parent observation diary.
4. Timelines to track: the decision and assessment timelines that commonly apply in {{location}}, marked "to verify", and a tracking table with dates sent, acknowledged, decision due and assessment due.
5. If the request is refused or delayed: ask for the decision and reasons in writing, the usual routes (mediation, appeal to a tribunal or hearing, state complaint, independent evaluation at public expense where available), all marked to verify, and parent advice services.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not suggest a diagnosis for the child; describe observations and ask for assessment.
- Do not invent legal timelines, statute names or authority names; mark them "to verify".
- Keep the tone cooperative and factual; the parent will work with the school for years.
- If the child shows signs of serious distress, self-harm or school refusal, say to involve the child's doctor as well.
{{> output/uncertainty}}
</constraints>

<output_format>
## Who to send it to
Two or three lines marked to verify.

## Request letter
The complete letter with [BRACKETS].

## Evidence to attach
Checklist.

## Timelines to track
Bullets, then a tracking table.

## If the request is refused
Numbered steps marked to verify.
</output_format>
