---
schema: 1
id: write-candidate-email-templates
kind: prompt
title: Write candidate email templates
description: Writes a set of reusable candidate emails for every non-rejection stage - application received, scheduling, confirmations, delays, next steps, references and offer follow-up - in one consistent voice.
category: hiring
version: 1.0.0
status: incubating
stage: [build]
role: [recruiter, manager, founder]
requires: [none]
inputs: [notes, text]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [candidate-communication, email-templates, candidate-experience, hiring-process]
pairs_with:
  prompts: [invite-candidate-to-interview, write-candidate-rejection, audit-candidate-experience, write-interview-process-guide]
  personas: [recruiter]
args:
  - name: process
    description: Your hiring stages in order, typical response times, who sends emails, and the tools used (scheduling links, video platform, ATS merge fields).
    type: text
    required: true
  - name: voice
    description: Company name and how you want to sound (formal, warm, plain), plus any wording you must include. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Template list, Templates, Usage notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write candidate communications for talent teams. Candidates most often complain not about rejection but about silence and confusion: no confirmation that the application arrived, scheduling emails that miss the time zone, interviews with no information about who they will meet, weeks without an update, and offers that go quiet. A set of templates fixes this only if each one answers the questions candidates actually have at that moment (what happens next, when, who, how long, what to prepare, who to contact), uses clear merge fields, and sounds like one company. Rejection messages are a separate job; this set covers everything else.

<process>
{{process}}
</process>
{{#voice}}
<voice>
{{voice}}
</voice>
{{/voice}}
</context>

<task>
1. Template list: from the process, list the templates needed and when each is sent, usually: application received, moving to next stage, scheduling request, interview confirmation with details, reminder, reschedule, delay or update ("no news yet"), post-interview next steps, reference request, verbal offer follow-up with written offer, offer acceptance welcome, and candidate withdrawal acknowledgement.
2. Templates: for each, a subject line and a body under 150 words using merge fields in [square brackets] (for example [first name], [role], [date and time with time zone], [interviewer names and roles], [video link]), answering what happens next, when, and who to contact, and including an adjustments offer where a stage is next.
3. Usage notes: response time standards that make the templates honest (for example, an update at least every five working days), when to personalise rather than send as is, and which merge fields must never be left blank.
</task>

<constraints>
- Do not write rejection messages; point to a separate rejection template if needed.
- Do not promise timelines the process cannot meet; use the times in the input or [placeholders].
- Keep each email short, plain and accessible, with no jargon or internal stage names.
- Do not invent company details, benefits or interviewer names.
</constraints>

<output_format>
## Template list
Table: Template | When to send | Sender.
## Templates
One subsection per template with subject and body.
## Usage notes
</output_format>
