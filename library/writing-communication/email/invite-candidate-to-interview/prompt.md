---
schema: 1
id: invite-candidate-to-interview
kind: prompt
title: Invite a candidate to interview
description: Writes an interview invitation with the format, interviewers, length, what to prepare, scheduling options and how to ask for adjustments, so candidates arrive ready and fewer drop out.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [recruiter, manager, founder]
requires: [none]
inputs: [notes, job-posting]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [interview-invitation, candidate-experience, scheduling, reasonable-adjustments, recruitment-email]
pairs_with:
  prompts: [write-candidate-rejection, plan-candidate-adjustments, write-interview-process-guide]
args:
  - name: candidate
    description: The candidate's name and the role they applied for, for example "Priya Shah, Senior Accountant".
    type: string
    required: true
  - name: interview_details
    description: Stage (phone screen, first round, final), format (video, phone, on site), length, who they will meet and their roles, what will happen (competency questions, case study, test), location or link, and the dates or slots you can offer.
    type: text
    required: true
  - name: company
    description: Organisation name, sender's name and role, and anything candidates usually ask about (dress, parking, ID at reception, expenses for travel).
    type: text
  - name: reply_by
    description: The date by which the candidate should confirm a slot.
    type: string
output_contract:
  format: markdown
  sections: [Email, Short text or message version, Missing details, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An interview invitation is the first time a candidate experiences how the organisation runs. Recruiters know that vague invites cause no-shows, nervous over-preparation for the wrong thing and back-and-forth that costs days: "a quick chat" that turns out to be a technical test feels like an ambush. Good invitations say exactly what the interview is (stage, format, length, who, what will be assessed), what to prepare and what not to, give real slot choices or a booking link, and invite the candidate to ask for adjustments in a neutral way that does not require disclosing a condition. They also set a reply-by date without pressure, and say what happens next and when.
</context>

<task>
Write an interview invitation to {{candidate}}.{{#reply_by}} Ask for a reply by {{reply_by}}.{{/reply_by}}

<interview_details>
{{interview_details}}
</interview_details>
{{#company}}
<company>
{{company}}
</company>
{{/company}}

1. If the format, length or available times are missing, write the email with [placeholders] and list each gap under "Missing details". If there is no information at all about the interview, ask for it and stop.
2. Subject: "Interview invitation: [role] at [organisation]".
3. First line: they have been invited to interview for the role; congratulate briefly, without hype.
4. The interview, as a short list: stage, format, length, date options or booking link, location or video link with how it will be shared, and who they will meet (names and roles as given).
5. What it involves and how to prepare: the kinds of questions or tasks, anything to bring or have ready (ID, portfolio, laptop), and anything they do not need to prepare. If there is a test or case study, say so plainly with the time it takes.
6. Adjustments: one neutral sentence inviting them to tell you about anything that would help them take part (for example extra time, a step-free route, captions), with a contact, and that it will not affect the decision.
7. Practicalities given in the input only: arrival, reception, parking, travel expenses, dress.
8. How to confirm: choose a slot or reply by the date, and what to do if none of the slots work.
9. What happens next after this stage and the rough timeline, if given.
10. Write a short version (under 60 words) for SMS or a messaging app that points to the email.
</task>

<constraints>
- Email body under about 220 words; use a short list for logistics.
- Use only the facts given. Never invent interviewer names, test content, salary, dates or links; use [placeholders].
- No questions about health, age, family plans or other protected characteristics, and no request to disclose a disability. If the input asks for one, leave it out and explain under Notes.
- Neutral, warm, professional; no exclamation marks beyond one, no "rockstar" language.
- If the format is a lengthy unpaid task (more than a few hours), flag it under Notes as a common reason candidates withdraw.
</constraints>

<output_format>
## Email
Subject line, then the body.
## Short text or message version
The short message.
## Missing details
Bullets of placeholders to fill. "None" if complete.
## Notes
Anything left out or changed and why. "None" if nothing.
</output_format>
