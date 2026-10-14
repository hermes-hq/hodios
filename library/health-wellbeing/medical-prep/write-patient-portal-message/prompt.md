---
schema: 1
id: write-patient-portal-message
kind: prompt
title: Write a message to your clinic
description: Writes a short, clear patient portal or email message to a clinic with the question first, the key facts and the response you need, and checks whether a message is the right route.
category: medical-prep
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
subject: [medicine]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [patient-portal, clinic-message, prescription-refill, test-results, health-communication]
pairs_with:
  prompts: [prepare-doctor-questions, request-medical-records, build-medication-list, explain-lab-results]
  personas: [health-navigator]
args:
  - name: issue
    description: What you need, in your own words, for example "need a repeat of my inhaler", "results in the portal say high potassium and no one has called", "side effects since starting the new tablet", "need a letter for work".
    type: text
    required: true
  - name: facts
    description: Relevant facts such as medicine names and doses, dates, readings, which clinician you saw, your pharmacy. Optional.
    type: text
  - name: recipient
    description: Who it goes to, for example "my GP practice", "cardiology nurse", "my child's paediatrician". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Is a message the right route, Subject line, Message, Shorter version, If you do not hear back]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone write a message to their clinic through a patient portal, app or email. These messages are usually read first by a nurse, administrator or triage team, sometimes after a day or more, and then passed to the right person. Messages that get a quick, useful reply put the request in the first line, stick to one issue, include the facts the reader would otherwise have to look up (exact medicine name and dose, dates, readings, which pharmacy), and say what response is needed and by when. Long narratives, several unrelated questions or a vague "can someone call me" slow things down. Portals are not monitored for emergencies, and some health systems charge for clinical replies to messages.

Issue: {{issue}}
{{#facts}}Facts: {{facts}}{{/facts}}
{{#recipient}}Recipient: {{recipient}}{{/recipient}}
</context>

<task>
1. Is a message the right route: if the issue sounds urgent (new chest pain, breathing difficulty, severe pain, signs of stroke, a severe reaction to a medicine, a child who is very unwell, or thoughts of self-harm), say not to send a message and to call emergency services or the clinic's urgent line now. If it is something that needs examination or a conversation, say a booked appointment may be better and offer the message as a request for one. Otherwise, confirm a message suits it.
2. Subject line: under ten words, stating the type of request ("Repeat prescription: salbutamol inhaler", "Question about blood result from 3 March").
3. Message: under about 150 words. First line: the request or question. Then the essential facts as short lines (what, since when, numbers, what has been tried, medicine name and dose, pharmacy). Then the response needed and by when, with a real reason for any deadline ("I have 3 days of tablets left"). Then the best way and time to reach them. Use [placeholders] for any fact they have not given; never invent doses, dates or results.
4. If they raised several unrelated issues, say so and split them into separate messages or move the rest to an appointment, ordered by importance.
5. Shorter version: a two- or three-line version for systems with a character limit or a contact form.
6. If you do not hear back: when it is reasonable to follow up (often two or three working days, but say to check the clinic's stated response time), a one-line follow-up message, and when to phone instead.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not add symptoms, medicines, doses or history the person did not give.
- Polite and direct; no apologising for bothering the clinic and no demands.
- Do not include identifiers such as date of birth or ID numbers unless the person says the system needs them; the portal usually already knows who they are.
- Do not suggest what diagnosis or treatment to ask for; the message asks, the clinician decides.
</constraints>

<output_format>
## Is a message the right route
One to three lines.
## Subject line
## Message
Ready to paste.
## Shorter version
## If you do not hear back
</output_format>
