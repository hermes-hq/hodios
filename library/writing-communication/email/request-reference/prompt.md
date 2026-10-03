---
schema: 1
id: request-reference
kind: prompt
title: Ask someone to be a reference
description: Asks a former manager, teacher or colleague to act as a reference, making it easy to say yes or no, with the role, the timeline and what they could speak to. Use when job hunting or applying.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker, student, individual]
requires: [none]
inputs: [text, job-posting]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [references, referee-request, job-application, recommendation-request, networking]
pairs_with:
  prompts: [brief-your-references, write-email-to-professor, reconnect-with-old-contact]
args:
  - name: referee
    description: The person you are asking, with their current role if you know it, for example "Hannah Cole, my manager at Fernway 2019-2022, now Director at another firm".
    type: string
    required: true
  - name: relationship
    description: How you worked together, for how long and when you were last in touch, plus two or three specific things they saw you do (projects, results, situations).
    type: text
    required: true
  - name: opportunity
    description: The job, programme, scholarship or tenancy, the organisation, why it fits you, and what the reference process involves if you know it (call, form, letter).
    type: text
    required: true
  - name: deadline
    description: When the referee might be contacted or when a letter or form is due.
    type: string
output_contract:
  format: markdown
  sections: [Email, Short message version, Once they say yes, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A reference request is a favour, and the person being asked is weighing two things: whether they can honestly say good things, and how much work it will be. The requests that get an enthusiastic yes remind the referee of the shared work with specific examples, say exactly what the opportunity is and when they might be contacted and how, name two or three things they could speak to, and give a genuine, face-saving way to decline ("if now is not a good time, or you feel someone else knows my recent work better, I completely understand"). A lukewarm reference from someone who felt obliged does more harm than none. The ask comes before the referee's name goes on any form, and it is separate from the later briefing once they have agreed.
</context>

<task>
Write a reference request to {{referee}}.{{#deadline}} Timing: {{deadline}}.{{/deadline}}

<relationship>
{{relationship}}
</relationship>

<opportunity>
{{opportunity}}
</opportunity>

1. If the relationship gives no shared work or the opportunity is unclear, ask up to two questions and stop.
2. If the last contact was more than about a year ago, open with a short, genuine reconnection line (one sentence, from the input) before the ask.
3. Subject: "Would you be a reference for my application to [organisation]?"
4. Ask in the first or second sentence. Ask whether they would be comfortable giving a positive reference, not just "a reference".
5. Remind them of the shared work: when, the role, and two or three specific things they saw (only from the input).
6. Describe the opportunity in one or two sentences and why it fits.
7. Logistics: who will contact them, how (call, email, online form, letter), roughly when, and how long it usually takes, using placeholders where unknown.
8. Two or three things they could speak to, phrased as suggestions, never as a script.
9. The easy out, in one sentence, sincerely worded.
10. Offer to send the CV and the job description, and thank them.
11. Write a short version (under about 60 words) for LinkedIn or a text message, for referees who are more reachable that way.
12. Under "Once they say yes", list what to send them: CV, job description, the points to highlight, the expected contact date, and a promise to tell them the outcome.
</task>

<constraints>
- Email body under about 170 words.
- Use only the facts given. Never invent projects, results, titles or dates, and never suggest the referee say anything untrue or exaggerate the candidate's role; if the input asks for that, write an accurate version and explain why under Notes.
- Warm and direct; no grovelling, no pressure, no assuming a yes ("I've already listed you").
- For academic references or recommendation letters, allow more lead time and mention the submission method; suggest at least three weeks' notice if the deadline is close.
</constraints>

<output_format>
## Email
Subject line, then the body.
## Short message version
The short message.
## Once they say yes
Bullets.
## Notes
Placeholders and anything changed for accuracy. "None" if nothing.
</output_format>
