---
schema: 1
id: respond-to-job-rejection
kind: prompt
title: Respond to a job rejection
description: Writes a gracious reply to a job rejection that thanks the team, asks for brief, specific feedback and keeps the relationship open for future roles. Use within a day or two of being turned down.
category: job-search
version: 1.0.0
status: incubating
stage: [ship]
role: [job-seeker]
requires: [none]
inputs: [message, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [rejection, follow-up, feedback-request, professional-relationships]
pairs_with:
  prompts: [debrief-interview, write-networking-message, write-interview-thank-you]
args:
  - name: company
    description: The company and role, and the rejection message itself if you can paste it.
    type: string
    required: true
  - name: stage_reached
    description: Optional. How far you got - application only, phone screen, first interview, final round, after a task.
    type: string
  - name: contact
    description: Optional. Who sent the rejection and anyone else you met who you would like to stay in touch with.
    type: string
output_contract:
  format: markdown
  sections: [Reply, Optional note to the hiring manager, What to expect]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruiter who has sent thousands of rejections and remembers the handful of candidates who replied well. A good reply to a rejection is rare, so it stands out: final-round runners-up are often the first call when the hire falls through or a similar role opens. A bad reply (arguing, guilt, a long request for justification) closes the door. Most companies give limited feedback because of time and legal caution, so the request must be easy to answer: one specific question, with no pressure.

Company and role: {{company}}
{{#stage_reached}}Stage reached: {{stage_reached}}{{/stage_reached}}
{{#contact}}Contact: {{contact}}{{/contact}}
</context>

<task>
1. Match the reply to the stage. After an application-only rejection, a reply is optional; write a two-sentence version and say it is optional. After interviews, write a full reply.
2. Write the reply (60 to 120 words):
   - Thank the person by name for letting you know and for their time; mention one specific thing from the process if the stage allows (a conversation, the task).
   - Accept the decision in a sentence, without asking them to reconsider.
   - Ask for feedback with one specific, easy question ("Was there one area where the other candidates were stronger?") and make it clearly optional.
   - Keep the door open: genuine interest in the company, and a request to be considered for future roles that fit.
3. If the candidate reached the final round or built rapport with the hiring manager, write a short separate note to the hiring manager (40 to 80 words), for example to connect on LinkedIn and stay in touch.
4. Briefly tell the candidate what usually happens next: feedback may be short or not come; do not follow up more than once; when it is worth reapplying.
</task>

<constraints>
- No arguing with the decision, no disappointment or guilt ("I was really counting on this"), no request to reconsider.
- Use only what was given. Use [Name] where the contact's name is unknown; do not invent details of the process.
- Warm and professional; short enough to read on a phone.
- If the rejection message suggests unlawful discrimination or a broken commitment (for example an offer withdrawn after acceptance), note in one line that this is a different situation and the candidate may want advice, then still write a neutral reply if asked.
</constraints>

<output_format>
## Reply
Subject line if it is an email, then the body.
## Optional note to the hiring manager
Only if the stage justifies it.
## What to expect
Two or three bullets.
</output_format>
