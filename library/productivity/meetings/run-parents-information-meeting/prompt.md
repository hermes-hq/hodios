---
schema: 1
id: run-parents-information-meeting
kind: prompt
title: Run a parents' information meeting
description: Plans an information meeting for parents about a school trip, club season, new class or programme - agenda, key messages, likely questions with answers to confirm, handout and sign-up process.
category: meetings
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, parent, manager, individual]
requires: [none]
inputs: [text, document]
output: [plan, checklist, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [parents, schools, youth-clubs, faq, handouts]
pairs_with:
  prompts: [write-meeting-invite, write-meeting-recap-email]
args:
  - name: topic
    description: What the meeting is about (for example "Year 6 residential trip in May", "under-10s football season", "Year 7 induction for new families") and the key facts you have.
    type: text
    required: true
  - name: audience
    description: How many families, any language or access needs, and whether parents can attend in person, online or both.
    type: text
    required: true
  - name: asks
    description: What you need from parents (consent forms, payments, volunteers, kit, medical information) and by when. Optional.
    type: text
  - name: minutes
    description: Meeting length in minutes.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Key messages, Agenda, Likely questions, Handout, Sign-ups and forms, For parents who cannot come]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help teachers, coaches and organisers run information meetings for parents. What goes wrong: the organiser talks through slides for 40 minutes and the question time gets taken over by one parent's individual issue; the parents who most need the information (working shifts, less confident in the language, new to the school or club) cannot come; key facts such as cost, dates, what to bring and medical arrangements are given verbally but not in writing; and forms are collected in a chaotic trickle afterwards. Parents mostly want to know: is my child safe, what will it cost, what does my child need, what do I have to do and by when, and who do I contact. Good meetings answer those first, have a one-page handout, invite individual concerns to a private follow-up, and share everything with families who could not attend.

Topic: {{topic}}
Audience: {{audience}}
{{#asks}}What parents must do: {{asks}}{{/asks}}
Length: {{minutes}} minutes
</context>

<task>
1. Write three to five key messages parents must leave with, starting with safety and what they must do by when.
2. Build an agenda that fits the length, with presentation short and time for questions, including who presents each part.
3. List the questions parents are likely to ask for this topic (safety, supervision ratios, cost and help with costs, medical and dietary needs, phones, kit, transport, what if my child is anxious or unwell), with draft answers where the user gave facts and "to confirm" placeholders where they did not.
4. Draft a one-page handout: what, when, where, cost and payment, what to bring, key dates and deadlines, contacts.
5. Plan sign-ups and forms: what to collect at the meeting versus later, a simple checklist for parents, and how to chase missing forms kindly.
6. Plan for families who cannot attend: recording or slides, the handout sent home in accessible formats, translation if needed, and a contact for questions.
7. Give a line for handling individual concerns in the room ("let's talk after or I'll call you this week").
</task>

<constraints>
- Do not invent costs, dates, ratios, policies or safeguarding arrangements; mark them as to confirm with the school or club.
- Defer safeguarding, medical and legal questions to the organisation's own policies and named lead.
- Use plain, friendly language suitable for parents with varied reading levels.
- Keep the handout to one page.
</constraints>

<output_format>
## Key messages
Numbered.

## Agenda
Table: Time | Item | Who.

## Likely questions
Question, then draft answer or "to confirm".

## Handout
One-page draft.

## Sign-ups and forms
Checklist and chasing approach.

## For parents who cannot come
Bullets.
</output_format>
