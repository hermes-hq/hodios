---
schema: 1
id: follow-up-on-job-application
kind: prompt
title: Follow up on a job application
description: Writes the follow-up when you have heard nothing after applying or interviewing, timed sensibly, with one new point and, if you have another offer, an honest mention of its deadline.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker, student]
requires: [none]
inputs: [notes, job-posting]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [application-status, recruiter-follow-up, competing-offer, job-hunt, interview-follow-up]
pairs_with:
  prompts: [write-interview-thank-you, respond-to-job-rejection, evaluate-job-offer]
args:
  - name: stage
    description: Where you are.
    type: enum
    enum: [after-application, after-interview, competing-offer]
    default: after-application
  - name: details
    description: The role and organisation, who you have been in contact with, dates (applied, interviewed, closing date, the timeline they gave you), and anything new since (a relevant result, a qualification, another offer with its deadline).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is it time to follow up, Email, If there is still no reply, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recruiters and hiring managers say the same thing: a short, polite follow-up after the stated timeline has passed is normal and sometimes helpful; daily chasing or guilt-tripping is not. Timing is the main judgement. After an application, wait until about a week or two after the closing date, or the timeline in the posting. After an interview, wait until the day after the decision date they gave, or about a week if none was given. A competing offer is different: telling a preferred employer you have an offer with a deadline is legitimate and often speeds things up, but only if it is true, and the email should ask about their timeline rather than issue an ultimatum. Every follow-up should be addressed to the person you last dealt with, mention the role and date, add one new useful point if there is one, and ask one easy question.
</context>

<task>
Write a follow-up. Stage: {{stage}}.

<details>
{{details}}
</details>

1. Is it time to follow up: from the dates, say whether to send now or wait, and until when. If it is too early, still write the email for the right date and say when to send it.
2. Subject: reply in the existing thread if there is one; otherwise "[Role] application - [your name]" or "Following up: [role] interview on [date]".
3. Email, under about 110 words:
   - after-application: the role and when you applied, continued interest in one specific sentence, one new point if any, and a question about the timeline.
   - after-interview: thanks for the interview on that date, one specific reason the role appeals or one thing you would add to an answer, and a question about the expected decision date.
   - competing-offer: say you have received an offer with a deadline, that this role is your preference (only if the input says so), and ask whether their timeline could allow a decision before then; no ultimatum.
4. "If there is still no reply": when to send one last short note, and that after that it is reasonable to move on.
5. Under Notes: anything to avoid for this situation (for example following up through several channels at once).
</task>

<constraints>
- Never invent offers, deadlines, interview dates, names or achievements. If the user implies a competing offer that does not exist, do not write one; explain why.
- Polite and confident; no apologising for following up, no guilt ("I've been waiting"), no pressure tactics.
- Use [placeholders] for missing names and dates.
</constraints>

<output_format>
## Is it time to follow up
One or two sentences with the date to send.
## Email
Subject, then body.
## If there is still no reply
One or two sentences and the final note.
## Notes
"None" if nothing.
</output_format>
