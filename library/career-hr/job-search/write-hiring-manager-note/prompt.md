---
schema: 1
id: write-hiring-manager-note
kind: prompt
title: Write a note to a hiring manager
description: Writes a short direct message to a hiring manager about a specific open role, with one piece of evidence of fit and a light ask. Use alongside or after a formal application.
category: job-search
version: 1.0.1
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [job-posting, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [hiring-manager, direct-outreach, cold-message, job-application]
pairs_with:
  prompts: [write-networking-message, write-cover-letter, research-company]
args:
  - name: role
    description: The role, with the posting or its key requirements, and whether you have already applied.
    type: string
    required: true
  - name: hiring_manager
    description: Optional. The hiring manager's name and title, and anything public and relevant you know about them or their team (a talk, a post, a launch). Leave empty if unknown.
    type: string
  - name: evidence
    description: The one or two strongest pieces of evidence that you can do this job - an achievement with a result, ideally close to the team's problem.
    type: text
    required: true
  - name: channel
    description: Where the message goes. linkedin is a connection request note, kept under 200 characters so it fits a free account; email allows a subject line and a few more lines.
    type: enum
    enum: [email, linkedin]
    default: email
output_contract:
  format: markdown
  sections: [Message, Short version, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "LinkedIn notes are kept under 200 characters, the connection note limit on free accounts."}
---
<context>
You are a hiring manager who reads every short, relevant message from candidates and ignores the long ones. A note to a hiring manager works when it respects their time: it names the role, gives one piece of evidence that maps to the team's real problem, and asks for something small that is easy to say yes to. It fails when it pastes the cover letter, asks for "a quick call to pick your brain", flatters, or pressures ("I'd love to know why I haven't heard back").

Role: {{role}}
{{#hiring_manager}}Hiring manager: {{hiring_manager}}{{/hiring_manager}}
Channel: {{channel}}

<evidence>
{{evidence}}
</evidence>
</context>

<task>
1. Pick the single piece of evidence that best maps to the role's most important need, and phrase it as an outcome with a number or concrete result.
2. Write the message:
   - Email: a specific subject line (role plus the evidence in a few words), then 60 to 110 words: one line naming the role and that the candidate applied (or is applying), one or two lines of evidence tied to the team's need, one line of genuine, specific interest (only if something real was given about the team), and a light ask (would they be open to a 15-minute conversation, or who is best to speak with). Sign off with [Your name] and a link placeholder.
   - LinkedIn: a connection request note under 200 characters (the limit on free accounts; Premium allows 300), with the role, the evidence and a light ask. If the candidate is already connected, a direct message can use the email body without the subject line.
3. Write a short version for the other channel.
</task>

<constraints>
- One piece of evidence, at most two. Do not summarise the resume.
- Use only facts given. Never invent a connection, a shared interest or something the manager said; if no personal hook was given, skip it rather than fake one.
- No flattery, no pressure, no "just following up" tone, no request for feedback on an application they have not reviewed.
- If no name is given, write "Hi [Name]" and add finding the name to Before you send; never "Dear Sir or Madam".
- If the candidate has not applied and the company requires applications through its system, recommend applying first and mentioning it in the note.
</constraints>

<output_format>
## Message
Subject line (email) and body, then the character or word count.
## Short version
For the other channel.
## Before you send
Bullets: placeholders and a suggested follow-up timing (one gentle follow-up after about a week, then stop).
</output_format>
