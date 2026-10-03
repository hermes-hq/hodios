---
schema: 1
id: request-jury-service-deferral
kind: prompt
title: Request a jury service deferral or excusal
description: Writes a request to defer or be excused from jury service with the reason and supporting evidence, in the form the court expects, and lists the deadlines and rules to check.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent, student]
subject: [law]
requires: [none]
inputs: [text, document]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [jury-service, jury-summons, deferral, excusal, court-letter]
pairs_with:
  prompts: [explain-legal-letter, prepare-government-form]
  personas: [legal-information-guide]
args:
  - name: reason
    description: Why you need to defer or be excused - for example exams, booked travel, caring for a child or relative, your own health, a job you cannot leave, or financial hardship - with dates and what evidence you can provide.
    type: text
    required: true
  - name: court_details
    description: Optional. The court name, your juror or summons number, the service dates on the summons, the response deadline, and whether the summons asks you to reply online or by form.
    type: text
  - name: country
    description: Country and state or region of the court, for example "England and Wales" or "New South Wales, Australia". Rules on deferral and excusal differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Deferral or excusal, Rules to check, Request, Evidence to attach, Before you send]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people respond to a jury summons when they cannot serve on the dates given. Jury service is a civic duty and courts generally expect people to serve, so the most successful requests ask for a deferral to specific later dates rather than a full excusal, unless the reason is long-term. Courts commonly distinguish between deferral (moving service to a later date), excusal (being released from this summons) and ineligibility or disqualification (not being allowed to serve at all), and most have a set process: an online form or a reply form on the summons, with a deadline. A short, specific request with evidence works better than a long one. Ignoring a summons can lead to a fine or other penalty in many places.

Court location: {{country}}
</context>

<task>
Reason:

<reason>
{{reason}}
</reason>
{{#court_details}}
<court_details>
{{court_details}}
</court_details>
{{/court_details}}

1. Decide whether this reads as a request to defer, to be excused, or a possible ineligibility question, and explain the choice in two lines. If a deferral would solve the problem, suggest offering specific alternative dates or a period when the person is available.
2. List the rules to check as questions: the response deadline, how to submit (online, form, letter), whether a deferral can be requested only once, what evidence the court expects for this kind of reason, and what happens if the request is refused. Mark any specific rule "to verify on the court's website or the summons".
3. Write the request: short, polite and factual, with the summons or juror number and dates as [BRACKETS] if not given, the reason in two to four sentences, the evidence attached, alternative dates for a deferral, and a request for written confirmation. Make it work both as a letter and pasted into an online form's free-text box.
4. List evidence to attach for this reason (for example an exam timetable, travel booking, a letter from a doctor or employer, proof of caring responsibilities).
5. Give a short before-sending checklist.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given. Do not invent hardships, medical details, bookings or employer statements, and do not exaggerate the reason. A request to a court must be true; a false statement can be an offence.
- Do not promise the request will be granted.
- If the summons response deadline is close or already passed, say to contact the jury office straight away by its listed method.
- Keep health details to the minimum the court needs; a doctor's letter can carry them.
- If the person's question is really about eligibility (for example a criminal record, citizenship or residence), say that the summons or court website lists eligibility rules and that the jury office can confirm, rather than deciding it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Deferral or excusal
Two lines: which to ask for and why.

## Rules to check
Bullets, each a question.

## Request
The complete request, under 200 words.

## Evidence to attach
Bullets.

## Before you send
Checklist: deadline, submission method, evidence attached, copy kept, confirmation received.
</output_format>
