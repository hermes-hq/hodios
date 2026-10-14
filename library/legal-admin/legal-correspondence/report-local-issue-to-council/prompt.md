---
schema: 1
id: report-local-issue-to-council
kind: prompt
title: Report a local issue to the council
description: Writes a report to the council or city about a pothole, fly-tipping, broken streetlight or similar hazard, with exact location, evidence, a reference to chase and escalation steps.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [public-sector]
requires: [none]
inputs: [text, image]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [pothole, fly-tipping, streetlight, local-government, public-hazard, damage-claim]
pairs_with:
  prompts: [complain-to-ombudsman, write-public-records-request, write-formal-letter]
args:
  - name: issue
    description: What the problem is, exactly where (street, nearest house number or landmark, which side of the road, lane or pavement), how big or how long it has been there, and why it matters (danger, blocked access, smell).
    type: text
    required: true
  - name: history
    description: Optional. Earlier reports and reference numbers, replies received, any injury or damage caused (for example a tyre damaged by a pothole) and the date it happened.
    type: text
  - name: location
    description: Country and the town, city or county. Who is responsible and the claim rules vary.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Who is responsible, Report, Evidence to gather, If nothing happens, Damage claim]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a resident report a problem in a public place so it gets fixed. Reports get lost or deprioritised for predictable reasons: the location is vague, the report goes to the wrong body (a motorway or main road may belong to a national or regional highways body, a private road or car park to its owner, a streetlight or drain to a contractor or utility), the hazard is not described against what councils prioritise (depth or size of a defect, danger to cyclists or pedestrians, blocked access for wheelchairs or buggies), or nobody keeps the reference number to chase. Most councils and cities have an online reporting form or app, which is usually faster than a letter; the written text should still be precise because a crew may read only that. Where a defect has already caused damage or injury, the report also becomes evidence: councils in many places defend claims by showing they inspected the road and responded within their policy, so a dated earlier report can matter. Claims for pothole damage often have short notice periods and need photos with a measure for scale.

Location: {{location}}

<issue>
{{issue}}
</issue>

{{#history}}
<history>
{{history}}
</history>
{{/history}}
</context>

<task>
1. Say which body is likely responsible for this kind of issue at this kind of location (local council, city department, regional or national roads body, utility, landowner) and how to confirm it, marked "[to verify]". Point to the official reporting channel type (online form, app, phone line for emergencies).
2. Write the report text: a clear one-line summary, exact location with a landmark, precise enough for a crew who has never been there, the hazard and who it affects, size or dimensions if known, how long it has been there, and a request for a reference number and expected repair time. Under 150 words so it fits most online forms.
3. List evidence to gather: dated photos from near and far, a tape measure or coin for scale, the date and time, and any earlier reference numbers.
4. If the issue is urgent (exposed wiring, missing drain cover, a defect likely to cause an accident), say to use the emergency line and not just the online form.
5. Give an escalation path if nothing happens: chase with the reference after the stated response time, a written complaint through the formal complaints process, the local elected representative, and the ombudsman as a last step.
6. If damage or injury happened, add a short damage claim section: what to record now, the notice period to check, receipts and repair quotes to keep, and a request for the road's inspection records. Draft a short notice of claim if the history shows damage.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent which department is responsible, response times, claim deadlines or repair standards; mark them "[to verify]".
- Do not exaggerate the hazard or the damage.
- For fly-tipping, tell the person not to touch or move suspicious or hazardous waste and not to confront anyone dumping it.
- Keep the report factual and polite; the reader is often a crew or a call handler, not the decision maker.
{{> output/uncertainty}}
</constraints>

<output_format>
## Who is responsible
Two or three lines marked "[to verify]".

## Report
The ready-to-paste text.

## Evidence to gather
Checklist.

## If nothing happens
Numbered escalation steps.

## Damage claim
Only if damage or injury is mentioned: steps and a short draft notice. Otherwise one line saying it does not apply.
</output_format>
