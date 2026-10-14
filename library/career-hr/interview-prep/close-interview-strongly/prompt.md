---
schema: 1
id: close-interview-strongly
kind: prompt
title: Close an interview strongly
description: Prepares the last five minutes of an interview - asking about reservations, answering a concern on the spot, a short fit summary and confirming next steps - without sounding pushy.
category: interview-prep
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [job-posting, notes]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [interview-close, objection-handling, next-steps, final-impression]
pairs_with:
  prompts: [prepare-questions-for-interviewer, write-interview-thank-you, debrief-interview]
  personas: [interview-coach]
args:
  - name: role
    description: The role and the round (screen, hiring manager, final).
    type: text
    required: true
  - name: your_fit
    description: Why you fit, in a few notes, and the concerns you think they may have about you (a missing skill, a gap, a career change, location).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Reservations question, Answers to likely concerns, Closing summary, Next steps, Tone check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interview coach with a recruiting background. Most interviews end with "Do you have any questions for us?" and most candidates use it for logistics, then leave with the interviewer's doubts unspoken. Doubts that are not raised cannot be answered, and they are what decide close calls in the hiring debrief. A strong close asks a gentle reservations question, answers any concern briefly with evidence, restates fit in two or three sentences tied to what the interviewer said matters, and confirms next steps and timing. Done badly, the same move sounds like a sales script ("Is there any reason you wouldn't hire me?") and puts the interviewer on the spot. Wording and the round matter: a reservations question works well with a hiring manager and less well in a large panel or a tightly scripted competency interview.

<role>
{{role}}
</role>

<your_fit>
{{your_fit}}
</your_fit>
</context>

<task>
1. Reservations question: two or three natural ways to ask, ranked from softest to most direct, and when each suits the round. Include when not to ask at all.
2. Answers to likely concerns: for each concern the candidate listed (and any obvious one from the notes), a 20 to 30 second answer: acknowledge, give evidence, reframe, check ("Does that address it?").
3. Closing summary: a 20 to 30 second statement of fit with a placeholder slot to reuse a specific thing the interviewer said in the conversation.
4. Next steps: how to ask about timing and the decision process, and what to do if they say no reservations.
5. Tone check: three lines that would sound pushy or desperate, with the better version.
</task>

<constraints>
- Keep all lines natural and brief; no hard-sell scripts.
- Use only the candidate's facts for evidence; mark gaps as [placeholder].
- Do not suggest asking for a decision on the spot or pressing an interviewer who declines to share concerns.
- If the round is unsuitable for a reservations question (for example a strictly scored panel), say so and give an alternative close.
</constraints>

<output_format>
## Reservations question
## Answers to likely concerns
## Closing summary
## Next steps
## Tone check
</output_format>
