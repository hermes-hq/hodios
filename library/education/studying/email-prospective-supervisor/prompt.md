---
schema: 1
id: email-prospective-supervisor
kind: prompt
title: Email a prospective supervisor
description: Writes a short first email to a potential PhD or research supervisor that shows real engagement with their work, states a specific fit and asks one clear question. Under 200 words.
category: studying
version: 1.0.0
status: incubating
stage: [build]
role: [student, researcher]
requires: [none]
inputs: [text, resume]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [cold-email, phd-application, academic-outreach]
pairs_with:
  prompts: [plan-phd-application]
args:
  - name: supervisor_work
    description: The supervisor's name and role, and one or two of their papers or projects you have actually read, with what you took from each (a finding, a method, a question it left open).
    type: text
    required: true
  - name: my_background
    description: Your degree, relevant skills, research experience or thesis, and anything that links to their work.
    type: text
    required: true
  - name: research_idea
    description: Your research idea or interest in one or two sentences.
    type: string
    required: true
  - name: ask
    description: Optional. What you want to know (are they taking students for a given start, is an advertised project still open, which funding route they recommend, could you have a short call).
    type: string
output_contract:
  format: markdown
  sections: [Subject lines, Email, Follow-up, Before you send]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A prospective research student wants to email an academic they would like as a supervisor. Busy academics receive many such emails and skim them in seconds. Emails are ignored when they open with flattery ("I am fascinated by your outstanding work"), could have been sent to anyone, are long, attach a full proposal unasked, or end with several vague questions. Emails get answered when the first two lines show the student read something specific and thought about it, the fit is concrete, and there is one easy question to answer.
</context>

<task>
<supervisor_work>
{{supervisor_work}}
</supervisor_work>

<my_background>
{{my_background}}
</my_background>

Research idea: {{research_idea}}
{{#ask}}What I want to ask: {{ask}}{{/ask}}

1. Write two subject lines that name the topic and the purpose (for example "Prospective PhD, 2027 start: grazing and soil carbon").
2. Write the email, under 200 words:
   - Line 1: who the student is in one sentence (degree, institution, stage).
   - Lines 2-3: one specific point from a paper or project the student named, and what it made them think or ask. Use only what the student wrote.
   - Fit: one or two concrete links between the student's skills or experience and the supervisor's work.
   - The idea in one or two sentences, framed as a question, open to the supervisor's view.
   - One clear question (the student's ask, or "Are you taking new students for [start]?" if none is given), and a note that a CV is attached.
   - A plain sign-off.
3. Write a short follow-up for after about ten working days with no reply: two or three sentences, polite, no guilt.
4. Give a pre-send checklist.
</task>

<constraints>
- Never invent or embellish details of the supervisor's papers, findings or projects, or of the student's experience. If the supervisor's work is described too vaguely to say something specific, ask the student for the paper and what they took from it, and leave [specific point] as a placeholder.
- No flattery adjectives (fascinating, outstanding, renowned, esteemed). Respect is shown by specificity.
- Do not attach or paste a full proposal unless the supervisor's page asks for one.
- Plain, polite, international English; no slang.
- Keep it under 200 words; count before answering.
- If asked for one generic email to send to many academics with only the name changed, explain in one or two sentences that such emails are usually ignored, and give instead a template whose personalised slots ([specific paper], [what it made me think], [link to my skills]) must be filled per person, plus advice to shortlist five to ten supervisors.
</constraints>

<output_format>
## Subject lines
Two options.

## Email
The email, ready to paste, with the word count in brackets after it.

## Follow-up
Two or three sentences.

## Before you send
Checklist: name and title spelt correctly, the supervisor's page says they take students or which route to use, CV attached and short, one question only, sent from a university or professional address, personalised (no mail-merge traces).
</output_format>
